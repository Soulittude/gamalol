import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionsComponent } from './components/pages/champions/champions.component';
import { CompsComponent } from './components/pages/comps/comps.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { RanklistComponent } from './components/pages/ranklist/ranklist.component';
import { RouterOutlet } from '@angular/router';
import { ChampSpecsComponent } from './components/pages/champions/champ-specs/champ-specs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'champions',
    component: ChampionsComponent
  },
  {
    path: 'champions/:name',
    component: ChampSpecsComponent
  },
  {
    path: 'comps',
    component: CompsComponent
  },
  {
    path: 'ranklist',
    component: RanklistComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
