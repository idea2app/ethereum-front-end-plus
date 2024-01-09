import { Container } from 'react-bootstrap';

import styles from './page.module.css'

export default function Home() {
  return (
    <Container as="main" className={`${styles.main}`}>
      <h1 className='text-center mt-5 mb-3'>MBTI</h1>
    </Container>
  )
}
