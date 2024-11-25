/* eslint-disable no-bitwise */
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleManager,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";

import base64 from "react-native-base64";

const DEVICE_SERVICE_UUID = "00000000-8cb1-44ce-9a66-001dca0941a6"
const DEVICE_SERVICE_CHARACTERISTIC = "00000001-8cb1-44ce-9a66-001dca0941a6"

function useBLE() {
  const bleManager = useMemo(() => new BleManager(), []);
  const [device, setDevice] = useState();
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [isReceivingFinished, setIsReceivingFinished] = useState(false);
  
  
  // Request permissions for Android 31
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };


  // Request permissions for Android
  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };


  // Scan for peripherals
  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Error scanning for devices");
      }
      if (device) {
        console.log(device.name);
        if (device.name === "MachineProcessData") {
          console.log("Device found");
          console.log(device);
          setDevice(device);
        }
      }
    });
  }


  // data is not being used, but it is necessary to keep the function callback consistent on the DeviceConnectionModal component
  const connectToDeviceOnReceiving = async (device, data) => {
    try {
      bleManager.stopDeviceScan();
      const deviceConnection = await bleManager.connectToDevice(
        device.id
      );
      console.log("conn->",deviceConnection);
      setConnectedDevice(deviceConnection);
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(device.id);
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };


  // Disconnect from a device
  const disconnectFromDevice = () => {
    console.log("Disconnecting from Device");
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setIsReceivingFinished(false);
      // setIsSendingFinished(false);
    }
  };


  // Update the heart rate (The way the data is recieved varies on the device)
  const onDeviceUpdate = (
    error,
    characteristic
  ) => {
    if (error) {
      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log("No Data was received");
      return -1;
    }

    const decodedData = base64.decode(characteristic.value);
    console.log(decodedData)

    if (!decodedData.includes(`{"status": "Finished"}`)){
      dataArray.push(decodedData);
    }
    else {
      console.log("Finished Syncing activity");
      console.log(dataArray);
      setIsReceivingFinished(true);
    }
  };


  // Clear the data array
  const clearDataArray = () => {
    setDataArray([]);
  };


  const startStreamingData = async (device) => {
    if (device) {
      console.log("Device Connected");
      device.monitorCharacteristicForService(
        DEVICE_SERVICE_UUID,
        DEVICE_SERVICE_CHARACTERISTIC,
        onDeviceUpdate
      );
    } else {
      console.log("No Device Connected");
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDeviceOnReceiving,
    device,
    connectedDevice,
    disconnectFromDevice,
    dataArray,
    clearDataArray,
    isReceivingFinished
  };

}

export default useBLE;
