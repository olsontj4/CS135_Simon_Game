import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const sequence = [];
  const playerSequence = [];
  const [activeView, setActiveView] = useState("start");
  var acceptInput = false;

  function buttonPress(value) {
    if (value == null) {
      setActiveView("game");
      console.log(activeView);
      return;
    }
    else {
      console.log(value);
      return;
    }
  }

  function GameButton(props) {
    return (
      <Pressable onPress={() => buttonPress(`${props.color}`)} style={[styles.gameButton, { backgroundColor: `${props.color}` }]}>
        <Text style={styles.buttonText}>{props.color.charAt(0).toUpperCase() + props.color.slice(1)}</Text>
      </Pressable>
    )
  }

  function Game() {
    {
      if (activeView === "start") {
        return (
          <Pressable onPress={() => buttonPress()} style={styles.startButton}>
            <Text>Start Game</Text>
          </Pressable>
        )
      }
      else if (activeView === "game") {
        return (
          <div style={{ ...styles.container, flexDirection: "column" }}>
            <div style={{ ...styles.container, alignItems: "flex-end", flexDirection: "row" }}>
              <GameButton color="red"></GameButton>
              <GameButton color="green"></GameButton>
            </div>
            <div style={{ ...styles.container, alignItems: "flex-start", flexDirection: "row" }}>
              <GameButton color="blue"></GameButton>
              <GameButton color="yellow"></GameButton>
            </div>
          </div>
        )
      }
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <Game></Game>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3c3749",
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  startButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "green",
  },
  gameButton: {
    aspectRatio: "1/1",
    width: "40%",
    maxWidth: 200,
    margin: 10,
    borderRadius: 15,
    backgroundColor: "green",
  },
  buttonText: {
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
});