import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import { keyframes } from "styled-components"
import VerificationImg from '../../data/verification.webp'
import AccessDenied from '../../data/accessdenied.webp'
import colors from "../../utils/colors"

//Création des éléments du DOM + Style avec styled-components
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
    transform: rotate(360deg);
    }
`
const EmailVerifyArea = styled.div`
width:100%;
height:500px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center`

const VerifyImg = styled.img`
width:200px;
height:200px;
object-fit:contain`

const VerifyText= styled.p`
font-size:28px;
fontweight:bold`

const LoginLink = styled(Link)`
text-decoration:none;
font-weight:bold;

` 
const Loader = styled.div`
    padding: 10px;
    border: 20px solid ${colors.primary};
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: ${rotate} 1s infinite linear;
    height: 150px;
    width: 150px
`
function EmailVerify() {
    //State de chargement et validation de l'adresse e-mail
    const [dataLoading, setDataLoading]=useState(false)
    const [validUrl, setValidUrl]= useState(false)
    const param = useParams()
    //Call API avec useEffect au changement de paramètre de l'URL soit au chargement de la page après le click du mail
     useEffect(()=>{
       async function verifyEmail(){
        try {
            setDataLoading(true)
            const {data} = await fetch(`https://api-animalis-lome.com.animalis-lome.com/api/users/verify/${param.id}/${param.token}`)
            console.log(data);
            setValidUrl(true)
            setDataLoading(false)
        } catch (error) {
            setValidUrl(false)  
        }
        }
         verifyEmail()
    },[param])
 return(
    <div>{dataLoading?<EmailVerifyArea><Loader/></EmailVerifyArea>
    :validUrl?<EmailVerifyArea>
    <VerifyImg src={VerificationImg} alt="mail vérifié"/>
    <VerifyText>Adresse E-mail vérifiée</VerifyText>
    <LoginLink to='/Account'>Aller à la page de connexion</LoginLink>
    </EmailVerifyArea> 
:<EmailVerifyArea>
    <VerifyImg src={AccessDenied} alt="mail non vérifié"/>
    <VerifyText>Adresse E-mail non-vérifiée</VerifyText>
    </EmailVerifyArea>}
    </div>
 )   
}

export default EmailVerify