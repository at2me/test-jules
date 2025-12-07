import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock for GET /api/domains
  http.get('/api/domains', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Основной домен',
        enable: true,
        owner: 'user1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Тестовый домен',
        enable: false,
        owner: 'user2',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }),

  // Mock for GET /api/jobs
  http.get('/api/jobs', ({ request }) => {
    const url = new URL(request.url);
    const domainId = url.searchParams.get('domain_id');

    if (domainId === '1') {
      return HttpResponse.json([
        { id: 101, domain: 1, name: 'Задача "Холодный обзвон"', status: 'idle', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: 102, domain: 1, name: 'Задача "Опрос клиентов"', status: 'processing', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      ]);
    }
    if (domainId === '2') {
      return HttpResponse.json([
        { id: 201, domain: 2, name: 'Тестовая задача', status: 'idle', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      ]);
    }
    return HttpResponse.json([]);
  }),

  // Mock for GET /api/actions
  http.get('/api/actions', () => {
    return HttpResponse.json([
      { id: 1, type: 'playback', priority: 1, enable: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data: { position: { x: 100, y: 100 } } },
      { id: 2, type: 'transfer', priority: 2, enable: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), data: { position: { x: 400, y: 100 } } },
    ]);
  }),

  // Mock for GET /api/connections
  http.get('/api/connections', () => {
    return HttpResponse.json([
      { id: 1, source: 1, target: 2, condition: 'always' },
    ]);
  }),

  // Mock for GET /api/callerids
  http.get('/api/callerids', () => {
    return HttpResponse.json([
      { id: 1, caller_id: '79001234567', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 2, caller_id: '79007654321', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ]);
  }),

  // Mock for GET /api/phones
  http.get('/api/phones', () => {
    return HttpResponse.json([
      { id: 1, dst_number: '79998887766', status: 'new', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 2, dst_number: '79991112233', status: 'done', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ]);
  }),

  // Mock for GET /api/schedulers
  http.get('/api/schedulers', () => {
    return HttpResponse.json([
      { id: 1, day_of_week: 1, start_time: '09:00', stop_time: '18:00', enable: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 2, day_of_week: 3, start_time: '10:00', stop_time: '17:00', enable: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ]);
  }),
];
