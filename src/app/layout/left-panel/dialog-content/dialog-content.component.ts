import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IntegrationService } from '../../right-panel/integration-instance/integration.service';
import { CreateIntegrationComponent } from './Create-Integration/create-integration/create-integration.component';
import { CreateConnectionParameterComponent } from './Create-Integration/create-connection-parameter/create-connection-parameter.component';
import { IntegrationComponent } from './Manage-Integration/integration/integration.component';
import { ConnectionParameterComponent } from './Manage-Integration/connection-parameter/connection-parameter.component';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent {
  @ViewChild(CreateIntegrationComponent)
  createChildComponent!: CreateIntegrationComponent;

  @ViewChild(CreateConnectionParameterComponent)
  createChildComponent2!: CreateConnectionParameterComponent;
  
  @ViewChild(CreateIntegrationComponent)
  manageChildComponent!: IntegrationComponent;

  @ViewChild(CreateConnectionParameterComponent)
  manageChildComponent2!: ConnectionParameterComponent;

  showPopUp = true;
  field = '';
  data = '';

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    private IS: IntegrationService
  ) {
    this.field = dialogRef.id;
    this.data = this.IS.getData();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  NavigateTo_CP(): void {
    this.showPopUp = false;
  }
  NavigateTo_I(): void {
    this.showPopUp = true;
  }
  setActive(currentField: string, isPopUp: boolean): void {
    this.field = currentField;
    this.showPopUp = isPopUp;
  }
  isActive(currentField: string, isPopUp: boolean): boolean {
    return this.field === currentField && this.showPopUp === isPopUp;
  }
}
