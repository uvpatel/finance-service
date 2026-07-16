// ─── Customer Types ───────────────────────────────────────────────────────────

export interface Customer {
  id: number;
  fullName: string;
  mobileNo1: string;
  mobileNo2?: string;
  email?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerPayload {
  fullName: string;
  mobileNo1: string;
  mobileNo2?: string;
  email?: string;
  address?: string;
}

export interface CustomerFile {
  id: number;
  customerId: number;
  customerName: string;
  fileNo: string;
  vehicle: string;
  vehicleNo: string;
  loanAmount?: number;
  financeCompany?: string;
  status: FileStatus;
  createdAt: string;
}

export type FileStatus = 'active' | 'closed' | 'pending';

export interface CustomerDocument {
  id: number;
  customerId: number;
  customerName: string;
  fileNo: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface VehicleInfo {
  vehicle: string;
  noOfOwner: number;
  manufactureYear: string;
  vehicleNo: string;
  chassisNo: string;
  engineNo: string;
  inHouseInsurance: boolean;
  rto: string;
}

export interface FinanceInfo {
  lan: string;
  loanAmount: number;
  noOfMonths: number;
  emi: number;
  financeCompany: string;
  area: string;
  fcSCGST: number;
  gapInterest: number;
  oldLoanAmount: number;
  irr: number;
  lsAmount: number;
  rtoAmount: number;
  rtoHoldAmount: number;
  stampAmount: number;
  disbursementAmount: number;
}
