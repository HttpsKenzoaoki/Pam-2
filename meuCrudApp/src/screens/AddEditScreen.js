
fetch("http://localhost:3000/peoples", {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(newPerson)
})  

fetch("http://localhost:3000/peoples/${id}", {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(updatedPerson)
    })


fetch("http://localhost:3000/peoples/${id}", {
        method: 'DELETE'
        })