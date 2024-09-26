import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntegrationService {
  private refreshSubject = new Subject<void>();

  get refreshObservable() {
    return this.refreshSubject.asObservable();
  }

  triggerRefresh() {
    this.refreshSubject.next();
  }
  selectedOid: any;
  selectedName: any;
  private apiUrl = 'http://localhost:64964/SysConfig';

  private clickedButtonSource = new BehaviorSubject<string>('');
  clickedButton$ = this.clickedButtonSource.asObservable();

  private selectedRowDataSource = new BehaviorSubject<any>(null);
  selectedRowData$ = this.selectedRowDataSource.asObservable();

  private selectedChildRowDataSource = new BehaviorSubject<any>(null);
  selectedChildRowData$ = this.selectedChildRowDataSource.asObservable();

  private selectedNameSource = new BehaviorSubject<string | null>(null);
  private dataSource = new BehaviorSubject<any>(null);

  selectedName$ = this.selectedNameSource.asObservable();
  data$ = this.dataSource.asObservable();

  private integrations = new BehaviorSubject<any>(null);
  integrations$ = this.integrations.asObservable();

  constructor(private http: HttpClient) {}

  logins(dicUserContextData: string, ds: string): Observable<any> {
    let params = new HttpParams()
      .set('dicUserContextData', dicUserContextData)
      .set('ds', ds);
    console.log('service', this.selectedOid);
    return this.http.get<any>(`${this.apiUrl}/login`, {
      params,
    });
  }

  login(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/login`);
  }

  getUserMap(oid: number) {
    let params = new HttpParams().set('oid', oid);
    console.log('service', this.selectedOid);
    return this.http.get<any>(`${this.apiUrl}/getusermap`, {
      params,
    });
  }

  getIntegrationData(oid: number) {
    let params = new HttpParams().set('id', oid);
    console.log('IntegrationDataService', this.selectedOid);
    return this.http.get<any>(`${this.apiUrl}/login1`, {
      params,
    });
  }

  createOrUpdateIntegration(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    const body = new HttpParams().set('serialized', JSON.stringify(data));
    console.log('body data', body.toString());

    return this.http.post<any>(
      `${this.apiUrl}/CreateAndUpdateIntegration`,
      body.toString(),
      httpOptions
    );
  }

  isIntegrationAlreadyExist(IName: string, ICode: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('IName', IName);
    formData.append('ICode', ICode);

    const headers = new HttpHeaders({
      enctype: 'multipart/form-data',
    });
    return this.http.post(
      `${this.apiUrl}/IsIntegrationAlreadyExist`,
      formData,
      { headers }
    );
  }

  isAppAlreadyExist(appName: string, appCode: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('appName', appName);
    formData.append('appCode', appCode);

    const headers = new HttpHeaders({
      enctype: 'multipart/form-data',
    });
    return this.http.post(`${this.apiUrl}/IsAppAlreadyExist`, formData, {
      headers,
    });
  }

  setLeftPaneFields(button: string) {
    this.clickedButtonSource.next(button);
  }

  setSelectedName(name: string) {
    this.selectedNameSource.next(name);
  }

  setData(data: any) {
    console.log('Setdata', data);
    this.dataSource.next(data);
  }

  setSelectedRowData(rowData: any) {
    this.selectedRowDataSource.next(rowData);
  }
  setSelectedChildRowData(rowData: any) {
    this.selectedChildRowDataSource.next(rowData);
  }
  getSelectedName(): string | null {
    return this.selectedNameSource.getValue();
  }

  getData() {
    console.log('getdata', this.dataSource.getValue());
    return this.dataSource.getValue();
  }
  getSelectedRowDataSource(): any | null {
    return this.selectedRowDataSource.getValue();
  }
  getSelectedChildRowDataSource(): any | null {
    return this.selectedChildRowDataSource.getValue();
  }
  getIntegrations(): string | null {
    return this.integrations.getValue();
  }

  setIntegrations(integrations: any) {
    this.integrations.next(integrations);
  }
}
