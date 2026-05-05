import { create } from "zustand";
import Realm from "realm";

import { OnboardingProfile, ONBOARDING_PROFILE_ID } from "@/src/features/onboarding";
import type {
  HomeBabyProfile,
  HomeActivityType,
  RecentActivityItem,
  TodaySummary,
} from "@/src/features/home/types/home.types";
import { getRelativeTimeLabel, getStartAndEndOfToday } from "@/src/features/home/utils/dateFormat";
import { useQuickLogStore } from "@/src/features/quick-log/store/quickLogStore";
import type { FeedLog, SleepLog } from "@/src/features/quick-log/types/quickLog.types";
import { formatSleepDurationShort } from "@/src/features/quick-log/utils/sleep.utils";
import { ActivityLog, BABY_PROFILE_SINGLETON_ID, BabyProfile } from "./homeModels";

type HomeStore = {
  isLoading: boolean;
  isRefreshing: boolean;
  babyProfile: HomeBabyProfile | null;
  todaySummary: TodaySummary;
  recentActivities: RecentActivityItem[];
  loadBabyProfile: (realm: Realm) => HomeBabyProfile | null;
  loadTodaySummary: (realm: Realm) => TodaySummary;
  loadRecentActivities: (realm: Realm) => RecentActivityItem[];
  refreshHomeData: (realm: Realm, opts?: { pullToRefresh?: boolean }) => void;
  seedHomeTestData: (realm: Realm) => void;
  resetHomeLogs: (realm: Realm) => void;
};

const DEFAULT_SUMMARY: TodaySummary = {
  feedCount: 0,
  sleepDurationMinutes: 0,
  diaperCount: 0,
};

function mapTypeToActivityColor(type: HomeActivityType) {
  if (type === "sleep") return "sleep";
  if (type === "diaper") return "diaper";
  if (type === "milestone") return "milestone";
  return "feed";
}

function mapFeedLogToRecent(log: FeedLog): RecentActivityItem {
  const subtitle =
    log.method === "breastfeed"
      ? `${log.side === "left" ? "Left" : "Right"} • ${log.durationMinutes ?? 0} mins`
      : `${log.amountMl ?? 0} ml`;
  const title =
    log.method === "breastfeed"
      ? `Fed (${log.side === "left" ? "Left" : "Right"})`
      : "Fed (Bottle)";
  return {
    id: log.id,
    type: mapTypeToActivityColor("feed"),
    title,
    subtitle,
    createdAt: log.createdAt,
    relativeTime: getRelativeTimeLabel(log.createdAt),
  };
}

function mapSleepLogToRecent(log: SleepLog): RecentActivityItem {
  const createdAt = new Date(log.createdAt);
  const subtitle =
    log.status === "active"
      ? "In progress"
      : log.durationMinutes != null
        ? formatSleepDurationShort(log.durationMinutes)
        : undefined;
  return {
    id: log.id,
    type: mapTypeToActivityColor("sleep"),
    title: log.status === "active" ? "Sleep" : "Slept",
    subtitle,
    createdAt,
    relativeTime: getRelativeTimeLabel(createdAt),
  };
}

function mergeQuickLogMemoryWithRecent(realmItems: RecentActivityItem[]): RecentActivityItem[] {
  const quick = useQuickLogStore.getState();
  const fromMemory = [
    ...quick.inMemoryFeedLogs.map(mapFeedLogToRecent),
    ...quick.inMemorySleepLogs.map(mapSleepLogToRecent),
  ];
  const seen = new Set(realmItems.map((i) => i.id));
  return [...fromMemory.filter((i) => !seen.has(i.id)), ...realmItems]
    .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
    .slice(0, 5);
}

function getOrCreateBabyProfileFromOnboarding(realm: Realm): HomeBabyProfile | null {
  const existing = realm.objectForPrimaryKey<BabyProfile>(
    BabyProfile.schema.name,
    BABY_PROFILE_SINGLETON_ID
  );
  if (existing) {
    return {
      id: existing.id,
      name: existing.name,
      birthdate: existing.birthdate,
    };
  }

  const onboarding = realm.objectForPrimaryKey<OnboardingProfile>(
    OnboardingProfile.schema.name,
    ONBOARDING_PROFILE_ID
  );
  if (!onboarding?.babyName || !onboarding?.babyBirthdate) {
    return null;
  }

  realm.write(() => {
    realm.create(
      BabyProfile.schema.name,
      {
        id: BABY_PROFILE_SINGLETON_ID,
        name: onboarding.babyName,
        birthdate: onboarding.babyBirthdate,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      Realm.UpdateMode.Modified
    );
  });

  return {
    id: BABY_PROFILE_SINGLETON_ID,
    name: onboarding.babyName,
    birthdate: onboarding.babyBirthdate,
  };
}

export const useHomeStore = create<HomeStore>((set) => ({
  isLoading: true,
  isRefreshing: false,
  babyProfile: null,
  todaySummary: DEFAULT_SUMMARY,
  recentActivities: [],
  loadBabyProfile: (realm) => getOrCreateBabyProfileFromOnboarding(realm),
  loadTodaySummary: (realm) => {
    const { start, end } = getStartAndEndOfToday();
    const todayLogs = realm
      .objects<ActivityLog>(ActivityLog.schema.name)
      .filtered("createdAt >= $0 && createdAt < $1", start, end);

    const feedCount = todayLogs.filtered("type == 'feed'").length;
    const diaperCount = todayLogs.filtered("type == 'diaper'").length;
    const sleepLogs = todayLogs.filtered("type == 'sleep'");
    const sleepDurationMinutes = sleepLogs.reduce(
      (sum, log) => sum + (log.durationMinutes ?? 0),
      0
    );

    return { feedCount, sleepDurationMinutes, diaperCount };
  },
  loadRecentActivities: (realm) => {
    const logs = realm
      .objects<ActivityLog>(ActivityLog.schema.name)
      .sorted("createdAt", true)
      .slice(0, 5);

    return logs.map((log) => ({
      id: log.id,
      type: mapTypeToActivityColor(log.type),
      title: log.title,
      subtitle: log.subtitle ?? undefined,
      createdAt: log.createdAt,
      relativeTime: getRelativeTimeLabel(log.createdAt),
    }));
  },
  refreshHomeData: (realm, opts) => {
    const pullToRefresh = opts?.pullToRefresh ?? false;
    set({ isLoading: !pullToRefresh, isRefreshing: pullToRefresh });

    const state = useHomeStore.getState();
    const babyProfile = state.loadBabyProfile(realm);
    const todaySummary = state.loadTodaySummary(realm);
    const recentActivities = mergeQuickLogMemoryWithRecent(state.loadRecentActivities(realm));

    set({
      babyProfile,
      todaySummary,
      recentActivities,
      isLoading: false,
      isRefreshing: false,
    });
  },
  seedHomeTestData: (realm) => {
    const now = new Date();
    const seedLogs: {
      type: HomeActivityType;
      title: string;
      subtitle?: string;
      durationMinutes?: number;
      createdAt: Date;
    }[] = [
      {
        type: "feed",
        title: "Fed (Left)",
        subtitle: "10 mins",
        durationMinutes: 10,
        createdAt: new Date(now.getTime() - 2 * 60 * 1000),
      },
      {
        type: "diaper",
        title: "Diaper",
        subtitle: "Wet",
        createdAt: new Date(now.getTime() - 8 * 60 * 1000),
      },
      {
        type: "sleep",
        title: "Slept",
        subtitle: "1h 10m",
        durationMinutes: 70,
        createdAt: new Date(now.getTime() - 70 * 60 * 1000),
      },
      {
        type: "feed",
        title: "Fed (Bottle)",
        subtitle: "15 mins",
        durationMinutes: 15,
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
      },
      {
        type: "sleep",
        title: "Slept",
        subtitle: "5h 10m",
        durationMinutes: 310,
        createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000),
      },
      {
        type: "diaper",
        title: "Diaper",
        subtitle: "Dirty",
        createdAt: new Date(now.getTime() - 9 * 60 * 60 * 1000),
      },
      {
        type: "feed",
        title: "Fed (Right)",
        subtitle: "12 mins",
        durationMinutes: 12,
        createdAt: new Date(now.getTime() - 10 * 60 * 60 * 1000),
      },
      {
        type: "feed",
        title: "Fed (Left)",
        subtitle: "8 mins",
        durationMinutes: 8,
        createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      },
      {
        type: "feed",
        title: "Fed (Bottle)",
        subtitle: "90 ml",
        createdAt: new Date(now.getTime() - 14 * 60 * 60 * 1000),
      },
      {
        type: "diaper",
        title: "Diaper",
        subtitle: "Wet",
        createdAt: new Date(now.getTime() - 16 * 60 * 60 * 1000),
      },
    ];

    realm.write(() => {
      seedLogs.forEach((log) => {
        realm.create(ActivityLog.schema.name, {
          id: new Realm.BSON.ObjectId().toHexString(),
          type: log.type,
          title: log.title,
          subtitle: log.subtitle,
          durationMinutes: log.durationMinutes,
          createdAt: log.createdAt,
          updatedAt: now,
        });
      });
    });
  },
  resetHomeLogs: (realm) => {
    const logs = realm.objects<ActivityLog>(ActivityLog.schema.name);
    realm.write(() => {
      realm.delete(logs);
    });
  },
}));
