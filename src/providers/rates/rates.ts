import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RatesProvider {
  ratesRef: AngularFireList<any>
  rates: Observable<any[]>

  constructor ( db: AngularFireDatabase ) {
    this.ratesRef = db.list('rates')
    // Use snapshotChanges().map() to store the key
    this.rates = this.ratesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    });
  } 

  public getRates () {
    this.rates.forEach((elem) => {
      return elem;
    });
  }
  
  public addRate (data) {
    this.ratesRef.push(data)
	}

  public getRatesByBathroom (bathroom_key): Promise<any> {
    return new Promise((resolve, reject) => {
      let filtro: Array<any>;
      
      this.rates.forEach((elem) => {
        filtro = elem.filter((rate) => {
          return rate.bathroom_key === bathroom_key;
        });
        
        resolve(filtro);
      });
    });
  }
  
  public bathroomAvgRate (bathroomKey): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getRatesByBathroom(bathroomKey).then((data) => {
          console.log(data);
        if(data.length == 1) {
          resolve(data[0].rate);
        } else {
          let sum = data.reduce((a, b) => ({rate: a.rate + b.rate}));
          resolve(sum.rate / data.length);
        }
        
      });
    })
    
  }
  
  // public getRatesByUser (userId) {
  //   return this.rates.filter(rate => rate.user_id === userId)
  // }

  // public bathroomRateByUser (bathroomKey, userId) {
  //   let userRateArray = getRatesByBathroom(bathroomKey).filter(rate => rate.user_id === userId)
  //   return userRateArray.length > 0 ? userRateArray[0].rate : 0
  // }
  
}
