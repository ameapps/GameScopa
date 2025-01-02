import { Combination } from './Combination';
import { Card } from './card';

export class PlayerObtainableCards {
  sameValueCards!: Card[];
  combinations!: Combination[];
  targetValue!: number;
}
