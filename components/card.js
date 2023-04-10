import {Animated, Easing, Image, Pressable, StyleSheet, Text, View, ScrollView} from "react-native";
import {Colors} from "../styles/colors";


export default function Card(props) {
  const recipe = props.recipe;

  return (
    <Animated.View style={{
      ...styles.container,
      width: props.width - 48,
      ...props.style
    }}>
      {recipe ? (
        <>
          <View style={{...styles.imgContainer, width: props.width - 48}}>
            {recipe.img ? <Image style={styles.img} source={{uri: recipe.img}}/> : null}
          </View>
          <Text style={styles.title} >{recipe.name}</Text>
          <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.description} >{recipe.description}</Text>
          <View style={styles.ingredientsContainer} >
            {recipe.ingredients && recipe.ingredients.length > 0 ?
              <Text style={styles.ingredientsTitle} >Ингредиенты</Text>
            : null}
            <ScrollView>
              {recipe.ingredients.map(({name, amount }, index) => (
                <View style={styles.ingredientsLine} key={index}>
                  <Text>{String(index + 1) + '. '}</Text>
                  <Text>{name}</Text>
                  <Text style={styles.ingredientsAmount}>{amount}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          {recipe.ingredients && recipe.ingredients.length > 0 ?
            <Pressable style={styles.more} >
              <Text style={styles.moreLink} >Инструкция приготовления -></Text>
            </Pressable>
            : null}
        </>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>?</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 600,
    backgroundColor: Colors.pink,
    borderRadius: 24,
    marginVertical: 24,
    display: 'flex',
  },
  imgContainer: {
    maxHeight: 320,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  img: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    resizeMode: 'cover',
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 7,
  },
  description: {
    marginHorizontal: 20,
    fontSize: 12,
  },
  ingredientsContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  ingredientsTitle: {
    marginVertical: 7,
    fontSize: 14,
    fontWeight: 'bold',
  },
  ingredientsLine: {
    flexDirection: 'row',
    marginVertical: 1,
  },
  ingredientsAmount: {
    marginLeft: 7,
    fontWeight: 'bold'
  },
  more: {
    marginTop: 7,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  moreLink: {
    color: Colors.link
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 200,
    fontWeight: 'bold',
  }
});
