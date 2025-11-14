import { Component, OnDestroy } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { BrowserQRCodeReader } from '@zxing/browser';

@Component({
  standalone: false,
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnDestroy {
  private codeReader: BrowserQRCodeReader | null = null;
  private stream: MediaStream | null = null;
  private videoElem: HTMLVideoElement | null = null;
  private initialized = false;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  async startScan() {
    try {
      if (!this.videoElem) {
        this.videoElem = document.getElementById('video') as HTMLVideoElement;
      }

      if (!this.initialized) {
        await this.prepareCamera();
        this.initialized = true;
        setTimeout(() => this.startScan(), 700);
        return;
      }

      this.codeReader = new BrowserQRCodeReader();
      const result = await this.codeReader.decodeOnceFromVideoDevice(undefined, 'video');

      this.stopScan();

      const qrText = result.getText();

      this.navCtrl.navigateRoot(`/cliente`, {
        state: { qrData: qrText }
      });

    } catch (err) {
      console.error('Error al escanear:', err);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo iniciar la cámara',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async prepareCamera() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });
    if (this.videoElem) {
      this.videoElem.srcObject = this.stream;
      await new Promise<void>((resolve) => {
        this.videoElem!.onloadedmetadata = () => {
          this.videoElem!.play();
          resolve();
        };
      });
    }
  }

  stopScan() {
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    this.codeReader = null;
    this.initialized = false;
  }

  goBack() {
    this.stopScan();
    this.navCtrl.navigateRoot('/home');
  }

  ngOnDestroy() {
    this.stopScan();
  }
}
