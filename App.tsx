import React from "react";

import Routes from "./src/routes";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  // useEffect(() => {
  //   async function notifications() {
  //     await Notifications.cancelAllScheduledNotificationsAsync();
  //   }
  //   notifications();
  // }, []);

  // useEffect(() => {
  //   const subscription = Notifications.addNotificationReceivedListener(
  //     async (notification) => {
  //       const data = notification.request.content.data.plant as IPlantProps;
  //       Alert.alert(`Está na hora de cuidar da sua ${data.name} ☘`);
  //     }
  //   );

  //   return () => subscription.remove();
  // }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Routes />;
}
