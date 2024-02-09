import './App.css';
import HomePage from "./pages/Homepage/HomePage";
import RegisterPage from "./pages/Account-aanmaken/Account-aanmaken";
import UserPage from "./pages/Ingelogde-gebruiker/UserPage";
import FiveBooksPage from "./pages/5-boeken/5-boeken";
import ListPage from "./pages/Lijstpagina/Lijstpagina";
import RandomBookPage from "./pages/Willekeurig-boek/RandomBookPage";
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from "./components/Context/AuthContext";
import Navigation from "./components/Navigation/Navigation";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";

function App() {

    return (
        <>
            <AuthProvider>
                <Navigation/>
                <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/ListPage" element={<ListPage/>}/>
                <Route path="/RegisterPage" element={<RegisterPage/>}/>
                <Route path="/FiveBooksPage" element={<ProtectedRoute><FiveBooksPage/></ProtectedRoute>}/>
                <Route path="/RandomBookPage" element={<ProtectedRoute><RandomBookPage/></ProtectedRoute>}/>
                    <Route path="/UserPage" element={<ProtectedRoute><UserPage/></ProtectedRoute>}/>
                    </Routes>
            </AuthProvider>
        </>
    )
}

export default App;
