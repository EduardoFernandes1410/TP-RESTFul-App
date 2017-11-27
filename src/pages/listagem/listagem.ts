import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BanheirosProvider } from '../../providers/banheiros/banheiros';
import { RatesProvider } from '../../providers/rates/rates';
import { MapsProvider } from '../../providers/maps/maps';
import { BanheiroInfoPage } from '../banheiro-info/banheiro-info';

@IonicPage()
@Component({
  selector: 'page-listagem',
  templateUrl: 'listagem.html',
})
export class ListagemPage {
	private banheiros;
  private notas: Array<number> = new Array<number>();

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private banheirosProvider: BanheirosProvider,
    private ratesProvider: RatesProvider,
  	private mapsProvider: MapsProvider
  ) {
		this.pegarDados();
  }

  ionViewDidLoad() {
  	// 
  }
  
  private pegarDados() {
    this.banheiros = this.banheirosProvider.getBanheiros();
    
    // Pega a media das notas
    this.banheiros.forEach((elem) => {
      elem.forEach((elem, index) => {
        this.ratesProvider.bathroomAvgRate(elem.key).then((data) => {
          this.notas[index] = data;
        });
      })
    });
  }
  
  public doRefresh(refresher) {
    this.pegarDados();
    
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }
  
  public goToAvaliar(banheiro: any) {
    this.navCtrl.setRoot(BanheiroInfoPage, {banheiro: banheiro});
  }
  
  public goToMapa(banheiro: any) {
    this.mapsProvider.goToLocation('map', {lat: banheiro.lat, lng: banheiro.lng});
    this.navCtrl.parent.select(0);
  }

}
