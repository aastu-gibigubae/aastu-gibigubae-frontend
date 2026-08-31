# services/

Axios instance + API modules. `apiClient.ts` holds the configured Axios instance (base URL, interceptors for
JWT attach/refresh). One file per backend resource (eventsApi.ts, coursesApi.ts, faqApi.ts, authApi.ts) matching
the backend's documented endpoints (Events API, Courses API, FAQ API, Media API, Admin API).
