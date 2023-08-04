import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'
import styles from '@/styles/pages/coffee-store.module.scss'
import Image from 'next/image'
import cls from 'classnames'
import { fetchCoffeeStores } from '@/lib/coffee-store'

const getStaticPaths = async () => {
  const coffeeStores = await fetchCoffeeStores()
  const paths = coffeeStores.map(coffeeStore => {
    return {
      params: {
        id: coffeeStore.id.toString()
      }
    }
  })
  return {
    paths,
    fallback: true,
  }
}

const getStaticProps = async ({ params }) => {
  const coffeeStores = await fetchCoffeeStores()
  const findCoffeeSStoreById = coffeeStores.find(coffeeStore => coffeeStore.id.toString() === params.id)
  return {
    props: {
      coffeeStore: findCoffeeSStoreById ? findCoffeeSStoreById : {}
    }
  }
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { address, locality, name, imgUrl } = coffeeStore

  const handleUpvoteButton = () => {
    console.log('upvote button clicked')
  }

  const altUrl = "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80";

  return (<>
    <Head>
      <title>{name}</title>
    </Head>
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href={'/'}>
              &larr; Back To Home
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image src={imgUrl || altUrl} width={600} height={360} className={styles.storeImg} alt={name}/>
          </div>
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src={"/static/icons/nearMe.svg"} width={24} height={24} alt={'icon'}/>
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={"/static/icons/places.svg"} width={24} height={24} alt={'icon'}/>
            <p className={styles.text}>{locality}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={"/static/icons/star.svg"} width={24} height={24} alt={'icon'}/>
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  </>)
}

CoffeeStore.propTypes = {
  coffeeStore: PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string,
    neighbourhood: PropTypes.string,
  }).isRequired
}

export { getStaticProps, getStaticPaths }
export default CoffeeStore