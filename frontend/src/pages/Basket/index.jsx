import styled from "styled-components"
import BasketCard from "../../components/BasketCard"
import colors from "../../utils/colors"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

//Création des éléments du DOM + Style avec styled-components
const BasketArea = styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
flex-wrap:wrap`

const Title = styled.h2`
font-size:25px;
`
const BasketCardArea=styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
justify-content:space-around;
align-items:center;
@media all and (min-width:1024px){
    flex-direction:row;
}`
const Total = styled.span`
width:100%;
height:50px;
padding:10px 0;
text-align:center;
margin-top:20px;`
const TitleForm= styled.h3`
font-weight:500;
`
const Form = styled.form`
width:90%;
height:auto;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
@media all and (min-width:1024px){
    width:40%;
}
`
const InputArea=styled.div`
width:100%;
height:auto;
display:flex;
justify-content:space-between;
align-items:center;
margin:10px 0;
${props=>props.$radio&&`
width:100%;
justify-content:flex-end;
`}
@media all and (min-width:1024px){
    width:100%;
    margin:20px 0;
}`
const Label = styled.label`
font-size:12px;
`

const Input = styled.input`
width:70%;
height:25px;
border-radius:10px;
${props=>props.$radio&&`
width:20%;
height:14px;
`}
`
const TextArea = styled.input`
width:70%;
height:100px;
border-radius:10px;
`
const ValidButton = styled.button`
width:90%;
height:50px;
background-color:${colors.primary};
color:white;
font-weight:bold;
border-radius:10px;
border:none;
font-size:24px;
margin:30px 0;
cursor:pointer;
@media all and (min-width:1024px){
    width:500px;
}`

//Fonction de récupération du panier
function getBasket() {
    const basket = JSON.parse(localStorage.getItem('basket'))
   return basket
}
//Fonction de calcul du total facture
function totalOrder(basket) {
       let total =0
       for(let i=0; i<basket.length; i++){
            total += parseInt(basket[i].price)*basket[i].quantity
       }
       return total
}
//Fonction de génération de la commande
function getOrder(basket) {
    const order = []
    if(!basket){
        return order
    }else{
        basket.forEach(item => {
            order.push(`${item.designation} (${item.quantity})`)
            })
            return order
        }
    }
   
function Basket({panier, setPanier}) {
    //State de récupération des éléments du formulaire
    const [name, setName]=useState('')
    const [surname, setSurname]=useState('')
    const [email, setEmail]=useState('')
    const [phone, setPhone]=useState('')
    const [delivery, setDelivery]=useState('livraison')
    const [notice, setNotice]=useState('')
    //Récupération du token et de la commande dans le localStorage
    const token = JSON.parse(localStorage.getItem('tokens'))
    const products= JSON.parse(localStorage.getItem('basket'))
    const basket = getBasket()
    const order = getOrder(basket)
    //Construction des données à envoyer
    const dataToPost ={
        order: order,
        name : name,
        surname : surname,
        email : email,
        phone:phone,
        delivery : delivery,
        notice : notice
    }
    //Utilisation de useNavigate pour redirection
    const navigate = useNavigate()
    //Fonction d'envoi des données du formulaire et de la commande
    async function sendOrder(data) {
        if(!basket){
            return alert('Veuillez selectionner des articles de la boutique')
        }
        if(name===''||surname===''||email===''||phone===''){
            return alert('Veuillez remplir les champs obligatoires')
        }
        else{
          await  fetch('https://api-animalis-lome.com.animalis-lome.com/api/order/', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                          'Accept': 'application/json', 
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token.token}` , 
                          }
                          })
          .then(res=>res.json())
          .then(data=>{console.log(data)
                        navigate(`/Confirm/${data.orderNumber}`)
                        localStorage.removeItem('basket')
                        setPanier(0)})
        }  
    }
    return( 
    <BasketArea>
    <Title>Mon Panier</Title>
    <BasketCardArea>
    {products?products.map((product)=> <BasketCard key={product._id} produit={product} panier={panier} setPanier={setPanier}/>):null}
    </BasketCardArea>
    <Total>Total commande : {basket?totalOrder(basket):0} FCFA</Total>
    <TitleForm>Validez votre commande</TitleForm>
    <Form>
        <InputArea>
        <Label htmlFor="name">Nom</Label>
        <Input id="name" onChange={(e)=>{e.preventDefault()
                                            setName(e.target.value)}}/>
        </InputArea>
        <InputArea>
        <Label htmlFor="surname">Prénom</Label>
        <Input id="surname" onChange={(e)=>{e.preventDefault()
                                            setSurname(e.target.value)}}/>
        </InputArea>
        <InputArea>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" onChange={(e)=>{e.preventDefault()
                                                                                                            setEmail(e.target.value)}}/>
        </InputArea>
        <InputArea>
        <Label htmlFor="phone">Téléphone</Label>
        <Input type="tel" id="phone" pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}" onChange={(e)=>{e.preventDefault()
                                                                                                            setPhone(e.target.value)}}/>
        </InputArea>
        <InputArea $radio={true}>
        <Label htmlFor="livraison">Livraison</Label>
        <Input $radio={true} type="radio" id="livraison" checked={delivery==='oui'}  onChange={()=>{
                                            setDelivery('oui')}}/>
        <Label htmlFor="recuperation">Boutique</Label>
        <Input $radio={true} type="radio" id="recuperation" checked={delivery==='non'} onChange={()=>{
                                            setDelivery('non')}}/>
        </InputArea>
        <InputArea>
        <Label htmlFor="remarques">Remarques</Label>
        <TextArea id="remarques" type='text' onChange={(e)=>{e.preventDefault()
                                            setNotice(e.target.value)}}/>
        </InputArea>
    </Form>
    <ValidButton onClick={(e)=>{e.preventDefault()
                                if(!token){
                                 alert('Vous devez vous connecter pour pouvoir commander')
                                 navigate('/Account')
                                }else{
                                    sendOrder(dataToPost)
                                }}}>Commander</ValidButton>
    </BasketArea> )
}

export default Basket