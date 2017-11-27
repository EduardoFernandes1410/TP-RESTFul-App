import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BanheirosProvider {
  banheirosRef: AngularFireList<any>
  banheiros: Observable<any[]>

  constructor ( db: AngularFireDatabase ) {
    this.banheirosRef = db.list('bathrooms')
    
    // Use snapshotChanges().map() to store the key
    this.banheiros = this.banheirosRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    })
  } 

  public getBanheiros () {
    return this.banheiros
  }

  public addBanheiro (data) {
    this.banheirosRef.push(data)
  }
  
  // public bathroomsByDistance (userLocation) {
  //   let dist = (x, y) => {
  //     let lat1 = x.lat
  //     let lon1 = x.lon
  //     let lat2 = y.lat
  //     let lon2 = y.lon

  //     function rad(radiano) {
  //       return radiano*Math.PI/180;
  //     }

  //     let R     = 6378.137;
  //     let dLat  = rad( lat2 - lat1 );
  //     let dLong = rad( lon2 - lon1 );

  //     let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  //     let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //     let d = R * c;

  //     return d.toFixed(6);
  //   }

  //   let compareDist = (b1, b2) => {
  //     if (dist(userLocation, b1) < dist(userLocation, b2))
  //       return -1;
  //     if (dist(userLocation, b1) > dist(userLocation, b2))
  //       return 1;
  //     return 0;
  //   }

  //   return this.banheiros.sort(compareDist)
  // }

  // Banheiros
  /*private banheirosNovos = [
    {
      lat: -19.876290,
      lng: -43.930687,
      name: "Cantinho da Bernardo"
    },
    {
      lat: -19.877208,
      lng: -43.932221,
      name: "Trono da Santa Helena"
    },
    {
      lat: -19.876636,
      lng: -43.932412,
      name: "Porcelana de Roma"
    },
    {
      lat: -19.876030,
      lng: -43.931710,
      name: "Banheiro do Monstro"
    },
  ];*/
}
