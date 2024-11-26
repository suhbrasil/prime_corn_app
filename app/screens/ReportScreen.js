import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, SafeAreaView, View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

function ReportScreen({ route }) {
  const { item } = route.params;

  const chartData = [
    {
      name: "Silkcut",
      value: item.Silkcut,
      color: "#FF6384",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Discolored",
      value: item.Discolored,
      color: "#36A2EB",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Broken",
      value: item.Broken,
      color: "#FFCE56",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ];

  const irregularSeeds =
    item.Broken + item.Discolored + item.Silkcut + item.Unknown;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/prime_corn_logo.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Report {item.Date}</Text>
      <Text style={styles.subtitle}>{irregularSeeds}% irregular seeds</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={300} // Adjust width as needed
          height={200} // Adjust height as needed
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"value"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute // Display values on the chart
        />
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 50,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default ReportScreen;
