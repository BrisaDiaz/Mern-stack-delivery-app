import styled from 'styled-components'
import {useContext} from 'react';
import AppContext from '../context/app-context'
import useSearchProductBar from '../hooks/useSearchProductBar'
import loupe from '../img/loupe.svg'

const StyledSearchBar = styled.form`
width:max-content;
margin:0 auto;
`;
const SearchInput = styled.input`
position:relative;
width:200px;
padding: 8px;
padding-left: 15px;
border-radius: 15px;
outline: none;
box-shadow: ${props => props.theme.lightBoxShadow};
transition: all 0.5s ease;
border:none;
margin-left: -6px;
&:focus{
  width:250px;
box-shadow: 0 0 10px rgba(0,0,0,0.2);
  
}
&::placeholder {
    font-size: 14px;

}
&:focus + div{
  margin-left: 210px;
  
}
&::-webkit-search-cancel-button{
  display:none;
}
`;
const SerchIconeWrapper = styled.div`
width:30px;
height:30px;
position:absolute;
margin-top:-34px;
margin-left: 160px;
transition: all 0.5s ease;
transform:scale(0.7);
`
const SearchIcone = styled.img` 
height: 100%;
`;
export default function SearchBar(){
      const {setMenuSearchQuery,setAdminSearchQuery}  = useContext(AppContext);
        let setQueryHandler;
        
    window.location.pathname === "/menu" ?   setQueryHandler = setMenuSearchQuery : setQueryHandler = setAdminSearchQuery;

      const   {searcFilter, resetFilter} = useSearchProductBar(setQueryHandler)


  return(
<StyledSearchBar onSubmit={searcFilter}>
<SearchInput name="productsFilterQuery" placeholder="Buscar..." type="search" onChange={resetFilter}/>
<SerchIconeWrapper ><SearchIcone src={loupe} alt="search"/></SerchIconeWrapper>
</StyledSearchBar>
  );

}