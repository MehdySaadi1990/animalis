import styled from "styled-components"
import CartToUpdate from "../../components/CartToUpdate"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useFetch } from "../../utils/hooks/index"
import Categories from "../../components/Categories"

//Création des élements du DOM + Style avec styled-components
const Title = styled.h1`
width:100%;
text-align:center
`
const UpdateItemArea= styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center`

const Filter = styled.div`
width:50%;
height:20px;
display:flex;
justify-content:center;
`
const ItemArea = styled.div`
width:100%;
heught:auto;
display:flex;
justify-content:space-around;
align-items:center;
flex-wrap:wrap;`
function UpdateItem() {
    //State Catégorie pour filtrage des éléments
    const [categorie, activeCategorie]=useState('')
    //Utilisation de useNAvigate pour la redirection
    const navigate = useNavigate()
    //Appel des données des produit avec useFtech
    const {datas, error} = useFetch(`https://api-animalis-lome.com.animalis-lome.com/api/product/`)
    const {products} = datas
    if(error){
        navigate('/404')
    }
    return (
    <UpdateItemArea>
        <Title>Modifier un produit</Title>
        <Filter>
        <Categories activeCategory={categorie} setActiveCategory={activeCategorie}/>
        </Filter>
        <ItemArea>
        {products&&products.map((product)=>(!categorie || categorie === product.categorie?<CartToUpdate key={product._id} produit={product}/>:null))}
        </ItemArea>
    </UpdateItemArea>
    )
}

export default UpdateItem