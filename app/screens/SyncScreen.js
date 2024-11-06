import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

function SyncScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Suzana</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default SyncScreen;
