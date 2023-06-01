import { useState } from "react";
import styled from "styled-components";
import colors from '../../utils/colors';
import { useNavigate } from "react-router-dom";
import ItemForm from "../../components/ItemForm";

//Création des éléments du DOM + Style avec styled-components
const AddItemArea= styled.div`
width:100%;
height:auto;
margin:0 0 50px 0;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center`
const Title = styled.h1`
width:85%;
text-align:center;
`
const Button = styled.button`
width:75%;
height:50px;
border:none;
margin-top:20px;
border-radius:5px;
background-color:${colors.primary};
color:white;
font-size:25px;
font-weight:bold;
cursor:pointer;
@media all and (min-width:1024px){
    width:30%;
}
`
function AddItem() {
    //State de récupération des données pour ajout de produit dans la base de Données
    const [reference, setReference]=useState('')
    const [designation, setDesignation]=useState('')
    const [categorie, setCategorie]=useState('')
    const [price, setPrice]=useState('')
    const [image, setImage]=useState({})
    //Récupérartion du token du localStorage
    const idToken = localStorage.getItem('tokens')
    const token = JSON.parse(idToken)
    //Utilisation de useNavigate pour redirection de page
    const navigate = useNavigate()
    //Fonction d'nevoi des données pour ajout d'article (fetch/POST)
    function  sendData(){
        const formData = new FormData()
        formData.append('reference', reference)
        formData.append('designation', designation)
        formData.append('categorie', categorie)
        formData.append('price', price)
        formData.append('image', image)

        fetch('https://api-animalis-lome.com.animalis-lome.com/api/product/', {
            method: "POST",
            body: formData,
            headers: {
                'Authorization':`Bearer ${token.token}`,
                    }
      })
      .then(res=>res.json())
      .then(data=>data)
      .catch(err=>err)
    }
    return (
        <AddItemArea>
        <Title>Ajouter un article</Title>
        <ItemForm reference={reference} setReference={setReference}
         designation={designation} setDesignation={setDesignation} 
         categorie={categorie} setCategorie={setCategorie} 
         price={price} setPrice={setPrice} 
         image={image} setImage={setImage}/>
        <Button onClick={(e)=>{
            e.preventDefault();
            sendData();
            navigate('/AdminSpace')
        }}>Ajouter le produit</Button>
        </AddItemArea>
    )
}

export default AddItem