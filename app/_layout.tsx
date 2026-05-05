import "../global.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { RealmProvider, useRealm } from "@realm/react";
import { NativeBaseProvider } from "native-base";
import { View } from "react-native";

import { Task } from "@/constants/task";
import { ActivityLog, BabyProfile } from "@/src/features/home";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  OnboardingProfile,
  useOnboardingStore,
} from "@/src/features/onboarding";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <RealmProvider schema={[Task, OnboardingProfile, BabyProfile, ActivityLog]}>
      <NativeBaseProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <AppNavigator />
          <StatusBar style="auto" />
        </ThemeProvider>
      </NativeBaseProvider>
    </RealmProvider>
  );
}

function AppNavigator() {
  const realm = useRealm();
  const router = useRouter();
  const pathname = usePathname();
  const { hydrated, onboardingCompleted, hydrate } = useOnboardingStore();

  useEffect(() => {
    hydrate(realm);
  }, [hydrate, realm]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const isOnboardingRoute = pathname.startsWith("/onboarding");
    if (!onboardingCompleted && !isOnboardingRoute) {
      router.replace("/onboarding");
      return;
    }

    if (onboardingCompleted && isOnboardingRoute) {
      router.replace("/(tabs)");
    }
  }, [hydrated, onboardingCompleted, pathname, router]);

  if (!hydrated) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <Stack>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
      <Stack.Screen name="quick-log" options={{ title: "Quick Log" }} />
    </Stack>
  );
}
