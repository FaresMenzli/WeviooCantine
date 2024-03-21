import styled from 'styled-components';

export const DishCardWrapper = styled.div`
flex: 0 0 19%;
margin: 9vh 7vw 0vh 7vw;
border: 1px black solid;
    border-radius: 16px 92px;
    background-color: bisque;
    box-shadow: 9px 10px 10px 5px;
    min-width: 180px;
    max-width: 200px;
    
    
`;
export const OrderBtn = styled.input`
background-color: rgb(228 43 43); 
 /*  border: none; */
  color: white;
  padding: 2px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
 margin-right:1px;
  margin-top: 7px;
  border-radius: 30px 0 0 30px;
`;
export const AddToCartBtn = styled.input`
background-color: rgb(228 43 43); 
color: white;
padding: 2px 10px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin-top: 7px;
border-radius:30px;`;
export const ToDetailsButton = styled.input`
background-color: green; 
color: white;
padding: 2px 10px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin-top: 7px;
border-radius:30px;`;

export const Description = styled.div`    
font-size: x-small;padding: 20px 0 ;text-align:center;;
`;
export const DishCardButtons = styled.div` 
 
position: relative;`;

export const DishName = styled.div`    
text-align: center;font-weight: bold;`;
export const ImgWrapper = styled.div`
   border-radius: 15px 91px 0px;
   `;
   

export const FoodImg = styled.img`
 border-radius: 50%; width:130px;height:160px;    padding: 20px 0;  display: block;
margin-left: auto;
margin-right: auto;`;

export const DishDescriptionSection = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-bottom: 30px;
margin-top:20px;
`;

export const Container = styled.div` 
display:grid`


