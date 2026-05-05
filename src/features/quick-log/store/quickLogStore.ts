import Realm from "realm";
import { create } from "zustand";

import { ActivityLog } from "@/src/features/home/store/homeModels";
import type {
  BreastSide,
  DiaperLog,
  DiaperType,
  FeedLog,
  FeedMethod,
  SleepLog,
} from "@/src/features/quick-log/types/quickLog.types";
import {
  findActiveSleepLogInRealm,
  formatSleepDurationShort,
  parseSleepMetadata,
  type SleepActivityMetadata,
} from "@/src/features/quick-log/utils/sleep.utils";
import {
  onFeedLogSaved,
  onSleepSessionStarted,
  onSleepWakeLogged,
} from "@/src/features/reminders/services/reminderSync";

type SaveFeedInput = {
  method: FeedMethod;
  side?: BreastSide;
  durationMinutes?: number;
  amountMl?: number;
  startedAt?: Date;
  endedAt?: Date;
};

function newRealmId(): string {
  const now = new Date();
  return typeof Realm.BSON?.ObjectId === "function"
    ? new Realm.BSON.ObjectId().toHexString()
    : `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`;
}

type SleepOpResult =
  | { ok: true; log: SleepLog }
  | { ok: false; error: string };

function diaperActivitySubtitle(diaperType: DiaperType): string {
  if (diaperType === "wet") return "Wet";
  if (diaperType === "dirty") return "Dirty";
  return "Wet & dirty";
}

type QuickLogStore = {
  inMemoryFeedLogs: FeedLog[];
  inMemorySleepLogs: SleepLog[];
  inMemoryDiaperLogs: DiaperLog[];
  saveFeedLog: (input: SaveFeedInput, realm?: Realm) => FeedLog;
  saveDiaperLog: (diaperType: DiaperType, realm?: Realm) => DiaperLog;
  startSleepSession: (realm?: Realm) => SleepOpResult;
  endSleepSession: (realm?: Realm) => SleepOpResult;
  saveCompletedSleepLog: (durationMinutes: number, realm?: Realm) => SleepLog;
};

export const useQuickLogStore = create<QuickLogStore>((set, get) => ({
  inMemoryFeedLogs: [],
  inMemorySleepLogs: [],
  inMemoryDiaperLogs: [],
  saveFeedLog: (input, realm) => {
    const now = new Date();
    const id = newRealmId();

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
      set((state) => ({ inMemoryFeedLogs: [feedLog, ...state.inMemoryFeedLogs] }));
    }

    if (realm) {
      void onFeedLogSaved(realm);
    }

    return feedLog;
  },

  saveDiaperLog: (diaperType, realm) => {
    const now = new Date();
    const id = newRealmId();
    const createdAt = now.toISOString();
    const subtitle = diaperActivitySubtitle(diaperType);

    const diaperLog: DiaperLog = {
      id,
      type: "diaper",
      diaperType,
      createdAt,
    };

    if (realm) {
      realm.write(() => {
        realm.create(ActivityLog.schema.name, {
          id,
          type: "diaper",
          title: "Diaper",
          subtitle,
          metadata: JSON.stringify({ diaperType }),
          createdAt: now,
          updatedAt: now,
        });
      });
    } else {
      set((state) => ({
        inMemoryDiaperLogs: [diaperLog, ...state.inMemoryDiaperLogs],
      }));
    }

    return diaperLog;
  },

  startSleepSession: (realm) => {
    const now = new Date();
    const id = newRealmId();
    const startedIso = now.toISOString();

    if (realm) {
      if (findActiveSleepLogInRealm(realm)) {
        return { ok: false, error: "A sleep session is already in progress." };
      }
      const meta: SleepActivityMetadata = {
        sleepStatus: "active",
        startedAt: startedIso,
      };
      realm.write(() => {
        realm.create(ActivityLog.schema.name, {
          id,
          type: "sleep",
          title: "Sleep",
          subtitle: "In progress",
          metadata: JSON.stringify(meta),
          createdAt: now,
          updatedAt: now,
        });
      });
      void onSleepSessionStarted(realm);
    } else {
      if (get().inMemorySleepLogs.some((l) => l.status === "active")) {
        return { ok: false, error: "A sleep session is already in progress." };
      }
      const log: SleepLog = {
        id,
        type: "sleep",
        status: "active",
        startedAt: startedIso,
        createdAt: startedIso,
      };
      set((s) => ({ inMemorySleepLogs: [log, ...s.inMemorySleepLogs] }));
      return { ok: true, log };
    }

    const log: SleepLog = {
      id,
      type: "sleep",
      status: "active",
      startedAt: startedIso,
      createdAt: startedIso,
    };
    return { ok: true, log };
  },

  endSleepSession: (realm) => {
    const now = new Date();

    if (realm) {
      const active = findActiveSleepLogInRealm(realm);
      if (!active) {
        return { ok: false, error: "No active sleep session found." };
      }
      const meta = parseSleepMetadata(active.metadata);
      const startedAtIso = meta?.startedAt;
      if (!startedAtIso) {
        return { ok: false, error: "No active sleep session found." };
      }
      const startedAt = new Date(startedAtIso);
      const durationMinutes = Math.max(
        1,
        Math.round((now.getTime() - startedAt.getTime()) / 60_000)
      );
      const completedMeta: SleepActivityMetadata = {
        sleepStatus: "completed",
        startedAt: startedAtIso,
        endedAt: now.toISOString(),
      };
      const subtitle = formatSleepDurationShort(durationMinutes);

      realm.write(() => {
        active.durationMinutes = durationMinutes;
        active.title = "Slept";
        active.subtitle = subtitle;
        active.metadata = JSON.stringify(completedMeta);
        active.updatedAt = now;
      });

      void onSleepWakeLogged(realm);

      const log: SleepLog = {
        id: active.id,
        type: "sleep",
        status: "completed",
        startedAt: startedAtIso,
        endedAt: now.toISOString(),
        durationMinutes,
        createdAt: active.createdAt.toISOString(),
      };
      return { ok: true, log };
    }

    const mem = get().inMemorySleepLogs;
    const activeIdx = mem.findIndex((l) => l.status === "active");
    if (activeIdx === -1) {
      return { ok: false, error: "No active sleep session found." };
    }
    const activeLog = mem[activeIdx];
    const startedAtIso = activeLog.startedAt;
    if (!startedAtIso) {
      return { ok: false, error: "No active sleep session found." };
    }
    const startedAt = new Date(startedAtIso);
    const durationMinutes = Math.max(
      1,
      Math.round((now.getTime() - startedAt.getTime()) / 60_000)
    );
    const endedIso = now.toISOString();
    const completed: SleepLog = {
      ...activeLog,
      status: "completed",
      endedAt: endedIso,
      durationMinutes,
    };
    set((s) => ({
      inMemorySleepLogs: s.inMemorySleepLogs.map((l) => (l.id === activeLog.id ? completed : l)),
    }));
    return { ok: true, log: completed };
  },

  saveCompletedSleepLog: (durationMinutes, realm) => {
    const now = new Date();
    const id = newRealmId();
    const safeMinutes = Math.max(1, Math.round(durationMinutes));
    const subtitle = formatSleepDurationShort(safeMinutes);
    const ended = now;
    const started = new Date(ended.getTime() - safeMinutes * 60_000);
    const startedIso = started.toISOString();
    const endedIso = ended.toISOString();
    const meta: SleepActivityMetadata = {
      sleepStatus: "completed",
      startedAt: startedIso,
      endedAt: endedIso,
    };

    if (realm) {
      realm.write(() => {
        realm.create(ActivityLog.schema.name, {
          id,
          type: "sleep",
          title: "Slept",
          subtitle,
          durationMinutes: safeMinutes,
          metadata: JSON.stringify(meta),
          createdAt: now,
          updatedAt: now,
        });
      });
      void onSleepWakeLogged(realm);
    } else {
      const log: SleepLog = {
        id,
        type: "sleep",
        status: "completed",
        startedAt: startedIso,
        endedAt: endedIso,
        durationMinutes: safeMinutes,
        createdAt: now.toISOString(),
      };
      set((s) => ({ inMemorySleepLogs: [log, ...s.inMemorySleepLogs] }));
      return log;
    }

    return {
      id,
      type: "sleep",
      status: "completed",
      startedAt: startedIso,
      endedAt: endedIso,
      durationMinutes: safeMinutes,
      createdAt: now.toISOString(),
    };
  },
}));
