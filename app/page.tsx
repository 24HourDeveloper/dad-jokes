import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to dad jokes</h1>
    </main>
  );
}
