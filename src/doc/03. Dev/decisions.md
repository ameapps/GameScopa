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