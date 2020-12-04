import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Audio } from "expo-av";

type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainScreen"
>;

type Props = {
  navigation: MainScreenNavigationProp;
};

export default function MainScreen(props: Props) {
  const { navigation } = props;
  const toSoundScreen = () => {
    navigation.navigate("SoundScreen");
  };

  const toSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/sounds/light_saber1.mp3'));
      await soundObject.playAsync();
      toSoundScreen();
    } catch (error) {
      console.log("error...");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {toSound()}}
      >
        <Text style={styles.buttonText}>ジェダイになる</Text>
      </Pressable>
    </SafeAreaView>
  );
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
});


