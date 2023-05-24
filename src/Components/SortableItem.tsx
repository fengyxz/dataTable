import React from 'react'
import { useSortable } from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"

type Props = {
  id:any;
  key:string;
}

const SortableItem = (props: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id:props.id})

  const style = {
    transform:CSS.Transform.toString(transform),
    transition
}

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <button 
      className='bg-transparent text-blue-600 active:text-blue-300 font-semibold  py-1 px-2 border border-blue-500 active:border-blue-300 rounded'
      >
        {props.id}
      </button>
    </div>
  )
}

export default SortableItem