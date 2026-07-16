import { create } from 'zustand';

import type { Customer, CreateCustomerPayload } from '@/types';

interface CustomerStore {
  customers: Customer[];
  selectedCustomer: Customer | null;
  isLoading: boolean;
  error: string | null;

  setCustomers: (customers: Customer[]) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: number, data: Partial<Customer>) => void;
  removeCustomer: (id: number) => void;
  selectCustomer: (customer: Customer | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  customers:        [],
  selectedCustomer: null,
  isLoading:        false,
  error:            null,
};

export const useCustomerStore = create<CustomerStore>((set, get) => ({
  ...initialState,

  setCustomers(customers) {
    set({ customers });
  },

  addCustomer(customer) {
    set(state => ({ customers: [customer, ...state.customers] }));
  },

  updateCustomer(id, data) {
    set(state => ({
      customers: state.customers.map(c =>
        c.id === id ? { ...c, ...data } : c
      ),
    }));
  },

  removeCustomer(id) {
    set(state => ({
      customers: state.customers.filter(c => c.id !== id),
    }));
  },

  selectCustomer(customer) {
    set({ selectedCustomer: customer });
  },

  setLoading(isLoading) {
    set({ isLoading });
  },

  setError(error) {
    set({ error });
  },

  reset() {
    set(initialState);
  },
}));
