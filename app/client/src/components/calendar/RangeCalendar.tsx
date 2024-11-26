import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import type { Dispatch, SetStateAction } from 'react';

import type { CalendarValue } from '@/types/types';

export function RangeCalendar({ value, onChange }: { value:CalendarValue, onChange:Dispatch<SetStateAction<CalendarValue>>}) {

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