import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, SafeAreaView } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

// import { useNavigation } from "@react-navigation/native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

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
  const toMain = () => {
    navigation.push("MainScreen");
  };

  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.push("MainScreen");
        }}
      >
        <Text style={styles.buttonText}>戻る</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function round(n) {
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

// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Accelerometer } from "expo-sensors";

// export default function  SoundScreen() {
// const [data, setData] = useState({});

// useEffect(() => {
//   _toggle();
// }, []);

// useEffect(() => {
//   return () => {
//     _unsubscribe();
//   };
// }, []);

// const _toggle = () => {
//   if (this._subscription) {
//     _unsubscribe();
//   } else {
//     _subscribe();
//   }
// };

// const _slow = () => {
//   Accelerometer.setUpdateInterval(1000);
// };

// const _fast = () => {
//   Accelerometer.setUpdateInterval(16);
// };

// const _subscribe = () => {
//   this._subscription = Accelerometer.addListener((accelerometerData) => {
//     setData(accelerometerData);
//   });
// };

// const _unsubscribe = () => {
//   this._subscription && this._subscription.remove();
//   this._subscription = null;
// };

// let { x, y, z } = data;



// return (
//   <View style={styles.sensor}>
//     <Text style={styles.text}>
//       Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
//     </Text>
//     <Text style={styles.text}>
//       x: {round(x)} y: {round(y)} z: {round(z)}
//     </Text>
//     <View style={styles.buttonContainer}>
//       <TouchableOpacity onPress={_toggle} style={styles.button}>
//         <Text>Toggle</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={_slow}
//         style={[styles.button, styles.middleButton]}
//       >
//         <Text>Slow</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={_fast} style={styles.button}>
//         <Text>Fast</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );
// }

// function round(n) {
// if (!n) {
//   return 0;
// }

// return Math.floor(n * 100) / 100;
// }

// const styles = StyleSheet.create({
// buttonContainer: {
//   flexDirection: "row",
//   alignItems: "stretch",
//   marginTop: 15,
// },
// button: {
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "#eee",
//   padding: 10,
// },
// middleButton: {
//   borderLeftWidth: 1,
//   borderRightWidth: 1,
//   borderColor: "#ccc",
// },
// sensor: {
//   marginTop: 45,
//   paddingHorizontal: 10,
// },
// text: {
//   textAlign: "center",
// },
// });
