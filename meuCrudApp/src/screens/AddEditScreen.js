import { API_URL } from "../servers/configApi"
import React, {useEffect} from "react";

fetch(API_URL, {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(newPerson)
})  

fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(updatedPerson)
    })


fetch(`${API_URL}${id}`, {
        method: 'DELETE'
        })

    