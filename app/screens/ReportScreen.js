import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, SafeAreaView, View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

function ReportScreen({ route }) {
  const { item } = route.params;
  console.log("Received item:", item);

  const chartData = [
    {
      name: "Silkcut",
      value: item.classificationSummary[2],
      color: "#FF6384",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Broken",
      value: item.classificationSummary[1],
      color: "#FFCE56",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Unknown",
      value: item.classificationSummary[3],
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ];
  const totalSeeds =
    item.classificationSummary[0] +
    item.classificationSummary[1] +
    item.classificationSummary[2] +
    item.classificationSummary[3];

  const irregularSeedsValue =
    item.classificationSummary[1] +
    item.classificationSummary[2] +
    item.classificationSummary[3];
  const irregularSeeds = ((irregularSeedsValue / totalSeeds) * 100).toFixed(0);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/prime_corn_logo.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Report {formatDate(item.timestamp)}</Text>
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
