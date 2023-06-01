import styled from 'styled-components'
import ImgLogo from '../../components/assets/logo-animalis-noback.webp'
import colors from '../../utils/colors'
import {Link} from 'react-router-dom'
import datas from '../../data/homeData.json'
import HomeCard from '../../components/HomeCard'

//Création des éléments du DOM + Style avec styled-components
const HomeArea=styled.div`
width:100%;
height:auto;
padding:10px 0;
display:flex;
flex-direction:column;
align-items:center;
color:white;
`
const Banner=styled.div`
width:100%;
height:200px;
margin:20px 0;
background-image: url('https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg');
background-size:cover;
background-position:center;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
align-items:flex-start;
@media all and (min-width:1024px){
width:95%;
height:300px;
border-radius:10px;
}
`
const BannerText=styled.p`
width:50%;
font-weight:bold;
align-self:center;
margin-left:10px;
@media all and (min-width:1024px){
    width:40%;
    font-size:24px;
    margin-left:70px;
    align-self:center;
    padding-top:30px;
    }
`
const BannerLogo=styled.img`
width:90px;
height:97px;
@media all and (min-width:1024px){
    width:220px;
    height:240px;
    }
    `
const LinkShop=styled(Link)`
width:50%;
height:50px;
margin:0 0 5px 5px;
background-color:${colors.primary};
text-decoration:none;
color:white;
font-size:16px;
font-weight:bold;
border-radius:10px;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
@media all and (min-width:1024px){
width:50%;
margin:0 0 10px 10px;
font-size:24px;
transform:scale(0.9);
transition:transform 200ms ease-in;
&:hover{
transform:scale(1)
}
}
`
const HomeTitle=styled.h2`
width:100%;
height:60px;
margin:0;
background-color:${colors.primary};
display:flex;
justify-content:center;
align-items:center;
`
const HomeCardArea = styled.div`
width:100%;
display:flex;
flex-wrap:wrap; 
justify-content:center;
@media all and (min-width:1024px){
padding:20px;
width:85%;
justify-content:space-around;
}
`
//Récupération des données d'affichage de la page d'accueil
const homeDatas=datas

function Home(){
    return(
        <HomeArea>
        <Banner>
        <BannerText> Découvrez notre gamme de produits sélectionnés pour le bonheur de votre animal</BannerText>
        <BannerLogo src={ImgLogo} alt='logo animalis'/>
        <LinkShop $notDisplay={true} to='/Shop'>Visitez la boutique</LinkShop>
        </Banner>
        <HomeTitle>Nos produits et services</HomeTitle>
        <HomeCardArea>
        {homeDatas&&homeDatas.map((homeData,index)=>(<HomeCard key={index} title={homeData.title} image={homeData.image}/>))}
        </HomeCardArea>
        </HomeArea>
        )
}

export default Home