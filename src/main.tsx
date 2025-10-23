import {StrictMode} from 'react'

import {NavigationProvider} from "@/shared/contexts/navigationContext.tsx";
import {createRoot} from 'react-dom/client'

import App from './app/App.tsx'
import '@/shared/styles/index.scss'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NavigationProvider>
            <App/>
        </NavigationProvider>
    </StrictMode>,
)
