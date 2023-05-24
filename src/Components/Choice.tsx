import React from 'react'
import{
  DndContext,
  closestCenter
}from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useState } from 'react';
import SortableItem from './SortableItem';

type Props = {
  y:string[];
  setY:any;
  title:string
}

const Choice = (props: Props) => {
  let {y,setY,title} = props;
  // if(y === undefined || y.length === 0)y=['null']
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
    <div className='flex flex-col gap-3'>
    <h3 className='font-bold text-gray-700'>{title}</h3>
    <SortableContext
      
        items={y}
        strategy={verticalListSortingStrategy}
    >
      <div className='flex flex-col gap-2 '>
           {y?.map(yitem => <SortableItem key={yitem} id={yitem}/>)}
      </div>
    </SortableContext>
    </div>  
    </DndContext>
  )

  function handleDragEnd(event:any){
    console.log("Drag and called");
    const {active,over} = event;
    console.log("ACTIVE:"+active.id);
    console.log("OVER:"+over.id);

    if(active.id !== over.id && y!== undefined){
       setY((items:string[]) =>{
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items,activeIndex,overIndex))
        return arrayMove(items,activeIndex,overIndex)
      } )
    }
  }
}

export default Choice