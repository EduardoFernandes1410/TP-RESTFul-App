import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

  constructor(
  	private storage: Storage
 	) {
 		this.inicializa();
  }
  
  private gerarID(): string {
  	return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  private inicializa() {
  	this.storage.get('user_id').then((data) => {
			if(data === null) {
				this.storage.set('user_id', this.gerarID());
			}
  	});
  }
  
  public getUserId(): Promise<any> {
  	return new Promise((resolve, reject) => {
  		this.storage.get('user_id').then((data) => {
  			resolve(data);
  		})
  	});
  }
}
