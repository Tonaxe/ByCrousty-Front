import { Component } from '@angular/core';
import { NavController, IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private auth: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  onScan() {
    // Navigate to scan page. Using NavController.navigateRoot to match Home behaviour
    this.navCtrl.navigateRoot('/scan');
  }

  async onNotifications() {
    // simple alert to show notifications (static for now)
    const alert = await this.alertCtrl.create({
      header: 'Notificaciones',
      message: 'No hay nuevas notificaciones',
      buttons: ['OK'],
    });
    await alert.present();
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

  logout() {
    this.auth.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
