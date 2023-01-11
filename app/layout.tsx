import NavigationBar from './auth/components/layout/navigationBar';
import './globals.css';
import Template from './template';
import styles from './template.module.css';

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
        <NavigationBar />
        <div className={styles.pageComponent}>{children}</div>
      </body>
    </html>
  );
}
