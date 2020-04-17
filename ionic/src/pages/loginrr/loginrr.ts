import { Component, Renderer, NgZone, NgModule } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { DataStore } from "../../app/dataStore";
import ChallengeHandler from "../../componentScripts/challengeHandler";
import { LiveUpdateProvider } from "../../providers/live-update/live-update";

@Component({
  selector: "page-loginrr",
  templateUrl: "loginrr.html"
})

@NgModule({
  providers: [
    LiveUpdateProvider
  ]
})

export class LoginrrPage {
  constructor(public navCtrl: NavController, public renderer: Renderer, public dataStore: DataStore, public liveUpdateService: LiveUpdateProvider) {
    this.challengeHandlerComponent = new ChallengeHandler(this.securityCheckName, (err) => { if (!err) { this.navCtrl.push(this.challHandlerSuccessPage); } });
  }

  challengeHandlerComponent: ChallengeHandler;
  username: string;
  password: string;

  login() {
    this.challengeHandlerComponent.login(this.username, this.password);
    (this.dataStore as any).username = this.username;
  }

  securityCheckName = "UserLogin";
  challHandlerSuccessPage = null;

    ionViewDidLoad() {
        WL.Analytics.log({ fromPage: this.navCtrl.getPrevious(this.navCtrl.getActive()).name, toPage: this.navCtrl.getActive().name }, 'PageTransition ');
        WL.Analytics.send();
    }
 //Provide the Page that needs to navigate to 
}