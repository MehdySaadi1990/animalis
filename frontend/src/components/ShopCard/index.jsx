import styled from "styled-components"
import colors from '../../utils/colors'


const ItemCard=styled.div`
width:150px;
height:200px;
border-radius:10px;
margin:20px 0;
box-shadow: 0px 2px 2px 3px rgba(0, 0, 0, 0.2);
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
&:hover{
    transform:scale(1.1);
    transition:transform 250ms ease-out;
}
`
const ItemImg = styled.img`
width:100%;
height:100px;
object-fit:contain;   
border-radius:10px 10px 0 0;
`

const DescriptionArea=styled.div`
width:100%;
height:25%;
font-size:12px;
font-weight:bold;
border-radius:0 0 10px 10px;
display:flex;
justify-content:space-around;
align-items:center;
flex-wrap:wrap;
background-color:white;
`
const Designation=styled.span`
`
const Prix=styled.span`
`

const Button= styled.button`
width:90%;
height:40px;
border-radius:10px;
font-weight:bold;
border:none;
background-color:${colors.primary};
color:white;
cursor:pointer;
font-size:13px;
margin-bottom:10px;
&:active{
    transform:scale(0.8);
    transition:transform 150ms linear;
}
`

function saveBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket))
}
function getBasket(){
    const basket = localStorage.getItem('basket')
    if(basket == null){
     return []
     }else{
     return JSON.parse(basket);
     }
 }
 function addToBasket(article) {
     let basket = getBasket()
     let findProduct = basket.find(p=>p._id===article._id)
     article.quantity=0
     if(findProduct!==undefined){ 
        findProduct.quantity+=1
     }else{
        article.quantity+=1
        basket.push(article)
     }
     saveBasket(basket)
 }
 

function ShopCard({produit, panier, setPanier}) {

    return( 
    <ItemCard>
    <ItemImg src={produit.image} alt="image produit" />
    <DescriptionArea>
    <Designation>{produit.designation}</Designation> 
    <Prix>{produit.price} FCFA</Prix> 
    </DescriptionArea>
    <Button onClick={()=>{addToBasket(produit) 
        setPanier(panier+1)}}>Ajouter au panier</Button>
    </ItemCard> )
}

export default ShopCard