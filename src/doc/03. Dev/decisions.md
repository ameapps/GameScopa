**DECISIONI PRESE**

**PROGRESS BAR LIVELLO PUNTI**
Per comodità nello sviluppo, ho deciso che ogni livello vale 100 punti. 
Questo perchè risulta più comodo per l'interfaccia, siccome la  progress 
bar mostra valori in percentuale da 1 a 100. 
Conviene quindi che la logica per visualizzare i livelli basata sui punti
ottenuti sia congruente con il funzionamento dell''interfaccia nel visualizzare
il livello. 

**MODULO DEDICATO ALLA PARTITA CONTRO PC/ALTRO GIOCATORE**
Ho deciso che NON deve esserci un modulo dedicato al gioco perchè non 
deve essere possibile accedere ad un gioco usando una URL. Questo 
perchè a certi giochi si può accederes solo con certi soldi e permettere
l'accesso via URL significa dover implementare una guard. 
UPDATE: ci ho ripensato. Creo un modulo game che prende dei parametri nel 
query string. Se faccio così, potrò riusare il modulo anche nella partita 
tra due giocatori.

**PROGETTAZIONE BACKEND PER LA MODALITA MULTI GIOCATORE**
Vorrei fare in modo che ci sia un backend pronto ad ascoltare le richieste dei client. 
Il BE serve perchè è necessario che ci sia un'entità che mantenga lo stato del gioco e lo diriga.
Il Be comunque è difficile da sviluppare, perchè hostarlo da qualche parte costa (anche firebase). 
Potrei quindi implementare due soluzioni di BE: 
-   rete locale:
    -   uno smartphone avvia l'hotspot per creare una rete locale 
    -   lo smartphone avvia il BE (server node da avviare in un app apposita)
    -   gli altri smartphone si collegano al'hotspot e si loggano 
    -   lo stato della partita viene mantenuto dal be in esecuzione sullo smartphone che
        ha avviato l'hotspot 
-   firebase 
    -   creazione di un be usando firebase funtion (funzioni javascript eseguite in firebase)
    -   gli utenti si autenticano una sola volta mediante facebook 
    -   il be su firebase mantiene lo stato del gioco