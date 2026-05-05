import React from "react";
import { VStack } from "native-base";

import type { Milestone } from "../types/milestone.types";

import { MilestoneCard } from "./MilestoneCard";

type MilestoneListProps = {
  milestones: Milestone[];
  onEdit: (milestone: Milestone) => void;
};

export function MilestoneList({ milestones, onEdit }: MilestoneListProps) {
  return (
    <VStack className="gap-0">
      {milestones.map((m, index) => (
        <MilestoneCard
          key={m.id}
          milestone={m}
          isLast={index === milestones.length - 1}
          onPress={() => onEdit(m)}
        />
      ))}
    </VStack>
  );
}
