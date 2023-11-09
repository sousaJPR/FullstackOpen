import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './context/NotificationContext'
import { LoginContextProvider } from './context/LoginContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <LoginContextProvider>
            <NotificationContextProvider>
                <App />
            </NotificationContextProvider>
        </LoginContextProvider>

    </QueryClientProvider>
)