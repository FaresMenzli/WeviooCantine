import styled from 'styled-components';

export const DishesWrapper = styled.div`
display:flex;
justify-content: space-evenly;
flex-wrap: wrap;
flex-direction: row;

`;
export const SearchForDish = styled.input`    margin: auto;
display: block;
text-align: center;
width: 30%;
background-image:url('./../../assets/Vector_search_icon.svg');
background-position: 10px 10px; 
background-repeat: no-repeat;

`;
export const RightBar = styled.div`
background-color: white;
height: 100vh;
width: 50vw;
min-width:200px;

`;

export const DishesMainPage = styled.div`
display:flex;
`;