30/12/2024
se il gioco parte direttamente con l'url che punta alla partita in esecuzione, il json di config non fa in tempo ad essere caricato.
ES: se carico il gioco in http://localhost:4200/scopa usando le carte mock, la variabile "canUseMockData" non è ancora valorizzata perche il json non è stato ancora caricato.