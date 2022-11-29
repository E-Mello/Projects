import { QueryClient, QueryClientProvider } from "react-query";

import { App } from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

// Estrutura padrão do ReactJS
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // Estrutura padrão do ReactJS
  <React.StrictMode>
    {/*  QueryClientProvider é referente ao react-query, ou seja, é necessário envolver o app com o mesmo, para assim, funcionar a biblioteca*/}
    {/* <QueryClientProvider client={queryClient}> */}
    {/* Para que o framework ChakraUI funcione, é necessário que ele englobe  */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
    {/* ReactQueryDevtools é responsável por efetuar o debug, para identificarmos que esta funcionando conforme desejado */}
    {/* <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider> */}
  </React.StrictMode>
);
