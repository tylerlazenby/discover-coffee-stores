import Head from 'next/head'
import styles from '@/styles/pages/Home.module.scss'
import Banner from '@/components/banner'
import Card from '@/components/card'
import { fetchCoffeeStores } from '@/lib/coffee-store.js'
import useTrackLocation from '@/hooks/use-track-location.js'
import { useEffect, useState } from 'react'

export async function getStaticProps () {
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStores,
    }
  }
}

const Home = ({ coffeeStores }) => {
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } = useTrackLocation()
  const [coffeeStoreData, setCoffeeStoreData] = useState(coffeeStores)

  const handleOnBannerBtnClick = () => handleTrackLocation()

  useEffect(() => {
    if (latLong) {
      fetchCoffeeStores(latLong, 30).then((result) => {
        setCoffeeStoreData(result)
      })
        .catch(e => console.error(e))
    }
  }, [latLong])

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
      <div className={styles.heroImage}/>
      <div className={styles.sectionWrapper}>
        {coffeeStoreData.length > 0 && <><h2 className={styles.heading2}>Toronto stores</h2>
          <div className={styles.cardLayout}>
            {coffeeStoreData.map((coffeeStore, index) => {
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