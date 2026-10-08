/** Matches GET /api/alehu-bewere/packages response exactly (AASTU Gibi Gubae API docs §4). */
export interface DonationPackage {
  id: string;
  name: string;
  amount: string; // decimal string, e.g. "100.00"
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface SubscriptionPayload {
  full_name: string;
  phone_number: string;
  package_name: string;
  amount?: number; // required only for custom packages
  email?: string;
}

export interface Subscription {
  id: string;
  package: string;
  amount: string;
  full_name: string;
  phone_number: string;
  email: string | null;
  status: 'PENDING' | 'CONTACTED' | 'CONFIRMED' | 'REJECTED';
  admin_note: string | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

/** The docs don't expose a machine flag for "this package takes a custom amount" — inferred by name. */
export function isCustomPackage(pkg: DonationPackage): boolean {
  return /netsa|custom/i.test(pkg.name);
}
