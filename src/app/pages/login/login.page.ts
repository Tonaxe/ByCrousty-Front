import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  async login() {
    if (this.email !== 'a' || this.password !== 'a') {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Credenciales incorrectas',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    this.navCtrl.navigateRoot('home', {
      animated: true,
      animationDirection: 'forward'
    });
  }
}
