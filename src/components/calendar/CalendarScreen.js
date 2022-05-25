import React, { useState } from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

const localizer = momentLocalizer(moment) // or globalizeLocalizer

moment.locale('es')


const events= [
    {
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa', 
        notes: 'Comprar el pastel',
        user:{
          _id: '123',
          name: 'Fernando'
        }
    }
]

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar );


  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const onDoubleClick =(e)=>{
    dispatch( uiOpenModal() );
    console.log(e)
  }
  const onSelect =(e)=>{
    dispatch( eventSetActive( e ) );
  }

  const onSelectSlot = (e) => {
    // console.log(e)
    dispatch( eventClearActiveEvent() );
}


  //MANEJA LA  ULTIMA  PAGINA DEL CALENDARIO ANTE DE DAR F5 
  const onViewChange =(e)=>{
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const eventStyleGetter =(event, start, end, isSelected)=>{
      console.log(event, start, end, isSelected)
      const style ={
        backgroundColor: '#367CF7',
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        color: 'white'
      }



      return {
        style
      }
  }

  return (
    <div className="calendar-container">
        <div className="calendar-screen">

        <Navbar/>
        <Calendar 
          className='calendar-screen'
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={ messages }
          eventPropGetter={eventStyleGetter}

          view={lastView}

          onSelectSlot={ onSelectSlot }
          selectable={ true }

          onDoubleClickEvent={ onDoubleClick}
          onSelectEvent={ onSelect}
          onView={ onViewChange}
          components= {{
            event: CalendarEvent
          }}
          />
        </div>
        <AddNewFab />
        {
                (activeEvent) && <DeleteEventFab />
        }
            
        <CalendarModal/>
    </div>
  )
}
