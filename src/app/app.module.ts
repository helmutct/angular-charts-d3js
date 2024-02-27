import 'pace';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from './pages/tools/guard/auth.guard';
import { AuthenticationService } from './common/services/authentication.service';
import { MenuComponent } from './common/components/menu/menu.component';
import { SidebarComponent } from './common/components/sidebar/sidebar.component';


import { DirectivesModule } from './common/directives/directives.module';
import { PipesModule } from './common/pipes/pipes.module';

import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { MessagesComponent } from './common/components/messages/messages.component';
import { BreadcrumbComponent } from './common/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from './common/components/back-top/back-top.component';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { ChatsModule } from './common/components/charts/chart.module';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PagesComponent,
    BlankComponent,
    NavbarComponent,
    MessagesComponent,
    BreadcrumbComponent,
    BackTopComponent,
    MenuComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    }),
    routing,
    DirectivesModule,
    PipesModule,
    ChatsModule,
    NgxChartsModule,
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AuthenticationService,
    { provide: LOCALE_ID, useValue: (document['locale'] ? document['locale'] : 'pt') }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
