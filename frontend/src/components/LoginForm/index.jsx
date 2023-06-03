import styled from "styled-components"
import colors from '../../utils/colors'
import { useState } from "react"
import {useNavigate} from 'react-router-dom'

const Form = styled.form`
width:85%;
height:250px;
margin:20px 0;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-around;
@media all and (min-width:1024px){
    width:40%;
}`

const InputArea=styled.div`
width:85%;
height:auto;
display:flex;
flex-direction:column;
justify-content:space-around;
align-items:flex-start;
margin:10px 0;
`

const Label = styled.label`
font-size:12px;
font-weight:500;
`

const Input = styled.input`
width:100%;
height:25px;
border-radius:10px;
margin-top:5px;
`
const ForgotPassword=styled.button`
width:85%;
font-size:12px;
text-align:right;
font-weight:500;
border:none;
background-color:white;
&:hover{
font-weight:bold;
text-decoration:underline;
cursor:pointer;
`

const Button = styled.button`
width:85%;
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
      

function LoginForm({admin, setAdmin, login, setLogin, setModal}) {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    
    const dataToPost = {
        email:email,
        password:password
    }
    const navigate = useNavigate()
    
    function userLogin() {
        fetch('https://api-animalis-lome.com.animalis-lome.com/api/users/login', {
            method: "POST",
            body: JSON.stringify(dataToPost),
            headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    }
            })
            .then(res=>res.json())
            .then(data=>{
            if(data.token && data.userId){
                if(email==='animalis.lome@gmail.com'){
                    setAdmin(true)
                    setLogin(true)
                    localStorage.setItem('tokens', JSON.stringify(data))
                    navigate('/AdminSpace')
                }
                else{
                    setLogin(true)
                    localStorage.setItem('tokens', JSON.stringify(data))
                    navigate('/')
                }
            }
            else{
                alert('Adresse mail ou mot de passe invalide')
            }
            })
            .catch(err=>{console.log(err)})
            setEmail('')
            setPassword('')
            }
    return(
        <Form>
            <InputArea>
            <Label htmlFor="email">E-mail</Label>
            <Input type="email" autocomplete="username" id="email" value={email} placeholder='johndoe@gmail.com' onChange={(e)=>{setEmail(e.target.value)}}></Input>
            </InputArea>
            <InputArea>
            <Label htmlFor="password">Mot de passe</Label>
            <Input type="password" autocomplete="current-password" id="password" value={password} placeholder='secret password' onChange={(e)=>{setPassword(e.target.value)}}></Input>
            </InputArea>
            <ForgotPassword onClick={(e)=>{e.preventDefault()
                                            setModal(true)}}>Mot de Passe oublié ?</ForgotPassword>
            <Button onClick={(e)=>{
                e.preventDefault()
                if(email==='' || password==='') return
                else{
                    userLogin()
                }}}>Connexion</Button>
        </Form>
    )
}

export default LoginForm
