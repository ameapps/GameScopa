import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/models/card';
import { PlayerObtainableCards } from 'src/app/shared/models/playerObtainableCards';
import { CardsCombinationService } from 'src/app/shared/services/combinations/cards-combination.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { GameService } from 'src/app/shared/services/game/game.service';
import { TestsService } from 'src/app/shared/services/tests/tests.service';

@Component({
  selector: 'app-game-scopa',
  templateUrl: './game-scopa.component.html',
  styleUrls: ['./game-scopa.component.scss'],
})
export class GameScopaComponent implements OnInit {
  draggingCard?: Card;
  obtainableCards?: PlayerObtainableCards;
  canRotateCards = false;
  canShowDialog = false;

  constructor(
    public game_service: GameService,
    private cards_comb: CardsCombinationService,
    private tests_service: TestsService,
    public common: CommonService
  ) {}

  ngOnInit() {
    //1. Inizializzo le carte del gioco secondo le impostazioni definite
    this.getGameCards();
  }

  /**Metodo che consente di inizializzare il gioco, assegnando carte sia al giocatore che al tavolo */
  private getGameCards(): void {
    this.game_service.startGame(this.common.currentActiveGame);
    this.game_service.tableCards = this.game_service.getTableCards(
      this.common.currentActiveGame
    );
    this.game_service.playerCards = this.game_service.getPlayerCards(
      this.common.currentActiveGame
    );

    //Test - creo carte con due o più combinazioni
    this.getGameCardsWithCombinations();
  }

  /**Metodo per preparare le carte sul tavolo ed in mano al giocatore
   * in modo che sia possibile recuperare più combinazioni */
  getGameCardsWithCombinations() {
    //1. Richiedo le carte combinate dal BE e le imposto come in uso nel BE
    const combinations = this.tests_service.getGameCardsWithCombinations();
    //2. Imposto le carte ricevute nel FT
    this.game_service.tableCards = combinations.tableCards;
    this.game_service.playerCards = combinations.playerCards;
  }

  /**Metodo per mischiare le carte */
  shuffleCards(): void {
    this.getGameCards();
  }

  // #region drag and drop
  onDragStart(event: DragEvent, cardIndex: number): void {
    // Salviamo l'indice della carta trascinata nei dati del drag event
    event.dataTransfer?.setData('text/plain', cardIndex.toString());
    this.draggingCard = this.getCardByIndex(cardIndex);
  }

  allowDrop(event: DragEvent): void {
    // Previene il comportamento predefinito per abilitare il drop
    event.preventDefault();
  }

  async onDrop(event: DragEvent): Promise<void> {
    //1. Recuperiamo l'indice testuale della carta trascinata
    console.log('dropping');
    event.preventDefault();
    //2. Prevengo il drop di una carta del tavolo nel tavolo stesso
    if (this.draggingCard == null) return;
    const sPlayerCardIndex = event.dataTransfer?.getData('text/plain');
    if (sPlayerCardIndex !== null) {
      //3. Convertiamo l'indice in numero
      const playerCardIndex = parseInt(sPlayerCardIndex ?? '-1', 10);
      if (this.canGetTableCards(playerCardIndex)) {
        await this.getPlayerCardsFromTable(playerCardIndex);
      } else this.addCardOnTable(playerCardIndex);
    }
    //4. Il drop è terminato, non serve più mantenere questa carta
    if (this.draggingCard != null) this.draggingCard = undefined;
  }

  /**Metodo che recupera le carte dal tavolo */
  async getPlayerCardsFromTable(playerCardIndex: number): Promise<void> {
    try {
      //1. Recupero la carta dal suo indice
      const playerCard = this.getCardByIndex(playerCardIndex);
      //2. Recupero le carte che l'utente può prendere dal tavolo
      const obtainableCards = this.getPlayerObtainableCards(playerCard);
      this.obtainableCards = obtainableCards;
      if (obtainableCards == null) {
        console.warn('The user can get no cards from the table');
        return;
      }
      //3. Recupero le carte dal tavolo rispettando le regole di ritiro (ES: match card più importante della somma)
      const playerObtainedCards = await this.getPlayerObtainedCards(
        playerCard,
        obtainableCards
      );
      console.log('carte ritirate', playerObtainedCards);
      if (playerObtainedCards == null) {
        console.error('could not get cards from the table');
        return;
      }
      //4. Chiedo al BE di rimuovere dal tavolo le carte prese dall'utente
      this.game_service.removeCardsFromTable(playerObtainedCards);
      //5. Rimuovo la carta dell'utente usata per prendere dal tavolo
      this.game_service.removePlayerCard(playerCard);
      //5. Chiedo al BE di aggiornare le carte dell'utente con quelle appena recuperate
      //TODO
      this.game_service.updateUserCards(playerObtainedCards);
    } catch (error) {
      console.error(
        'Could not get the cards from the table matching with the specified card value'
      );
      return undefined;
    }
  }

  /**Metodo che permette all'utente di ritirare carte dal tavolo garantendo che siano
   * rispettate le regole di ritiro.
   * ES: il match di valore ha più importanza della somma
   */
  async getPlayerObtainedCards(
    playerCard: Card | undefined,
    obtainableCards: PlayerObtainableCards
  ): Promise<Card[] | undefined> {
    try {
      if (obtainableCards.sameValueCards.length === 1)
        return obtainableCards.sameValueCards;
      if (obtainableCards.combinations.length > 0) {
        const matchingCombination = obtainableCards.combinations.filter(
          (row) => row.sum === playerCard?.value
        );
        if (matchingCombination.length === 0) {
          console.error(
            'No obtainable matching cards found when checking for the current card'
          );
          return;
        }

        if (matchingCombination.length === 1)
          return matchingCombination[0].addends;

        //TODO: dare all'utente la possibilità di scegliere il paio di carte che vuole.
        //TODO: Deve essere fatto usando la dialog creata col componente app-card-choose.
        //TODO: Occorre quindi:
        //TODO: - aprire il componente, impostando canShowDialog=true
        //TODO: - aspettare che all'interno del componente sia effettuata una scelta con una promise
        //TODO: - quando l'utente effettua la scelta, la promise si risolve e questo metodo prosegue la sua esecuzione

        // Apri il dialog per consentire la selezione delle carte
        this.canShowDialog = true;
        // Utilizza async/await per attendere la selezione delle carte
        const selectedCards = await this.getUserSelectedCards();
        // Disattiva il dialog
        this.canShowDialog = false;

        return selectedCards;
      }
      return undefined;
    } catch (error) {
      console.error(
        'Could not define which cards the user can obtain from the table'
      );
      return undefined;
    }
  }

  // Metodo helper per gestire l'evento cardChooseEvent
  private getUserSelectedCards(): Promise<Card[]> {
    return new Promise<Card[]>((resolve, reject) => {
      const subscription = this.common.cardChooseEvent.subscribe({
        next: (chosenCards: Card[]) => {
          resolve(chosenCards);
          subscription.unsubscribe(); // Rimuovi il listener
        },
        error: (error: any) => {
          console.error('Error during card selection', error);
          reject(error);
          subscription.unsubscribe();
        },
      });
    });
  }

  /**Metodo che calcola se, dopo che il giocatore ha messo
   * una carta sul tavolo, può prendere carte o no */
  canGetTableCards(playerCardIndex: number): boolean {
    try {
      const playerCard = this.getCardByIndex(playerCardIndex);
      const obtainableCards = this.getPlayerObtainableCards(playerCard);
      if (obtainableCards == null) return false;
      if (obtainableCards.sameValueCards.length > 0) return true;
      if (obtainableCards.combinations.length > 0) return true;
      return false;
    } catch (error) {
      console.error(
        'Could not decide if it is possible or not to get card from the table'
      );
      return false;
    }
  }

  /**Metodo che permette di ruotare le carte visualizzatre sul tavolo */
  getCardStyle(index: number): { transform: string } {
    const totalCards = this.game_service.playerCards.length;
    const angleStep = 3; // Angolo totale da distribuire
    const startAngle = -(angleStep / 2) * (totalCards - 1); // Angolo iniziale
    const rotateAngle = startAngle + index * angleStep;

    return {
      transform: `rotate(${rotateAngle}deg)`,
    };
  }

  /**Metodo che permette di calcolare tutte le carte che l'utente può ottenere dal tavolo */
  getPlayerObtainableCards(
    playerCard: Card | undefined
  ): PlayerObtainableCards | undefined {
    try {
      //1. Cerco se nel tavolo ci sono carte aventi lo stesso valore di quella buttata dal giocatore
      const sameValueCardsFound = this.game_service.tableCards.filter(
        (row) => row.value === playerCard?.value
      );
      //2. Cerco esiste una combinazione di carte la cui somma dia il valore della carta dell'utente
      const combinations = this.cards_comb.getCombinations(
        this.game_service.tableCards,
        playerCard?.value ?? -1
      );
      return {
        sameValueCards: sameValueCardsFound,
        combinations: combinations,
        targetValue: playerCard?.value ?? -1,
      };
    } catch (error) {
      console.error(
        'Could not get the cards that the player can obtain from the table'
      );
      return undefined;
    }
  }

  /**Metodo che recupera la carta usando il suo indice */
  getCardByIndex(cardIndex: number): Card | undefined {
    if (cardIndex < 0) {
      console.error('Cannot get card when its index is < 0');
      return undefined;
    }
    if (cardIndex > 40) {
      console.error('Cannot get card when its index is > 40');
      return undefined;
    }
    if (cardIndex == null) {
      console.error('Cannot get card when its index is null');
      return undefined;
    }
    return this.game_service.playerCards[cardIndex];
  }

  /**Metodo che permette di aggiungere la carta del giocatore sul tavolo,
   * il cui indice è passato come parametro  */
  private addCardOnTable(cardIndex: number): void {
    try {
      const card = this.getCardByIndex(cardIndex);
      //1. Aggiungo la carta al tavolo
      this.game_service.addCardsOnTable(card);
      //2. Rimuovo la carta dal mazzo
      this.game_service.removePlayerCard(card);
    } catch (error) {
      console.error('Could not add the card on the table');
    }
  }
  //#endregion
}
