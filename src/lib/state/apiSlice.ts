import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Domain,
  Job,
  Action,
  ActionConnection,
  CallerID,
  PhoneList,
  Scheduler,
} from './types';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/', // Assuming the API is served from the same origin
    prepareHeaders: (headers) => {
      const launchParams = sessionStorage.getItem('tapps/launchParams');
      if (launchParams) {
        // Add the Telegram launch parameters to the Authorization header.
        // The backend will use this to authenticate the user.
        headers.set('Authorization', `Telegram ${launchParams}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Domain', 'Job', 'Action', 'CallerID', 'PhoneList', 'Scheduler'],
  endpoints: (builder) => ({
    // Domains
    getDomains: builder.query<Domain[], void>({
      query: () => 'domains',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Domain' as const, id })),
              { type: 'Domain', id: 'LIST' },
            ]
          : [{ type: 'Domain', id: 'LIST' }],
    }),
    getDomain: builder.query<Domain, number>({
      query: (id) => `domains/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Domain', id }],
    }),
    createDomain: builder.mutation<Domain, Partial<Domain>>({
      query: (body) => ({
        url: 'domains',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Domain', id: 'LIST' }],
    }),
    updateDomain: builder.mutation<Domain, Partial<Domain>>({
      query: ({ id, ...patch }) => ({
        url: `domains/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Domain', id }],
    }),
    deleteDomain: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `domains/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Domain', id }],
    }),

    // Jobs
    getJobs: builder.query<Job[], number | void>({
      query: (domainId) => ({
        url: 'jobs',
        params: domainId ? { domain_id: domainId } : {},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Job' as const, id })),
              { type: 'Job', id: 'LIST' },
            ]
          : [{ type: 'Job', id: 'LIST' }],
    }),
    getJob: builder.query<Job, number>({
      query: (id) => `jobs/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Job', id }],
    }),
    createJob: builder.mutation<Job, Partial<Job>>({
      query: (body) => ({
        url: 'jobs',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Job', id: 'LIST' }],
    }),
    updateJob: builder.mutation<Job, Partial<Job>>({
      query: ({ id, ...patch }) => ({
        url: `jobs/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Job', id }],
    }),
    deleteJob: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Job', id }],
    }),

    // Actions
    getActions: builder.query<Action[], number>({
      query: (jobId) => ({ url: 'actions', params: { job_id: jobId } }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Action' as const, id })),
              { type: 'Action', id: 'LIST' },
            ]
          : [{ type: 'Action', id: 'LIST' }],
    }),
    updateAction: builder.mutation<Action, Partial<Action>>({
      query: ({ id, ...patch }) => ({
        url: `actions/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Action', id }],
    }),
    deleteAction: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `actions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Action', id }],
    }),
    getConnections: builder.query<ActionConnection[], number>({
      query: (jobId) => ({ url: 'connections', params: { job_id: jobId } }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ActionConnection' as const, id })),
              { type: 'ActionConnection', id: 'LIST' },
            ]
          : [{ type: 'ActionConnection', id: 'LIST' }],
    }),

    // CallerIDs
    getCallerIDs: builder.query<CallerID[], number>({
      query: (jobId) => ({ url: 'callerids', params: { job_id: jobId } }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'CallerID' as const, id })),
              { type: 'CallerID', id: 'LIST' },
            ]
          : [{ type: 'CallerID', id: 'LIST' }],
    }),
    updateCallerID: builder.mutation<CallerID, Partial<CallerID>>({
      query: ({ id, ...patch }) => ({
        url: `callerids/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'CallerID', id }],
    }),
    deleteCallerID: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `callerids/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'CallerID', id }],
    }),

    // PhoneLists
    getPhoneLists: builder.query<PhoneList[], number>({
      query: (jobId) => ({ url: 'phones', params: { job_id: jobId } }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'PhoneList' as const, id })),
              { type: 'PhoneList', id: 'LIST' },
            ]
          : [{ type: 'PhoneList', id: 'LIST' }],
    }),
    updatePhoneList: builder.mutation<PhoneList, Partial<PhoneList>>({
      query: ({ id, ...patch }) => ({
        url: `phones/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'PhoneList', id }],
    }),
    deletePhoneList: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `phones/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'PhoneList', id }],
    }),

    // Schedulers
    getSchedulers: builder.query<Scheduler[], number>({
      query: (jobId) => ({ url: 'schedulers', params: { job_id: jobId } }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Scheduler' as const, id })),
              { type: 'Scheduler', id: 'LIST' },
            ]
          : [{ type: 'Scheduler', id: 'LIST' }],
    }),
    updateScheduler: builder.mutation<Scheduler, Partial<Scheduler>>({
      query: ({ id, ...patch }) => ({
        url: `schedulers/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Scheduler', id }],
    }),
    deleteScheduler: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `schedulers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Scheduler', id }],
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useGetDomainQuery,
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,

  useGetJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,

  useGetActionsQuery,
  useUpdateActionMutation,
  useDeleteActionMutation,
  useGetConnectionsQuery,
  useGetCallerIDsQuery,
  useUpdateCallerIDMutation,
  useDeleteCallerIDMutation,
  useGetPhoneListsQuery,
  useUpdatePhoneListMutation,
  useDeletePhoneListMutation,
  useGetSchedulersQuery,
  useUpdateSchedulerMutation,
  useDeleteSchedulerMutation,
} = apiSlice;
