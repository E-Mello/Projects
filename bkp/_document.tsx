import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* aqui esta fazendo um preconnect para a importacao do roboto ser mais rapida */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* aqui esta fazendo um preconnect para a importacao do roboto ser mais rapida */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* aqui esta fazendo um preconnect para a importacao do roboto ser mais rapida */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <title>WebSite Unemat</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/LogoUnemat.ico" />
      </Head>
      {/* Nao mexer no body, utilizar document apenas para alterar o head */}
      <body>
        {/* Caso eu queira alterar meu body, eu altero meu _app, ele que e minha main */}
        <Main />
        {/* Parte que eu nao vou me preocupar ate ser quase um Lucas da vida */}
        <NextScript />
      </body>
    </Html>
  );
}

