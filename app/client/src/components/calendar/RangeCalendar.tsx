import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export function RangeCalendar({ value, onChange }: { value:Value, onChange:any}) {

  return (
    <div>
      <Calendar 
        onChange={onChange} 
        value={value}  
        tileClassName={"text-gray-500"}
        selectRange
      />
    </div>
  );
}