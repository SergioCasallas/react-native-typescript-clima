import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FontAwesome5, Entypo, AntDesign } from "@expo/vector-icons";

import { Card, Spacer, Stack, Text, XStack, YStack, Spinner } from "tamagui";
import { getLocationInfo } from "../services/getLocationInfo";

const ShowWeather = ({ location }) => {
  // console.log(location);
  const [infoLocation, setInfoLocation] = useState(null);

  useEffect(() => {
    const getAsyncDataLocation = async () => {
      const dataFetchLocation = await getLocationInfo(location);
      console.log(dataFetchLocation);
      // console.log(dataFetchLocation);
      setInfoLocation(dataFetchLocation);
    };
    getAsyncDataLocation();
  }, []);

  const d = new Date();

  return (
    <Stack
      width="100%"
      height="100%"
      backgroundColor="#3E98D9"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
    >
      {infoLocation !== null ? (
        <>
          <YStack>
            <Text fontWeight="800" color="white" textAlign="center">
              {`${d.toString()}`.slice(0, 15f)}
            </Text>
            <Text
              fontWeight="800"
              // paddingTop="20%"
              color="white"
              textAlign="center"
            >
              {infoLocation.name}
            </Text>
            <Text color="white" textAlign="center">
              {infoLocation.sys.country}
            </Text>
          </YStack>
          <Text fontSize={130} color="white">
            {`${infoLocation.main.temp}`.slice(0, 2)}C
          </Text>
          <XStack
            width="90%"
            height="20%"
            marginTop={10}
            justifyContent="center"
            borderRadius={10}
            backgroundColor="white"
          >
            <Card style={styles.card}>
              <YStack alignItems="center">
                <FontAwesome5 name="temperature-high" size={24} color="black" />
                <XStack>
                  <Text fontSize={10}>
                    Min:{`${infoLocation.main.temp}`.slice(0, 2)}c
                  </Text>
                  <Spacer />
                  <Text fontSize={10}>
                    Max:{`${infoLocation.main.temp}`.slice(0, 2)}c
                  </Text>
                </XStack>
                <Text>Temperatura</Text>
              </YStack>
            </Card>
            <Card style={styles.card}>
              <Entypo name="water" size={24} color="black" />
              <XStack>
                <Text>{`${infoLocation.main.humidity}`.slice(0, 2)}%</Text>
              </XStack>
              <Text>Humedad</Text>
            </Card>
            <Card style={styles.card}>
              <AntDesign name="eyeo" size={24} color="black" />
              <Text>{`${infoLocation.visibility}`.slice(0, 2)}km</Text>
              <Text>Visibilidad</Text>
            </Card>
          </XStack>
        </>
      ) : (
        <Spinner size="large" color="white" />
      )}
    </Stack>
  );
};

const styles = StyleSheet.create({
  containerStatistics: {
    width: "90px",
    height: "30%",
    backgroundColor: "white",
  },
  card: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  fecha: {
    position: "absolute",
    top: "40px",
    left: " 40px",
  },
});

export default ShowWeather;
