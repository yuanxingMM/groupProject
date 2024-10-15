'use client';
import Footer from "../component/Footer";
import ShoppingPage from './page';
export default function RootLayout({ children }) {
    return (
        <>
            <ShoppingPage />
            <footer>
                <Footer />
            </footer>
        </>


    );
}
