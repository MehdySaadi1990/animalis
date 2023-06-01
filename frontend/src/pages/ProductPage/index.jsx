import styled from "styled-components"
import colors from "../../utils/colors"
import { useState } from "react"
import ItemForm from "../../components/ItemForm"
import { useNavigate, useParams } from "react-router-dom"

//Création des éléments du DOM + Style avec styled-components
const ProductPageArea=styled.div`
width:100%;
height:auto;
margin:0 0 50px 0;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-top:20px;`

const Button = styled.button`
width:75%;
height:30px;
border:none;
margin-top:20px;
border-radius:5px;
background-color:${colors.primary};
color:white;
font-size:18px;
font-weight:bold;
cursor:pointer;
`

function ProductPage() {
  //Récupération des caractéristique produit depuis le localStorage
    const produit = localStorage.getItem('product')
    const product = JSON.parse(produit)
    //Utilisation de useNavigate pour redirection de page
    const navigate = useNavigate();
    //Récupération des éléments tokens du localStorage 
    const tokens = JSON.parse(localStorage.getItem('tokens'))
    //Récupération de l'ID depuis l'URL
    const {id}=useParams()
    //State des différents critères produit
    const [reference, setReference]=useState(product.reference)
    const [designation, setDesignation]=useState(product.designation)
    const [categorie, setCategorie]=useState(product.categorie)
    const [price, setPrice]=useState(product.price)
    const [image, setImage]=useState(product.image)
    
    //Fonction de mise à jour de produit (fetch/PUT)
    function Update() {
      const formData = new FormData()
      formData.append('reference', reference)
        formData.append('designation', designation)
        formData.append('categorie', categorie)
        formData.append('price', price)
        formData.append('image', image)

      fetch(`https://api-animalis-lome.com.animalis-lome.com/api/product/${id}`,
       {method:'PUT',
        body:formData,
        headers:{'Authorization':`Bearer ${tokens.token}`},
      })
      .then(res=>res.json())
      .then(data=>data)
      .catch(err=>err)
    }

  return(
    <ProductPageArea>
       {product&&<ItemForm reference={reference} setReference={setReference}
         designation={designation} setDesignation={setDesignation} 
         categorie={categorie} setCategorie={setCategorie} 
         price={price} setPrice={setPrice} 
         image={image} setImage={setImage}/>
         }
         <Button onClick={async (e)=>{
            e.preventDefault();
            Update()
            localStorage.removeItem('product')
            navigate('/AdminSpace')
        }}>Modifier le produit</Button>
    </ProductPageArea>
   )  
}

export default ProductPage