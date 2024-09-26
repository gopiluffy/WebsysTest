import { Component, OnInit } from '@angular/core';
import { IntegrationService } from '../integration-instance/integration.service';

@Component({
  selector: 'app-user-login-mapping',
  templateUrl: './user-login-mapping.component.html',
  styleUrls: ['./user-login-mapping.component.css']
})
export class UserLoginMappingComponent implements OnInit {
  columnsToDisplay = ['lorenzoLoginId', 'mappedLoginId'];
  selectedName: string | null = null;

  dataSource: { lorenzoLoginId: string, mappedLoginId: string }[] = [];



  constructor(private integrationService: IntegrationService) {}
  ngOnInit(): void {

    const oid = this.integrationService.selectedOid;
  this.selectedName=this.integrationService.selectedName;
  console.log('userloggingmap',this.integrationService.selectedOid);
    this.integrationService.getUserMap(Number(oid)).subscribe(response => {

      console.log('getusermap',response);
      this.dataSource = response.map((item: any) => ({
        lorenzoLoginId: item.lzoLoginID,
        mappedLoginId: item.extLoginID
      }));
    });
  }
}

