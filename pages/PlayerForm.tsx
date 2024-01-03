import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  item: {
    margin: 8,
  },
});

export const PlayerForm = ({ navigation, route }) => {
  const [text, setText] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.item}
        label="Nom"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button style={styles.item} mode="contained">
        Valider
      </Button>
    </SafeAreaView>
  );
};
