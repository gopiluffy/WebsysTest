import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IntegrationService } from '../../../../right-panel/integration-instance/integration.service';
import { DialogContentComponent } from '../../dialog-content.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DIIntegrationInfoModel } from '../../../Models/diintegration-info-model.model';
import { IntegrationInfoModel } from '../../../Models/integration-info-model.model';
import { ErrorDialogComponent } from '../../Error-Dialog/error-dialog.component';

@Component({
  selector: 'app-create-integration',
  templateUrl: './create-integration.component.html',
  styleUrl: '../../Common/integration.css',
})

export class CreateIntegrationComponent implements OnInit {

  @Output() navigateToCreateConnectionParameter = new EventEmitter<void>();
  integrationInfoModel: IntegrationInfoModel;
  formData: any = null;
  data: any;
  ErrorMsg = '';

  constructor( private IS: IntegrationService, private fb: FormBuilder, private dialog: MatDialog, public dialogRef: MatDialogRef<DialogContentComponent>) {
    this.integrationInfoModel = new IntegrationInfoModel();
  }

  ngOnInit(): void {
    this.initializeFormData();
    const data = this.IS.getData();
    if (data) {
   const parsedData = JSON.parse(JSON.stringify(this.data));
      this.formData.patchValue(parsedData);
    }
        this.formData.get('aumodCode').valueChanges.subscribe((value: string) => {
      this.checkValue(value);
    });
    this.checkValue(this.formData.get('aumodCode').value);
  }

  private initializeFormData(): void {
    this.formData = this.fb.group({
      oid: [0],
      code: ['', Validators.required],
      _ExtAppName: [''],
      displayName: ['', Validators.required],
      description: [''],
      agtypCode: ['', Validators.required],
      cType: ['iSOFT.LORENZO.ContextAgents.WebContextAgent,LorWebContextAgent'],
      aumodCode: ['0'],
      delPluginIds: [''],
      delAppIds: [''],
      extLoginID: [{ value: '', disabled: true }],
      extPassword: [{ value: '', disabled: true }],
      isApplyADSCredentials: [false],
      isloginMandatory: [{ value: false, disabled: true }],
      isAllowOverride: [{ value: false, disabled: true }],
      ownerOrganisationOID: [0],
      isUserDefined: [false],
      apps: this.fb.array([]),
      authenticationMode: this.fb.array([]),
      agentTypes: this.fb.array([]),
      classsTypes: this.fb.array([]),
      pluginTypes: this.fb.array([]),
    });
  }

  checkValue(value: string): void {
    const controls = ['extLoginID', 'extPassword', 'isloginMandatory', 'isAllowOverride'].map(c => this.formData.get(c));
    const [extLoginIDCtrl, extPasswordCtrl, isloginMandatoryCtrl, isAllowOverrideCtrl] = controls;

    if (value === '0') {
      extLoginIDCtrl.disable();
      extPasswordCtrl.disable();
      isloginMandatoryCtrl.disable();
      isAllowOverrideCtrl.disable();
    } 
    else if (value === '2') {
      extLoginIDCtrl.disable();
      extPasswordCtrl.disable();
      isloginMandatoryCtrl.disable();
      isAllowOverrideCtrl.enable();
    } 
    else {
      extLoginIDCtrl.enable();
      extPasswordCtrl.enable();
      isloginMandatoryCtrl.enable();
      isAllowOverrideCtrl.enable();
    }
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

  onCancel(): void {
    this.ErrorMsg = 'You are about to cancel this activity, are you sure?';
    this.errorDialog(false);
  }

  onNext(): void {
    const fieldLabels = { displayName: 'Name', code: 'Code', agtypCode: 'Integration type' };
    const missingFields = Object.entries(fieldLabels)
      .filter(([key]) => !this.formData.get(key)?.value)
      .map(([, label]) => label);

    if (missingFields.length) {
      this.ErrorMsg = `Please enter the value for '${missingFields.join(', ')}' field${missingFields.length > 1 ? 's' : ''}.`;
      return this.errorDialog(true);
    }

    if (this.formData.invalid) {
      return this.formData.markAllAsTouched();
    }

    const formValue = this.formData.value;

    this.checkIntegration(formValue.displayName, formValue.code, (exists: string) => {
      if (exists === 'name' || exists === 'code') {
        this.ErrorMsg = `Values entered for '${exists === 'name' ? 'Name' : 'Code'}' field already exist.`;
        return this.errorDialog(true);
      } else {
        const newIntegrationData = new DIIntegrationInfoModel(
          formValue.oid,
          formValue.code,
          formValue._ExtAppName,
          formValue.displayName,
          formValue.displayName,
          formValue.agtypCode,
          formValue.apps,
          formValue.authenticationMode,
          formValue.agentTypes,
          formValue.classsTypes,
          formValue.pluginTypes,
          formValue.cType,
          formValue.aumodCode,
          formValue.delPluginIds,
          formValue.delAppIds,
          formValue.extLoginID,
          formValue.isApplyADSCredentials,
          formValue.extPassword,
          formValue.isloginMandatory,
          formValue.isAllowOverride,
          formValue.ownerOrganisationOID,
          formValue.isUserDefined
        );

        this.IS.setData(newIntegrationData);
        this.navigateToCreateConnectionParameter.emit();
      }
    });
  }

  checkIntegration(IName: string, ICode: string, callback: (exists: string) => void): void {
    this.IS.isIntegrationAlreadyExist(IName, ICode).subscribe(
      (response) => {
        if (response === 1) {
          callback('name');
        } else if (response === 2) {
          callback('code');
        } else {
          callback('none');
        }
      },
      (error) => {
        console.error('Error checking integration:', error);
      }
    );
  }
}
