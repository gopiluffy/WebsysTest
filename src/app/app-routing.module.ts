import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationInstanceComponent } from './layout/right-panel/integration-instance/integration-instance.component';
import { UserLoginMappingComponent } from './layout/right-panel/user-login-mapping/user-login-mapping.component';
import { IntegrationComponent } from './layout/left-panel/dialog-content/Manage-Integration/integration/integration.component';
import { ConnectionParameterComponent } from './layout/left-panel/dialog-content/Manage-Integration/connection-parameter/connection-parameter.component';

const routes: Routes = [
  { path: 'integration-instance', component: IntegrationInstanceComponent },
  { path: 'user-login-mapping', component: UserLoginMappingComponent },
  { path: 'integration', component: IntegrationComponent},
  { path: 'connection-parameter', component: ConnectionParameterComponent },
  { path: '', redirectTo: '/integration-instance', pathMatch: 'full' },
  { path: '**', redirectTo: '/integration-instance' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }