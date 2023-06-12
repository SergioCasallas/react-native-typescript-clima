import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import {
  Paragraph,
  Spacer,
  TamaguiProvider,
  Theme,
  YStack,
  Text,
} from "tamagui";
import config from "./tamagui.config";
import { useColorScheme, Platform } from "react-native";
import * as Location from "expo-location";
import Device from "expo-device";

import ShowWeather from "./src/screens/ShowWeather";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const resf = await Location.requestForegroundPermissionsAsync();
      let resb = await Location.requestBackgroundPermissionsAsync();
      if (resf.status == "granted" && resb.status == "granted") {
        console.log(`Permisos aceptados`);
      } else {
        console.log(`No se aceptaron los terminos`);
        setErrorMsg(`No se aceptaron los terminos`);
      }

      const locationMobile = await Location.getCurrentPositionAsync();
      setLocation(locationMobile);
    })();
  }, []);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),

    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        {location !== null ? (
          <ShowWeather location={location} />
        ) : (
          <Text>{errorMsg}</Text>
        )}
        {/* <ShowWeather />  */}
      </Theme>
    </TamaguiProvider>
  );
}
