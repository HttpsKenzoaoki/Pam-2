useEffect(() => {
    fetch('http://localhost:3000/peoples')
    .then(response => response.json())
    then(data => setPeoples (data))
    .catch(error => console.error(error));
    }, []);


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
