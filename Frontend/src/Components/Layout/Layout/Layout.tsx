import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Home from "../Home/Home";
import "./Layout.css";


function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <main>
                <Home />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
