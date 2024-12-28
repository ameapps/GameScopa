import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { DefaultCardConfig, DefaultConfig, DefaultConfigHomeGames } from "../../models/defaultConfig";
import { Person } from "../../models/person";
import { Card } from "../../models/card";

@Injectable({
    providedIn: 'root',
})
export class GameService implements OnDestroy {
    //Carte del gioco
    cards: Card[] = [];
    SCOPA_CARDS_NUMBER = 40;

    constructor() { }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    initGameCards(currentActiveGame: DefaultConfigHomeGames): Card[] {
        try {
            const cards: Card[] = [];
            console.log('ciao', currentActiveGame)
            //1. costuisco le carte 
            for (let index = 0; index < this.SCOPA_CARDS_NUMBER; index++) {
                const group = currentActiveGame?.card?.group ?? 'siciliane';
                const extension = currentActiveGame?.card?.extension ?? 'png';
                const type = this.getCardType(index);
                const value = (index % 10) + 1;
                cards.push({
                    group: group,
                    extension: "png",
                    type: type ?? 'bastoni',
                    value: value,
                    path: this.buildCardPath(extension, group, type, value)
                });
            }
            return cards;
        } catch (error) {
            console.error('Could not init the game cards using the specified settings');
            return [];
        }
    }

    buildCardPath(extension: string, group: string, type: string | undefined, value: number): string {
        try {
            const path = `assets/cards/${extension}/${group}/${type}/${value}.${extension}`;
            return path;
        } catch (error) {
            console.error('Could not build the card path');
            return 'assets/GUI/home/no-card.svg';
        }
    }

    getCardType(index: number): 'bastoni' | 'coppe' | 'denari' | 'spade' | undefined {
        if (index <= 9) return 'bastoni';
        if (index <= 19) return 'coppe';
        if (index <= 29) return 'denari';
        if (index <= 39) return 'spade';
        return undefined;
    }
}