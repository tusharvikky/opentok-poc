import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";
import platformModule = require("platform");
import * as dialogs from "ui/dialogs";
import {TNSOTSession, TNSOTPublisher, TNSOTSubscriber} from "nativescript-opentok";

@Component({
	selector: 'opentok',
	templateUrl: 'pages/opentok/opentok.component.html',
	styleUrls: ['pages/opentok/opentok.component.css']
})

export class OpentokComponent implements OnInit {

	private _apiKey: string = '45750712';
	private _sessionIdRelayed: string = '1_MX40NTc1MDcxMn5-MTQ4NDY2MDg4OTM4Nn50VEdabDVzT2ZwTGNrNm12b0NRNEFsK09-UH4';
	private _tokenRelP: string = 'T1==cGFydG5lcl9pZD00NTc1MDcxMiZzaWc9OTJkNmNmNTEwYTgyMWIyMGYzY2IxMDM4OTJkM2Y5NDg2ZmE4Mzc5ZjpzZXNzaW9uX2lkPTFfTVg0ME5UYzFNRGN4TW41LU1UUTRORFkyTURnNE9UTTRObjUwVkVkYWJEVnpUMlp3VEdOck5tMTJiME5STkVGc0swOS1VSDQmY3JlYXRlX3RpbWU9MTQ4NTMzMzc1MyZub25jZT0wLjA5NjMzNzQwMzA1NjEyMDE1JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE0ODU5Mzg1NTI=';

	private session: TNSOTSession;
	private token: string;

	@ViewChild("publisher") publisher: ElementRef;
	@ViewChild("subscriber") subscriber: ElementRef;

    constructor() {
        this.session = TNSOTSession.initWithApiKeySessionId(this._apiKey, this._sessionIdRelayed);
    }

    ngOnInit() {
        this.session.subscriber = this.subscriber.nativeElement;
        this.session.connect(this._tokenRelP);
        let publisher:TNSOTPublisher = this.publisher.nativeElement;
        publisher.publish(this.session, '', 'HIGH', '30');

            this.session.events.on('streamReceived', (data) => {
              console.dump(data.object.get('stream'));
            //   // connectionCreated
            //   // this.subscriber.nativeElement.subscribe(this.session);
            //   let subscriber:TNSOTSubscriber = this.subscriber.nativeElement;
            //   console.dump(subscriber);
            //   // subscriber.setVideoActive(true);
            //   this.session.subscribe(subscriber);
            this.session.subscriber.subscribe(this.session, data.object.get('stream'));
              
              console.log('streamCreated');
            });		
    }
}