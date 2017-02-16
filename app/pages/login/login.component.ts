import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";
import platformModule = require("platform");
import * as dialogs from "ui/dialogs";
import {TNSOTSession, TNSOTPublisher, TNSOTSubscriber} from "nativescript-opentok";


@Component({
  selector: "my-app",
  providers: [],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
})
export class LoginComponent implements OnInit {

  private _apiKey: string = '45750712';
  private _sessionId: string = '1_MX40NTc1MDcxMn5-MTQ4NDYzODIxNjEzMH5vZnE4WVV5M2FoQUl2cGhkYmN4bDZmUFl-fg';
  private _sessionIdRelayed: string = '1_MX40NTc1MDcxMn5-MTQ4NDY2MDg4OTM4Nn50VEdabDVzT2ZwTGNrNm12b0NRNEFsK09-UH4';
  private _tokenRelP: string = 'T1==cGFydG5lcl9pZD00NTc1MDcxMiZzaWc9ZDg3YjkwNGY3MDY3YjIzODczZmI3NTFhNzA1MThlNGEyYWI3MmQxNzpzZXNzaW9uX2lkPTFfTVg0ME5UYzFNRGN4TW41LU1UUTRORFkyTURnNE9UTTRObjUwVkVkYWJEVnpUMlp3VEdOck5tMTJiME5STkVGc0swOS1VSDQmY3JlYXRlX3RpbWU9MTQ4NDY2MDkzNyZub25jZT0wLjA3NjA3NDA3ODI1NzY0NTIzJnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE0ODUyNjU3MzY=';
  private _tokenRelP1: string = 'T1==cGFydG5lcl9pZD00NTc1MDcxMiZzaWc9MTY5Mjg4N2E3OGY1OGVkMjBjMzEyZjkxMjMzNWE5OWNlMzNkOTE4NTpzZXNzaW9uX2lkPTFfTVg0ME5UYzFNRGN4TW41LU1UUTRORFkyTURnNE9UTTRObjUwVkVkYWJEVnpUMlp3VEdOck5tMTJiME5STkVGc0swOS1VSDQmY3JlYXRlX3RpbWU9MTQ4NDY2MjU4NiZub25jZT0wLjYwNzEwODE0NTYyMDY4Mjgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTQ4NTI2NzM4NQ==';
  private _tokenRelS: string = 'T1==cGFydG5lcl9pZD00NTc1MDcxMiZzaWc9N2NhM2EzN2ZlNTUxNDIwZTJmNWVjOGExOWMzNzA4ZjJjOWMxMWRkMjpzZXNzaW9uX2lkPTFfTVg0ME5UYzFNRGN4TW41LU1UUTRORFkyTURnNE9UTTRObjUwVkVkYWJEVnpUMlp3VEdOck5tMTJiME5STkVGc0swOS1VSDQmY3JlYXRlX3RpbWU9MTQ4NDY2MTAzOCZub25jZT0wLjQyODM4MjI4MTg3OTUxMDQ0JnJvbGU9c3Vic2NyaWJlciZleHBpcmVfdGltZT0xNDg1MjY1ODM2';
  private _token: string = 'T1==cGFydG5lcl9pZD00NTc1MDcxMiZzaWc9YjRhNTNkMDMwOTBlNDkwYmY5ZTdiN2M1ZGViYTNhZWQwZTBmN2ZkNDpzZXNzaW9uX2lkPTFfTVg0ME5UYzFNRGN4TW41LU1UUTRORFl6T0RJeE5qRXpNSDV2Wm5FNFdWVjVNMkZvUVVsMmNHaGtZbU40YkRabVVGbC1mZyZjcmVhdGVfdGltZT0xNDg0NjU1MzE2Jm5vbmNlPTAuMTcxMTc5NDMyNzI4NjkwNjMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTQ4NTI2MDExNA==';
  private _token1: string = 'T1==cGFydG5lcl9pZD00NTc1MDcxMiZzaWc9Zjc3OWM4YmU1MTM3MDJhMDE4ZThiN2JlNTM1NmEwNGJiYzcyZGFhNjpzZXNzaW9uX2lkPTFfTVg0ME5UYzFNRGN4TW41LU1UUTRORFl6T0RJeE5qRXpNSDV2Wm5FNFdWVjVNMkZvUVVsMmNHaGtZbU40YkRabVVGbC1mZyZjcmVhdGVfdGltZT0xNDg0NjYwMzg3Jm5vbmNlPTAuMjQ0NTg4NTg2NjU4OTA0MTUmcm9sZT1zdWJzY3JpYmVyJmV4cGlyZV90aW1lPTE0ODUyNjUxODY=';
  // T1==cGFydG5lcl9pZD00NTc1MDcxMiZzaWc9Zjc3OWM4YmU1MTM3MDJhMDE4ZThiN2JlNTM1NmEwNGJiYzcyZGFhNjpzZXNzaW9uX2lkPTFfTVg0ME5UYzFNRGN4TW41LU1UUTRORFl6T0RJeE5qRXpNSDV2Wm5FNFdWVjVNMkZvUVVsMmNHaGtZbU40YkRabVVGbC1mZyZjcmVhdGVfdGltZT0xNDg0NjYwMzg3Jm5vbmNlPTAuMjQ0NTg4NTg2NjU4OTA0MTUmcm9sZT1zdWJzY3JpYmVyJmV4cGlyZV90aW1lPTE0ODUyNjUxODY=
  // private _token1: string = 'T1==cGFydG5lcl9pZD00NTc1MDcxMiZzaWc9N2EzZjY5ZTgwMjQ1ZDY1MGY2YTZhM2U5N2M2NGQ4ZGViZmJlYmEyZTpzZXNzaW9uX2lkPTFfTVg0ME5UYzFNRGN4TW41LU1UUTRORFl6T0RJeE5qRXpNSDV2Wm5FNFdWVjVNMkZvUVVsMmNHaGtZbU40YkRabVVGbC1mZyZjcmVhdGVfdGltZT0xNDg0NjM4OTY4Jm5vbmNlPTAuMzM0MDgxMzc1MDY0MzM1MiZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTQ4NTI0Mzc2NQ==';
  
  private session: TNSOTSession;
  private sessionSub: TNSOTSession;
  private subscriberObject: TNSOTSubscriber;
  private publisherObject: TNSOTPublisher;
  private token: string;

    @ViewChild("publisher") publisher: ElementRef;
    @ViewChild("subscriber") subscriber: ElementRef;

  // constructor(private router: Router, private page: Page) {
  // }

  // ngOnInit() {
  //   this.page.actionBarHidden = true;
  // }

    constructor() {
        this.session = TNSOTSession.initWithApiKeySessionId(this._apiKey, this._sessionIdRelayed);
        // this.subscriberObject = this.subscriber.nativeElement;
        // this.publisherObject = this.publisher.nativeElement;
        // this.session.subscriber = this.subscriberObject;
        // this.sessionSub = TNSOTSession.initWithApiKeySessionId(this._apiKey, this._sessionId);
        if(platformModule.device.model == 'ONEPLUS A3003'){
          this.token = this._tokenRelP;
        }else{
          this.token = this._tokenRelS;
        }
        console.log("Device model: " + platformModule.device.model);
        console.log('<<<<<<<<<<<<<<<<<<<<, token used: '+this.token);

    }

    ngOnInit() {
      console.log('ngOnInit');
        // this.session.subscriber = this.subscriber.nativeElement;
        // this.session.connect(this._token);
        // let publisher:TNSOTPublisher = this.publisher.nativeElement;

        // publisher.publish(this.session);
        // // console.dump(this.session);

        // this.session.events.on('connectionCreated', (data) => {
        //   console.dump(data);
        //   // connectionCreated
        //   // this.subscriber.nativeElement.subscribe(this.session);
        //   let subscriber:TNSOTSubscriber = this.subscriber.nativeElement;
        //   // subscriber.subscribe(this.session, data.object.get('stream'));
        //   console.log('connectionCreated');
        // });        
        // // let subscriber:TNSOTSubscriber = this.subscriber.nativeElement;
        // // subscriber.subscribe(this.session);

          // let subscriber:TNSOTSubscriber = this.subscriber.nativeElement;
          // subscriber.subscribe(this.session, );  
          // 
          if(platformModule.device.model == 'ONEPLUS A3003') {

            this.session.subscriber = this.subscriber.nativeElement;
            this.session.connect(this.token);
            let publisher:TNSOTPublisher = this.publisher.nativeElement;
            publisher.publish(this.session, '', 'HIGH', '30');

            // this.session.events.on('streamCreated', (data) => {
            //     this.subscriber.subscribe(this.session);
            // });

            this.session.events.on('streamReceived', (data) => {
              console.dump(data.object.get('stream'));
              // connectionCreated
              // this.subscriber.nativeElement.subscribe(this.session);
              // let subscriber:TNSOTSubscriber = this.subscriber.nativeElement;
              // console.dump(subscriber);
              // // subscriber.setVideoActive(true);
              // subscriber.subscribe(this.session, data.object.get('stream'));

              // this.session.subscriber.subscribe(this.session, data.object.get('stream'))
              
              console.log('streamCreated');
            });
          }else{
            this.session.subscriber = this.subscriber.nativeElement;
            this.session.connect(this.token);
            // let publisher:TNSOTPublisher = this.publisher.nativeElement;
            // publisher.publish(this.session);

            this.session.events.on('streamCreated', (data) => {
              console.dump(data.object.get('stream'));
              // connectionCreated
              // this.subscriber.nativeElement.subscribe(this.session);
              let subscriber:TNSOTSubscriber = this.subscriber.nativeElement;
              subscriber.subscribe(this.session, data.object.get('stream'));
              console.log('streamCreated');
            });            
          }                       
    }

  // constructor() {
  //   this.session = TNSOTSession.initWithApiKeySessionId(this._apiKey, this._sessionId);
  // }

  // ngOnInit() {

  //       this.session.events.on('streamCreated', (data) => {
  //         console.dump(data.object.get('stream'));
  //         // connectionCreated
  //         // this.subscriber.nativeElement.subscribe(this.session);
  //         let subscriber:TNSOTSubscriber = this.subscriber.nativeElement;
  //         subscriber.subscribe(this.session, data.object.get('stream'));
  //         console.log('streamCreated');
  //       });

  //   this.session.subscriber = this.subscriber.nativeElement;
  //   this.session.connect(this._token);
  //   let publisher: TNSOTPublisher = this.publisher.nativeElement;
  //   publisher.publish(this.session);
  // }

    // publish() {
    //     this.session.connect(this._token);
    //     this.publisherObject.publish(this.session, '', 'HIGH', '30');
    // }

    // switchCamera() {
    //     this.publisherObject.cycleCamera();
    // }

    // toggleVideo() {
    //     this.publisherObject.toggleCamera()
    // }

    // toggleMute() {
    //     this.publisherObject.toggleMute();
    // }

    // unpublish() {
    //     this.publisherObject.unpublish(this.session);
    // }

    // unsubscribe() {
    //     this.subscriberObject.unsubscribe(this.session);
    // }

    // disconnect() {
    //     this.session.disconnect();
    // }

}
