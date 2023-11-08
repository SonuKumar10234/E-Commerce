import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders } from './orderSlice';



export function Counter() {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();


  return (
    <div>
      
    </div>
  );
}
