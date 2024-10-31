export class Card {
    //Tipologia delle carte
    group!: 'bergamasche' | 'bolognesi' | 'napoletane' | 'piacentine' | 'siciliane'; 
    //Estensione del file utilizzato 
    extension!: 'png' | 'svg';
    //Path relativo della carta
    path!: string; 
    //Tipologia della carta 
    type!: 'bastoni' | 'coppe' | 'denari' | 'spade';
    //Valore della carta (da 1 a 10)
    value!: number;
}