import { LoginForm } from '@/modules/auth'

import { CONSOLE_URL } from './constants'
import styles from './LoginPage.module.scss'

export function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>MAX Chat</h1>
        <p className={styles.hint}>Введите учётные данные инстанса GREEN-API</p>
        <LoginForm />
        <a
          className={styles.link}
          href={CONSOLE_URL}
          target="_blank"
          rel="noreferrer"
        >
          Где взять idInstance и apiTokenInstance
        </a>
      </section>
    </main>
  )
}
