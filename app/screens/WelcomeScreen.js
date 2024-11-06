import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Image, View, Button } from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/PrimeCorn.png")} style={styles.image} />
      <Button
        style={styles.syncButton}
        title="Sync"
        onPress={() => navigation.navigate("Sync")}
      ></Button>
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
  syncButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#fc5c65",
  },
});

export default WelcomeScreen;
