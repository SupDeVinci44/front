import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button mode="contained" onPress={() => router.push("/home")}>
        Appuie-moi !
      </Button>
    </View>
  );
}