import styled from 'styled-components'
import ShopCard from '../../components/ShopCard'
import Categories from '../../components/Categories'
import { useState } from 'react'
import { useFetch } from '../../utils/hooks'
import { useNavigate } from 'react-router-dom'

//Création des éléments du DOM + Style avec styled-components
const Title = styled.h1`
width:100%;
text-align:center
`
const ShopArea = styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
`
const Filter = styled.div`
width:50%;
height:20px;
display:flex;
justify-content:space-around;
`
const ItemArea = styled.div`
width:90%;
height:auto;
margin:20px 0;
display:flex;
flex-wrap:wrap;
justify-content:space-around;
`


function Shop({panier, setPanier}) {
    //Appel des données produits avec useFetch
    const {datas, error} = useFetch('https://api-animalis-lome.com.animalis-lome.com/api/product/')
    //State catégorie pour filtrage des produits
    const [categorie, activeCategorie]=useState('')
    const {products} = datas
    //Utilisation de useNAvigate pour la redirection de page
    const navigate = useNavigate()
    if(error){
        navigate('/404')
    }
    return(
        <ShopArea>
        <Title>La Boutique</Title>
        <Filter>
        <Categories activeCategory={categorie} setActiveCategory={activeCategorie}/>
        </Filter>
        <ItemArea>
        {products&&products.map((product)=>(!categorie || categorie === product.categorie?<ShopCard key={product._id} produit={product} panier={panier} setPanier={setPanier} />:null))}
        </ItemArea>
        </ShopArea>
    )
}
export default Shop