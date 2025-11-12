import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage {
  qrData: string | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.qrData = navigation?.extras?.state?.['qrData'] || null;
  }
}
