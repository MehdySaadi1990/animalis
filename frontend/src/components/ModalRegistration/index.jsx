import { keyframes } from "styled-components";
import styled from "styled-components";
import colors from "../../utils/colors";
import { useState} from "react";


const grow = keyframes`
from{
    transform:scale(0.5)
}  
to {
    transform: scale(1);
  }
`

const Modal = styled.div`
  width:100%;
  height:100%;
  opacity: 1;
  position: fixed;
  top: 0; right: 0;
  bottom: 0; left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, .7);
`

const ModalContent= styled.form`
width:370px;
height:auto;
background-color:white; 
animation:${grow} 0.5s ease-in-out;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

const Title=styled.h1`
font-weight:bold;`

const InputArea = styled.div`
width:80%;
height:auto;
display:flex;
justify-content:space-between;
align-items:center;
margin:10px 0;
`
const Label = styled.label`
font-size:12px;
`
const Input = styled.input`
width:160px;
height:20px;
border-radius:5px;
margin-left:10px;
`
const CguArea=styled.div`
width:80%;
height:auto;
display:flex;
justify-content:space-around;
align-items:center;
margin:10px 0;
`
const CguQuestion=styled.span`
font-size:12px;
margin-top:5px;
`
const CguBox=styled.div`
width:100%;
display:flex;
justify-content:space-around;
`

const CguCheck = styled.input`
border-radius:none;
`
const ButtonRegister=styled.button`
width:50%;
height:50px;
margin:10px 0;
background-color:${colors.primary};
border:none;
border-radius:5px;
color:white;
font-size:20px;
font-weight:bold;
transform:scale(0.8);
&:hover{
    transform:scale(1);
    transition: transform 0.3s ease-in-out;
}
`
const CloseModal=styled.button`
font-size:10px;
margin-bottom:10px;
cursor:pointer;
border:none;
background-color:white;
font-weight:bold;
`

function ModalRegistration({setModal}) {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirmPassword, setConfirmPassword]=useState('')
    const [check, setCheck]=useState(true)
    const dataToPost = {
        email:email,
        password:password
    }
    function postDataSignUp(data) {
   
        fetch('https://api-animalis-lome.com.animalis-lome.com/api/users/', {
           method: "POST",
           body: JSON.stringify(data),
           headers: {
                   'Accept': 'application/json', 
                   'Content-Type': 'application/json',
                   }
             })
             .then(res=>res.json())
             .then(data=>console.log(data))
             .catch(err=>{console.log(err)
                alert('Champs erronés')})
    }
    
    return(
        <Modal>
            <ModalContent>
                <Title>Inscription</Title>
                <InputArea>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </InputArea>
                <InputArea>
                <Label htmlFor="password">Mot de passe</Label>
                <Input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></Input>
                </InputArea>
                <InputArea>
                <Label htmlFor="confirmPassword">confirmer mot de passe</Label>
                <Input type="password" id="confirmPassword" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}></Input>
                </InputArea>
                <CguQuestion>Accepter les CGU ?</CguQuestion>
                <CguArea>
                    <CguBox>
                    <Label>
                    <CguCheck type='radio' value='Accept' checked={check} onChange={()=>setCheck(!check)}/>
                    J'accepte
                    </Label>
                    <Label>
                    <CguCheck type='radio' value='Refuse' checked={!check} onChange={()=>setCheck(!check)}/>
                    Je refuse
                    </Label>
                    </CguBox>
                </CguArea>
                <ButtonRegister onClick={function SignUp(e){
                    e.preventDefault()
                    if(check===false) return
                    if(password!==confirmPassword){
                        alert("Mot de passe incorrect")}
                    else{
                        postDataSignUp(dataToPost)
                        setEmail('')
                        setPassword('')
                        setConfirmPassword('')
                        }
                    }}>Je m'inscris</ButtonRegister>
                <CloseModal  onClick={(e)=>{
                            e.preventDefault()
                            setModal(false)
                            }}>Fermer la fenêtre</CloseModal>
            </ModalContent>
        </Modal>
    )
    
}

export default ModalRegistration