// ─── API Types ────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ─── Master Data Types ────────────────────────────────────────────────────────

export interface Company {
  id: number;
  name: string;
  address?: string;
  contactNo?: string;
  email?: string;
}

export interface FinanceCompany extends Company {
  interestRate?: number;
}

export interface Dealer extends Company {
  licenseNo?: string;
  type: 'dealer' | 'broker';
}

export interface InsuranceCompany extends Company {
  policyTypes: string[];
}

export interface Agent {
  id: number;
  name: string;
  mobile: string;
  email?: string;
  commissionRate?: number;
}

export interface RtoDistrict {
  id: number;
  name: string;
  code: string;
  state: string;
}

// ─── Payment Types ────────────────────────────────────────────────────────────

export interface Payment {
  id: number;
  customerId: number;
  customerName: string;
  fileNo: string;
  amount: number;
  paymentDate: string;
  paymentMode: PaymentMode;
  status: PaymentStatus;
  remarks?: string;
}

export type PaymentMode = 'cash' | 'cheque' | 'online' | 'neft' | 'upi';
export type PaymentStatus = 'paid' | 'pending' | 'failed';

export interface Commission {
  id: number;
  agentId: number;
  agentName: string;
  fileNo: string;
  amount: number;
  commissionDate: string;
  status: 'paid' | 'pending';
}
