import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const sdp = v.object({ type: v.string(), sdp: v.string() });

export const createRoom = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.insert("rooms", {});
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
