import {Text, Pressable, StyleSheet} from "react-native";
import {Colors} from "../styles/colors";

export default function Button(props) {
  return (
    <Pressable
      style={({ pressed }) => ({
        ...styles.container,
        opacity: pressed ? 0.5 : 1
      })}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 240,
    backgroundColor: Colors.yellow,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})
