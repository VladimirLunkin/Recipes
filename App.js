import {Animated, Dimensions, Easing, SafeAreaView, StyleSheet, Text} from "react-native";
import Button from "./components/button";
import Card from "./components/card";
import {Colors} from "./styles/colors";
import {useRef, useState} from "react";
import {recipes} from "./source/recipes";

const width = Dimensions.get('window').width;

const generationTime = 1500;

const CARD_STATE_QUESTION = 0;
const CARD_STATE_RECIPE = 1;

export default function App() {

  const { startAnimate, translateX, opacity } = useAnimateItemStyle();

  const [recipe, setRecipe] = useState(null);
  const [cardState, setCardState] = useState(CARD_STATE_QUESTION);

  const generateRecipe = () => {
    startAnimate(generationTime);
    setTimeout(() => {
      setRecipe(getRandomRecipe());
      setCardState(CARD_STATE_RECIPE);
    }, generationTime);
  }

  const otherRecipe = () => {
    setRecipe(null);
    setCardState(CARD_STATE_QUESTION);
  }

  const action = [
    {onPress: generateRecipe, title: 'Придумать'},  // CARD_STATE_QUESTION
    {onPress: otherRecipe, title: 'Еще'},  // CARD_STATE_RECIPE
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Придумать что готовить?</Text>
      <Card style={{transform: [{ translateX }], opacity}} width={width} recipe={recipe} />
      <Button style={styles.button} onPress={action[cardState].onPress} text={action[cardState].title} />
    </SafeAreaView>
  );
}

function getRandomRecipe() {
  return recipes[getRandomInt(recipes.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function useAnimateItemStyle() {
  const [isGeneration, setIsGeneration] = useState(false)

  const animate_state = {
    start: 0,
    end: 100
  }

  const value = useRef(new Animated.Value(animate_state.start)).current
  const value2 = useRef(new Animated.Value(animate_state.start)).current

  const startAnimate = (time) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(value, { toValue: animate_state.end, useNativeDriver: true, duration: time * 0.1, easing: Easing.ease }),
        Animated.timing(value, { toValue: -animate_state.end, useNativeDriver: true, duration: time * 0.2, easing: Easing.ease }),
        Animated.timing(value, { toValue: animate_state.end, useNativeDriver: true, duration: time * 0.2, easing: Easing.ease }),
        Animated.timing(value, { toValue: 0, useNativeDriver: true, duration: time * 0.5, easing: Easing.bounce }),
      ]),
      {iterations: 1}
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(value2, { toValue: animate_state.end, useNativeDriver: true, duration: time * 0.1, easing: Easing.bounce }),
        Animated.timing(value2, { toValue: animate_state.start, useNativeDriver: true, duration: time * 0.1, easing: Easing.bounce }),
      ]),
      {iterations: 4}
    ).start();
    setIsGeneration(!isGeneration);
  }
  const inputRange = [animate_state.start, animate_state.end]
  const translateX = value.interpolate({ inputRange, outputRange: [0, 24] })
  const opacity = value2.interpolate({ inputRange, outputRange: [1, 0.75] })

  return { startAnimate, translateX, opacity };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  button: {}
});
