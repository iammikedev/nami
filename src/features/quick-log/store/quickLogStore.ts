import Realm from "realm";
import { create } from "zustand";

import { ActivityLog } from "@/src/features/home";
import type { BreastSide, FeedLog, FeedMethod } from "@/src/features/quick-log/types/quickLog.types";

type SaveFeedInput = {
  method: FeedMethod;
  side?: BreastSide;
  durationMinutes?: number;
  amountMl?: number;
  startedAt?: Date;
  endedAt?: Date;
};

type QuickLogStore = {
  inMemoryFeedLogs: FeedLog[];
  saveFeedLog: (input: SaveFeedInput, realm?: Realm) => FeedLog;
};

export const useQuickLogStore = create<QuickLogStore>((set) => ({
  inMemoryFeedLogs: [],
  saveFeedLog: (input, realm) => {
    const now = new Date();
    const id =
      typeof Realm.BSON?.ObjectId === "function"
        ? new Realm.BSON.ObjectId().toHexString()
        : `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`;

    const subtitle =
      input.method === "breastfeed"
        ? `${input.side === "left" ? "Left" : "Right"} • ${input.durationMinutes ?? 0} mins`
        : `${input.amountMl ?? 0} ml`;
    const title =
      input.method === "breastfeed"
        ? `Fed (${input.side === "left" ? "Left" : "Right"})`
        : "Fed (Bottle)";

    const feedLog: FeedLog = {
      id,
      logType: "feed",
      method: input.method,
      side: input.side,
      durationMinutes: input.durationMinutes,
      amountMl: input.amountMl,
      startedAt: input.startedAt,
      endedAt: input.endedAt,
      createdAt: now,
    };

    if (realm) {
      realm.write(() => {
        realm.create(ActivityLog.schema.name, {
          id,
          type: "feed",
          title,
          subtitle,
          durationMinutes: input.durationMinutes,
          metadata: JSON.stringify({
            method: input.method,
            side: input.side,
            amountMl: input.amountMl,
            startedAt: input.startedAt?.toISOString(),
            endedAt: input.endedAt?.toISOString(),
          }),
          createdAt: now,
          updatedAt: now,
        });
      });
    } else {
      // TODO(persistence): replace with durable local storage when Realm is unavailable.
      set((state) => ({ inMemoryFeedLogs: [feedLog, ...state.inMemoryFeedLogs] }));
    }

    return feedLog;
  },
}));
