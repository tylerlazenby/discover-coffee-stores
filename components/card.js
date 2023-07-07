import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/components/Card.module.scss'
import cls from 'classnames'

const Card = ({ name, imgUrl, imgName, href }) => {
  return (<Link href={href} className={styles.cardLink}>
    <div className={cls('glass', styles.container)}>
      <div className={styles.cardHeaderWrapper}>
        <h2 className={styles.cardHeader}>{name}</h2>
      </div>
      <div className={styles.cardImageWrapper}>
        <Image
          src={imgUrl}
          width={260}
          height={160}
          alt={imgName}
          className={styles.cardImage}
        />
      </div>
    </div>
  </Link>)
}

export default Card