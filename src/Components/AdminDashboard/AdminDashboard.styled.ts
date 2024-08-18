import styled from 'styled-components';

export const AdminDashboardWrapper = styled.div`
height:100%;
min-height:100vh;

`;
export const TopBarDashboard = styled.div`
background-color:black;
height:5vh;
widht:100vw

align-items: center;
justify-content: space-around;
display: flex;

`;
export const MainDashboard = styled.div`




`;
export const RightBarDashboard = styled.div`
background-color:white;
width:15vw;
height:95vh
border: black solid 4px;

`;
export const AdminLeftBar = styled.div`
height: 75vh;
width: 220px;
background: radial-gradient(black, transparent);
background: aliceblue;
position: fixed;
margin-left: 15px;
border-radius: 20px;

`;


const primaryColor = '#00005c';
const textColor = `rgba(0, 0, 0, 0.64)`
const backgroundColor = `rgba(255, 255, 255, 0.9)`;;


export const Body = styled.body`
  font-family: "Inter", sans-serif;
  color: ${textColor};
  font-size: calc(1em + 1.25vw);
  background-color: ${backgroundColor};
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const Label = styled.label`
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;


  input {
    position: absolute;
    left: -9999px;
    background-color:red;

    &:checked + span {
        background-color: #ffc10794;

      &:before {
        box-shadow: inset 0 0 0 0.4375em ${primaryColor};
      }
    }
  }

  span {
    display: flex;
    align-items: center;
    padding: 0.375em 0.75em 0.375em 0.375em;
    border-radius: 99em; 
    transition: 0.25s ease;

    &:hover {
        background-color: #ffc10794;
    }

    &:before {
      display: flex;
      flex-shrink: 0;
      content: "";
      background-color: #fff;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      margin-right: 0.375em;
      transition: 0.25s ease;
      box-shadow: inset 0 0 0 0.125em ${primaryColor};
    }
  }
`;

