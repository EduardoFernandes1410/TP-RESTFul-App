import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RatesProvider } from '../../providers/rates/rates';
import { UserProvider } from '../../providers/user/user';
import { StarRatingModule } from 'angular-star-rating';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-banheiro-info',
  templateUrl: 'banheiro-info.html',
})
export class BanheiroInfoPage {
	private banheiro: any;
	private nota: number;
	banheiroForm: FormGroup;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private alertCtrl: AlertController,
  	private formBuilder: FormBuilder,
  	public ratesProvider: RatesProvider,
  	private userProvider: UserProvider
  ) {
  	this.banheiro = this.navParams.get('banheiro');
  	// Pega nota
  	this.ratesProvider.bathroomAvgRate(this.banheiro.key).then((data) => {
  		this.nota = data;
  	});
  	
  	this.banheiroForm = formBuilder.group({
      estrelas: ['', [Validators.required]]
  	});
  }

  ionViewDidLoad() {
  }
  
  private adicionarNota(): void {
    let info = {
      bathroom_key: this.banheiro.key,
      user_id: null,
      rate: this.banheiroForm.value.estrelas
    };
    
    // Pega user_id
    this.userProvider.getUserId().then((data) => {
      info.user_id = data;
      
      // Adicionar nota
      this.ratesProvider.addRate(info);
      
      // Emite o alerta
	    let alert = this.alertCtrl.create({
	      title: 'Sucesso',
	      subTitle: 'Sua avaliação foi registrada!',
	      buttons: ['OK']
	    });
	    alert.present().then(() => {
		    this.navCtrl.parent.select(0);
	      this.navCtrl.setRoot(HomePage);
	    });
    });
  }
  
  public dismiss() {
    this.navCtrl.setRoot(HomePage);
  }

}
