import React, { useState } from 'react';
import Modal from 'react-modal';
import { Dish } from '../../Models/Dish';
import { FormButton, FormContainer, FormInput, StyledModal } from './DishFormModal.styled';
import { FormLabel, ModalHeader } from 'react-bootstrap';

interface DishFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dish: Dish) => void;
}

const DishFormModal: React.FC<DishFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [dish, setDish] = useState<Dish>({
    
    dishName: '',
    dishOrigin: '',
    dishCategory: '',
    dishPhoto: '',
    quantityAvailable: 0,
    dishPrice: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDish((prevDish) => ({
      ...prevDish,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(dish);
    setDish({
      dishName: '',
      dishOrigin: '',
      dishCategory: '',
      dishPhoto: '',
      quantityAvailable: 0,
      dishPrice: 0,
    });
    onClose(); // Close the modal after submission (you can customize this based on your needs)
  };

  return (
    <StyledModal
    isOpen={isOpen}
    onRequestClose={onClose}
    ariaHideApp={false} // This is necessary to prevent a warning and ensure proper functionality
  >
      <ModalHeader className='fw-bold justify-content-center mb-2'>Add Dish </ModalHeader>
      <FormContainer  onSubmit={handleFormSubmit}>
        
        <FormLabel className='fw-bold'>
          Dish Name:</FormLabel>
          <FormInput type="text" name="dishName" value={dish.dishName} onChange={handleInputChange} />
        

        <FormLabel className='fw-bold'>
        Dish Origin:</FormLabel>
        <FormInput type="text" name="dishOrigin" value={dish.dishOrigin} onChange={handleInputChange} />
      

      <FormLabel className='fw-bold'>
        Dish Category: </FormLabel>
        <select name="dishCategory" value={dish.dishCategory} onChange={handleInputChange}>
          <option value="DRINK">DRINK</option>
          <option value="MAIN">MAIN</option>
          <option value="SALAD">SALAD</option>
        </select>
     

      <FormLabel className='fw-bold'>
        Dish Photo: </FormLabel>
        <FormInput type="text" name="dishPhoto" value={dish.dishPhoto} onChange={handleInputChange} />
     

      <FormLabel className='fw-bold'>
        Quantity Available:      </FormLabel>

        <FormInput
          type="number"
          name="quantityAvailable"
          value={dish.quantityAvailable}
          onChange={handleInputChange}
        />

      <FormLabel className='fw-bold'>
        Dish Price:  </FormLabel>

        <FormInput type="number" name="dishPrice" value={dish.dishPrice} onChange={handleInputChange} />

      <FormButton  type="submit">Submit</FormButton>
      </FormContainer>
    </StyledModal>
  );
};

export default DishFormModal;
