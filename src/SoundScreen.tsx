import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Audio } from "expo-av";
import { Accelerometer } from "expo-sensors";

type SoundScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SoundScreen"
>;

type Props = {
  navigation: SoundScreenNavigationProp;
};

export default function SoundScreen(props: Props) {
  const { navigation } = props;
  const toMainScreen = () => {
    navigation.navigate("MainScreen");
  };
  const [data, setData] = useState<DataInfo>({"x":0,"y":0,"z":0});
  const subscription = useRef<object>({});
  const [isSubscription, setIsSubscription] = useState(false);

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (isSubscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    subscription.current = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
    setIsSubscription(true);
  };

  const _unsubscribe = () => {
    subscription.current = {};
    setIsSubscription(false);
  };

  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("../assets/sounds/light_saber3.mp3"));
      await soundObject.playAsync();
    } catch (error) {
      console.log("error...");
    }
  };

  let { x, y, z } = data;

  if ((x + y + z) > 1) {
    playSound();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => {toMainScreen()}}
      >
        <Text style={styles.buttonText}>戻る</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function round(n:number) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 300,
    height: 80,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "gray",
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
  },
  text: {
    textAlign: "center",
  },
});