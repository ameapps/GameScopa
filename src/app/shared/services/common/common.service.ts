import { Injectable, OnInit, OnDestroy } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class CommonService implements OnInit, OnDestroy {
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}