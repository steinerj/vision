import {Component, Inject} from "@angular/core";
import * as camera from "nativescript-camera";
import * as permissions from "nativescript-permissions";
import * as imageSource from "tns-core-modules/image-source";

import {ImageFormat} from "ui/enums";
import {Vision} from "./services/vision";

declare var android: any;

@Component({
    selector: "Selfie",
    template:
    `
    <Image [src]="lastPicture" width="280" height="280"></Image>
    <Label [text]="faceEmotions" class="title"></Label>
    <Label [text]="imageDescription" textWrap="true" class="desc"></Label>
    <Button (tap)="takeSelfie()" text="Take a selfie!"></Button>   
    <ActivityIndicator [busy]="isLoading"></ActivityIndicator>
    `
})

export class Selfie {
    public lastPicture;
    public faceEmotions = '';
    public imageDescription = '';
    public isLoading = false;
    constructor(@Inject(Vision) private vision: Vision) {}
         
    public takeSelfie() {
        permissions.requestPermission(android.Manifest.permission.CAMERA, 'Can has camera plz?').then(() => {
            camera.takePicture({width: 800, height: 600, keepAspectRatio: true}).then((picture:any) => {
                this.faceEmotions = 'querying Google Visions API...';
                this.isLoading = true;
                imageSource.fromAsset(picture).then( (img) => {
                    this.lastPicture = img;
                    //console.log('request payload size is: ', this.lastPicture.toBase64String(ImageFormat.jpeg, 80).length);
                    this.vision.evaluatePicture(this.lastPicture.toBase64String(ImageFormat.jpeg, 80)).then(evaluation => {
                        this.faceEmotions = evaluation.faces;
                        this.imageDescription = evaluation.things;
                        this.isLoading = false;
                    });
                });
            });
        });
    };
        
  
}