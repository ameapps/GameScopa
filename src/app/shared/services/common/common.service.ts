import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { DefaultConfig } from "../../models/defaultConfig";

@Injectable({
    providedIn: 'root',
  })
  export class CommonService implements OnInit, OnDestroy {
    appConfig!: DefaultConfig;
    
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}