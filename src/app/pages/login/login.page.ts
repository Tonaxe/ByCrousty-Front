import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

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
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private auth: AuthService
  ) { }

  // If user is already logged in and is admin, redirect away from login page
  ionViewWillEnter() {
    if (this.auth.isLoggedIn() && this.auth.isAdmin()) {
      this.navCtrl.navigateRoot('home');
    }
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...'
    });
    await loading.present();

    this.auth.login(this.email, this.password).subscribe({
      next: async (res) => {
        await loading.dismiss();
        // Expecting backend to return { user, token }
        const token = res?.token;
        const user = res?.user;
        if (token) {
          this.auth.setToken(token);
        }
        if (user) {
          this.auth.setUser(user);
        }

        // Allow navigation only if user is admin
        if (this.auth.isAdmin()) {
          this.navCtrl.navigateRoot('home', {
            animated: true,
            animationDirection: 'forward'
          });
        } else {
          // Not an admin: clear stored token/user and show message
          this.auth.logout();
          const alert = await this.alertCtrl.create({
            header: 'Access denied',
            message: 'You must be an administrator to access this app.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      error: async (err) => {
        await loading.dismiss();
        const message = err?.error?.message || 'Credenciales incorrectas';
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message,
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
