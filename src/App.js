import './App.css';
import HomePage from "./pages/Homepage/HomePage";
import RegisterPage from "./pages/Account-aanmaken/Account-aanmaken";
import UserPage from "./pages/Ingelogde-gebruiker/UserPage";
import FiveBooksPage from "./pages/5-boeken/5-boeken";
import ListPage from "./pages/Lijstpagina/Lijstpagina";
import RandomBookPage from "./pages/Willekeurig-boek/RandomBookPage";
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from "./services/Context/AuthContext";
import Navigation from "./layout/Navigation/Navigation";
import {ProtectedRoute} from "./helpers/ProtectedRoute/ProtectedRoute";
import Logout from "./components/Logout/Logout";

function App() {

    return (
        <>
            <AuthProvider>
                <header />
                <nav>
                    <Navigation/>
                </nav>
                <main>
                    <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/ListPage" element={<ListPage/>}/>
                    <Route path="/RegisterPage" element={<RegisterPage/>}/>
                    <Route path="/FiveBooksPage" element={<ProtectedRoute><FiveBooksPage/></ProtectedRoute>}/>
                    <Route path="/RandomBookPage" element={<ProtectedRoute><RandomBookPage/></ProtectedRoute>}/>
                    <Route path="/UserPage" element={<ProtectedRoute><UserPage/></ProtectedRoute>}/>
                </Routes>
                </main>
                <footer>
                    <Logout/>
                </footer>
            </AuthProvider>
        </>
    )
}

export default App;
