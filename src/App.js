import './App.css';
import HomePage from "./pages/homepage/HomePage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import UserPage from "./pages/userpage/UserPage";
import FiveBooksPage from "./pages/fivebookspage/FiveBooksPage";
import ListPage from "./pages/listpage/ListPage";
import RandomBookPage from "./pages/randombookpage/RandomBookPage";
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from "./helpers/context/AuthContext";
import Navigation from "./layout/Navigation/Navigation";
import {ProtectedRoute} from "./helpers/protectedroute/ProtectedRoute";
import Logout from "./components/logout/Logout";
import BookDetails from "./pages/bookdetailspage/BookDetails";

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
                    <Route path="/bookDetails/:author/:id" element={<BookDetails/>}/>
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
