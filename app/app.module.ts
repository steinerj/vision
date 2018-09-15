import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from 'nativescript-angular/http';

import { AppComponent } from "./app.component";

import { Selfie } from "./selfie.component";
import { Vision } from "./services/vision";

@NgModule({
    providers: [
      Vision
    ],
    imports: [
      NativeScriptModule,
      NativeScriptHttpModule
    ],
    declarations: [
        AppComponent,
        Selfie
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
  })

export class AppModule { }
