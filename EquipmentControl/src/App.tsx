import { useState } from 'react'
import { Container, Flex } from '@chakra-ui/react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RegisterDevice } from './pages/--old_RegisterDevice'
import { Dashboard } from './pages/Dashboard'
import { DeviceControl } from './pages/DeviceControl'
import { Reports } from './pages/Reports'
import { NoPage } from './pages/NoPage'
import { Sidebar } from './components/Sidebar'
import { Routes } from './Routes'

import '../global.css'

export function App() {
  return (
    <Flex>
      <Sidebar />
      <Routes />
    </Flex>
  )
}
