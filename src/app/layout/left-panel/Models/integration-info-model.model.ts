import { SelectItem } from 'primeng/api'; // assuming PrimeNG is used for dropdowns

export class IntegrationInfoModel {
  AuthenticationMode: SelectItem[];
  AgentTypes: SelectItem[];
  ClasssTypes: SelectItem[];
  PluginTypes: SelectItem[];

  constructor() {
    this.AgentTypes = [
      { label: 'Context agent', value: '0' },
      { label: 'View agent', value: '1' },
      { label: 'Service agent', value: '3' },
      { label: 'Embedded agent', value: '4' },
      { label: 'REST agent', value: '5' },
      { label: 'Soap agent', value: '6' },
    ];

    this.ClasssTypes = [
      { label: 'iSOFT.LORENZO.CNGContextAgents.CodeNGroupContextAgent,LorArcCNGAgent', value: '0' },
      { label: 'iSOFT.LORENZO.ContextAgents.DIOrchestrationAgent,LorWebContextAgent', value: '1' },
      { label: "iSOFT.LORENZO.ContextAgents.CitrixContextAgent,LorCitrixContextAgent", value :"2" },
      { label:"iSOFT.LORENZO.ContextAgents.RESTContextAgent,LorRESTContextAgent", value : "3" },
      { label: "iSOFT.LORENZO.ContextAgents.RestViewerAgent,LorRestViewerAgent", value : "4" },
      { label: "iSOFT.LORENZO.ContextAgents.SOAPViewerAgent,LorSOAPContextAgent", value : "5" },
      { label:"iSOFT.LORENZO.ContextAgents.WebContextAgent,LorWebContextAgent", value : "6" },
      { label:"iSOFT.LORENZO.ContextAgents.WindowContextAgent,LorWindowContextAgent", value : "7" },
      { label:"iSOFT.LORENZO.CNGContextAgents.MedicodeContextAgent,LorArcCNGAgent", value : "8"}
    ];

    this.PluginTypes = [
      { label: 'iSOFT.LORENZO.ContextPlugins.x509CertificatePlugin,LorAppContextPlugins', value: '0' },
      { label: 'iSOFT.LORENZO.ContextPlugins.WebContextPlugin,LorAppContextPlugins', value: '1' },
      { label: "iSOFT.LORENZO.ContextPlugins.UserPlugin,LorAppDIContextPlugin", value :"2" },
      { label: "iSOFT.LORENZO.ContextPlugins.SoapEnvelopePlugin,LorAppContextPlugins", value : "3" },
      { label: "iSOFT.LORENZO.ContextPlugins.RESTPlugin,LorAppContextPlugins", value : "4" },
      { label: "iSOFT.LORENZO.ContextPlugins.RestContextPlugin,LorAppContextPlugins", value : "5" },
      { label: "iSOFT.LORENZO.ContextPlugins.PatientProblemPlugin,LorAppDIContextPlugin", value : "6" },
      { label: "iSOFT.LORENZO.ContextPlugins.PatientPlugin,LorAppDIContextPlugin", value : "7" },
      { label: "iSOFT.LORENZO.ContextPlugins.PatientAllergiesPlugin,LorAppDIContextPlugin", value : "8" },
      { label: "iSOFT.LORENZO.ContextPlugins.PatientAlertPlugin,LorAppDIContextPlugin", value : "9" },
      { label: "iSOFT.LORENZO.ContextPlugins.OAuthContextPlugin,LorAppContextPlugins", value : "10" },
      { label: "iSOFT.LORENZO.ContextPlugins.NoMapperAction,LorAppContextPlugins", value : "11" },
      { label: "iSOFT.LORENZO.ContextPlugins.MHSViewerAction,LorAppContextPlugins", value : "12" },
      { label: "iSOFT.LORENZO.ContextPlugins.MHSAdapter,LorAppContextPlugins", value : "13" },
      { label: "iSOFT.LORENZO.ContextPlugins.EnrichContextPlugin,LorAppContextPlugins", value : "14" },
      { label: "iSOFT.LORENZO.ContextPlugins.EncEpiContextPlugin,LorAppDIContextPlugin", value : "15" },
      { label: "iSOFT.LORENZO.ContextPlugins.DIViewerAction,LorAppContextPlugins", value : "16" },
      { label: "iSOFT.LORENZO.ContextPlugins.DIUrlPlugin,LorAppContextPlugins", value : "17" },
      { label: "iSOFT.LORENZO.ContextPlugins.DITemplatePlugin,LorAppContextPlugins", value : "18" },
      { label: "iSOFT.LORENZO.ContextPlugins.DILDAPPlugin,LorAppContextPlugins", value : "19" },
      { label: "iSOFT.LORENZO.ContextPlugins.DIFlowPlugin,LorAppContextPlugins", value : "20" },
      { label: "iSOFT.LORENZO.ContextPlugins.DICustomContextPlugin,LorAppContextPlugins", value : "21" },
      { label: "iSOFT.LORENZO.ContextPlugins.DICustomContextPlugin,LorAppContextPlugin", value : "22" },
      { label: "iSOFT.LORENZO.ContextPlugins.CGCodingGroupingPlugin,LorAppDIContextPlugin", value : "23" },
      { label: "CSC.LORENZO.ContextPlugins.SOAPAdapter,LorAppContextPlugins", value : "24" },
      { label: "CSC.LORENZO.ContextPlugins.RESTJSONAdapter,LorAppContextPlugins", value : "25" }
    ];

    this.AuthenticationMode = [
      { label: 'User mode', value: '2' },
      { label: 'Pass through', value: '0' },
      { label: 'Application Mode', value: '1' },
      { label: 'Mixed Mode', value: '3' },
    ];
  }
}
