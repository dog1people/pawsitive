import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@src/App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@src/index.css'
import axios from 'axios'

axios.defaults.withCredentials = true

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
