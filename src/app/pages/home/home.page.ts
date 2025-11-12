import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private navCtrl: NavController, private alertCtrl: AlertController) { }

  scanQr() {
    this.navCtrl.navigateRoot('/scan');
  }

  async verPedidos() {
    const alert = await this.alertCtrl.create({
      header: 'Pedidos',
      message: 'Aquí se mostrará la lista de pedidos pendientes.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
