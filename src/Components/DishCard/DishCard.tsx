import React, { FC } from 'react';
import { DishCardWrapper,Description,DishName,ImgWrapper, FoodImg, DishDescriptionSection, AddToCartBtn, OrderBtn, DishCardButtons} from './DishCard.styled';

interface DishCardProps {
    name: string
    image:string
    category:string
}


const DishCard: FC<DishCardProps> = (props ) => (
    
 <DishCardWrapper>
    <ImgWrapper className={props.category}>
<FoodImg  src={(props.image)} alt=" foodPhoto" />
<> {console.log(props.category)}</>
 </ImgWrapper>
 <DishDescriptionSection> 
     <DishName> {props.name}</DishName> 
     <Description> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos accusamus harum rerum exercitationem. Reiciendis numquam rem saepe optio porro reprehenderit animi asperiores soluta, rerum accusantium quisquam repellat magni enim suscipit?</Description>
      <DishCardButtons>
         {/* <OrderBtn type="button" value="Order now" /> */}
      <AddToCartBtn type="button" value="Add to cart"></AddToCartBtn></DishCardButtons>
     
</DishDescriptionSection>
 </DishCardWrapper>
);

export default DishCard;
