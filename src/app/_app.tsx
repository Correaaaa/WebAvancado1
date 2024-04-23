// src/app/_app.tsx

import '../styles/styles.css'; // Importa os estilos CSS
import React from 'react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
