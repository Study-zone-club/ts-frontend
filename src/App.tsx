
import { AppShell } from '@mantine/core'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useSidebar } from './hooks/useSidebar'
import React from 'react'
import './App.css'

interface IApp {
  children?: React.ReactNode;
}

function App({ children }: IApp) {
  const sidebar = useSidebar()

  const linksAllowed = ['/login', '/signup', '/landing']
  return (
    <>
   <AppShell
        header={ linksAllowed.includes(window.location.pathname) ? <Navbar/>  : <Sidebar /> }
        ml={ sidebar.width <= 0 && !linksAllowed.includes(window.location.pathname) ? 50 : linksAllowed.includes(window.location.pathname) ? 0 : '-10px' }
        style={{ overflowX: 'hidden' }}
      >
        <>
          { children }
        </>
      </AppShell>
    </>
  )
}

export default App
