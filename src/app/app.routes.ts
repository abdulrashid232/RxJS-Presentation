import { Routes } from '@angular/router';
import { RxjsPresentationComponent } from './rxjs-presentation/rxjs-presentation.component';
import { BasicOperatorsDemoComponent } from './demos/basic-operators-demo/basic-operators-demo.component';
import { SearchInputDemoComponent } from './demos/search-input-demo/search-input-demo.component';
import { SwitchmapSearchDemoComponent } from './demos/switchmap-search-demo/switchmap-search-demo.component';
import { SubscriptionManagementDemoComponent } from './demos/subscription-management-demo/subscription-management-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/presentation', pathMatch: 'full' },
  { path: 'presentation', component: RxjsPresentationComponent },
  { path: 'demos/basic-operators', component: BasicOperatorsDemoComponent },
  { path: 'demos/search-input', component: SearchInputDemoComponent },
  { path: 'demos/switchmap-search', component: SwitchmapSearchDemoComponent },
  {
    path: 'demos/subscription-management',
    component: SubscriptionManagementDemoComponent,
  },
];
