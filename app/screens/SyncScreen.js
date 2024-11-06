import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Button,
  Text,
} from "react-native";

function SyncScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/prime_corn_logo.png")}
        style={styles.image}
      />
      <Text>Suzana</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default SyncScreen;
