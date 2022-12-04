import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatTabsModule} from '@angular/material/tabs';

import { ngxNavbarAnimations, NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { ChampionsComponent } from './components/pages/champions/champions.component';
import { CompsComponent } from './components/pages/comps/comps.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { ToplistComponent } from './components/pages/toplist/toplist.component';
import { PatchesComponent } from './components/pages/patches/patches.component';
import { MatchcontComponent } from './components/pages/homepage/components/matchcont/matchcont.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatButtonModule} from '@angular/material/button';
import { CumbaButtonComponent } from './components/cumba-button/cumba-button.component';
import { LeagueboxComponent } from './components/pages/homepage/components/leagueBox/leaguebox.component';
import { ChampstatsboxComponent } from './components/pages/homepage/components/champstatsBox/champstatsbox.component';
import { LanestatsboxComponent } from './components/pages/homepage/components/lanestatsBox/lanestatsbox.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    ChampionsComponent,
    CompsComponent,
    StatisticsComponent,
    ToplistComponent,
    PatchesComponent,
    MatchcontComponent,
    CumbaButtonComponent,
    LeagueboxComponent,
    ChampstatsboxComponent,
    LanestatsboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgxNavbarModule,
    BsDropdownModule,
    MatButtonModule,
    MatTabsModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
