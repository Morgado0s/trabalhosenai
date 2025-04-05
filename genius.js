“use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"

export default function App() {
  const [sequence, setSequence] = useState([])
  const [playerSequence, setPlayerSequence] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSquare, setActiveSquare] = useState(null)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  // Start a new game
  function startGame() {
    setGameStarted(true)
    // Create a sequence with 2 random numbers (0-8)
    const newSequence = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]
    setSequence(newSequence)
    setPlayerSequence([])
    setScore(0)

    // Show the sequence after a short delay
    setTimeout(() => playSequence(newSequence), 500)
  }

  // Show the sequence to the player
  function playSequence(sequenceToPlay) {
    setIsPlaying(true)
    setPlayerSequence([])

    // Flash each square in the sequence
    sequenceToPlay.forEach((square, index) => {
      setTimeout(() => {
        setActiveSquare(square)
        setTimeout(() => {
          setActiveSquare(null)
          if (index === sequenceToPlay.length - 1) {
            setIsPlaying(false)
          }
        }, 600)
      }, index * 900)
    })
  }

  // Handle when player taps a square
  function handleSquarePress(index) {
    if (isPlaying) return

    const newPlayerSequence = [...playerSequence, index]
    setPlayerSequence(newPlayerSequence)

    // Flash the tapped square
    setActiveSquare(index)
    setTimeout(() => setActiveSquare(null), 300)

    // Check if the player made a mistake
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      Alert.alert("Game Over", Score: ${score}, [{ text: "Play Again", onPress: startGame }])
      return
    }

    // Check if the player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      setScore(score + 1)
      // Add one more step to the sequence
      const newSequence = [...sequence, Math.floor(Math.random() * 9)]
      setSequence(newSequence)
      // Play the new sequence after a short delay
      setTimeout(() => playSequence(newSequence), 1000)
    }
  }

  // Start screen
  if (!gameStarted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Genius Game</Text>
        <TouchableOpacity style={styles.button} onPress={startGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Score: {score}</Text>

      {/* Game grid */}
      <View style={styles.grid}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <TouchableOpacity
            key={index}
            style={[styles.square, activeSquare === index && styles.activeSquare]}
            onPress={() => handleSquarePress(index)}
            disabled={isPlaying}
          />
        ))}
      </View>

      <Text style={styles.instructions}>{isPlaying ? "Watch..." : "Your turn!"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
        padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  grid: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  square: {
    width: "30%",
    height: "30%",
    margin: "1.5%",
    backgroundColor: "blue",
    borderRadius: 5,
  },
  activeSquare: {
    backgroundColor: "yellow",
  },
  instructions: {
    marginTop: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
})
