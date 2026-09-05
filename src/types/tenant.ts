export interface Tenant {
  id: string;
  businessName: string;
  industry?: string;
  website?: string;
  country: string;
  timezone: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  tenantId: string;
}
