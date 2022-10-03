import { useState } from 'react'
import { Container, Flex } from '@chakra-ui/react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Routes } from './Routes'

import '../global.css'

export function App() {
  return (
    <Flex>
      <Routes />
    </Flex>
  )
}
