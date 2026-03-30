import React, {useCallback, useState} from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import styles from "../styles/styles";

import { getPeople, deletePerson } from "../servers/peopleCrud";

export default function HomeScreen({ navigation }) {

  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredPeople = !normalizedSearch
    ? people
    : people.filter((user) => {
        const firstName = (user.firstName || "").toLowerCase();
        const lastName = (user.lastName || "").toLowerCase();
        const fullName = `${firstName} ${lastName}`.trim();
        const email = (user.email || "").toLowerCase();
        const phone = (user.phone || user.telephone || "").toLowerCase();

        return (
          firstName.includes(normalizedSearch) ||
          lastName.includes(normalizedSearch) ||
          fullName.includes(normalizedSearch) ||
          email.includes(normalizedSearch) ||
          phone.includes(normalizedSearch)
        );
      });

  async function loadPeople() {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const data = await getPeople();
      setPeople(data);
    } catch (error) {
      setErrorMessage("Não foi possível carregar os usuários. Verifique a API.");
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadPeople();
    }, [])
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Lista de Pessoas</Text>

      <TextInput
      placeholder="Buscar..."
      value={search}
      onChangeText={setSearch}
      style={styles.searchInput}
      />  

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddEdit")}
      >
        <Text style={styles.buttonText}>Adicionar Pessoa</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
      <FlatList
        data={filteredPeople}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>
        }

        renderItem={({ item }) => (
          <CardPersonal
           item={item}
           navigation={navigation}
           refresh={loadPeople}
          />
        )}
      />
      )}


    </View>
  );

  function CardPersonal({ item, navigation, refresh }) {
    return (
      <View style={styles.card}>

        <View>


          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>

          <Text style={styles.email}>
            {item.email}
            </Text>

          <Text style={styles.phone}>
            {item.phone || item.telephone}
          </Text>

        </View>

        <View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddEdit", { person: item })}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

         <TouchableOpacity
          onPress={async () => {
            try {
              await deletePerson(item.id);
              refresh();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir o usuário.");
            }
          }} 
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>

      </View>

      </View>
    );
  }
}