import React from 'react'
import Navbar from "./components/Navbar"
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './components/Main'
import Signup from './components/Signup';
import Login from './components/Login';
import Edit from './components/Edit';
import View from './components/View';
import CompareChanges from "./components/CompareChanges"
import Admindashboard from './components/Admindashboard';
import AddNewRule from './components/AddNewRule';
import ChatBot from './components/chatBot';
import { createContext, useState,useReducer } from 'react';
import { intialState,reducer } from './reducer/useReducer';
import Profile from './components/Profile';
// import { Delete } from '@mui/icons-material';
import Delete from "./components/Delete"
import Guidelines from './components/Guidelines';
import Guidelinesadmin from './components/Guidelinesadmin';
import RecentGuidelines from './components/RecentGuidelines';
import VersionContol from './components/VersionContol';
import GetScore from './components/GetScore';


// import { Edit } from '@mui/icons-material';
export const UserContext=createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer,intialState);
  return ( 
      <UserContext.Provider value={{state,dispatch}}>
      <Router>
      <div>
        <Navbar />
        <Routes> 
           <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/delete/:id" element={<Delete />} />

          <Route path="/view/:id" element={<View />} />
          <Route path="/compare/:id" element={<CompareChanges/>}/>
          <Route path="/addNewRule" element={<AddNewRule/>} />
          <Route path="/searchByAI" element={<ChatBot/>} />
          <Route path="/admin/guidelines" element={<Guidelinesadmin/>}/>

          <Route path="/profile" element={<Profile/>} />
          <Route path="/getscore" element={<GetScore/>}/>
          <Route path="/admindashboard" element={<Admindashboard/>}/> 
          <Route path="/recentguidelines" element={<RecentGuidelines/>}/> 

          <Route path="/users/guidelines" element={<Guidelines/>}/>
          <Route path="/admin/versionControl" element={<VersionContol/>}/>
        </Routes>
       
        <ToastContainer />
      </div>
    </Router>
    </UserContext.Provider>
  
  )
}

export default App