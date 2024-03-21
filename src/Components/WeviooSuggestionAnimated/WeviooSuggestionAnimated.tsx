import React, { useEffect, useMemo, useState } from 'react'
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web'


import styles from './styles.module.css'
import DishCard from '../DishCard/DishCard'
import { Dish } from '../../Models/Dish'

export default function WeviooSuggestionAnimated() {
  const [open, set] = useState(false)
/* const data :Dish[] = 
[
  {
      "dishId": 1,
      "dishName": "Cesar salad",
      "dishOrigin": "1",
      "dishCategory": "SALAD",
      "dishPhoto": "https://img.cuisineaz.com/1280x720/2018/02/10/i135580-salade-cesar-allegee.jpeg",
      "quantityAvailable": 25,
      "dishPrice": 10
  },
  {
      "dishId": 2,
      "dishName": "Coffe",
      "dishOrigin": "2",
      "dishCategory": "DRINK",
      "dishPhoto": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?quality=90&resize=500,454",
      "quantityAvailable": 30,
      "dishPrice": 5
  },
  {
      "dishId": 3,
      "dishName": "Fruit salad",
      "dishOrigin": "3",
      "dishCategory": "DESSERT",
      "dishPhoto": "https://images.unsplash.com/photo-1606850246029-dd00bd5eff97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "quantityAvailable": -10,
      "dishPrice": 10
  },
  {
      "dishId": 4,
      "dishName": "3",
      "dishOrigin": "3",
      "dishCategory": "MAIN",
      "dishPhoto": "https://images.unsplash.com/photo-1559716229-d8f4e9d01ec6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "quantityAvailable": 0,
      "dishPrice": 10
  },
  {
      "dishId": 5,
      "dishName": "Fish",
      "dishOrigin": "Tunisia",
      "dishCategory": "DRINK",
      "dishPhoto": "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "quantityAvailable": 0,
      "dishPrice": 10
  },
  {
      "dishId": 6,
      "dishName": "222",
      "dishOrigin": "222",
      "dishCategory": "SALAD",
      "dishPhoto": "https://img.cuisineaz.com/1280x720/2018/02/10/i135580-salade-cesar-allegee.jpeg",
      "quantityAvailable": -9,
      "dishPrice": 10
  },
  {
      "dishId": 7,
      "dishName": "22",
      "dishOrigin": "22",
      "dishCategory": "DESSERT",
      "dishPhoto": "https://images.unsplash.com/photo-1559716229-d8f4e9d01ec6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "quantityAvailable": 18,
      "dishPrice": 10
  },
  {
      "dishId": 8,
      "dishName": "22",
      "dishOrigin": "22",
      "dishCategory": "DESSERT",
      "dishPhoto": "https://images.unsplash.com/photo-1559716229-d8f4e9d01ec6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "quantityAvailable": 20,
      "dishPrice": 10
  },] */

  const data = useMemo(() => [
    {
        "dishId": 1,
        "dishName": "Cesar salad",
        "dishOrigin": "1",
        "dishCategory": "SALAD",
        "dishPhoto": "https://img.cuisineaz.com/1280x720/2018/02/10/i135580-salade-cesar-allegee.jpeg",
        "quantityAvailable": 25,
        "dishPrice": 10
    },
    {
        "dishId": 2,
        "dishName": "Coffe",
        "dishOrigin": "2",
        "dishCategory": "DRINK",
        "dishPhoto": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?quality=90&resize=500,454",
        "quantityAvailable": 30,
        "dishPrice": 5
    },
    {
        "dishId": 3,
        "dishName": "Fruit salad",
        "dishOrigin": "3",
        "dishCategory": "DESSERT",
        "dishPhoto": "https://images.unsplash.com/photo-1606850246029-dd00bd5eff97?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "quantityAvailable": -10,
        "dishPrice": 10
    },
    {
        "dishId": 4,
        "dishName": "3",
        "dishOrigin": "3",
        "dishCategory": "MAIN",
        "dishPhoto": "https://images.unsplash.com/photo-1559716229-d8f4e9d01ec6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "quantityAvailable": 0,
        "dishPrice": 10
    },
    {
        "dishId": 5,
        "dishName": "Fish",
        "dishOrigin": "Tunisia",
        "dishCategory": "DRINK",
        "dishPhoto": "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "quantityAvailable": 0,
        "dishPrice": 10
    },
    {
        "dishId": 6,
        "dishName": "222",
        "dishOrigin": "222",
        "dishCategory": "SALAD",
        "dishPhoto": "https://img.cuisineaz.com/1280x720/2018/02/10/i135580-salade-cesar-allegee.jpeg",
        "quantityAvailable": -9,
        "dishPrice": 10
    },
    {
        "dishId": 7,
        "dishName": "22",
        "dishOrigin": "22",
        "dishCategory": "DESSERT",
        "dishPhoto": "https://images.unsplash.com/photo-1559716229-d8f4e9d01ec6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "quantityAvailable": 18,
        "dishPrice": 10
    },
    {
        "dishId": 8,
        "dishName": "22",
        "dishOrigin": "22",
        "dishCategory": "DESSERT",
        "dishPhoto": "https://images.unsplash.com/photo-1559716229-d8f4e9d01ec6?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "quantityAvailable": 20,
        "dishPrice": 10
    },], []);
  const springApi = useSpringRef()
  
 
  const {width,height, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: {/*  size: '20vh', */ background: '#fcfcfc99' , paddingSize:'0',height:'20vh',width:'20vw'},
    to: {
      /* size: open ? '100vw' : '20vh', */
     height: open ? '100%': '9vh',
     width:open?'80vw':'10vw',
      background: open ? '#5c303014' : '#fcfcfc99',
      /* paddingSize:open?'20px':'0' */
    },
  })

  const transApi = useSpringRef()
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  })

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ])

  return (
    <>
    <animated.div className={styles.wrapper} style={{width: width,height:height } }>
      <div style={{    position: 'absolute',    top: '-1.5%',    right: '6%'}} className='clickable bg-danger white' hidden={!open} onClick={() => set(open => false)}>Close Suggestion</div>
      <animated.div
        style={{ ...rest, width: width, height: height }}
        className={styles.container}
        onClick={() => set(open => true)}>
          
          
        {transition((style, item) => {
         
          return(
           <animated.div key={item.dishName}  className={styles.item} style={{ ...style}}>
          <DishCard
          id={item.dishId}
          name={item.dishName}         
          image={item.dishPhoto}
          category={item.dishCategory}
          price= {item.dishPrice}
          quantity={item.quantityAvailable} ></DishCard></animated.div>
        )})}
      </animated.div>
    </animated.div>
  
    </>
  )
}
