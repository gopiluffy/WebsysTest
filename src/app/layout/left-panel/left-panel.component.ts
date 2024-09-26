import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { IntegrationService } from '../right-panel/integration-instance/integration.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
})
export class LeftPanelComponent implements OnInit {
  clickedButton: string | undefined;
  isExpanded = true;
  field1: string = 'Manage integration instance';
  field2: string = 'Create integration instance';
  private buttonConfig: { [key: string]: { field1: string; field2: string } } = {
    II: { field1: 'Manage integration instance', field2: 'Create integration instance' },
    ULM: { field1: 'Manage user login map', field2: 'Remove user login map' },
  };

  constructor(public dialog: MatDialog, private IS: IntegrationService) {}

  openDialog(field: string): void {
    this.dialog.open(DialogContentComponent, {
      disableClose: true,
      id: field,
    });

    if (field == 'Create integration instance') {
      this.IS.setData(null);
    }
  }

  ngOnInit() {
    this.IS.clickedButton$.subscribe((button: string | undefined) => {
      this.clickedButton = button;
      const config = this.buttonConfig[button || ''] || this.buttonConfig['II'];
      this.field1 = config.field1;
      this.field2 = config.field2;
    });
      }

  toggleList() {
    this.isExpanded = !this.isExpanded;
  }
}
