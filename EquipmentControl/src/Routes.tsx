
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { NoPage } from './pages/NoPage'
import { Index } from './pages/Index'


export function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="*">
                    <NoPage />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
