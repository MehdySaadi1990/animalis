import ImgLogoNb from '../assets/logo_animalis_nb.webp'
import styled from 'styled-components'
import { FaWhatsapp } from 'react-icons/fa';
import colors from '../../utils/colors';

const FooterArea = styled.div`
width:100%;
height:auto;
background-color:${colors.primary};
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:center;
padding:15px 0;
color:white;
font-size:14px;
font-weight:500;
@media all and (min-width:1024px){
    flex-direction:row;
    height:200px;
}
`
const FooterLogo = styled.img`
width:80px;
height:80px;
@media all and (min-width:1024px){
   width:140px;
   height:140px;
   margin-left:20px;
}
`
const AdresseArea = styled.address`
width:100%;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
font-style:normal;
@media all and (min-width:1024px){
    height:100px;
    flex-wrap:wrap;
}
`
const RubriqueTitle = styled.h4`
margin:10px;
`
const RubriqueText = styled.p`
text-align:center;
margin:0;
@media all and (min-width:1024px){
    text-align:left;
}
`
const RubriqueLink =styled.a`
text-decoration:none;
color:white;
cursor:pointer;
display:flex;
align-items:center;
`
function Footer() {
    return(
    <FooterArea>
    <FooterLogo src={ImgLogoNb} alt='logo animalis noir et blanc'/>
    <AdresseArea>
    <RubriqueTitle>Adresse</RubriqueTitle>
    <RubriqueText>
    Pavé de Wuiti,<br/>
    Carrefour 3K,<br/>
    Lomé-Togo
    </RubriqueText>
    <RubriqueTitle>Contact</RubriqueTitle>
    <RubriqueLink href="+228 90 47 19 19"><FaWhatsapp/>+228 90 47 19 19</RubriqueLink>
    <RubriqueLink href="mailto:animalis.lome@gmail.com">e-mail : animalis.lome@gmail.com</RubriqueLink>
    <RubriqueTitle>Horaires</RubriqueTitle>
    <RubriqueText>
        Du Lundi au Samedi<br/>
        8h à 17h
    </RubriqueText>
    </AdresseArea>
    </FooterArea>
    )
}
export default Footer