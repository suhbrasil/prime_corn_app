import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import useBLE from "../services/useBLE";
import DeviceModal from "../components/deviceConnectionModal";

function SyncScreen({ navigation }) {
  const {
    scanForPeripherals,
    requestPermissions,
    connectToDeviceOnReceiving,
    device,
    connectedDevice,
    disconnectFromDevice,
    dataArray,
    clearDataArray,
    isReceivingFinished
  } = useBLE();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
        console.log("Scanning for Devices");
        scanForPeripherals();
    }
  };
  
  const openModal = async () => {
    console.log("Opening Modal & Scanning for Devices")
    scanForDevices();
    setIsModalVisible(true);
  };

  const hideModal = () => {
      setIsModalVisible(false);
  };

  const storeNewProcesses = async (newProcessesArray) => {
    console.log("Storing New Processes");
    try{
      const fetchedProcesses = await AsyncStorage.getItem("processes");
      if (!fetchedProcesses) {
          await AsyncStorage.setItem("processes", JSON.stringify([]));
          console.log("Processes Initialized");
      }
      const parsedProcesses = JSON.parse(fetchedProcesses);
      // push every new activity to the parsedActivities array
      for (const newProcess of newProcessesArray) {
        // inserd id to the new activity based on the length of the parsedActivities array
        // newProcess.id = parsedProcesses.length;
        console.log("New Process -> ", newProcess);
        parsedProcesses.push(JSON.parse(newProcess));
        console.log(newProcess);
      }
      await AsyncStorage.setItem("processes", JSON.stringify(parsedProcesses)).then(() => {
          console.log("Processes Stored");
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  if (isReceivingFinished === true) {
    console.log(dataArray);
    storeNewProcesses(dataArray);
    clearDataArray();
    console.log("Disconnecting from Device");
    disconnectFromDevice();
  }
  else {
    console.log("Syncing in Progress...");
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Image
        source={require("../assets/prime_corn_logo.png")}
        style={styles.image}
      />

      <View style={styles}>
        {connectedDevice ? (
        <>
            <ActivityIndicator size="large" color="Pink" />
            <Text style={styles}>Syncing...</Text>
        </>
        ) : (
        <Text style={styles}>
            Sync to your last activity
        </Text>
        )}
      </View>

      <TouchableOpacity
          onPress={connectedDevice ? disconnectFromDevice : openModal}
          style={styles.syncButton}
      >
          <Text style={styles}>
          {connectedDevice ? "Disconnect" : "Search bike module"}
          </Text>
      </TouchableOpacity>
      
      <DeviceModal
          closeModal={hideModal}
          visible={isModalVisible}
          connectToPeripheral={connectToDeviceOnReceiving}
          device={device}
      />
      
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
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 50,
    borderRadius: 8,
  },
});

export default SyncScreen;
