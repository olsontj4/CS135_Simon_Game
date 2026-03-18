import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

var sequence;
var playerSequence;
var acceptInput = true;
var score = 0;

export default function Index() {
  const [activeView, setActiveView] = useState("start");
  const [highlight, setHighlight] = useState("");
  const sleep = ms => new Promise(r => setTimeout(r, ms));//Copied from StackOverflow

  async function buttonPress(value) {
    console.log(value + " pressed.")
    if (acceptInput == false) {
      return;
    }
    else if (value == undefined) {
      acceptInput = false;
      setActiveView("game");
      sequence = [];
      playerSequence = [];
      sequence.push(addToSequence());
      await playSequence();
      return;
    }
    else {
      acceptInput = false;
      playerSequence.push(value);
      if (sequence[playerSequence.length - 1] != playerSequence[playerSequence.length - 1]) {
        score = (sequence.length - 1);
        setActiveView("score");
        acceptInput = true;
        return;
      }
      else if (sequence.length == playerSequence.length) {
        playerSequence = [];
        sequence.push(addToSequence());
        await playSequence();
        acceptInput = true;
        return;
      }
      acceptInput = true;
      return;
    }
  }

  function addToSequence() {
    let number = Math.floor(Math.random() * 4);
    switch (number) {
      case 0:
        return "red";
      case 1:
        return "green";
      case 2:
        return "blue";
      case 3:
        return "yellow";
      default:
        console.log(number + " is invalid.")
        return;
    }
  }

  async function playSequence() {
    await sleep(1000);
    for (let i = 0; i < sequence.length; i++) {
      setHighlight(sequence[i]);
      console.log(sequence[i]);
      await sleep(1000);
    }
    acceptInput = true;
    return;
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
      else if (activeView === "score") {
        return (
          <ScrollView>
            <h1>Score: {score}</h1>
            <Pressable onPress={() => buttonPress()} style={styles.startButton}>
              <Text>New Game</Text>
            </Pressable>
          </ScrollView>
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