import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { DefaultConfig, DefaultConfigHomeGames } from "../../models/defaultConfig";
import { Person } from "../../models/person";

@Injectable({
    providedIn: 'root',
})
export class CommonService implements OnDestroy {

    // #region variables
    appConfig!: DefaultConfig;
    currentActiveGame!: DefaultConfigHomeGames;

    loggedPerson!: Person;

    // Se nel json di config è indicato che si possono usare dati mock
    public get canUseMockData(): boolean {
        return this.appConfig.mock.can_use_mock_data;
    }

    //#endregion

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    /**Metodo che inizializza i dati dell'app con i dati mock */
    useMockData() {
        this.loggedPerson = this.appConfig?.mock?.data?.user;
        console.log('this.loggedPerson', this.loggedPerson)
        this.loggedPerson.level = Number(((this.loggedPerson.points ?? 1) / 100).toFixed(0));
    }
}