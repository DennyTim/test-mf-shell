import {loadRemoteModule} from '@angular-architects/module-federation';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";

const URL = 'http://localhost:3000/remoteEntry.js';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'flights',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: URL,
      exposedModule: './Module'
    })
      .then(m => m.FlightsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
