import { FC, PropsWithChildren } from 'react';
import '../styles/globals.css';

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html>
    <body>{children}</body>
  </html>
);
export default RootLayout;
