import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const sdp = v.object({ type: v.string(), sdp: v.string() });

// Short word lists just for a memorable, spoken/typed-aloud meeting code —
// not a security boundary, so entropy only needs to beat accidental collisions.
const WORDS_A = ["fox", "cat", "dog", "owl", "bee", "ant", "cow", "pig", "hen", "bat", "elk", "ram", "yak", "rat", "emu"];
const WORDS_B = ["jump", "run", "hop", "fly", "spin", "dive", "walk", "swim", "leap", "race", "roll", "glide"];

function randomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

function randomJoinCode() {
  return `${randomWord(WORDS_A)}-${randomWord(WORDS_B)}`;
}

async function generateUniqueJoinCode(ctx) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = attempt < 4 ? randomJoinCode() : `${randomJoinCode()}-${Math.floor(Math.random() * 1000)}`;
    const existing = await ctx.db
      .query("rooms")
      .withIndex("by_join_code", (q) => q.eq("joinCode", candidate))
      .unique();
    if (!existing) return candidate;
  }
  throw new Error("Could not generate a unique join code, please try again.");
}

export const createRoom = mutation({
  args: {},
  handler: async (ctx) => {
    const joinCode = await generateUniqueJoinCode(ctx);
    const roomId = await ctx.db.insert("rooms", { joinCode });
    return { roomId, joinCode };
  },
});

export const getRoomByJoinCode = query({
  args: { joinCode: v.string() },
  handler: async (ctx, { joinCode }) => {
    return await ctx.db
      .query("rooms")
      .withIndex("by_join_code", (q) => q.eq("joinCode", joinCode))
      .unique();
  },
});

export const setOffer = mutation({
  args: { roomId: v.id("rooms"), offer: sdp },
  handler: async (ctx, { roomId, offer }) => {
    await ctx.db.patch(roomId, { offer });
  },
});

export const setAnswer = mutation({
  args: { roomId: v.id("rooms"), answer: sdp },
  handler: async (ctx, { roomId, answer }) => {
    await ctx.db.patch(roomId, { answer });
  },
});

export const getRoom = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    return await ctx.db.get(roomId);
  },
});

export const addCallerCandidate = mutation({
  args: { roomId: v.id("rooms"), candidate: v.any() },
  handler: async (ctx, { roomId, candidate }) => {
    await ctx.db.insert("callerCandidates", { roomId, candidate });
  },
});

export const addCalleeCandidate = mutation({
  args: { roomId: v.id("rooms"), candidate: v.any() },
  handler: async (ctx, { roomId, candidate }) => {
    await ctx.db.insert("calleeCandidates", { roomId, candidate });
  },
});

export const listCallerCandidates = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    return await ctx.db
      .query("callerCandidates")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .collect();
  },
});

export const listCalleeCandidates = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    return await ctx.db
      .query("calleeCandidates")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .collect();
  },
});

export const deleteRoom = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const caller = await ctx.db
      .query("callerCandidates")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .collect();
    await Promise.all(caller.map((doc) => ctx.db.delete(doc._id)));

    const callee = await ctx.db
      .query("calleeCandidates")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .collect();
    await Promise.all(callee.map((doc) => ctx.db.delete(doc._id)));

    await ctx.db.delete(roomId);
  },
});
