import { useState } from 'react'
import { Flex, Switch } from '@chakra-ui/react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RegisterDevice } from './pages/RegisterDevice'
import { Dashboard } from './pages/Dashboard'
import { Layout } from './components/Layout'
import { DeviceControl } from './pages/DeviceControl'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'
import { NoPage } from './pages/NoPage'


export function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="RegisterDevice" element={<RegisterDevice />} />
            <Route path="DeviceControl" element={<DeviceControl />} />
            <Route path="Reports" element={<Reports />} />
            <Route path="Settings" element={<Settings />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Switch>
          <Route>
            <Layout />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}
