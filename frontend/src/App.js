import { useState } from 'react';
 
import './Styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PagePrincpale from './components/componentsUsers/PagePrincpale';
import PageLoginPrincipal from './components/PageLoginPrincipal';
import ViewEventsPage from './pages/ViewEventsPage';
import EventRegistrationsPage from './pages/EventRegistrationsPage';
import AddEventPage from './pages/AddEventPage';
function App() {

  return (
    <div className="app">

      <BrowserRouter>
          <Routes>
          <Route path="/page" element={< PagePrincpale/>} />
          <Route path='/' element={<PageLoginPrincipal/>}/>
          <Route path="/view-events" element={<ViewEventsPage />} />
          <Route path="/event-clients" element={<EventRegistrationsPage />}     />
           <Route path='/add-event' element={<AddEventPage/>}/>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;