import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/models/card';
import { PlayerObtainableCards } from 'src/app/shared/models/playerObtainableCards';
import { CardsCombinationService } from 'src/app/shared/services/combinations/cards-combination.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { GameService } from 'src/app/shared/services/game/game.service';

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

  onDrop(event: DragEvent): void {
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
        this.getPlayerCardsFromTable(playerCardIndex);
      } else this.addCardOnTable(playerCardIndex);
    }
    //4. Il drop è terminato, non serve più mantenere questa carta
    if (this.draggingCard != null) this.draggingCard = undefined;
  }

  /**Metodo che recupera le carte dal tavolo */
  getPlayerCardsFromTable(playerCardIndex: number): void {
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
      const playerObtainedCards = this.getPlayerObtainedCards(
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
  getPlayerObtainedCards(
    playerCard: Card | undefined,
    obtainableCards: PlayerObtainableCards
  ): Card[] | undefined {
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
        //TODO: dare all'utente la possibilità di scegliere il paio di carte che vuole
        
        return matchingCombination[0].addends;
      }
      return undefined;
    } catch (error) {
      console.error(
        'Could not define which cards the user can obtain from the table'
      );
      return undefined;
    }
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
