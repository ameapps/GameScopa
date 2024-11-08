import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { DefaultConfig, DefaultConfigHomeGames } from "../../models/defaultConfig";
import { Person } from "../../models/person";

@Injectable({
    providedIn: 'root',
  })
  export class CommonService implements OnInit, OnDestroy {
    appConfig!: DefaultConfig;
    currentActiveGame!: DefaultConfigHomeGames;
    
    loggedPerson!: Person;
    
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    /**Metodo che inizializza i dati dell'app con i dati mock */
    useMockData() {
        this.loggedPerson = this.appConfig.mock.data.user;
        alert(this.loggedPerson)
    }
}