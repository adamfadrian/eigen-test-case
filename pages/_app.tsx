import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from 'store/rootReducer'
import { SWRConfig } from 'swr'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SWRConfig value={{ provider: () => new Map() }}>
            <Component {...pageProps} />
          </SWRConfig>
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}
