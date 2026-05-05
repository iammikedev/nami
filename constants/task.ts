import Realm from "realm";

export class Task extends Realm.Object<Task> {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  isCompleted!: boolean;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      title: "string",
      isCompleted: { type: "bool", default: false },
      createdAt: "date",
    },
  };
}
