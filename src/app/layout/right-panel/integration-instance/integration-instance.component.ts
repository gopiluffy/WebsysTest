import { Component, OnInit } from '@angular/core';
import { IntegrationService } from './integration.service';
import { PeriodicElement } from './models/periodic-element.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-integration-instance',
  templateUrl: './integration-instance.component.html',
  styleUrls: ['./integration-instance.component.css'],
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
export class IntegrationInstanceComponent {
  columnsToDisplay = [
    'integrationName',
    'authMode',
    'loginId',
    'allowOverride',
    'userDefined',
  ];
  expandedElement!: PeriodicElement | null;
  selectedRow: any;
  dataSource: PeriodicElement[] = [];
  integrations: any;
  refreshSubscription: Subscription | undefined;

  constructor(private integrationService: IntegrationService) {}

  ngOnInit(): void {
    const dicUserContextData = JSON.stringify({
      AppID: null,
      access_token: '5nmvs50uxnwg5lb35vtdxwxa%23638568158490392522',
    });

    const ds = JSON.stringify({
      DBType: 'SQLITE',
      AppID: null,
      SQLDBSettings: { SQLiteConnectionString: null },
      JSONDBSettings: {
        JSONFilePath:
          'C:\\Users\\sd228\\OneDrive - Dedalus S.p.A\\Desktop\\DesktopIntegrationService\\SQLDB\\DummyDB.db',
      },
    });
    this.refreshSubscription =
      this.integrationService.refreshObservable.subscribe(() => {
        this.ngOnInit();
      });

    this.integrationService
      .login()
      .subscribe((response) => {
        if (response.integrations != null) {
          this.integrations = response.integrations;
          this.binding(response.integrations);
        }
        console.log('integration', response);
        if (this.dataSource.length > 0) {
          this.selectedRow = this.dataSource[0];
          this.integrationService.selectedOid = this.dataSource[0].oid;
          this.integrationService.selectedName =
            this.dataSource[0].integrationName;
        }
      });
  }

  binding(integration: any) {
    this.dataSource = integration.map((integration: any) => ({
      oid: integration.oid,
      integrationName: integration.code,
      authMode: integration.aumodCode,
      loginId: '',
      user: '',
      allowOverride: integration.isAllowOverride,
      userDefined: integration.isUserDefined,
      apps: integration.apps,
      expanded: false,
    }));
  }

  toggleRow(element: PeriodicElement, event: Event): void {
    event.stopPropagation();

    if (this.expandedElement === element) {
      element.expanded = !element.expanded;
      this.expandedElement = null;
    } else {
      if (this.expandedElement) {
        this.expandedElement.expanded = false;
      }

      element.expanded = true;
      this.expandedElement = element;
    }
  }

  selectRow(row: any) {
    this.selectedRow = row;
    this.integrationService.selectedOid = row.oid;
    this.integrationService.selectedName = row.integrationName;
    console.log('Row selected:', row);
  }

  isRowSelected(row: any): boolean {
    return this.selectedRow === row;
  }
}
