import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
})

export const api = {
  onboard: (data) => API.post('/api/onboard', data),
  scan: (userId) => API.post('/api/scan', { user_id: userId }),
  getSignals: (userId, filters = {}) => {
    const params = { user_id: userId, ...filters }
    return API.get('/api/signals', { params })
  },
  generateOutreach: (signalId) => API.post('/api/outreach', { signal_id: signalId }),
  getCompetitorCustomers: (userId) => API.get('/api/competitors/customers', { params: { user_id: userId } }),
}

export default api
