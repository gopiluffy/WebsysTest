export interface App {
    code: string;
    name: string;
  }
  
  export interface Integration {
    oid: number;
    code: string;
    integrationName: string;
    authMode: number;
    loginId: string;
    user: string;
    allowOverride: boolean;
    userDefined: boolean;
    apps: App[];
    expanded: boolean;
  }
  