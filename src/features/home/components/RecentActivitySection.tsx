import { useRouter } from "expo-router";
import React from "react";
import { VStack } from "native-base";

import type { RecentActivityItem as RecentActivityItemType } from "@/src/features/home/types/home.types";
import { EmptyState, SectionHeader } from "@/src/ui/components";
import { spacing } from "@/src/ui/theme";
import { RecentActivityItem } from "./RecentActivityItem";

type RecentActivitySectionProps = {
  activities: RecentActivityItemType[];
};

export function RecentActivitySection({ activities }: RecentActivitySectionProps) {
  const router = useRouter();

  return (
    <VStack space={spacing[3]}>
      <SectionHeader title="Recent Activity" />
      {activities.length === 0 ? (
        <EmptyState
          title="No logs yet"
          message="Start by logging your baby's first activity today."
          actionLabel="Log activity"
          onActionPress={() => router.push("/quick-log")}
        />
      ) : (
        <VStack space={spacing[3]}>
          {activities.map((item) => (
            <RecentActivityItem key={item.id} item={item} />
          ))}
        </VStack>
      )}
    </VStack>
  );
}
