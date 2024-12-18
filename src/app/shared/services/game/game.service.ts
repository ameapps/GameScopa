import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { DefaultConfig, DefaultConfigHomeGames } from "../../models/defaultConfig";
import { Person } from "../../models/person";

@Injectable({
    providedIn: 'root',
  })
  export class GameService implements OnInit, OnDestroy {

    constructor() {}
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    
}