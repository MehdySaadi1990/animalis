import styled from "styled-components"
import colors from "../../utils/colors"
import { useParams } from "react-router-dom"

//Création des éléments du DOM + Style avec styled-components
const ConfirmArea = styled.div`
width:100%;
height:400px;
padding:20px 0;
display:flex;
justify-content:center;
align-items:center`

const ConfirmBox = styled.div`
width:70%;
height:100px;
background-color:${colors.primary};
display:flex;
justify-content:center;
align-items:center;
border-radius:25px;`

const TextOrder=styled.span`
font-size:16px;
font-weight:600;
color:white;
margin:10px;
text-align:center
`

function Confirm() {
    //Récupération du numéro de commande depuis l'URL
    const {orderNumber} = useParams()
    return(
        <ConfirmArea>
            <ConfirmBox>
            <TextOrder>
                Merci d'avoir commander chez ANIMALIS <br />
                Votre numéro de commande est le : {orderNumber}</TextOrder>
            </ConfirmBox>
        </ConfirmArea>
    )
}
export default Confirm