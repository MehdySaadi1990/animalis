//Importation des pages et du systeme de routing
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import './utils/style/index.css';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Basket from './pages/Basket';
import About from './pages/About';
import Account from './pages/Account';
import AdminSpace from './pages/AdminSpace';
import AddItem from './pages/AddItem';
import RemoveItem from './pages/RemoveItem';
import UpdateItem from './pages/UpdateItem';
import ProductPage from './pages/ProductPage';
import EmailVerify from './pages/EmailVerify';
import Confirm from './pages/Confirm';
import ResetPassword from './pages/ResetPassword';
import Error from './pages/Error';
import { createGlobalStyle } from 'styled-components';



//Application du global style pour la police de caractère
const GlobalStyle = createGlobalStyle`
    div {
        font-family: 'Montserrat', sans-serif;
    }
`
function App() {
    //State Admin pour la gestion des routes privées
    const [admin, setAdmin]=useState(false)
    //State Login pour la gestion des comptes connectés non-admin
    const [login, setLogin]=useState(false)
    //State Panier pour la gestion de l'affichage du nombre d'article dans le panier au niveau du header
    const [panier, setPanier]=useState(0)
    return(
    <Router>
    <GlobalStyle/>
    <Header login={login} setLogin={setLogin} admin={admin} 
    setAdmin={setAdmin} panier={panier} setPanier={setPanier}/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Shop" element={<Shop panier={panier} setPanier={setPanier} />} />
    <Route path="/Basket" element={<Basket panier={panier} setPanier={setPanier}/>}/>
    <Route path="/About" element={<About/>}/>
    <Route path="/Account" element={<Account admin={admin} setAdmin={setAdmin} login={login} setLogin={setLogin}/>}/>
    <Route path="/Confirm/:orderNumber" element={<Confirm/>}/>
    {admin&&<Route path="/AdminSpace" element={<AdminSpace/>}/>}
    {admin&&<Route path="/AdminSpace/AddItem" element={<AddItem/>}/>}
    {admin&&<Route path="/AdminSpace/RemoveItem" setAdmin={setAdmin} element={<RemoveItem/>}/>}
    {admin&&<Route path="/AdminSpace/UpdateItem" element={<UpdateItem/>}/>}
    {admin&&<Route path="/AdminSpace/UpdateItem/:id" element={<ProductPage/>}/>}
    <Route path="/verify/:id/:token" element={<EmailVerify/>}/>
    <Route path="/resetPassword/:id/:token" element={<ResetPassword/>}/>
    <Route path="*" element={<Error/>}/>
    </Routes>
    <Footer/>
    </Router>)
}

export default App