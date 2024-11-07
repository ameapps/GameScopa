import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { DefaultConfig, DefaultConfigHomeGames } from "../../models/defaultConfig";

@Injectable({
    providedIn: 'root',
  })
  export class CommonService implements OnInit, OnDestroy {
    appConfig!: DefaultConfig;
    currentActiveGame!: DefaultConfigHomeGames;
    
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}