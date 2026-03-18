/*
Author: Thomas Olson
Date: 3/18/2026

All code for this app is contained in the Index.
*/

import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

var sequence; //Holds random button sequence.
var playerSequence; //Holds player's moves.
var score = 0;

export default function Index() {
  const [activeView, setActiveView] = useState("start"); //Current screen.
  const [highlight, setHighlight] = useState(""); //State for which button is highlighted.
  const [acceptInput, setAcceptInput] = useState("true"); //Disables input.
  const sleep = ms => new Promise(r => setTimeout(r, ms));//Copied from StackOverflow

  async function buttonPress(value) { //Most game logic is contained in the function for handling button presses.
    if (acceptInput == false) { //Do nothing if buttons are flashing.
      return;
    }
    else if (value == undefined) { //Setup game when start button is pressed.
      setAcceptInput(false); //Input is disabled anytime new buttons are added to the sequence.
      setActiveView("game");
      sequence = [];
      playerSequence = [];
      sequence.push(addToSequence());
      await playSequence();
      return;
    }
    else { //Validate colored button press.
      setAcceptInput(false);
      playerSequence.push(value);
      if (sequence[playerSequence.length - 1] != playerSequence[playerSequence.length - 1]) { //Compare player guess to actual button in sequence.
        score = (sequence.length - 1);
        setActiveView("score");
        setAcceptInput(true);
        return;
      }
      else if (sequence.length == playerSequence.length) { //All buttons are correct.
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
    let number = Math.floor(Math.random() * 4); //Random color is selected.
    switch (number) {
      case 0:
        return "Red";
      case 1:
        return "Green";
      case 2:
        return "Blue";
      case 3:
        return "Yellow";
    }
  }

  async function playSequence() {
    await sleep(1000); //Initial delay.
    for (let i = 0; i < sequence.length; i++) {
      setHighlight(sequence[i]);
      await sleep(750); //Highlight for 0.75 seconds.
      setHighlight("");
      await sleep(250); //Wait for 0.25 seconds so two flashes don't blend together.
    }
    setAcceptInput(true);
    return;
  }

  function GameButton(props) { //Colored buttons.
    if (props.name == highlight) { //Highlighted button.
      return (
        <Pressable onPress={() => buttonPress(`${props.name}`)} style={[styles.gameButton, { backgroundColor: `${props.highlightColor}` }]} />
      )
    }
    else if (acceptInput == false) { //Disabled button.
      return (
        <Pressable onPress={() => buttonPress(`${props.name}`)} style={[styles.gameButton, { backgroundColor: `${props.color}` }]} />
      )
    }
    else { //Pressable button.
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
      if (activeView === "start") { //Home screen.
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
      else if (activeView === "game") { //Main game screen.
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
      else if (activeView === "score") { //Scrollable high score list. (No high scores are saved currently)
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

  return ( //Index parent screen.
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