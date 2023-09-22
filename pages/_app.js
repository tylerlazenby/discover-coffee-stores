import '@/styles/globals.scss'
import StoreProvider from '@/store/store-context'

const App = ({ Component, pageProps }) => (<StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>)

export default App