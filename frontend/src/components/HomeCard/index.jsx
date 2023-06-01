import styled from "styled-components"

const CardArea=styled.div`
width:92%;
height:200px;
color:white;
margin:7px 0;
border-radius:10px;
display:flex;
align-items:flex-end;
padding:10px;
font-weight:bold;
${(props)=>props.$backgroundImg&&`background-image:url(${props.$backgroundImg});
background-size:100%;
background-repeat:no-repeat;
background-position:center;
`};
@media all and (min-width:1024px){
    width:40%;
    margin:20px;
}
`

function HomeCard({image, title}) {
    return(
        <CardArea $backgroundImg={image}>{title}</CardArea>
    )
}
export default HomeCard