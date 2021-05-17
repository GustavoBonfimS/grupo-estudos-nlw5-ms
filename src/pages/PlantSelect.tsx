import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { PlantProps } from "../libs/storage";

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import photoUser from '../assets/foto.png';

import { Load } from "../components/Load";
import { ScrollViewEnvironment } from "../components/ScrollViewEnvironment";

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  async function fetchPlants() {
    const { data } = await api.get(
      `/plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get(
        '/plants_environments?_sort=title&_order=asc'
      );
      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ]);
    }
    // fetchEnvironment();
  }, []);

  useEffect(() => {
    // fetchPlants();
  }, []);

  if (loading) {
    return <Load />
  }

  return <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.textGreetings}>Olá, {'\n'}
        <Text style={styles.textName}>Amauri</Text>
      </Text>
      <Image source={photoUser} />
    </View>
    <View style={styles.mainContent}>
      <Text style={styles.textEnvironment}>Em qual ambiente</Text>
      <Text style={styles.textEnvironmentQuestion}>você quer colocar sua planta?</Text>
      <ScrollViewEnvironment />
    </View>
  </SafeAreaView>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  textGreetings: {
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 32,
  },
  textName: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 32,
    lineHeight: 32,
  },
  mainContent: {

  },
  textEnvironment: {
    fontFamily: fonts.heading,
    color: '#5C6660',
    fontSize: 17,
    marginLeft: 30,
  },
  textEnvironmentQuestion: {
    fontFamily: fonts.text,
    color: '#5C6660',
    fontSize: 17,
    marginLeft: 30,
    marginBottom: 20,
},
})
