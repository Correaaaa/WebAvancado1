// src/app/_app.tsx

import '../styles/globals.css'; // Importa estilos globais
import React from 'react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
