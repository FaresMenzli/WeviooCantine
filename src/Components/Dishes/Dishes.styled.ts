import styled from 'styled-components';

export const DishesWrapper = styled.div`
display:flex;
justify-content: space-evenly;
flex-wrap: wrap;
flex-direction: row;

     backdrop-filter: brightness(0.5);
    margin-left: 20vw;
    margin-right: 50px;
}
    border-radius: 69px;
    overflow: hidden;

`;
export const SearchForDish = styled.input`    
height:30px;
margin: auto;
display: block;
text-align: center;
width: 30%;
background-image:url('./../../assets/Vector_searsch_icon.svg');
background-position: 10px 10px; 
background-repeat: no-repeat;

`;
export const WeviooSuggestion = styled.div`    text-align: center;
background-color: crimson;
width: 50vw;
height: 20vh;
margin: auto;
border-radius: 20px;
opacity: 77%;
overflow: hidden;`;
export const RightBar = styled.div`
& #suggestion{
    min-width:200px;
    border-radius:20px;
    background: linear-gradient(135deg, rgba(135,224,253,1) 0%,rgba(83,203,241,1) 40%,rgba(5,171,224,1) 100%);
margin-top:2vh;
}
& #Filters{
position:absolute;
margin-top:100px;
width: 13vw;
min-width:150px;
border-radius:20px;
background: linear-gradient(66deg, rgb(244 234 138) 0%, rgb(241, 218, 54) 100%);
opacity:80%;
transition: opacity 0.3s;

&:hover {
 opacity: 100%;
 border:2px solid black; 

}


}
`;
export const Filters = styled.div`
overflow: hidden;
height: 55vh;
width: 13vw;
min-width:150px;
margin-top:150px;
background: linear-gradient(66deg, rgb(244 234 138) 0%, rgb(241, 218, 54) 100%);
position:fixed;

border-radius:20px;
opacity:80%;
transition: opacity 0.3s;

&:hover {
 opacity: 100%;
 border:2px solid black; 
}
& div{
    position:relative
    overflow:hidden;
}

`;

export const DishesMainPage = styled.div`
`;
export const CartSpan = styled.span` 
background-color: red;
border: 1px white solid;
/* top: 31px; */
border-radius: 100px;
height: 17px;
/* display: flex; */
align-items: flex-end;
margin-top: 6px;`;

export const CartItems = styled.div`
margin: -5px 4px 0px 4px;

`;