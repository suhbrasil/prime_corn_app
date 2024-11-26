import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

function SyncScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/prime_corn_logo.png")}
        style={styles.image}
      />
      <Text style={styles.textFind}>Find the machine to sync ...</Text>
      <TouchableOpacity style={styles.machineButton}>
        <Text style={styles.machineButtonText}>Machine 1</Text>
      </TouchableOpacity>
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
  textFind: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  machineButton: {
    backgroundColor: "#E0BBE4",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 70,
    alignItems: "center",
    marginTop: 50,
  },
  machineButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SyncScreen;
