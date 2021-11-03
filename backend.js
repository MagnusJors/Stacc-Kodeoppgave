function getScoreByName() {
    // Name = tekst fra søkefelt 
    const name = document.getElementById("searchbar").value;
    clearHTML();

    // GET PEP på navn
    fetch(`https://stacc-code-challenge-2021.azurewebsites.net/api/pep?name=${name}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        // Legg til "score" og "name" i tabell
        .then(data => {
            // Sjekker for navn i datasette

            const table = document.getElementById("table1")
            data.hits.forEach(element => {
                const row = table.insertRow(1)
                const nameCell = row.insertCell(0)
                const scoreCell = row.insertCell(1)

                nameCell.innerHTML = element.name;
                scoreCell.innerHTML = element.score
            });
        })
        // Finner ikke navn, print error
        .catch((error) => {
            console.error("FETCH ERROR:", error);
            document.getElementById("error-message").innerHTML = `ERROR: Could not find ${name}`
        });

}



function clearHTML() {
    // Fjern error beskjed
    document.getElementById("error-message").innerHTML = ""

    // Fjern innhold fra tabel
    var tableHeaderRowCount = 1;
    var table = document.getElementById('table1');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}