import styled from "styled-components"
import { useFetch } from "../../utils/hooks"
import colors from "../../utils/colors"
import Categories from "../../components/Categories"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

//Création des éléments du DOM + Style avec styled-components
const RemoveItemArea = styled.div`
width:100%,
height:auto;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

const Title = styled.h1`
width:100%;
text-align:center
`
const Filter = styled.div`
width:50%;
height:20px;
display:flex;
justify-content:center;
`
const ItemArea= styled.div`
width:100%;
height:auto;
margin:20px 0;
display:flex;
flex-wrap:wrap;
justify-content:space-around;
align-items:center;`

const Item = styled.span`
width:150px;
height:150px;
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:flex-start;
box-shadow: 0px 2px 2px 3px rgba(0, 0, 0, 0.2);
border-radius:5px;
margin: 10px 0;
padding-top:10px;
`

const Info = styled.span`
font-size:12px;
font-weight:bold;
`

const Button = styled.button`
width:100%;
height:40px;
background-color:${colors.primary};
border:none;
border-radius:0 0 5px 5px;
font-weight:bold;
color:white;
font-size:18px;
cursor:pointer;
`


function RemoveItem(){
    //State catégorie pour filtrage des produits
    const [categorie, setCategorie]= useState('')
    //Appel des données produits avec useFetch
    const {datas} = useFetch('https://api-animalis-lome.com.animalis-lome.com/api/product/')
    const {products} = datas
    //Récupération du token dans le localStorage
    const idTokens = localStorage.getItem('tokens')
    const tokens = JSON.parse(idTokens)
    //Utilisation de useNAvigate pour la redirection de page
    const navigate=useNavigate()
    //Fonction de suppression d'un article (fetch/DELETE)
    function deleteItem(id) {
        fetch(`https://api-animalis-lome.com.animalis-lome.com/api/product/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization':`Bearer ${tokens.token}`,
                }
  })
  .then(res=>res.json())
  .then(data=>console.log(data))
  .catch(err=>err)
    }
    
    return (
        <RemoveItemArea>
            <Title>Supprimer un article</Title>
            <Filter>
            <Categories activeCategory={categorie} setActiveCategory={setCategorie}/>
            </Filter>
            <ItemArea>
            {products&&products.map((product)=>(!categorie || categorie === product.categorie?
            <Item key={product._id}>
            <Info>Référence : {product.reference}</Info>
            <Info>Désignation : {product.designation}</Info>
            <Info>Catégorie : {product.categorie}</Info>
            <Info>Prix : {product.price} FCFA</Info>
            <Button onClick={()=>{
                deleteItem(product._id)
                navigate('/AdminSpace')
                }}>Supprimer</Button>
            </Item>:null))}
            </ItemArea>
        </RemoveItemArea>
        
    )
}

export default RemoveItem