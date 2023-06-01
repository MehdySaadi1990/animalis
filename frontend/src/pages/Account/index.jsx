import styled from "styled-components"
import LoginForm from "../../components/LoginForm"
import ModalRegistration from "../../components/ModalRegistration"
import { useState } from "react"
import colors from "../../utils/colors"
import ModalForgotPass from "../../components/ModalForgotPass"

//Création des éléments du DOM + Style avec styled-components
const LogArea=styled.div`
width:65%;
height:auto;
display:flex;
justify-content:center;
align-items:center;
font-size:24px;`

const Login= styled.span`
font-weight:bold;
`
const AccountArea = styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
margin:20px 0;
`
const SignUp = styled.button`
width:72.5%;
height:40px;
font-size:18px;
background-color:${colors.primary};
color:white;
text-align:center;
border:none;
border-radius:10px;
cursor:pointer;
transform:scale(1);
font-weight:bold;
@media all and (min-width:1024px){
    width:34%;
    height:50px;
    font-size:20px;
};
&:hover{
    transform:scale(1.1);
    transition:transform 0.3s ease-in-out
}
`

function Account({admin, setAdmin, login, setLogin}) {
    //State pour ouverture de la fenêtre modale
    const [modal1, setModal1]=useState(false)
    const [modal2, setModal2]=useState(false)
    return(<>
     <AccountArea>
            <LogArea>
            <Login >Mon Compte</Login>
            </LogArea>
            <LoginForm admin={admin} setAdmin={setAdmin} login={login} setLogin={setLogin} setModal={setModal2}/>
            <SignUp onClick={(e)=>{
                e.preventDefault();
                setModal1(!modal1)
                }}>Créer un compte</SignUp>
    </AccountArea>
    {modal1?<ModalRegistration setModal={setModal1}/>:null}
    {modal2?<ModalForgotPass setModal={setModal2}/>:null}
        </>
    )
}

export default Account