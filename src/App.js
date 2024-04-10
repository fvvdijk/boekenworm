import './App.module.css';
import HomePage from "./pages/homepage/HomePage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import UserPage from "./pages/userpage/UserPage";
import FiveBooksPage from "./pages/quizresultspage/QuizResultsPage";
import ListPage from "./pages/listpage/ListPage";
import RandomBookPage from "./pages/randombookpage/RandomBookPage";
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from "./helpers/context/ApiContext";
import Navigation from "./layout/Navigation/Navigation";
import {ProtectedRoute} from "./helpers/protectedroute/ProtectedRoute";
import Logout from "./components/logout/Logout";
import BookDetails from "./pages/bookdetailspage/BookDetails";
import Header from "./layout/header/Header";
import styles from "./App.module.css"

function App() {

    return (
        <>
            <AuthProvider>
                <header className={styles.header}>
                    <Header/>
                </header>
                <nav className={styles.nav}>
                    <Navigation/>
                </nav>
                <main className={styles.main}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/ListPage" element={<ListPage/>}/>
                        <Route path="/RegisterPage" element={<RegisterPage/>}/>
                        <Route path="/QuizResultsPage" element={<ProtectedRoute><FiveBooksPage/></ProtectedRoute>}/>
                        <Route path="/RandomBookPage" element={<ProtectedRoute><RandomBookPage/></ProtectedRoute>}/>
                        <Route path="/UserPage" element={<ProtectedRoute><UserPage/></ProtectedRoute>}/>
                        <Route path="/bookDetails/:author/:id" element={<BookDetails/>}/>
                    </Routes>
                </main>
                <footer className={styles.footer}>
                    <Logout/>
                </footer>
            </AuthProvider>
        </>
    )
}

export default App;
