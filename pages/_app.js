import '@/styles/globals.scss'
import { createContext, useReducer } from 'react'

const  StoreContext = createContext({})

const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES',
}

const storeReducer = (state, action) => {
  const {type, payload} = action

  switch (type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return {
        ...state,
        latLong: payload.latLong,
      }
    case ACTION_TYPES.SET_COFFEE_STORES:
      return {
        ...state,
        coffeeStores: payload.coffeeStores,
      }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

export const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: '',
    coffeeStores: [],
  }

  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (<StoreContext.Provider value={{state, dispatch}}>
    {children}
  </StoreContext.Provider>)
}

const App = ({ Component, pageProps }) => (<StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>)

export default App