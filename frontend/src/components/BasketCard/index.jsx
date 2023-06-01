import styled from "styled-components"
import colors from '../../utils/colors'
import { useState } from "react"

const ItemCard=styled.div`
width:250px;
height:200px;
border-radius:10px;
margin:10px 0;
box-shadow: 0px 2px 2px 3px rgba(0, 0, 0, 0.2);
display:flex;
flex-direction:column;
align-items:flex-end;
@media all and (min-width:1024px){
    width:25%;
}
`
const DescriptionArea=styled.div`
width:100%;
height:30%;
padding:5px 0;
border-radius:0 0 10px 10px;
display:flex;
justify-content:space-between;
align-items:center;
flex-wrap:wrap;
background-color:white;
`
const ItemImg = styled.img`
width:100%;
height:70%;
object-fit:contain;
border-radius:10px 10px 0 0;
`
const Designation=styled.span`
width:50%;
text-align:center;
font-size:14px;
font-weight:bold;
`
const Prix=styled.span`
width:95%;
font-size:14px;
font-weight:bold;
text-align:right;
`
const ButtonArea=styled.div`
width:40%;
height:auto;
display:flex;
justify-content:center`
const Button= styled.button`
width:33px;
height:20px;
margin:5px;
border-radius:5px;
font-weight:bold;
border:none;
background-color:${colors.primary};
color:white;
cursor:pointer;
font-size:16px;
display:flex;
justify-content:center;
align-items:center;
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

 

function BasketCard({produit, panier, setPanier}) {
    const [quantity, setQuantity]=useState(produit.quantity)
    function addToBasket(article) {
        let basket = getBasket()
        let findProduct = basket.find(p=>p._id===article._id)
        if(findProduct!==undefined){ 
           findProduct.quantity+=1
        }else{
           article.quantity+=1
           basket.push(article)
        }
        saveBasket(basket)
    }
    function removeFromBasket(article) {
       let basket = getBasket()
       let findProduct = basket.find(p=>p._id===article._id)
       if(findProduct!==undefined && findProduct.quantity>1){ 
           findProduct.quantity-=1
           saveBasket(basket)
       }
       else{
           let filtreBasket = basket.filter(p=>p._id!==article._id)
           saveBasket(filtreBasket)
           if(basket.length===1){
            localStorage.removeItem('basket')
           }
       }
       
   }
   
    return(<>{quantity!==0?<ItemCard>
    <ItemImg src={produit.image} alt="image produit panier"></ItemImg>
    <DescriptionArea>
    <Designation>{quantity} {produit.designation}</Designation> 
    <ButtonArea>
    <Button onClick={(e)=>{e.preventDefault()
                    addToBasket(produit)
                    setQuantity(quantity+1)
                    setPanier(panier+1)}
                    }>+</Button>
    <Button onClick={(e)=>{e.preventDefault()
                    removeFromBasket(produit)
                    setQuantity(quantity-1)
                    setPanier(panier-1)}}>-</Button>
    </ButtonArea>
    <Prix>{produit.price*quantity} FCFA</Prix> 
    </DescriptionArea>
    </ItemCard>:null}</>)
}

export default BasketCard