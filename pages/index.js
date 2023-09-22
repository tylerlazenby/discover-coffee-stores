import Head from 'next/head'
import styles from '@/styles/pages/Home.module.scss'
import Banner from '@/components/banner'
import Card from '@/components/card'
import { fetchCoffeeStores } from '@/lib/coffee-store.js'
import useTrackLocation from '@/hooks/use-track-location.js'
import { useContext, useEffect, useState } from 'react'
import { ACTION_TYPES, StoreContext } from '@/store/store-context'

export async function getStaticProps () {
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStores,
    }
  }
}

const Home = (props) => {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation()

  /*const [coffeeStoreData, setCoffeeStoreData] = useState(coffeeStores)*/
  const [error, setError] = useState(null)
  const { dispatch, state } = useContext(StoreContext)
  const {coffeeStores, latLong} = state
  const handleOnBannerBtnClick = () => handleTrackLocation()

  useEffect(() => {
    if (latLong) {
      fetchCoffeeStores(latLong, 30).then((result) => {
        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES, payload: {
            coffeeStores: result
          }
        })
      }).catch(e => {
        console.error(e)
        setError(e.message)
      })
    }
  }, [dispatch, latLong])

  return (<div className={styles.container}>
    <Head>
      <title>Coffee Connoisseur</title>
      <meta name="description" content="Search for local coffee shops in your area."/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
    <main className={styles.main}>
      <Banner
        buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
        handleOnClick={handleOnBannerBtnClick}
      />
      {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
      {error && <p>Something went wrong: {error}</p>}
      <div className={styles.heroImage}/>
      <div className={styles.sectionWrapper}>
        {coffeeStores.length > 0 && <><h2 className={styles.heading2}>Stores Near Me</h2>

          <div className={styles.cardLayout}>

            {coffeeStores.map((coffeeStore, index) => {
              return (<Card
                key={coffeeStore.id}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}
                imgName={coffeeStore.name}
                href={`/coffee-store/${coffeeStore.id}`}
                className={styles.card}
              />)
            })}
          </div>
        </>}
      </div>

      <div className={styles.sectionWrapper}>
        {props.coffeeStores.length > 0 && <><h2 className={styles.heading2}>Toronto Stores</h2>

          <div className={styles.cardLayout}>

            {props.coffeeStores.map((coffeeStore, index) => {
              return (<Card
                key={coffeeStore.id}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}
                imgName={coffeeStore.name}
                href={`/coffee-store/${coffeeStore.id}`}
                className={styles.card}
              />)
            })}
          </div>
        </>}
      </div>
    </main>
  </div>)
}

export default Home