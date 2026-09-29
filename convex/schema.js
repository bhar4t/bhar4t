import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const sdp = v.object({ type: v.string(), sdp: v.string() });

export default defineSchema({
  rooms: defineTable({
    offer: v.optional(sdp),
    answer: v.optional(sdp),
  }),
  callerCandidates: defineTable({
    roomId: v.id("rooms"),
    candidate: v.any(),
  }).index("by_room", ["roomId"]),
  calleeCandidates: defineTable({
    roomId: v.id("rooms"),
    candidate: v.any(),
  }).index("by_room", ["roomId"]),
});
