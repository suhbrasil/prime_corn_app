import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Image, View, Button, FlatList, Text, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function WelcomeScreen({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);
  const [processes, setProcesses] = useState([]);
  
  console.log(processes);

  const fetchData = async () => {
    try {
      const fetchedProcesses = await AsyncStorage.getItem("processes");
      if (fetchedProcesses) {
        const parsedProcesses = JSON.parse(fetchedProcesses);
  
        const array = parsedProcesses.map((item) => {
          try {
            const parsedItem = typeof item === "string" ? JSON.parse(item) : item;
  
            // Extract the classification summary into an array
            const { Pure, Broken, Discolored, Silkcut, Unknown } = parsedItem.classificationSummary;
            const arrayClassificationSummary = [Pure, Broken, Discolored, Silkcut, Unknown];
  
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
        }).filter((item) => item !== null); // Filter out null items
  
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
        }
        else {
            console.log("Failed to fetch processes");
            setRefreshing(false);
        }
    });
  }

  useEffect(() => {
    const loadProcesses = async () => {
      await fetchData();
    };
    loadProcesses(); // Call the async function
  }, []); // Empty dependency array to run only once  

  return (
    <>
      <Image
        source={require("../assets/prime_corn_logo.png")}
        style={styles.image}
      />

    {/* TODO: FLATLIST ITERATING OVER THE PROCESSES */}
    {/* THIS IS JUST FOR DEBUG */}
    {/* CREATE A COMPONENT FOR THE INFOS AND ONDE IT IS CLICKED IT IS REDIRECTED TO THE PROCESS PAGE WITH THE DATA AS PARAM */}
      <FlatList
        data={processes}
        renderItem={({ item }) => (
          <View>
            <Text>{item.processId}</Text>
            <Text>{item.timestamp}</Text>
            <Text>Pure: {item.classificationSummary[0]}</Text>
            <Text>Broken: {item.classificationSummary[1]}</Text>
            <Text>Discolored: {item.classificationSummary[2]}</Text>
            <Text>Silkcut: {item.classificationSummary[3]}</Text>
            <Text>Unknown: {item.classificationSummary[4]}</Text>
            <Text>{"\n"}</Text>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <Button
        style={styles}
        title="Syncsds"
        onPress={() => navigation.navigate("Sync")}
      ></Button>

      <Button
        style={styles.reportButton}
        title="Report"
        onPress={() => navigation.navigate("Report")}
      ></Button>
    </>
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
  reportButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#fc5c65",
  },
});

export default WelcomeScreen;
