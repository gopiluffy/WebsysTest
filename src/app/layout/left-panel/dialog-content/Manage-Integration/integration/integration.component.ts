import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IntegrationService } from '../../../../right-panel/integration-instance/integration.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogContentComponent } from '../../dialog-content.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../Error-Dialog/error-dialog.component';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrl: '../../Common/integration.css'
})

export class IntegrationComponent implements OnInit {

  @Output() navigateToConnectionParameter = new EventEmitter<void>();
  integrationForm: FormGroup;
  formData: any = null;
  ErrorMsg = "";

  constructor( private integrationService: IntegrationService, private fb: FormBuilder, public dialogRef: MatDialogRef<DialogContentComponent>, public dialog: MatDialog) {
    this.integrationForm = this.fb.group({
      oid: [''],
      code: [''],
      displayName: [''],
      description: [''],
      agtypCode: [''],
      cType: [''],
      aumodCode: [''],
      apps: this.fb.array([]),
      authenticationMode: this.fb.array([]),
      agentTypes: this.fb.array([]),
      classsTypes: this.fb.array([]),
      pluginTypes: this.fb.array([]),
      delPluginIds: [''],
      delAppIds: [''],
      extLoginID: [''],
      extPassword: [''],
      isApplyADSCredentials: [''],
      isloginMandatory: [''],
      isAllowOverride: [''],
      ownerOrganisationOID: [''],
      isUserDefined: ['']
    });
  }

  ngOnInit(): void {
    const oid = this.integrationService.selectedOid;
    this.integrationService.getIntegrationData(Number(oid)).subscribe(response => {
        this.formData = response;
        this.integrationService.setData(this.formData);
        this.populateForm(response);
      });
  }

  populateForm(data: any) {
    this.integrationForm.patchValue({
      oid: data.oid,
      code: data.code,
      displayName: data.displayName,
      description: data.description,
      agtypCode: data.agtypCode,
      cType: data.cType,
      aumodCode: data.aumodCode,
      delPluginIds: data.delPluginIds,
      delAppIds: data.delAppIds,
      extLoginID: data.extLoginID,
      extPassword: data.extPassword,
      isApplyADSCredentials: data.isApplyADSCredentials,
      isloginMandatory: data.isloginMandatory,
      isAllowOverride: data.isAllowOverride,
      ownerOrganisationOID: data.ownerOrganisationOID,
      isUserDefined: data.isUserDefined
    });
    this.setFormArray('apps', data.apps);
    this.setFormArray('authenticationMode', data.authenticationMode);
    this.setFormArray('agentTypes', data.agentTypes);
    this.setFormArray('classsTypes', data.classsTypes);
    this.setFormArray('pluginTypes', data.pluginTypes);
  }

  setFormArray(arrayName: string, arrayData: any[]) {
    const formArray = this.integrationForm.get(arrayName) as FormArray;
    formArray.clear();
    arrayData.forEach(item => {
      formArray.push(this.fb.group(item));
    });
  }

  errorDialog(IsErrorType: any): void {
    const errorDialogRef = this.dialog.open(ErrorDialogComponent, {
      disableClose: true,
      data: { errorMessage: this.ErrorMsg, IsError: IsErrorType },
    });
    
    errorDialogRef.componentInstance.confirmed.subscribe((result: boolean) => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }

  Next(): void {
    this.integrationService.setData(this.formData);
    this.navigateToConnectionParameter.emit();
  }

  onCancel():void{
    this.ErrorMsg = "You are about to cancel this activity, are you sure?"
    this.errorDialog(false);
  }
    
  close(): void{
    this.dialogRef.close();
  }

  onFinishNow(): void {
    if (this.integrationForm.valid) {
      this.integrationService.createOrUpdateIntegration(this.formData).subscribe(
        response => {
          this.close();
          },
          (error: HttpErrorResponse) => {
            alert('Error saving data. Please try again.');
          }
        );
    } else {
      alert('No data to save!');
    }
  }
}
