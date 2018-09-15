import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable() 
export class Vision{
    constructor (private http: Http) {}
        
    private apiKey = '<INSERT API KEY HERE>';

    private googleVisionURL = "https://vision.googleapis.com/v1/images:annotate?key=" + this.apiKey;

    private getImageAnnotations (base64Image: string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const request = {
            requests: [
                {
                    features: [{
                        type: "FACE_DETECTION"
                    },
                    {
                        type: "LABEL_DETECTION",
                        //type: "LANDMARK_DETECTION",
                        maxResults: 5
                    }],
                    image: {
                        content: base64Image
                    }
                }]
        };
        return this.http
                    .post(this.googleVisionURL, JSON.stringify(request), options)
                    .toPromise();
    }

    public evaluatePicture(base64Image: string):any {
        let errorMessage,
            result;
        
        return this.getImageAnnotations(base64Image).then(response => {
            result = response.json();
            if (result.error){
                // && result.error.status && result.error.status == 'PERMISSION_DENIED'
               console.log('API key wrong/missing?', result.error);
               return { faces:'API key wrong/missing?', things: result.error};
            }
            let faceAnnotations = result.responses[0].faceAnnotations;
            let labelAnnotations = result.responses[0].labelAnnotations;
            let evaluatedEmoticons = '';
                        
            if (faceAnnotations){
                faceAnnotations.forEach(faceAnnotation => {
                    evaluatedEmoticons += this.evalEmotions(faceAnnotation);
                });
            }    

            return {
                faces: evaluatedEmoticons,
                things: this.evalLabels(labelAnnotations) 
            }        
        }, e => {
            console.log("Error occurred " + e);
        });
    }

    private evalEmotions(faceAnnotations):string {
        let emotionResult = '';

        if (faceAnnotations['joyLikelihood'] == 'LIKELY' || faceAnnotations['joyLikelihood'] == 'VERY_LIKELY'){
            emotionResult = ' :) ';
        }
        else if (faceAnnotations['sorrowLikelihood'] == 'LIKELY' || faceAnnotations['sorrowLikelihood'] == 'VERY_LIKELY'){
            emotionResult = ' :( ';
        }
        else if (faceAnnotations['angerLikelihood'] == 'LIKELY' || faceAnnotations['angerLikelihood'] == 'VERY_LIKELY'){
            emotionResult = ' :@ ';
        }
        else if (faceAnnotations['surpriseLikelihood'] == 'POSSIBLE' || faceAnnotations['surpriseLikelihood'] == 'LIKELY' || faceAnnotations['surpriseLikelihood'] == 'VERY_LIKELY'){
            emotionResult = ' :o ';
        }
        else if (faceAnnotations['headwearLikelihood'] == 'LIKELY' || faceAnnotations['headwearLikelihood'] == 'VERY_LIKELY'){
            emotionResult = ' =|:) ';
        }
        else {
            emotionResult = ':|';
        }    
        return emotionResult;
    }
    private evalLabels(things) :string {
        let retString = '';
        if(things) {
            things.forEach(thing => {
                retString += thing.description + ' (' + Math.floor(thing.score * 100) + '%), ' 
            });    
        }
        return retString;
    }

}