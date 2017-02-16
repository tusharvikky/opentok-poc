// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import { registerElement } from 'nativescript-angular/element-registry';

registerElement('TNSOTPublisher', () => require('nativescript-opentok').TNSOTPublisher);
registerElement("TNSOTSubscriber", () => require("nativescript-opentok").TNSOTSubscriber);

platformNativeScriptDynamic().bootstrapModule(AppModule);