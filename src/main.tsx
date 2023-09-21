import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const Wrapper = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
       <App />
  </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
)
