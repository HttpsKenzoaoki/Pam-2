import { API_URL } from "../servers/configApi";
import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";

export default function HomeScreen() {
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setPeoples(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <FlatList
      data={peoples}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.firstname} {item.lastname}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
}