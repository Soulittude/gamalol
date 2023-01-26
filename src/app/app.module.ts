import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { ngxNavbarAnimations, NgxNavbarModule } from 'ngx-bootstrap-navbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { ChampionsComponent } from './components/pages/champions/champions.component';
import { CompsComponent } from './components/pages/comps/comps.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { ToplistComponent } from './components/pages/toplist/toplist.component';
import { PatchesComponent } from './components/pages/patches/patches.component';
import { ButtoncompComponent } from './components/buttoncomp/buttoncomp.component';
import { ChampSpecsComponent } from './components/pages/champions/champ-specs/champ-specs.component';
import { MatchBoxComponent } from './components/pages/homepage/components/match-box/match-box.component';
import { StatsBoxComponent } from './components/pages/homepage/components/stats-box/stats-box.component';
import { SumBoxComponent } from './components/pages/homepage/components/sum-box/sum-box.component';
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
    MatchBoxComponent,
    ButtoncompComponent,
    ChampSpecsComponent,
    StatsBoxComponent,
    SumBoxComponent,
  ],
  imports: [
    CommonModule,
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
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
