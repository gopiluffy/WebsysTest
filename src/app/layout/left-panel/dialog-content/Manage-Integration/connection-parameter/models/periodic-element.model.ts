export interface PeriodicElement {
  displayName: string;
  modality: string;
  multipleWindows: boolean;  // Fixed typo and changed type to boolean
  displaySortOrder: number;  // Changed type to number
  expanded: boolean;
  apps?: { code: string }[]; // Optional property for nested apps, as used in your component
}
export interface basicDetails {
  
}