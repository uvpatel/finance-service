import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@/services/api';
import { ENDPOINTS } from '@/constants';
import { useCustomerStore } from '@/store/customer.store';
import type {
  Customer,
  CreateCustomerPayload,
  PaginatedResponse,
  PaginationParams,
} from '@/types';
import { getApiErrorMessage } from '@/utils/helpers';

const QUERY_KEY = 'customers';

// ─── Fetch paginated customer list ───────────────────────────────────────────

export function useCustomers(params: PaginationParams = {}) {
  return useQuery<PaginatedResponse<Customer>>({
    queryKey: [QUERY_KEY, params],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Customer>>(
        ENDPOINTS.CUSTOMERS.LIST,
        { params }
      );
      return data;
    },
  });
}

// ─── Fetch single customer ────────────────────────────────────────────────────

export function useCustomer(id: number) {
  return useQuery<Customer>({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await api.get<Customer>(ENDPOINTS.CUSTOMERS.DETAIL(id));
      return data;
    },
    enabled: !!id,
  });
}

// ─── Create customer mutation ─────────────────────────────────────────────────

export function useCreateCustomer() {
  const qc = useQueryClient();
  const addCustomer = useCustomerStore(s => s.addCustomer);

  return useMutation<Customer, Error, CreateCustomerPayload>({
    mutationFn: async payload => {
      const { data } = await api.post<Customer>(
        ENDPOINTS.CUSTOMERS.CREATE,
        payload
      );
      return data;
    },
    onSuccess: customer => {
      addCustomer(customer);
      qc.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

// ─── Update customer mutation ─────────────────────────────────────────────────

export function useUpdateCustomer() {
  const qc = useQueryClient();
  const updateCustomer = useCustomerStore(s => s.updateCustomer);

  return useMutation<Customer, Error, { id: number; data: Partial<CreateCustomerPayload> }>({
    mutationFn: async ({ id, data }) => {
      const { data: res } = await api.put<Customer>(
        ENDPOINTS.CUSTOMERS.UPDATE(id),
        data
      );
      return res;
    },
    onSuccess: (customer, { id }) => {
      updateCustomer(id, customer);
      qc.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

// ─── Delete customer mutation ─────────────────────────────────────────────────

export function useDeleteCustomer() {
  const qc = useQueryClient();
  const removeCustomer = useCustomerStore(s => s.removeCustomer);

  return useMutation<void, Error, number>({
    mutationFn: async id => {
      await api.delete(ENDPOINTS.CUSTOMERS.DELETE(id));
    },
    onSuccess: (_, id) => {
      removeCustomer(id);
      qc.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
