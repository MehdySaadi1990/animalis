import styled from "styled-components"
import { Link } from "react-router-dom"
import colors from "../../utils/colors"

//Création des éléments du DOM + Style avec styled-components
const AdminArea = styled.div`
width:100%;
height:auto;
margin:20px 0;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`

const AdminTitle= styled.h1`
margin-bottom:50px
`

const SectionToAction= styled(Link)`
width:85%;
height:100px;
margin:10px 0;
background-color:${colors.primary};
color:white;
font-size:24px;
font-weight:bold;
border-radius:10px;
text-decoration:none;
display:flex;
justify-content:center;
align-items:center;
text-align:center;
@media all and (min-width:1024px){
    width:40%;
    margin-bottom:30px;
}`

function AdminSpace({admin}) {
    return( <AdminArea>
        <AdminTitle>Administration</AdminTitle>
        <SectionToAction to='/AdminSpace/AddItem'>Ajouter un Article</SectionToAction>
        <SectionToAction to='/AdminSpace/RemoveItem'>Supprimer un Article</SectionToAction>
        <SectionToAction to='/AdminSpace/UpdateItem'>Modifier un Article</SectionToAction>
    </AdminArea> )
}
export default AdminSpace