import Head from 'next/head'
import styles from '@/styles/pages/Home.module.scss'
import Banner from '@/components/banner'
import Card from '@/components/card'
import { fetchCoffeeStores } from '@/lib/coffee-store.js'

export async function getStaticProps () {
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStores,
    }
  }
}

const Home = ({ coffeeStores }) => {
  const handleOnBannerBtnClick = () => {
    console.log('hi banner button')
  }

  return (<div className={styles.container}>
    <Head>
      <title>Coffee Connoisseur</title>
      <meta name="description" content="Search for local coffee shops in your area."/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
    <main className={styles.main}>
      <Banner buttonText={'View stores nearby'} handleOnClick={handleOnBannerBtnClick}/>
      <div className={styles.heroImage}/>
      {coffeeStores.length > 0 && <><h2 className={styles.heading2}>Toronto stores</h2>
        <div className={styles.cardLayout}>
          {coffeeStores.map((coffeeStore, index) => {
            return (<Card
                key={coffeeStore.id}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                imgName={coffeeStore.name}
                href={`/coffee-store/${coffeeStore.id}`}
                className={styles.card}
              />)
          })}
        </div>
      </>}
    </main>
  </div>)
}

export default Home