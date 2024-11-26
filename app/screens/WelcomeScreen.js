import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";

const seeds = [
  {
    Pure: 60,
    Broken: 10,
    Discolored: 14,
    Silkcut: 7,
    Unknown: 2,
    Date: "12/11/2024",
  },
  {
    Pure: 80,
    Broken: 16,
    Discolored: 24,
    Silkcut: 15,
    Unknown: 0,
    Date: "15/11/2024",
  },
  {
    Pure: 80,
    Broken: 16,
    Discolored: 24,
    Silkcut: 15,
    Unknown: 0,
    Date: "15/11/2024",
  },
  {
    Pure: 80,
    Broken: 16,
    Discolored: 24,
    Silkcut: 15,
    Unknown: 0,
    Date: "15/11/2024",
  },
];

function WelcomeScreen({ navigation }) {
  const RenderItem = ({ item }) => {
    const totalSeeds =
      item.Pure + item.Broken + item.Discolored + item.Silkcut + item.Unknown;
    const irregularSeeds =
      item.Broken + item.Discolored + item.Silkcut + item.Unknown;

    return (
      <View style={styles.card}>
        {/* Data */}
        <Text style={styles.date}>{item.Date}</Text>
        <View style={styles.divider} />

        {/* Total de sementes */}
        <Text style={styles.totalSeeds}>Total Seeds: {totalSeeds}</Text>
        <View style={styles.divider} />

        {/* Regular e irregular seeds */}
        <View style={styles.regularIrregularContainer}>
          <View style={styles.border}>
            <Text style={styles.regular}>
              Regular seeds: <Text style={styles.light}>{item.Pure}%</Text>
            </Text>
          </View>
          <Text style={styles.irregular}>
            Irregular seeds: <Text style={styles.light}>{irregularSeeds}%</Text>
          </Text>
        </View>
        <View style={styles.divider} />

        {/* Botão de relatório */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => navigation.navigate("Report", { item })}
        >
          <Text style={styles.reportButtonText}>View Report</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/prime_corn_logo.png")}
        style={styles.image}
      />
      <FlatList
        data={seeds}
        renderItem={RenderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.syncButton}
        onPress={() => navigation.navigate("Sync")}
      >
        <Text style={styles.reportButtonText}>Sync</Text>
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
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    width: 320,
    height: 210,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 8, // Container mais largo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    flex: 1,
    textAlign: "center",
  },
  totalSeeds: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginVertical: 8,
    flex: 1,
    textAlign: "center",
  },
  regularIrregularContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: "#e5e5e5",
    paddingRight: 8,
    flex: 1,
  },
  regular: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  irregular: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  light: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    marginVertical: 8,
  },
  reportButton: {
    backgroundColor: "#E0BBE4",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  syncButton: {
    backgroundColor: "#E0BBE4",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 70,
    alignItems: "center",
    marginTop: 10,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
