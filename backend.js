function getScoreByName() {
    const name = document.getElementById("searchbar").value;
    console.log(name)
    fetch(`https://stacc-code-challenge-2021.azurewebsites.net/api/pep?name=${name}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            const table = document.getElementById("table1")
            data.hits.forEach(element => {
                const row = table.insertRow(1)
                const nameCell = row.insertCell(0)
                const scoreCell = row.insertCell(1)

                nameCell.innerHTML = element.name;
                scoreCell.innerHTML = element.score
            });
        })
        .catch((error) => console.error("FETCH ERROR:", error));

}
