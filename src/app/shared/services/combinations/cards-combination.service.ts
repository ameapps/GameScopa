import { Injectable } from '@angular/core';
import { Card } from '../../models/card';
import { Combination } from '../../models/Combination';

@Injectable({
  providedIn: 'root'
})
export class CardsCombinationService {

  constructor() {}

  getCombinations(cards: Card[], targetValue: number): Combination[] {
    const result: Combination[] = [];

    function findCombinations(currentIndex: number, currentCombination: Card[], currentSum: number) {
      if (currentSum === targetValue) {
        result.push({
          addends: [...currentCombination],
          sum: currentSum,
        });
        return;
      }

      if (currentSum > targetValue || currentIndex >= cards.length) {
        return;
      }

      // Include la carta corrente
      findCombinations(
        currentIndex + 1,
        [...currentCombination, cards[currentIndex]],
        currentSum + cards[currentIndex].value
      );

      // Esclude la carta corrente
      findCombinations(currentIndex + 1, currentCombination, currentSum);
    }

    findCombinations(0, [], 0);

    return result;
  }
}
