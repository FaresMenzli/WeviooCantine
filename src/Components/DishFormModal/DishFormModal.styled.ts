import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';
const fadeIn = keyframes`
 /* from {
   opacity: 0;
    transform: scale(0.8) rotate(-80deg);

  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg); 

  }*/
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;
export const StyledModal = styled(Modal)`
position: absolute;
top: 12%;
    left: 38%;
transform: translate(-50%, -50%);
background-color: #ffffff;
padding: 24px;
border-radius: 10px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
max-width: 400px;
width: 100%;
outline: none;
opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;
export const ModalHeader = styled.h2`
margin-bottom: 16px;
color: #333;
font-size: 1.5rem;
justify-content:center;

`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
margin-bottom: 8px;
color: #555;
font-weight: bold;
`;

export const FormInput = styled.input`
padding: 12px;
margin-bottom: 16px;
border: 1px solid #ddd;
border-radius: 4px;
font-size: 1rem;
`;

export const FormButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
