import React, { FC, useState } from "react";
import { CartWrapper } from "./Cart.styled";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from './../../redux/store'
import { decrement, increment } from './../../redux/counter'


interface CartProps {}

export default function Cart() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()


  return (
    <CartWrapper>
      <div>
        {count}
        <input onClick={() => dispatch(increment())} type="button" value="+++++++" />
        <input onClick={() => dispatch(decrement())} type="button" value="-------" />
      </div>
    </CartWrapper>
  );
}
