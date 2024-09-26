import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IntegrationService } from '../../../../right-panel/integration-instance/integration.service';
import { DialogContentComponent } from '../../dialog-content.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { apps,diPolicyRule,pluginCol } from '../../../Models/diintegration-info-model.model';
import { IntegrationInfoModel } from '../../../Models/integration-info-model.model';
import { ErrorDialogComponent } from '../../Error-Dialog/error-dialog.component';

@Component({
  selector: 'app-connection-parameter',
  templateUrl: './connection-parameter.component.html',
  styleUrls: ['./connection-parameter.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ConnectionParameterComponent implements OnInit {
  // Data emit to parent
  @Output() navigateToIntegration = new EventEmitter<void>();
  // Property declaration
  data: any = null;
  tabSelected: number = 0;
  rowSelected: boolean = false;
  childRowSelected: boolean = false;
  expandedElement: any | null;
  selectedPluginType?: string;
  integrationInfoModel: IntegrationInfoModel;
  disableContextParams: boolean = false;
  product = [{ key: 'Rule type', values: [{ value: 'Permit' }, { value: 'Deny' }] }];
  ErrorMsg = "";
  
  // Data source
  gridDataSource: apps[] = [];
  dataSource: apps = Object();

  // Table column declaration
  columnsToDisplay = [
    'displayName',
    'modality',
    'multipleWindows',
    'displaySortOrder',
  ];
  childColumnsToDisplay = ['pluginClassType', 'order'];
  mainColumns = [
    { name: 'displayName', header: 'Display Name' },
    { name: 'modality', header: 'Modality' },
    { name: 'multipleWindows', header: 'Multiple Windows' },
    { name: 'displaySortOrder', header: 'Display Sort Order' },
  ];
  childColumns = [
    { name: 'pluginClassType', header: 'Plugin Class' },
    { name: 'order', header: 'Order' },
  ];


  constructor(private IS: IntegrationService, public dialogRef: MatDialogRef<DialogContentComponent>, public dialog:MatDialog) {
    this.integrationInfoModel = new IntegrationInfoModel();
  }

  dipolicy: diPolicyRule = {
    diIntegrationInfoOID: 0,
    dispfCode: '',
    effect: 0,
    extAppDescription: '',
    extAppDisplayName: '',
    extAppInfoOID: 0,
    extAppRule: '',
    extApplication: '',
    iconImage: '',
    inModCode: '',
    policyOID: 0,
    rutypcode: 'CC_PERMIT',
    sortorder: 0,
  };
  selectedRowData: any = {
    extAppDisplayName: '',
    invocationMode: 0,
    sortOrder: 1,
    isMultipleTypeInvocation: 0,
    useADSCredentials: false,
    pluginCol: [],
    diPolicyRule: this.dipolicy,
    agentType: 0,
    authenticationMode: 0,
    cItems: '',
    caClassType: '',
    diExtApploginInfoOID: 0,
    displayFormat: '',
    extAppDescription: '',
    extAppName: '',
    extLoginID: '',
    extPassword: '',
    iconImage: '',
    integrationCode: '',
    integrationInfoOID: 0,
    integrationInvocationMode: '',
    isAllowOverride: false,
    isUserDefined: false,
    isloginMandatory: false,
    OID: 0,
    organisationOID: 0,
    pluginInfoCollection: [],
    status: '',
    typeofInvocation: '',
  };

  selectedChildRowData: pluginCol = {
    extAppInfoOID: 0,
    identifyingOID: 0,
    identifyingType: '',
    oid: 0,
    order: 1,
    pluginClassType: 'iSOFT.LORENZO.ContextPlugins.PatientPlugin,LorAppDIContextPlugin',
    pluginParameterOID: 0,
    pluginParameters: '',
    pluginType: 0,
    status: false,
  };

  ngOnInit(): void {
    this.data = this.IS.getData();
    this.initializeGridDataSource();
    this.dataSource = this.data.apps[0];
  }

  onPluginChange(value: string): void {
    this.updateDisabledStatus(value);
  }
  updateDisabledStatus(pluginClassType:any): void {
    const disabledTypes = [
      'iSOFT.LORENZO.ContextPlugins.PatientPlugin,LorAppDIContextPlugin',
      'iSOFT.LORENZO.ContextPlugins.UserPlugin,LorAppDIContextPlugin',
    ];
    this.disableContextParams = disabledTypes.includes(pluginClassType);
  }
  isRowSelected(row: any): boolean {
    return this.selectedRowData === row;
  }

  onCancel(): void{
    this.ErrorMsg = "You are about to cancel this activity, are you sure?"
    this.errorDialog(false);
  }
  close(): void {
    this.dialogRef.close();
  }
  Previous(): void {
    this.IS.setData(this.data);
    this.navigateToIntegration.emit();
  }

  updateMultipleTypeInvocation(event: boolean): void {
    this.selectedRowData.isMultipleTypeInvocation = event ? 1 : 0;
  }
  initializeGridDataSource(): void {
    if (this.data && this.data.apps) {
      this.gridDataSource = this.data.apps.map((app: any) => ({
        displayName: app.extAppName,
        modality: this.getModalityName(app.invocationMode),
        multipleWindows: app.isMultipleTypeInvocation == 1 ? true : false,
        displaySortOrder: app.sortOrder,
        expanded: false,
        diPolicyRule: app.diPolicyRule || [],
        pluginCol: app.pluginCol || [],
        useADSCredentials: app.useADSCredentials,
        agentType: app.agentType,
        authenticationMode: app.authenticationMode,
        cItems: app.cItems,
        caClassType: app.caClassType,
        extAppDisplayName: app.extAppDisplayName,
        diExtApploginInfoOID: app.diExtApploginInfoOID,
        displayFormat: app.displayFormat,
        extAppDescription: app.extAppDescription,
        extAppName: app.extAppName,
        extLoginID: app.extLoginID,
        extPassword: app.extPasswords,
        iconImage: app.iconImage,
        integrationCode: app.integrationCode,
        integrationInfoOID: app.integrationInfoOID,
        integrationInvocationMode: app.integrationInvocationMode,
        isAllowOverride: app.isAllowOverride,
        isUserDefined: app.isUserDefined,
        isloginMandatory: app.isloginMandatory,
        OID: app.oid,
        organisationOID: app.organisationOID,
        pluginInfoCollection: app.pluginInfoCollection || [],
        status: app.status,
        typeofInvocation: app.typeofInvocation,
      }));
    }
  }
  resetSelectedChildRowData(): void {
    this.selectedChildRowData = {
      extAppInfoOID: 0,
      identifyingOID: 0,
      identifyingType: '',
      oid: 0,
      order: 1,
      pluginClassType: '',
      pluginParameterOID: 0,
      pluginParameters: '',
      pluginType: 0,
      status: false,
    };
  }
  resetDipolicyRule(): void {
    this.dipolicy = {
      diIntegrationInfoOID: 0,
      dispfCode: '',
      effect: 0,
      extAppDescription: '',
      extAppDisplayName: '',
      extAppInfoOID: 0,
      extAppRule: '',
      extApplication: '',
      iconImage: '',
      inModCode: '',
      policyOID: 0,
      rutypcode: 'CC_PERMIT',
      sortorder: 0,
    };
  }
  resetSelectedRowData(): void {
    this.resetDipolicyRule();
    this.selectedRowData = {
      extAppDisplayName: '',
      invocationMode: 0,
      sortOrder: 1,
      isMultipleTypeInvocation: 0,
      useADSCredentials: false,
      pluginCol: [],
      diPolicyRule: this.dipolicy,
      agentType: 0,
      authenticationMode: 0,
      cItems: '',
      caClassType: '',
      diExtApploginInfoOID: 0,
      displayFormat: '',
      extAppDescription: '',
      extAppName: '',
      extLoginID: '',
      extPassword: '',
      iconImage: '',
      integrationCode: '',
      integrationInfoOID: 0,
      integrationInvocationMode: '',
      isAllowOverride: false,
      isUserDefined: false,
      isloginMandatory: false,
      OID: 0,
      organisationOID: 0,
      pluginInfoCollection: [],
      status: '',
      typeofInvocation: '',
    };
  }

  getModalityName(value: number): string {
    const modalityMapping: { [key: number]: string } = {
      0: 'Modal',
      1: 'Modeless',
      2: 'Decoupled',
    };
    return modalityMapping[value] || 'unknown';
  }
  getModalityValue(modalityName: string): number {
    const modalityMapping: { [key: string]: number } = {
      Modal: 0,
      Modeless: 1,
      Decoupled: 2,
    };
    return modalityMapping[modalityName] || 0;
  }
  errorDialog(is_error: any ): void {
    const errorDialogRef = this.dialog.open(ErrorDialogComponent, {
      disableClose: true,
      data: { errorMessage: this.ErrorMsg, IsError: is_error }
    });
    errorDialogRef.componentInstance.confirmed.subscribe((result: boolean) => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }
  toggleRow(element: any, event: Event): void {
    event.stopPropagation();

    if (this.expandedElement === element) {
      element.useADSCredentials = false;
      this.expandedElement = null;
      this.tabSelected = 0;
      this.rowSelected = false;
      this.resetSelectedRowData();
    } 
    else {
      if (this.expandedElement) {
        this.expandedElement.useADSCredentials = false;
      }
      this.rowSelected = true;
      element.useADSCredentials = true;
      this.expandedElement = element;
    }
  }
  selectRow(element: any): void {
    if (this.selectedRowData === element) {
      // Deselect the parent row
      this.rowSelected = false;
      this.childRowSelected = false;
      this.tabSelected = 0;
  
      // Reset child row data if a child row was selected
      if (this.selectedChildRowData) {
        this.selectedChildRowData.status = false;
        this.resetSelectedChildRowData();
        this.IS.setSelectedChildRowData(this.selectedChildRowData);
      }
  
      // Reset parent row data
      this.resetSelectedRowData();
    } else {
      // Select the parent row
      this.rowSelected = true;
      this.selectedRowData = element;
      this.selectedRowData.invocationMode = this.getModalityValue(element.modality);
      this.selectedRowData.sortOrder = element.displaySortOrder;
      this.selectedRowData.isMultipleTypeInvocation = element.multipleWindows ? 1 : 0;
    }
  }
  
  selectChildRow(plugin: pluginCol, isChecked: boolean): void {
    const parentRow = this.gridDataSource.find(
      (element) => element.pluginCol && element.pluginCol.includes(plugin)
    );
    if (isChecked) {
      this.childRowSelected = true;
      this.tabSelected = 1;
      if (this.selectedChildRowData && this.selectedChildRowData !== plugin) {
        this.selectedChildRowData.status = false;
      }
      plugin.status = true;
      this.selectedChildRowData = plugin;
      this.IS.setSelectedChildRowData(this.selectedChildRowData);
      if (parentRow !== this.selectedRowData) {
        this.selectRow(parentRow);
      }
    } else {
      // Deselect child row
      if (parentRow) {
        this.selectRow(parentRow);
      }
      this.childRowSelected = false;
      this.tabSelected = 0;
      if (this.selectedChildRowData === plugin) {
        this.selectedChildRowData = {
          extAppInfoOID: 0,
          identifyingOID: 0,
          identifyingType: '',
          oid: 0,
          order: 0,
          pluginClassType: '',
          pluginParameterOID: 0,
          pluginParameters: '',
          pluginType: 0,
          status: false,
        };
      }
      plugin.status = false;
    }
  }
  

  addRow(): void {
    if (this.selectedRowData) {
      if(!this.selectedRowData.extAppName || !this.selectedRowData.extAppDisplayName){
        switch (true) {
          case !this.selectedRowData.extAppName:
            this.ErrorMsg = "Please enter the value for 'Display name' field.";
            break;
          case !this.selectedRowData.extAppDisplayName:
            this.ErrorMsg = "Please enter the code.";
            break;
        }
        this.errorDialog(true);
        return;
      }
      else {
        this.dipolicy.diIntegrationInfoOID = this.data.oid;
        this.dipolicy.extAppDescription = this.selectedRowData.extAppDisplayName;
        this.dipolicy.extAppDisplayName = this.selectedRowData.extAppDisplayName;
        this.dipolicy.extAppInfoOID = this.selectedRowData.OID;
        this.dipolicy.policyOID = 0;
        const newRow: any = {
        extAppDisplayName: this.selectedRowData.extAppDisplayName,
        invocationMode: this.selectedRowData.invocationMode,
        isMultipleTypeInvocation: this.selectedRowData.isMultipleTypeInvocation,
        sortOrder: this.selectedRowData.sortOrder,
        useADSCredentials: false,
          diPolicyRule: this.dipolicy,
        pluginCol: this.selectedRowData.pluginCol,
          agentType: this.data.agtypCode,
          authenticationMode: this.data.aumodCode,
          caClassType: this.data.cType,
          diExtApploginInfoOID: 0,
        extAppDescription: this.selectedRowData.extAppDisplayName,
        extAppName: this.selectedRowData.extAppName,
          extLoginID: this.data.extLoginID,
          extPassword: this.data.extPassword,
          isAllowOverride: this.data.isAllowOverride,
          isUserDefined: this.data.isUserDefined,
          isloginMandatory: this.data.isloginMandatory,
          OID: 0,
      };

      this.data.apps.push(newRow);
      this.initializeGridDataSource();
      this.resetSelectedRowData();
      this.IS.setSelectedRowData(null);
      } 
    } 
    else {
      console.error('Selected row data is null');
    }
  }

  updateRow() {
    if (this.selectedRowData) {
      const index = this.gridDataSource.findIndex(
        (row) => row === this.selectedRowData
      );
      if (index != null || undefined) {
        this.gridDataSource[index] = { ...this.selectedRowData };
        this.data.apps[index] = this.selectedRowData;
        this.initializeGridDataSource();
        this.resetSelectedRowData();
        this.resetSelectedChildRowData();
      }
    }
  }

  removeRow() {
    if (
      this.data.delAppIds == null ||
      undefined ||
      this.data.delPluginIds == null ||
      undefined
    ) {
      this.data.delAppIds = '';
      this.data.delPluginIds = '';
    }
    if (this.selectedRowData && !this.selectedChildRowData.status) {
      const index = this.gridDataSource.findIndex(
        (row) => row === this.selectedRowData
      );
      if (index != null || undefined) {
        this.data.delAppIds += this.selectedRowData.OID + ',';
        this.data.apps.splice(index, 1);
        this.rowSelected = false;
      }
      console.log('remove this.selectedRowData', this.selectedRowData);
      console.log(
        'remove this.selectedChildRowData',
        this.selectedChildRowData
      );
    } else if (this.selectedRowData && this.selectedChildRowData.status) {
      const index = this.gridDataSource.findIndex(
        (row) => row === this.selectedRowData
      );
      const pluginIndex = this.data.apps[index].pluginCol.findIndex(
        (plugin: pluginCol) => plugin === this.selectedChildRowData
      );
      if (index != null || (undefined && pluginIndex != null) || undefined) {
        this.data.delPluginIds += this.selectedChildRowData.oid + ',';
        this.data.apps[index].pluginCol.splice(pluginIndex, 1);
      }
      this.childRowSelected = false;
      this.tabSelected = 0;
      this.rowSelected = false;
      console.log('remove this.selectedRowData', this.selectedRowData);
      console.log(
        'remove this.selectedChildRowData',
        this.selectedChildRowData
      );
    } else {
      console.error('No row is selected to remove');
    }
    this.initializeGridDataSource();
    this.resetSelectedChildRowData();
    this.resetSelectedRowData();
  }

  addPlugin() {
    console.log("Selected Data:", this.selectedChildRowData);
    
    // Check if there is a selected row and the selected child row's order is not zero
    if (this.selectedRowData && this.selectedChildRowData.order !== 0) {
      const index = this.gridDataSource.findIndex(
        (row) => row === this.selectedRowData
      );
  
      // Check if the plugin type already exists in the selected row
      const isPluginTypeExist = this.selectedRowData.pluginCol?.some(
        (plugin: { pluginType: number | null; }) => plugin.pluginType === this.selectedChildRowData.pluginType
      );
  
      if (isPluginTypeExist) {
        this.ErrorMsg = "The plugin type already exists in the selected row."
    this.errorDialog(false);
        console.warn("The plugin type already exists in the selected row.");
        return; // Exit the function if the plugin type already exists
      }
  
      // Create new plugin object
      const newPlugin = {
        pluginClassType: this.selectedChildRowData.pluginClassType,
        order: this.selectedChildRowData.order,
        pluginParameters: this.selectedChildRowData.pluginParameters,
        extAppInfoOID: 0,
        identifyingOID: 0,
        identifyingType: '',
        oid: 0,
        pluginParameterOID: 0,
        pluginType: 0,
        status: false,
      };
  
      // Add new plugin to the selected row's pluginCol array
      if (!this.selectedRowData.pluginCol) {
        this.selectedRowData.pluginCol = [];
      }
      this.selectedRowData.pluginCol.push(newPlugin);
  
      // Update grid data source and reset selections
      this.initializeGridDataSource();
      this.data.apps[index] = this.selectedRowData;
      this.resetSelectedRowData();
      this.resetSelectedChildRowData();
      this.data.useADSCredentials = false;
    }
  }



  onFinishNow(): void {
    if (this.data) {
      if (Array.isArray(this.data.apps) && this.data.apps.length === 0) { 
        this.ErrorMsg = 'Please capture at least one display name to finish.';
        this.errorDialog(true);
      } 
      else {
      this.IS.createOrUpdateIntegration(this.data).subscribe(
        (response) => {
          this.close();
        },
        (error: HttpErrorResponse) => {
          alert('Error saving data. Please try again.');
        }
      );
      this.IS.triggerRefresh();
      }
    } else {
      alert('No data to save!');
    }
  }

  checkAppName(appName: string, code: string) {
    this.IS.isAppAlreadyExist(appName, code).subscribe(
      (response) => {
        if (response === 1) {
          console.error('app name exists.');
        } else {
          console.error('app name does not exist.');
        }
      },
      (error) => {
        console.error('Error checking integration:', error);
      }
    );
  }
}
