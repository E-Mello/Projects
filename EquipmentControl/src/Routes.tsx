
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RegisterDevice } from './pages/--old_RegisterDevice'
import { Dashboard } from './pages/Dashboard'
import { DeviceControl } from './pages/DeviceControl'
import { Reports } from './pages/Reports'
import { NoPage } from './pages/NoPage'
import { DeviceControlv2 } from './pages/DeviceControlv2'


export function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/register-device">
                    <RegisterDevice />
                </Route>
                <Route path="/device-control">
                    <DeviceControlv2 />
                </Route>
                <Route path="/reports">
                    <Reports />
                </Route>
                <Route path="*">
                    <NoPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
