import './globals.css'
import { Inter } from 'next/font/google'
import '@/assets/css/bootstrap.min.css';
import '@/assets/css/font-awesome.min.css';
import '@/assets/css/slick.css';
import '@/assets/css/navbar.css';
import '@/assets/css/default.css';
import '@/assets/scss/style.scss';
import 'react-modal-video/scss/modal-video.scss';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dainik loksandarbh',
  description: 'Dainik loksandarbh latest news and blogging on every topic',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
