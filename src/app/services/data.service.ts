import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})


export class DataService {
  item: any;

  constructor(private db: AngularFireDatabase) {
    
  }
  getSumData(){
    return this.db.object(`ESP32_Device/IRTemperature/ContinuousDataRT`).valueChanges();
  }

 


}
