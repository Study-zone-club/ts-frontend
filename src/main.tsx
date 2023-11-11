import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MantineProvider as Mantine } from '@mantine/core'
import { ModalsProvider as Modals } from '@mantine/modals'
import { store } from './config/store'
import { Provider as GlobalStates } from 'react-redux'
import './index.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Dashboard from './pages/Dashboard.tsx'
import Notes from './pages/Notes.tsx'
import ToDo from './pages/ToDo.tsx'
import Material from './pages/Material.tsx'
import Pomodoro from './pages/Pomodoro.tsx'
import Landing from './pages/Landing.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Horario from './pages/Horario.tsx'
// import Login from './pages/Login.tsx'
// import Security from './pages/Security.tsx'
// import Accounts from './pages/Accounts.tsx'
// import MyAccount from './pages/MyAccount.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStates store={store}>
      <Mantine withGlobalStyles withNormalizeCSS>
        <Router>
          <Modals>
            <App>
              {/* <ProtectionPin /> */}
              <Switch>
                <Route path="/" component={Dashboard} exact />
                <Route path="/ToDo" component={ToDo} exact />
                <Route path="/notes" component={Notes} exact />
                <Route path="/material" component={Material} exact />
                <Route path="/pomodoro" component={Pomodoro} exact />
                <Route path="/landing" component={Landing} exact />
                <Route path="/Horario" component={Horario} exact />
                <Route path="/Login" component={Login} exact />
                <Route path="/Regis" component={Register} exact />
              </Switch>
            </App>
          </Modals>
        </Router>
      </Mantine>
    </GlobalStates>
  </React.StrictMode>,
)