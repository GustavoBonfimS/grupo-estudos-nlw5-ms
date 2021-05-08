import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { PlantProps } from "../libs/storage";

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import { Load } from "../components/Load";

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [loading, setLoading] = useState(true);

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

  return <View />

}
