import React, {useState} from "react";
import {View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert} from "react-native";


import styles from "../styles/styles";

import { createPerson, updatePerson } from "../servers/peopleCrud";

export default function AddEditScreen({route, navigation}){

    const person = route.params?.person;

    const [firstName, setFirstName] = useState(person?.firstName || "");
    const [lastName, setLastName] = useState(person?.lastName || "");
    const [email, setEmail] = useState(person?.email || "");
    const [phone, setPhone] = useState(person?.phone || person?.telephone || "");
    const [isSaving, setIsSaving] = useState(false);

    async function save(){
        try {
            setIsSaving(true);
            const data = {firstName, lastName, email, phone, telephone: phone};

            if(person){
                await updatePerson(person.id, data);
            }else{
                await createPerson(data);
            }

            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar. Verifique a API.");
        } finally {
            setIsSaving(false);
        }
    }

    return(
        <View style={styles.container}>

        <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
        />

        <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
        />

        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}           
        />

        <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}           
        />

        <TouchableOpacity
        style={styles.button} 
        onPress={() => save()}
        disabled={isSaving}>
        {isSaving ? <ActivityIndicator color="#fff" /> : <Text> Salvar </Text>}
        </TouchableOpacity> 

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text> Cancelar </Text>
        </TouchableOpacity> 
        
        </View>
    )
}