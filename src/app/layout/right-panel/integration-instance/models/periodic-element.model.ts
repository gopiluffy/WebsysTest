export interface PeriodicElement {
  oid: number;
  integrationName: string;
  authMode: string;
  loginId: string;
  user: string;
  allowOverride: boolean;
  userDefined: boolean;
  apps: any[];
  expanded: boolean;
}