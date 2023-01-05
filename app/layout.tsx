import './globals.css';
import Template from './template';

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
        <Template>{children}</Template>
      </body>
    </html>
  );
}
