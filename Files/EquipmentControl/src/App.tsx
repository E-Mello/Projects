import { Flex } from '@chakra-ui/react'
import { Routes } from './Routes'

import '../global.css'

// Componente utilizado para chamar as rotas
export function App() {
  return (
    <Flex>
      <Routes />
    </Flex>
  )
}
