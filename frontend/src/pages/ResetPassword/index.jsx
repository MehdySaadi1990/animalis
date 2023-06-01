import styled from "styled-components"
import colors from "../../utils/colors"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"


const ResetPasswordArea=styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
margin:40px 0
`
const Title = styled.h1`
text-align:center
`
const InputArea= styled.div`
width:300px;
height:auto;
display:flex;
justify-content:space-between;
margin:10px 0;
`
const Label = styled.label`
font-size:12px;
font-weight:500;
`
const Input = styled.input`
width:160px;
border-radius:5px;
`
const Button = styled.button`
width:350px;
height:40px;
font-size:18px;
background-color:${colors.primary};
color:white;
text-align:center;
border:none;
border-radius:10px;
margin-top:10px;
cursor:pointer;
transform:scale(1);
font-weight:bold;
@media all and (min-width:1024px){
    height:50px;
    font-size:20px;
};
&:hover{
    transform:scale(1.1);
    transition:transform 0.3s ease-in-out
}
`
const ResponseOk= styled.div`
width:100%;
height:350px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
font-size:20px;
font-weight:bold;
text-align:center;
`
const HomeLink = styled(Link)`
font-size:18px;
text-decoration:none;
color:${colors.primary};
transform:scale(1);
&:hover{
    transform:scale(1.1);
    transition:transform 200ms ease-in-out;
}
`

function ResetPassword() {
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [response, setResponse]=useState(false)
    const {id, token} = useParams()
    const dataToPost = {
        password:password
    }
    function newPassword(data) {
        fetch(`https://api-animalis-lome.com.animalis-lome.com/api/users/${id}/${token}/resetPassword`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    }
              })
              .then(res=>res.json())
              .then(data=>{console.log(data)
                            setResponse(true)})
              .catch(err=>{console.log(err)
                alert('Champs erronés')})
        
    }
    return(
        response===false?<ResetPasswordArea>
            <Title>Reinitialisation mot de passe</Title>
            <InputArea>
            <Label>Nouveau mot de passe</Label>
            <Input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </InputArea>
            <InputArea>
            <Label>Confirmer nouveau mot de passe</Label>
            <Input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </InputArea>
            <Button onClick={(e)=>{
                e.preventDefault()
                if(password!==confirmPassword) return alert('Les champs doivent etre similaires')
                newPassword(dataToPost)
                setPassword('')
                setConfirmPassword('')
            }}>Confirmation Mot de Passe</Button>
        </ResetPasswordArea>:<ResponseOk>Votre mot de passe a bien été modifié
                                <HomeLink to='/Account'>Retour vers la page de connexion</HomeLink>               
                             </ResponseOk>
                    
            
    )
}

export default ResetPassword