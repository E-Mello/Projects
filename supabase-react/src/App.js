import './index.css'

import { useEffect, useState } from 'react'

import Account from './Account'
import Auth from './Auth'
import { ChakraProvider } from '@chakra-ui/react'
import { supabase } from './supabaseClient'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    // supabase.auth.getSession().then(({ data: { session } }) => {
    // })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  return (
    <ChakraProvider>
      {/* {!session ? <Auth/> : <Account key={session.user.id} session={session}/>} */}
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      </div>
    </ChakraProvider>
  )
}
