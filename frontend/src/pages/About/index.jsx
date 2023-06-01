import styled from "styled-components"

//Création des éléments du DOM + Style avec styled-components
const AboutArea=styled.div`
width:100%;
height:auto;
display:flex;
flex-direction:column;
align-items:center;
margin:20px 0;
`

const Title = styled.h2`
font size:36px;
`
const Paragraphe = styled.p`
width:90%;
height:auto;
text-align:center`

const Conclusion = styled.p`
width:95%;
height:auto;
font-weight:bold;
text-align:center
`
const MapOuter = styled.div`
text-align:right;
height:300px;
width:90%;
margin:20px 0;
@media all and (min-width:1024px){
width:60%;
height:400px;
}
`
const GmapCanva = styled.div`
overflow:hidden;
background:none!important;
height:100%;
width:100%;
`
const Frame = styled.iframe`
width:100%;
height:100%;
`
function About() {
    return(
        <AboutArea>
            <Title>Animalis, c'est ...</Title>
            <Paragraphe>
                Des produits seléctionnés avec le plus grand soin afin
                d'apporter une nourriture de qualité à vos animaux
            </Paragraphe>
            <Paragraphe>
                Un espace entièrement dédié a votre animal avec un choix 
                multiple concernant tout les domaines de la vie de votre ami fidèle
            </Paragraphe>
            <Paragraphe>
                Un service de toilettage de haut niveau afin de donner
                a votre animal le soin qu'il mérite
            </Paragraphe>
            <Conclusion>
                Alors n'attendez plus et visiter nous
                (Notre boutique est aussi disponible sur notre site)
            </Conclusion>
            <MapOuter>
                <GmapCanva>
                    <Frame title="Gmap" src="https://maps.google.com/maps?q=Animalis Lomé&t=&z=18&ie=UTF8&iwloc=&output=embed"></Frame>
                    </GmapCanva>
                    </MapOuter>
        </AboutArea>
    )
}
export default About