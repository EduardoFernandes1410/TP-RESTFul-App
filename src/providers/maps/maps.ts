import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapOptions, GoogleMapsEvent, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { HTTP } from '@ionic-native/http';
import { BanheirosProvider } from '../banheiros/banheiros';
import { RatesProvider } from '../rates/rates';

@Injectable()
export class MapsProvider {
  private banheiros;
  map: GoogleMap[] = new Array<GoogleMap>();

  constructor(
    private googleMaps: GoogleMaps,
    private banheirosProvider: BanheirosProvider,
    private ratesProvider: RatesProvider,
    private http: HTTP
  ) {
    this.banheiros = this.banheirosProvider.getBanheiros();
  }
    
  // Carrega mapa na tela
  public loadMap(location: any, div: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: location.lat,
            lng: location.lng
          },
          zoom: 17,
          tilt: 0
        }
      };
      this.map[div] = new GoogleMap(div, mapOptions);
      
      //Quando mapa estiver pronto
      this.map[div].one(GoogleMapsEvent.MAP_READY).then(() => {
        this.map[div].setMyLocationEnabled(true);
        this.map[div].setIndoorEnabled(true);
        this.map[div].setCompassEnabled(true);
        this.map[div].setClickable(true);      
        
        // Resolve a promessa
        resolve();
      });
    });
  }
  
  // Adiciona listener para criacao de banheiro
  public pegarClick(div: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.map[div].one(GoogleMapsEvent.MAP_CLICK).then((data) => {
        resolve(JSON.parse(data));
      });
    })
  }
        
  
  //Adiciona marcadores dos banheiros
  public showBanheirosOnMap(div: string): Promise<any> {
    return new Promise((resolve, reject) => {
    	this.banheiros.forEach((elem) => {
        elem.forEach((banheiro) => {
          this.ratesProvider.bathroomAvgRate(banheiro.key).then((data) => {
            this.map[div].addMarker({
              title: banheiro.nome,
              snippet:  "Nota: " + data.toFixed(1) + '\n' + banheiro.comentario + '\n\n' + "Clique para avaliar",
              draggable: false,
              position: {
                lat: banheiro.lat,
                lng: banheiro.lng
              },
              icon: {
                url: "./assets/imgs/poop.png",
                size: {
                  height: 35,
                  width: 35
                }
              }
            }).then((marcador) => {
              marcador.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
                resolve(banheiro);
              });
            });
          });
        })
      });
    });
  }
  
  // Adiciona marcador ao mapa
  public adicionarMarcador(div: string, location: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let marcador = this.map[div].addMarker({
        animation: 'DROP',
        position: {
          lat: location.lat,
          lng: location.lng
        }
      }).then(() => {
        resolve();
      });
    });
  }
  
  // Centraliza posicao do usuario
  public goToLocation(div: string, location: any): void {
    this.map[div].animateCamera({
      target: {
        lat: location.lat,
        lng: location.lng
      },
      zoom: 17,
      duration: 500
    });
  }
  
  // Pegar endereco pelas coordenadas
  public getAddress(location: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let data = {
        latlng: location.lat + "," + location.lng,
        key: "AIzaSyC6u9oRW_qMy4A32mwRCke4CQfwMc72qjQ"
      };
      
      let url = "https://maps.googleapis.com/maps/api/geocode/json";
      
      this.http.get(url, data, {}).then((data) => {
        let response = JSON.parse(data.data);
        // Resolve
        resolve(response["results"][0]["formatted_address"]);
      }).catch((error) => {
        reject();
      });
    });
    
  }
}
