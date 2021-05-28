
import styled  from 'styled-components'
import SocialMenu from './SocialsMenu'
import logo from '../img/logo.png' 
import locationIcone from '../img/map-marker-alt-solid.svg'
import phoneIcone from '../img/phone-alt-solid.svg'
import emailcone from '../img/envelope-regular.svg'

const StyleFooter = styled.footer`
 box-sizing:border-box;
  width:100vw;
  padding:15px;
  background-color:${props=>props.theme.black} ;
  color:#F0F0F0;
 `;
const FooterWrapper = styled.section`
display:flex;
width:100%;
flex-wrap:wrap;

`;
const FooterSection = styled.article`

min-width:300px;
padding:15px;
flex:1;
` ;
export const List = styled.ul`
list-style:none;
padding:0;

`;
 export const ListItem =styled.li`
  list-style:none;
  display:flex;
  aling-items:center;
`;


 export const Link = styled.a`
text-decoration :none;
color:#fff;
cursor:pointer;
transition: all 0.5s ease;
margin: 8px 0;
&:hover{
  color:#e83c2e;
    font-weight: 400;
}
`;
const Hours = styled(Link)`
&:hover:before{
  color:#F0F0F0;



}
&:before{
  content:">";
  color:#fcba1c;
}
`;
const Span = styled.span`
color: #fcba1c;
`;
export const Icone = styled.div`
width:15px;
displey:inline-block;
display:grid;
place-items:center;
margin-right:8px;
`;
const Logo = styled.img`
width:100px;
margin-bottom:10px;
`;
export default function Footer() {

  return(
    <StyleFooter >
<FooterWrapper>

< FooterSection >
<Logo src ={logo} alt="logo"></Logo>
<p>El principal componente para un entorno saludable y de autoestima.</p>
</FooterSection>
< FooterSection >
<h4>NUESTROS LOCALES
</h4>
<List>

  <ListItem><Icone><img src={locationIcone} alt="location"></img></Icone> <Link> 984 Calle, Barrio, Córdoba</Link></ListItem>
    <ListItem><Icone><img src={locationIcone} alt="location"></img></Icone> <Link>295 Calle, Barrio, Córdoba</Link></ListItem>
    
</List>
</FooterSection>
< FooterSection >
<h4>CONTACTO</h4>
  <List>
<ListItem><Icone><img src={phoneIcone} alt="phone"></img></Icone> <Link>+54 15 555 5787</Link></ListItem>
<ListItem><Icone><img src={emailcone} alt="email"></img></Icone> <Link>brisaabiaildiaz2000@gmial.com</Link></ListItem>
  </List>
  


</FooterSection>
< FooterSection >
<h4>HORARIOS DE APERTURA</h4>
<List>
<ListItem><Hours> Lun - Vier --------- 9am - 12pm</Hours></ListItem>
<ListItem><Hours> Sabados --------- 9am - 12pm</Hours></ListItem>
<ListItem><Hours> Domingos --------- <Span>Cerrado</Span></Hours></ListItem>
</List>
</FooterSection>
</FooterWrapper>
<SocialMenu></SocialMenu>
    </StyleFooter>
  );
}