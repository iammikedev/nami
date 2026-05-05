import { useQuery, useRealm } from "@realm/react";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Realm from "realm";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Task } from "@/constants/task";
import { useTaskStore } from "@/stores/use-task-store";

export default function HomeScreen() {
  const realm = useRealm();
  const tasks = useQuery(Task).sorted("createdAt", true);
  const { draftTitle, filter, setDraftTitle, setFilter, resetDraftTitle } =
    useTaskStore();

  const addTask = () => {
    const title = draftTitle.trim() || `Task ${tasks.length + 1}`;
    realm.write(() => {
      realm.create(Task, {
        _id: new Realm.BSON.ObjectId(),
        title,
        createdAt: new Date(),
      });
    });
    resetDraftTitle();
  };

  const toggleTask = (task: Task) => {
    realm.write(() => {
      task.isCompleted = !task.isCompleted;
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "open") return !task.isCompleted;
    if (filter === "done") return task.isCompleted;
    return true;
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <View className="flex-1 items-center justify-center bg-white">
              <Text className="text-xl font-bold text-blue-500">
                Welcome to Nativewind!
              </Text>
            </View>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert("Action pressed")}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Realm local database</ThemedText>
        <TextInput
          value={draftTitle}
          onChangeText={setDraftTitle}
          placeholder="Task title..."
          style={styles.input}
        />
        <View style={styles.filterRow}>
          <Pressable
            style={styles.filterButton}
            onPress={() => setFilter("all")}
          >
            <ThemedText>All</ThemedText>
          </Pressable>
          <Pressable
            style={styles.filterButton}
            onPress={() => setFilter("open")}
          >
            <ThemedText>Open</ThemedText>
          </Pressable>
          <Pressable
            style={styles.filterButton}
            onPress={() => setFilter("done")}
          >
            <ThemedText>Done</ThemedText>
          </Pressable>
        </View>
        <Pressable style={styles.button} onPress={addTask}>
          <ThemedText style={styles.buttonText}>
            Add local task ({filter})
          </ThemedText>
        </Pressable>
        {filteredTasks.length === 0 ? (
          <ThemedText>No tasks yet. Add one to persist locally.</ThemedText>
        ) : (
          filteredTasks.slice(0, 5).map((task) => (
            <Pressable
              key={task._id.toHexString()}
              style={styles.taskRow}
              onPress={() => toggleTask(task)}
            >
              <ThemedText>
                {task.isCompleted ? "✅" : "⬜"} {task.title}
              </ThemedText>
            </Pressable>
          ))
        )}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  taskRow: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
