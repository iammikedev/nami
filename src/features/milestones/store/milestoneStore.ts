import { create } from "zustand";
import Realm from "realm";

import { MilestoneRecord } from "../realm/milestoneRealmModel";
import type { Milestone, MilestoneType } from "../types/milestone.types";

function newRealmId(): string {
  return typeof Realm.BSON?.ObjectId === "function"
    ? new Realm.BSON.ObjectId().toHexString()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function mapRecord(r: MilestoneRecord): Milestone {
  return {
    id: r.id,
    type: r.type as MilestoneType,
    title: r.title,
    note: r.note || undefined,
    photoUri: r.photoUri || undefined,
    createdAt: r.createdAt.toISOString(),
  };
}

export type AddMilestonePayload = {
  type: MilestoneType;
  title: string;
  note?: string;
  photoUri?: string;
};

type MilestoneStoreState = {
  milestones: Milestone[];
  hydrate: (realm: Realm) => void;
  addMilestone: (realm: Realm, payload: AddMilestonePayload) => Milestone;
  updateMilestone: (realm: Realm, id: string, payload: AddMilestonePayload) => void;
  deleteMilestone: (realm: Realm, id: string) => void;
};

export const useMilestoneStore = create<MilestoneStoreState>((set, get) => ({
  milestones: [],

  hydrate: (realm) => {
    const rows = realm
      .objects<MilestoneRecord>(MilestoneRecord.schema.name)
      .sorted("createdAt", true);
    set({ milestones: [...rows].map(mapRecord) });
  },

  addMilestone: (realm, payload) => {
    const now = new Date();
    const id = newRealmId();
    const milestone: Milestone = {
      id,
      type: payload.type,
      title: payload.title,
      note: payload.note,
      photoUri: payload.photoUri,
      createdAt: now.toISOString(),
    };

    realm.write(() => {
      const data: Record<string, unknown> = {
        id: milestone.id,
        type: milestone.type,
        title: milestone.title,
        createdAt: now,
      };
      if (milestone.note) data.note = milestone.note;
      if (milestone.photoUri) data.photoUri = milestone.photoUri;
      realm.create(MilestoneRecord.schema.name, data);
    });

    set({ milestones: [milestone, ...get().milestones] });
    return milestone;
  },

  updateMilestone: (realm, id, payload) => {
    const row = realm.objectForPrimaryKey<MilestoneRecord>(MilestoneRecord.schema.name, id);
    if (!row) return;

    realm.write(() => {
      row.type = payload.type;
      row.title = payload.title;
      row.note = payload.note ?? "";
      row.photoUri = payload.photoUri ?? "";
    });

    set({
      milestones: get().milestones.map((m) =>
        m.id === id
          ? {
              ...m,
              type: payload.type,
              title: payload.title,
              note: payload.note,
              photoUri: payload.photoUri,
            }
          : m,
      ),
    });
  },

  deleteMilestone: (realm, id) => {
    const row = realm.objectForPrimaryKey<MilestoneRecord>(MilestoneRecord.schema.name, id);
    if (!row) return;
    realm.write(() => {
      realm.delete(row);
    });
    set({ milestones: get().milestones.filter((m) => m.id !== id) });
  },
}));
