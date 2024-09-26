import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogContentComponent } from './layout/left-panel/dialog-content/dialog-content.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { LayoutComponent } from './layout/layout.component';
import { LeftPanelComponent } from './layout/left-panel/left-panel.component';
import { RightPanelComponent } from './layout/right-panel/right-panel.component';
import { IntegrationInstanceComponent } from './layout/right-panel/integration-instance/integration-instance.component';
import { UserLoginMappingComponent } from './layout/right-panel/user-login-mapping/user-login-mapping.component';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ConnectionParameterComponent } from './layout/left-panel/dialog-content/Manage-Integration/connection-parameter/connection-parameter.component';
import { IntegrationComponent } from './layout/left-panel/dialog-content/Manage-Integration/integration/integration.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateIntegrationComponent } from './layout/left-panel/dialog-content/Create-Integration/create-integration/create-integration.component';
import { CreateConnectionParameterComponent } from './layout/left-panel/dialog-content/Create-Integration/create-connection-parameter/create-connection-parameter.component';
import { MatRadioModule } from '@angular/material/radio';
import { ErrorDialogComponent } from './layout/left-panel/dialog-content/Error-Dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IntegrationInstanceComponent,
    UserLoginMappingComponent,
    LeftPanelComponent,
    RightPanelComponent,
    DialogContentComponent,
    ConnectionParameterComponent,
    IntegrationComponent,
    CreateIntegrationComponent,
    CreateConnectionParameterComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MatTableModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
