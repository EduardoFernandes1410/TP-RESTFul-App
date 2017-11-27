import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MapsProvider } from '../../providers/maps/maps';
import { BanheirosProvider } from '../../providers/banheiros/banheiros';
import { RatesProvider } from '../../providers/rates/rates';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { StarRatingModule } from 'angular-star-rating';

@IonicPage()
@Component({
  selector: 'page-criar-banheiro',
  templateUrl: 'criar-banheiro.html'
})
export class CriarBanheiroPage {
	criarBanheiroForm: FormGroup;
  private endereco: string;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private formBuilder: FormBuilder,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private mapsProvider: MapsProvider,
    private banheirosProvider: BanheirosProvider,
    private userProvider: UserProvider,
    private ratesProvider: RatesProvider
  ) {
  	this.criarBanheiroForm = formBuilder.group({
  		nome: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      comentario: ['', Validators.compose([Validators.maxLength(150), Validators.required])],
      estrelas: ['', [Validators.required]]
  	});
  }

  ionViewDidLoad() {
    let location = this.navParams.get('data');
    
    // Pegar endereco
    this.mapsProvider.getAddress(location).then((data) => {
      this.endereco = data;
    });

    this.mapsProvider.loadMap(location, 'mapaCriarBanheiro').then(() => {
      // Adicionar marcador
      this.mapsProvider.adicionarMarcador('mapaCriarBanheiro', location);
      this.mapsProvider.goToLocation('mapaCriarBanheiro', location);
    });
  }
  
  public criarBanheiro(): void {
    let data = this.criarBanheiroForm.value; 
    data.lat = this.navParams.get('data').lat;
    data.lng = this.navParams.get('data').lng;
    data.endereco = this.endereco;
    
    this.banheirosProvider.addBanheiro(data);
    
    this.adicionarNota(this.criarBanheiroForm.value.estrelas);
    
    // Emite o alerta
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: 'Seu novo banheiro foi criado com sucesso',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }
  
  private adicionarNota(nota: number): void {
    let banheiros = this.banheirosProvider.getBanheiros();
    let info = {
      bathroom_key: null,
      user_id: null,
      rate: nota
    };
    
    // Pega a key do banheiro recem criado
    banheiros.forEach((elem) => {
      info.bathroom_key = elem[elem.length - 1].key;
    });
    
    // Pega user_id
    this.userProvider.getUserId().then((data) => {
      info.user_id = data;
      
      // Adicionar nota
      this.ratesProvider.addRate(info);
    });
  }
  
  dismiss() {
    this.navCtrl.setRoot(HomePage);
  }
}
