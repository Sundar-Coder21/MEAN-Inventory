import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationItem } from '../shared/interface/common-interface';
import { navigation } from '../shared/routes/app-navigation';
import { MatMenuModule } from '@angular/material/menu';
import { TooltipPosition } from '@angular/material/tooltip';
import { UtilityService } from '../shared/service/utility-service.service';
import { LocalStorageService } from '../shared/service/localstoreage.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    TitleCasePipe,
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatMenuModule,
    RouterLinkActive,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  menuItems: NavigationItem[] = []
  isHandset$!: Observable<boolean>;


  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    private store: LocalStorageService
  ) {

  }

  ngOnInit() {
    this.menuItems = navigation;
    this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.drawer?.mode === 'over') {
        this.drawer.close();
      }
    });
  }


  handleItemClick(item: string) {
    console.log('Clicked on', item);
    // Add your logic here based on which item was clicked
  }

  logout() {    
    this.store.clearStorage();
    this.router.navigateByUrl("/")
  }


}
