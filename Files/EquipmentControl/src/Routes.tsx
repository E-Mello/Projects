import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";

import { Index } from "./pages/Index";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";
import { supabase } from "./supabase/supabaseClient";

// Routes.tsx serve para controlar as rotas da aplicação, ou seja, para onde vai ser redirecionado ao clicar nos links
export function Routes() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    // Abaixo está a estrutura das rotas utilizando react-router-dom
    <BrowserRouter>
      <Switch>
        {/* Aqui é definido a "home" ou seja, minha rota 'principal' */}
        <Route exact path="/">
          <Index />
          {!session ? <Login /> : <Index />}
        </Route>
        {/* Aqui fora definido a rota para as paginas diferente da definida, ou seja, caso o usuário tente utilizar
                    uma rota diferente das rotas criadas, ele irá cair na página NoPage
                */}
        <Route path="*">
          <NoPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
