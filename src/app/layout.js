'use client';
import localFont from "next/font/local";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from "../context/CartContext";
import NavBar from "./component/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "../context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <style jsx global>{`
          html, body {
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            color: #000000; 
            height: 100%;
            width: 100%;
          }

          @media (prefers-color-scheme: dark) {
            html, body {
              background-color: #ffffff;
              color: #000000;
            }
          }
        `}</style>
        <AuthProvider>
          <NavBar />
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
          />
          <CartProvider> {children} </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
