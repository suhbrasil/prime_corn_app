import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function WelcomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [processes, setProcesses] = useState([]);

  const isDevelopment = false; // Altere para 'false' em produção
  // const mockProcesses = [
  //   {
  //     "processId": "Process_001",
  //     "classificationSummary": {
  //         "Pure": 0,
  //         "Broken": 0,
  //         "Silkcut": 0,
  //         "Unknown": 1
  //     },
  //     "timestamp": "2024-12-01T17:50:21Z"
  // },
  // {
  //     "processId": "Process_002",
  //     "classificationSummary": {
  //         "Pure": 2,
  //         "Broken": 0,
  //         "Silkcut": 0,
  //         "Unknown": 0
  //     },
  //     "timestamp": "2024-12-01T17:51:46Z"
  // },
  // {
  //     "processId": "Process_003",
  //     "classificationSummary": {
  //         "Pure": 0,
  //         "Broken": 0,
  //         "Silkcut": 0,
  //         "Unknown": 1
  //     },
  //     "timestamp": "2024-12-01T17:52:39Z"
  // },
  // {
  //     "processId": "Process_004",
  //     "classificationSummary": {
  //         "Pure": 0,
  //         "Broken": 1,
  //         "Silkcut": 0,
  //         "Unknown": 0
  //     },
  //     "timestamp": "2024-12-01T17:53:30Z"
  // },
  // {
  //     "processId": "Process_005",
  //     "classificationSummary": {
  //         "Pure": 0,
  //         "Broken": 1,
  //         "Silkcut": 3,
  //         "Unknown": 1
  //     },
  //     "timestamp": "2024-12-01T17:55:29Z"
  // },
  // {
  //     "processId": "Process_006",
  //     "classificationSummary": {
  //         "Pure": 0,
  //         "Broken": 1,
  //         "Silkcut": 0,
  //         "Unknown": 1
  //     },
  //     "timestamp": "2024-12-01T18:13:02Z"
  // },
  // {
  //     "processId": "Process_007",
  //     "classificationSummary": {
  //         "Pure": 2,
  //         "Broken": 0,
  //         "Silkcut": 0,
  //         "Unknown": 0
  //     },
  //     "timestamp": "2024-12-01T18:22:23Z"
  // },
  // {
  //     "processId": "Process_008",
  //     "classificationSummary": {
  //         "Pure": 1,
  //         "Broken": 0,
  //         "Silkcut": 0,
  //         "Unknown": 0
  //     },
  //     "timestamp": "2024-12-01T18:31:33Z"
  // },
  // {
  //     "processId": "Process_009",
  //     "classificationSummary": {
  //         "Pure": 1,
  //         "Broken": 1,
  //         "Silkcut": 0,
  //         "Unknown": 0
  //     },
  //     "timestamp": "2024-12-01T18:40:34Z"
  // },
  // {
  //     "processId": "Process_010",
  //     "classificationSummary": {
  //         "Pure": 0,
  //         "Broken": 1,
  //         "Silkcut": 0,
  //         "Unknown": 1
  //     },
  // ];

  // console.log(mockProcesses);

  const fetchData = async () => {
    try {
      const fetchedProcesses = await AsyncStorage.getItem("processes");
      if (fetchedProcesses) {
        const parsedProcesses = JSON.parse(fetchedProcesses);
        console.log(parsedProcesses);
        const array = parsedProcesses
          .map((item) => {
            try {
              const parsedItem =
                typeof item === "string" ? JSON.parse(item) : item;

              // Extract the classification summary into an array
              const { Pure, Broken, Silkcut, Unknown } =
                parsedItem.classificationSummary;
              const arrayClassificationSummary = [
                Pure,
                Broken,
                Silkcut,
                Unknown,
              ];

              // Return the formatted object
              return {
                processId: parsedItem.processId,
                classificationSummary: arrayClassificationSummary,
                timestamp: parsedItem.timestamp,
              };
            } catch (error) {
              console.error("Error parsing item:", error, item);
              return null; // Return null for problematic items
            }
          })
          .filter((item) => item !== null); // Filter out null items

        // Update state with the processed array
        setProcesses(array);
      } else {
        console.log("No processes found, initializing...");
        await AsyncStorage.setItem("processes", JSON.stringify([]));
        setProcesses([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData().then((processes) => {
      if (processes) {
        console.log("Processes fetched");
        setRefreshing(false);
      } else {
        console.log("Failed to fetch processes");
        setRefreshing(false);
      }
    });
  };

  // useEffect(() => {
  //   const loadProcesses = async () => {
  //     await fetchData();
  //   };
  //   loadProcesses(); // Call the async function
  // }, []); // Empty dependency array to run only once

  useEffect(() => {
    const loadProcesses = async () => {
      if (isDevelopment) {
        await AsyncStorage.setItem("processes", JSON.stringify(mockProcesses));
        setProcesses(mockProcesses);
      } else {
        await fetchData(); // Método que busca os dados reais
      }
    };

    loadProcesses();
  }, []);

  // const RenderItem = ({ item }) => {
  //   const totalSeeds =
  //     item.classificationSummary[0] +
  //     item.classificationSummary[1] +
  //     item.classificationSummary[2] +
  //     item.classificationSummary[3] +
  //     item.classificationSummary[4];
  //   const irregularSeeds =
  //     item.classificationSummary[1] +
  //     item.classificationSummary[2] +
  //     item.classificationSummary[3] +
  //     item.classificationSummary[4];

  //   return (
  //     <View style={styles.card}>
  //       {/* Data */}
  //       <Text style={styles.date}>{item.timestamp}</Text>
  //       <View style={styles.divider} />

  //       {/* Total de sementes */}
  //       <Text style={styles.totalSeeds}>Total Seeds: {totalSeeds}</Text>
  //       <View style={styles.divider} />

  //       {/* Regular e irregular seeds */}
  //       <View style={styles.regularIrregularContainer}>
  //         <View style={styles.border}>
  //           <Text style={styles.regular}>
  //             Regular seeds:{" "}
  //             <Text style={styles.light}>{item.classificationSummary[0]}%</Text>
  //           </Text>
  //         </View>
  //         <Text style={styles.irregular}>
  //           Irregular seeds:{" "}
  //           <Text style={styles.light}>{irregularSeeds}%</Text>
  //         </Text>
  //       </View>
  //       <View style={styles.divider} />

  //       {/* Botão de relatório */}
  //       <TouchableOpacity
  //         style={styles.reportButton}
  //         onPress={() => navigation.navigate("Report", { item })}
  //       >
  //         <Text style={styles.reportButtonText}>View Report</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const RenderItem = ({ item }) => {
    const totalSeeds =
      item.classificationSummary[0] +
      item.classificationSummary[1] +
      item.classificationSummary[2] +
      item.classificationSummary[3];
    const irregularSeedsValue =
      item.classificationSummary[1] +
      item.classificationSummary[2] +
      item.classificationSummary[3];
    const irregularSeeds = ((irregularSeedsValue / totalSeeds) * 100).toFixed(
      0
    );
    const pureSeeds = (
      (item.classificationSummary[0] / totalSeeds) *
      100
    ).toFixed(0);

    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    return (
      <View style={styles.card}>
        <Text style={styles.date}>{formatDate(item.timestamp)}</Text>
        <View style={styles.divider} />

        <Text style={styles.totalSeeds}>Total Seeds: {totalSeeds}</Text>
        <View style={styles.divider} />

        <View style={styles.regularIrregularContainer}>
          <View style={styles.border}>
            <Text style={styles.regular}>
              Regular seeds: <Text style={styles.light}>{pureSeeds}%</Text>
            </Text>
          </View>
          <Text style={styles.irregular}>
            Irregular seeds: <Text style={styles.light}>{irregularSeeds}%</Text>
          </Text>
        </View>
        <View style={styles.divider} />

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
    <View style={styles.container}>
      <Image
        source={require("../assets/prime_corn_logo.png")}
        style={styles.image}
      />

      <FlatList
        data={processes}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.processId}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <TouchableOpacity
        style={styles.syncButton}
        onPress={() => navigation.navigate("Sync")}
      >
        <Text style={styles.reportButtonText}>Sync</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
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
    height: 220,
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
    backgroundColor: "#d170fa",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  syncButton: {
    backgroundColor: "#d170fa",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 70,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
