import styled from "styled-components"
import Categories from "../../components/Categories";

const FormArea = styled.form`
width:75%;
height:auto;
@media all and (min-width:1024px){
    width:40%;
}`
const InputArea=styled.div`
width:100%;
margin:20px 0;
display:flex;
justify-content:space-between;
align-items:center;
@media all and (min-width:1024px){
    width:100%;
}
`
const Filter = styled.div`
width:61.5%;
height:20px;
display:flex;
justify-content:space-around;
`
const Label = styled.label`
font-size:12px;
font-weight:500;
`
const Input = styled.input`
width:60%;
border-radius:5px;
`

function ItemForm({reference, setReference, designation, setDesignation, categorie, setCategorie, price, setPrice, image, setImage}) {
    
    return(
        <FormArea>
        <InputArea>
        <Label htmlFor="reference">Référence</Label>
        <Input id="reference" value={reference} onChange={(e)=>setReference(e.target.value)}/>
        </InputArea>
        <InputArea>
        <Label htmlFor="designation">Désignation</Label>
        <Input id="designation" value={designation} onChange={(e)=>setDesignation(e.target.value)}/>
        </InputArea>
        <InputArea>
        <Label htmlFor="categorie">Catégorie</Label>
        <Filter>
        <Categories activeCategorie={categorie} setActiveCategory={setCategorie}/>
        </Filter>
        </InputArea>
        <InputArea>
        <Label htmlFor="price">Prix</Label>
        <Input id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </InputArea>
        <InputArea>
        <Label htmlFor="image">Image</Label>
        <Input type='file' id="image" name='image' accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
        </InputArea>
        </FormArea>
    )
    
}

export default ItemForm