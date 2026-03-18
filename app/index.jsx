import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

var sequence;
var playerSequence;
var score = 0;

export default function Index() {
  const [activeView, setActiveView] = useState("start");
  const [highlight, setHighlight] = useState("");
  const [acceptInput, setAcceptInput] = useState("true");
  const sleep = ms => new Promise(r => setTimeout(r, ms));//Copied from StackOverflow

  async function buttonPress(value) {
    if (acceptInput == false) {
      return;
    }
    else if (value == undefined) {
      setAcceptInput(false);
      setActiveView("game");
      sequence = [];
      playerSequence = [];
      sequence.push(addToSequence());
      await playSequence();
      return;
    }
    else {
      setAcceptInput(false);
      playerSequence.push(value);
      if (sequence[playerSequence.length - 1] != playerSequence[playerSequence.length - 1]) {
        score = (sequence.length - 1);
        setActiveView("score");
        setAcceptInput(true);
        return;
      }
      else if (sequence.length == playerSequence.length) {
        playerSequence = [];
        sequence.push(addToSequence());
        await playSequence();
        setAcceptInput(true);
        return;
      }
      setAcceptInput(true);
      return;
    }
  }

  function addToSequence() {
    let number = Math.floor(Math.random() * 4);
    switch (number) {
      case 0:
        return "Red";
      case 1:
        return "Green";
      case 2:
        return "Blue";
      case 3:
        return "Yellow";
      default:
        console.log(number + " is invalid.")
        return;
    }
  }

  async function playSequence() {
    await sleep(1000);
    for (let i = 0; i < sequence.length; i++) {
      setHighlight(sequence[i]);
      await sleep(750);
      setHighlight("");
      await sleep(250);
    }
    setAcceptInput(true);
    return;
  }

  function GameButton(props) {
    if (props.name == highlight) {
      return (
        <Pressable onPress={() => buttonPress(`${props.name}`)} style={[styles.gameButton, { backgroundColor: `${props.highlightColor}` }]} />
      )
    }
    else if (acceptInput == false) {
      return (
        <Pressable onPress={() => buttonPress(`${props.name}`)} style={[styles.gameButton, { backgroundColor: `${props.color}` }]} />
      )
    }
    else {
      return (
        <Pressable
          onPress={() => buttonPress(props.name)}
          style={({ pressed }) => [
            styles.gameButton,
            {
              backgroundColor: pressed ? props.highlightColor : props.color,
            },
          ]}
        />
      )
    }

  }

  function Game() {
    {
      if (activeView === "start") {
        return (
          <Pressable onPress={() => buttonPress()}
            style={({ pressed }) => [
              styles.startButton,
              {
                backgroundColor: pressed ? "#7f7fff" : "#5050ff",
              },
            ]}
          >
            <Text style={styles.buttonText}>Start Game</Text>
          </Pressable>
        )
      }
      else if (activeView === "game") {
        return (
          <View style={{ ...styles.container, flexDirection: "column" }}>
            <View style={{ ...styles.container, alignItems: "flex-end", flexDirection: "row" }}>
              <GameButton name="Red" color="#7f0000" highlightColor="#FF7f7f"></GameButton>
              <GameButton name="Green" color="#007f00" highlightColor="#7fff7f"></GameButton>
            </View>
            <View style={{ ...styles.container, alignItems: "flex-start", flexDirection: "row" }}>
              <GameButton name="Blue" color="#00007f" highlightColor="#7f7fff"></GameButton>
              <GameButton name="Yellow" color="#7f7f00" highlightColor="#FFFF7f"></GameButton>
            </View>
          </View>
        )
      }
      else if (activeView === "score") {
        return (
          <>
            <ScrollView>
              <View style={{ ...styles.container, flexDirection: "column" }}>
                <Text style={styles.score}>Score: {score}</Text>
              </View>
            </ScrollView>
            <View>
              <Pressable onPress={() => buttonPress()} style={({ pressed }) => [
                styles.startButton,
                {
                  backgroundColor: pressed ? "#7f7fff" : "#5050ff",
                },
              ]}
              >
                <Text style={styles.buttonText}>New Game</Text>
              </Pressable>
            </View>
          </>
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
    backgroundColor: "#3f3644",
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
  },
  gameButton: {
    aspectRatio: "1/1",
    width: "40%",
    maxWidth: 200,
    margin: 10,
    borderRadius: 15,
  },
  buttonText: {
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 20,
  },
  score: {
    fontSize: 32,
    color: "white",
  }
});