import styled from "styled-components"
import colors from "../../utils/colors"
import { Link } from "react-router-dom"

//Création des éléments du DOM + Style avec styled-components
const ErrorArea = styled.div`
width:100%;
height:500px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center
`
const Number = styled.span`
font-size:100px;
font-weight:bold;
color:${colors.primary}
`
const Message = styled.span`
font-size:20px;
font-weight:bold;
color:${colors.primary}
`
const HomePageBack= styled(Link)`
font-weight:bold;
font-size:14px;
text-decoration:none;
margin-top:10px;
color:${colors.primary};
&:hover{
    color:#000000;
}

`
function Error() {
    return(<ErrorArea>
        <Number>404</Number>
        <Message>Page introuvable</Message>
        <HomePageBack to='/'>Retour a la page d'accueil</HomePageBack>
        </ErrorArea> )
}

export default Error