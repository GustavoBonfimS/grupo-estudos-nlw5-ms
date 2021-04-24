import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.texto}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  }
})
