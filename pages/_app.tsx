// _app.tsx
import { AppProps } from "next/app";
import { AuthProvider } from "context/AuthContext"; // Import AuthProvider

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
