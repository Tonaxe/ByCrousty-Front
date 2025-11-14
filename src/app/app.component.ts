import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private navCtrl: NavController, private auth: AuthService) {
    // On each navigation start (except when going to login), validate the session
    this.router.events
      .pipe(
        filter((e: any) => e instanceof NavigationStart),
        takeUntil(this.destroy$)
      )
      .subscribe((ev: NavigationStart) => {
        const url = ev.url?.split('?')[0] || '';
        if (url === '/login' || url === '/logout') return; // skip checks for login/logout

        // Validate session; if invalid, logout and redirect to login
        this.auth.checkSession().subscribe((ok) => {
          if (!ok) {
            this.auth.logout();
            // Use Ionic NavController to reset navigation stack and show login page reliably
            this.navCtrl.navigateRoot('/login');
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
