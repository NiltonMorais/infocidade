import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NavController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { UploadPage } from '../upload/upload';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public tipos: any[];

  constructor(
        public navCtrl: NavController, 
        public loadingCtrl: LoadingController,
        private http: Http) {
  }

  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    this.http.get('http://189.16.249.117/InfocidadeAPI/InfocidadeAPI/api/tipo')
      .map((res: Response) => {
        loading.dismiss();
        return res.json() || {};
      })
      .subscribe(tipos =>{
        this.tipos = tipos;
      })
  }

  itemSelected(tipo) {
    console.log("Selected Item", tipo);
    this.navCtrl.push(UploadPage, {id: tipo.ID_TIPO});
  }
}
