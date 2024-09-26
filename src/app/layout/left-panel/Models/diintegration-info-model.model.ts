export class DIIntegrationInfoModel {
  oid: number;
  code: string;
  _ExtAppName: string;
  displayName: string;
  description: string;
  agtypCode: string;
  cType: string;
  aumodCode: string;
  apps: apps[];
  authenticationMode: authenticationMode[];
  agentTypes: agentTypes[];
  classsTypes: classsTypes[];
  pluginTypes: pluginTypes[];
  delPluginIds: string;
  delAppIds: string;
  extLoginID: string;
  extPassword: string;
  isApplyADSCredentials: string;
  isloginMandatory: string;
  isAllowOverride: string;
  ownerOrganisationOID: number;
  isUserDefined: boolean;

  constructor(
    _OID: number,
    _Code: string,
    _ExtAppName: string,
    _DisplayName: string,
    _Description: string,
    _AGTYPCode: string,
    _Apps: apps[],
    _AuthenticationMode: authenticationMode[],
    _AgentTypes: agentTypes[],
    _ClasssTypes: classsTypes[],
    _PluginTypes: pluginTypes[],
    _CType: string,
    _AuModCode: string,
    _DelPluginIds: string,
    _DelAppIds: string,
    _ExtLoginID: string,
    _IsApplyADSCredentials: string,
    _ExtPassword: string,
    _IsloginMandatory: string,
    _IsAllowOverride: string,
    _OwnerOrganisationOID: number,
    _IsUserDefined: boolean
  ) {
    this.oid = _OID;
    this.code = _Code;
    this._ExtAppName = _ExtAppName;
    this.displayName = _DisplayName;
    this.description = _Description;
    this.agtypCode = _AGTYPCode;
    this.apps = _Apps;
    this.authenticationMode = _AuthenticationMode;
    this.agentTypes = _AgentTypes;
    this.classsTypes = _ClasssTypes;
    this.pluginTypes = _PluginTypes;
    this.cType = _CType;
    this.aumodCode = _AuModCode;
    this.delPluginIds = _DelPluginIds;
    this.delAppIds = _DelAppIds;
    this.extLoginID = _ExtLoginID;
    this.extPassword = _ExtPassword;
    this.isApplyADSCredentials = _IsApplyADSCredentials;
    this.isloginMandatory = _IsloginMandatory;
    this.isAllowOverride = _IsAllowOverride;
    this.ownerOrganisationOID = _OwnerOrganisationOID;
    this.isUserDefined = _IsUserDefined;
  }
}
export interface apps {
  agentType: number | null;
  //appLoginInfoModifiedAt: string | null;
  authenticationMode: number | null;
  cItems: string | null;
  caClassType: string | null;
  diExtApploginInfoOID: number | null;
  diPolicyRule: diPolicyRule | null;
  displayFormat: string | null;
  extAppDescription: string | null;
  extAppDisplayName: string | null;
  extAppName: string | null;
  extLoginID: string | null;
  extPassword: string | null;
  iconImage: string | null;
  integrationCode: string | null;
  integrationInfoOID: number | null;
  integrationInvocationMode: string | null;
  invocationMode: number | null;
  isAllowOverride: boolean | null;
  isMultipleTypeInvocation: number | null;
  isUserDefined: boolean | null;
  isloginMandatory: boolean | null;
  //modifiedAt: string | null;
  OID: number | null;
  organisationOID: number | null;
  pluginCol: pluginCol[];
  pluginInfoCollection: pluginInfoCollection[];
  sortOrder: number | null;
  status: string | null;
  typeofInvocation: string | null;
  useADSCredentials: boolean | null;
}

export interface diPolicyRule {
  diIntegrationInfoOID: number | null;
  dispfCode: string | null;
  effect: number | null;
  extAppDescription: string | null;
  extAppDisplayName: string | null;
  extAppInfoOID: number | null;
  extAppRule: string | null;
  extApplication: string | null;
  iconImage: string | null;
  inModCode: string | null;
  policyOID: number | null;
  //policyRuleModifiedAt: DateTime;
  rutypcode: string | null;
  sortorder: number | null;
}

export interface pluginCol {
  extAppInfoOID: number | null;
  identifyingOID: number | null;
  identifyingType: string | null;
  //modifiedAt: string | null;
  oid: number | null;
  order: number | null;
  pluginClassType: string | null;
  //pluginParameterModifiedAt: string | null;
  pluginParameterOID: number | null;
  pluginParameters: string | null;
  pluginType: number | null;
  status: boolean | null;
}

export interface pluginInfoCollection {}

export interface authenticationMode {
  disabled: boolean;
  group: string;
  selected: boolean;
  text: string;
  value: number;
}

export interface agentTypes {
  disabled: boolean;
  group: string;
  selected: boolean;
  text: string;
  value: number;
}

export interface classsTypes {
  disabled: boolean;
  group: string;
  selected: boolean;
  text: string;
  value: number;
}

export interface pluginTypes {
  disabled: boolean;
  group: string;
  selected: boolean;
  text: string;
  value: number;
}
