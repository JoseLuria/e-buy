import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/toolkit";
import { SessionProvider } from "next-auth/react";
import { AppWrapper } from "@/components";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <AppWrapper>
          <PayPalScriptProvider
            options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}
          >
            <Component {...pageProps} />
          </PayPalScriptProvider>
        </AppWrapper>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
