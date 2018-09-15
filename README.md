# NativeScript Angular Vision - Image Analysis
Simple selfie-app template for NativeScript apps using Angular x

This is a sample app for a Selfie-component, which lets the user take a picture and then displays it back. It then runs an image analysis to detect emotions and tag the image, using the Google Vision API.

The purpose of this example is to show:
* how to use NativeScript modules (e.g. "camera")
* that Angular component composition works the same in Web & NativeScript
* how ng property binding works for NativeScript elements such as "Image"

The sample is essentially an angularised version of this tutorial: 
https://www.nativescript.org/blog/details/take-your-selfie-with-nativescript-and-its-cross-platform-camera-api


## Usage:
```
$ clone and tns run android (maybe iOS works as well - untested)
```

For Android:
```
$ tns platform add android
$ tns run android
```

## This project uses the Google Vision API:

https://cloud.google.com/vision/

In order to use emotion analysis, please obtain an API key (first 1000 requests are free) and add it to the vision.ts service.