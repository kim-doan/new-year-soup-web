import NavigationBar from './auth/components/layout/navigationBar';
import './globals.css';
import styles from './layout.module.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>메인페이지</title>
      </head>
      <body>
        <div className={styles.main}>
          <NavigationBar />
          <div className={styles.pageComponent}>{children}</div>
        </div>
      </body>
    </html>
  );
}
