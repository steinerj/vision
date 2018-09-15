import { Component } from "@angular/core";

@Component({
    selector:"root",
    template:
    `
    <StackLayout orientation="vertical">
        <Label class="title" [text]="message"></Label>
        <Selfie></Selfie>
    </StackLayout>
    `
})
export class AppComponent {
    public message:string = "Take a Selfie";
}






