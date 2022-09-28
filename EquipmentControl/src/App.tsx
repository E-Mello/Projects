import { useState } from 'react'
import { Flex } from '@chakra-ui/react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RegisterDevice } from './pages/RegisterDevice'
import { Dashboard } from './pages/Dashboard'
import { Layout } from './pages/Layout'
import { DeviceControl } from './pages/DeviceControl'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'
import { NoPage } from './pages/NoPage'
import { Sidebar } from './components/Sidebar'
import { Routes } from './Routes'


export function App() {
  return (
    <>
      <Sidebar />
      <Routes />
    </>
  )
}
