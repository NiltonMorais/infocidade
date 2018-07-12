import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '../../../node_modules/@angular/http';

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  imageURI:any;
  imageFileName:any;
  ID_TIPO:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    this.ID_TIPO = navParams.get('id');
  }

  getImage(type) {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: type == 0 ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: this.camera.MediaType.PICTURE,
  }
  
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //this.imageURI = imageData;
      this.imageURI = base64Image;
    }, (err) => {
      console.log("erro no getPicture()");
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();/*
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'imagem',
      fileName: 'imagem.jpeg',
      chunkedMode: false,
      httpMethod: "POST",
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://127.0.0.1:8000/api/teste', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log("erro no upload()");
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    }); */

    let data = {
      ID_TIPO: this.ID_TIPO,
      image: this.imageURI,
    };
    
    this.http.post('http://127.0.0.1:8000/api/teste', data).subscribe(
      (result) => {
        console.log("success!");
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );

    loader.dismiss();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.present();
  }
}
