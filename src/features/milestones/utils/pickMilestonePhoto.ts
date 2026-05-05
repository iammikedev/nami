import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const options: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.85,
};

async function uriFromLibrary(): Promise<string | null> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Photos", "Allow photo library access to attach a picture to this milestone.");
    return null;
  }
  const result = await ImagePicker.launchImageLibraryAsync(options);
  if (result.canceled || !result.assets?.[0]?.uri) return null;
  return result.assets[0].uri;
}

async function uriFromCamera(): Promise<string | null> {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Camera", "Allow camera access to take a photo for this milestone.");
    return null;
  }
  const result = await ImagePicker.launchCameraAsync(options);
  if (result.canceled || !result.assets?.[0]?.uri) return null;
  return result.assets[0].uri;
}

/** Presents library vs camera; calls `onChosen` with a `file://` or content URI when successful. */
export function promptMilestonePhoto(onChosen: (uri: string) => void): void {
  Alert.alert("Add photo", "Choose a source", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Photo library",
      onPress: () => {
        void uriFromLibrary().then((uri) => {
          if (uri) onChosen(uri);
        });
      },
    },
    {
      text: "Camera",
      onPress: () => {
        void uriFromCamera().then((uri) => {
          if (uri) onChosen(uri);
        });
      },
    },
  ]);
}
