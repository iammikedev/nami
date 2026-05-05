import Realm from "realm";

/**
 * Persisted milestone row. Maps to {@link Milestone} in the UI layer via the store.
 */
export class MilestoneRecord extends Realm.Object<MilestoneRecord> {
  id!: string;
  type!: string;
  title!: string;
  note?: string;
  photoUri?: string;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: "Milestone",
    primaryKey: "id",
    properties: {
      id: "string",
      type: "string",
      title: "string",
      note: "string?",
      photoUri: "string?",
      createdAt: "date",
    },
  };
}
