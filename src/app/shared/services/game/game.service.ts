import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { DefaultCardConfig, DefaultConfig, DefaultConfigHomeGames } from "../../models/defaultConfig";
import { Person } from "../../models/person";
import { Card } from "../../models/card";
import { MockCardsProviderService } from "../provider/mock-cards-provider/mock-cards-provider.service";
import { CommonService } from "../common/common.service";

@Injectable({
    providedIn: 'root',
})
export class GameService implements OnDestroy {
    // #region variables

    //Carte del gioco
    cards: Card[] = [];
    
    // #endregion

    constructor(private common: CommonService, private mock_cards_provider: MockCardsProviderService) { }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    initGameCards(currentActiveGame: DefaultConfigHomeGames): Card[] {
        try {
            let cards: Card[] = [];
            console.log('currentActiveGame', currentActiveGame)
            if (this.common.canUseMockData) cards = this.mock_cards_provider.initGameCards(currentActiveGame);

            return cards;
        } catch (error) {
            console.error('Could not init the game cards using the specified settings');
            return [];
        }
    }
}