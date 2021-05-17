import React from 'react';
import { FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import fonts from "../styles/fonts";
import colors from "../styles/colors";

const items = [
  {
    id: 1,
    environment: 'Sala',
  },
  {
    id: 2,
    environment: 'Quarto',
  },
  {
    id :3,
    environment: 'Cozinha'
  },
  {
    id :4,
    environment: 'Banheiro'
  },
  {
    id :5,
    environment: 'Sala'
  }
];

export function ScrollViewEnvironment () {
  return (
    <FlatList
      contentContainerStyle={{ paddingLeft: 20 }}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={styles.container}
      data={items}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item}>
          <Text style={styles.textItem}>{item.environment}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {

  },
  item: {
    backgroundColor: colors.shape,
    borderRadius: 12,
    margin: 3,
    width: 76,
    height: 40,
    justifyContent: "center",
    alignItems: 'center'
  },
  textItem: {
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 13,
  }
});
