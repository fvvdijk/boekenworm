import './App.module.css';
import HomePage from "./pages/homepage/HomePage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import UserPage from "./pages/userpage/UserPage";
import ListPage from "./pages/listpage/ListPage";
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from "./helpers/context/ApiContext";
import Navigation from "./layout/navigation/Navigation";
import {ProtectedRoute} from "./helpers/protectedroute/ProtectedRoute";
import Logout from "./components/logout/Logout";
import BookDetailsPage from "./pages/bookdetailspage/BookDetailsPage";
import styles from "./App.module.css"
import QuizResultsPage from "./pages/quizresultspage/QuizResultsPage";
import React from "react";
import CorsButton from "./components/shared/corsbutton/CorsButton";

function App() {

    return (
        <>
            <AuthProvider>
                <header className={styles.header}>
                    <h1>
                        Boekenworm.nl
                    </h1>
                </header>
                <nav className={styles.nav}>
                    <Navigation/>
                </nav>
                <main className={styles.main}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/ListPage" element={<ListPage/>}/>
                        <Route path="/RegisterPage" element={<RegisterPage/>}/>
                        <Route path="/QuizResultsPage" element={<ProtectedRoute><QuizResultsPage/></ProtectedRoute>}/>
                        <Route path="/UserPage" element={<ProtectedRoute><UserPage/></ProtectedRoute>}/>
                        <Route path="/bookDetails/:author/:id" element={<BookDetailsPage/>}/>
                        {/*bookdetails moet bookdetailspage worden*/}
                    </Routes>
                </main>
                <footer className={styles.footer}>
                   <Logout/>
                    <CorsButton url="https://cors-anywhere.herokuapp.com/corsdemo"/>
                </footer>
            </AuthProvider>
        </>
    )
}

export default App;
