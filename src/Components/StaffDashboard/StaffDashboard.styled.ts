import styled from 'styled-components';

export const StaffDashboardWrapper = styled.div`
min-height: 100vh;
height:100%;
padding-top:45px;
`;
export const ManageDishs = styled.div`
`;
export const DishList = styled.div`
`;

export const TopBarStaff = styled.div`
height:7vh;
widht:100vw
align-items: center;
justify-content: space-evenly;
display: flex;
background-color: black;
padding-top: 7px;
font-size: x-large;
letter-spacing: 5px;
font-variant: all-petite-caps;
`;

export const Links = styled.div `
height:100%;
border-top: 0px solid red;
transition: all 0.2s linear;

&:hover {
  
   border-top: 4px solid red;
   }
`
