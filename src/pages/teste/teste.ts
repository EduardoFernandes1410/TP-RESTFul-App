import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-teste',
  templateUrl: 'teste.html',
})
export class TestePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  banheiros;

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestePage');
    
    this.banheiros = this.navParams.data['banheiros'];
  }

}
