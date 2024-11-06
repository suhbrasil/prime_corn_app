import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

function ReportScreen({ navigation }) {
  const RenderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.emailButton]}
          onPress={() => Linking.openURL(`mailto:${item.email}`)}
        >
          <Text style={styles.actionText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => Linking.openURL(`tel:${item.telephone}`)}
        >
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/prime_corn_logo.png")}
        style={styles.image}
      />
      <FlatList
        data={people}
        renderItem={RenderItem}
        keyExtractor={(item) => item.email}
        contentContainerStyle={styles.containers}
      />
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
  containers: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  role: {
    fontSize: 12,
    color: "#4CAF50",
    marginTop: 4,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  emailButton: {
    borderRightWidth: 1,
    borderRightColor: "#e5e5e5",
  },
  callButton: {},
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginLeft: 6,
  },
});

export default ReportScreen;
