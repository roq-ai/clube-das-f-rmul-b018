const mapping: Record<string, string> = {
  'medication-formulas': 'medication_formula',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
