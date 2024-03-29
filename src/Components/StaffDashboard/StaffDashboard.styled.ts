import styled from 'styled-components';
export interface NavbarProps {
   shrunk: boolean;
 }

export const StaffDashboardWrapper = styled.div`
min-height: 100vh;
height:100%;

`;
export const ManageDishs = styled.div`
`;
export const DishList = styled.div`
`;

export const TopBarStaff = styled.div<NavbarProps>`
height:${props => (props.shrunk ? '4vh' : '7vh')};
width:100vw;
align-items: center;
justify-content: space-evenly;
display: flex;
position:fixed;
background-color: ${props => (props.shrunk ? 'black' : 'black')};
padding-top:  ${props => (props.shrunk ? '0' : '7px')};
font-size: x-large;
letter-spacing:  ${props => (props.shrunk ? '1px' : '5px')};
font-variant: all-petite-caps;
transition: all 1s ease;
z-index:1;
`;

export const Links = styled.div `
height:100%;
border-top: 0px solid red;
transition: all 0.2s linear;

&:hover {
  
   border-top: 4px solid red;
   }
`
