import styled from "styled-components"

const Categorie = styled.select`
height:100%;
width:100%;
border-radius:5px;`

const Option = styled.option`
text-align:center;
`

function Categories({activeCategory, setActiveCategory}) {
    return(
        <Categorie id='categorie' value={activeCategory} onChange={(e)=>setActiveCategory(e.target.value)}>
            <Option value="">Choisir une catégorie</Option>
            <Option value="Alimentation">Alimentation</Option>
            <Option value="Accessoires">Accessoires</Option>
            <Option value="Animaux">Animaux</Option>
        </Categorie>
    )
}

export default Categories