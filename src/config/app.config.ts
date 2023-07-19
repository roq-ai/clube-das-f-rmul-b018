interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Administrator'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Pharmacist', 'Medical Representative', 'Administrator'],
  tenantName: 'Organization',
  applicationName: 'Clube das Fórmulas',
  addOns: ['file', 'chat', 'notifications'],
};
