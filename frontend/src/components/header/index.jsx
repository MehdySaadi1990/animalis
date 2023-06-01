import ImgLogo from '../assets/logo-animalis.webp'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from '../../utils/colors'


const HeaderArea = styled.div`
width:100%;
height:auto;
background-color:${colors.primary};
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
@media all and (min-width:1024px){
    flex-direction:row;
}
`
const Logo = styled.img`
width:100px;
height:118px;
@media all and (min-width:1024px){
   width:150px;
   height:168px;
   margin-right:30%;
}
`
const NavBar = styled.nav`
height:auto;
width:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
@media all and (min-width:1024px){
    width:50%;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:flex-end;
}
`
const NavLink = styled(Link)`
width:100%;
height:30px;
text-decoration:none;
border-bottom:1px solid white;
text-align:center;
background-color:${colors.secondary};
color:white;
font-size:16px;
font-weight:600;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
@media all and (min-width:1024px){
   width:25%;
   height:50px;
   background-color:transparent;
   border:none;
   justify-content:space-around;
   transition:transform 200ms ease-in;
   &:hover{
    transform:scale(1.2);
   }
}
`
function Header({login, setLogin, admin, setAdmin, panier, setPanier}) {  
    return(
        <HeaderArea>
            <Logo src={ImgLogo} alt='image logo'/>
            <NavBar>
            <NavLink to='/'>Accueil</NavLink>
            <NavLink to='/About'>A propos</NavLink>
            <NavLink to='/Basket'>Mon Panier  {panier!==0&&panier}</NavLink>
            {login&&admin?<NavLink to='/AdminSpace' onClick={()=>setAdmin(true)}>Administration</NavLink>:null}
            {login?<NavLink to='/' onClick={()=>{setLogin(false)
                                                 setAdmin(false)
                                                 setPanier(0)
                                                 localStorage.clear()}}>Se Déconnecter</NavLink>:<NavLink to='/Account'>Mon Compte</NavLink>}
            </NavBar>
        </HeaderArea>
    )
}

export default Header