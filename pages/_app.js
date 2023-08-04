import '@/styles/globals.scss'
import { createContext } from 'react'

const  StoreContext = createContext({})

export const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: '',
    coffeeStores: [],
  }
  return (<StoreContext.Provider value={{state: initialState}}>
    {children}
  </StoreContext.Provider>)
}

const App = ({ Component, pageProps }) => (<StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>)

export default App