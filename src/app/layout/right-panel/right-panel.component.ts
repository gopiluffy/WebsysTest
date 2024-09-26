import { Component } from '@angular/core';
import { IntegrationService } from './integration-instance/integration.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent  {


  constructor(private IS: IntegrationService) {}

  onButtonClick(button: string) {
    this.IS.setLeftPaneFields(button);
  }

}
