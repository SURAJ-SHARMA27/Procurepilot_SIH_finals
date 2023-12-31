import React, { useState,useContext,useEffect } from 'react'
import { BsDatabaseFillCheck } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () =>{
    localStorage.removeItem('userInfo');
    dispatch({type:"USER",payload:false});
    
    toast.success('user successfully Logged Out');
    navigate('/login');
  };
  const cheackISLoggedIn=()=>{
    const x=localStorage.getItem('myState');
     console.log("x:",x);
    return x;
  }
  useEffect(() => {
    cheackISLoggedIn();
    Sidenav();
  }, [localStorage.getItem('myState')])
  
  const openNav = () => {
    setSidebarOpen(true);
  };
  const closeNav = () => {
    setSidebarOpen(false);
  };  
  const Sidenav=()=>{
    const x=cheackISLoggedIn();
    console.log("x2",x);
    if(x == 'true'){
      console.log("x3",x);
      return(
        <>
        <Link to="/admin/guidelines">Manage Repository</Link>
          
        <Link to="/admin/versionControl">Version Control</Link>
        <Link to="/users/guidelines">Guidelines</Link>
        {/* /getscore */}
        <Link to="/getscore">Get Tender Score</Link>

        {/* <a href="#">Get Tender Score</a>   */}
    <Link to="/recentguidelines">Recent Guidelines</Link>

     
        <Link to="/profile">Profile</Link>
        </>
      )
    }
    else{
      return(
        <>
         <Link to="/users/guidelines">Guidelines</Link>
    <Link to="/recentguidelines">Recent Guidelines</Link>
      
        </>
      )
    }
  }
  const Dashboard=()=>{
const x=cheackISLoggedIn();
    if(x == 'true'){
      return(
        <li class="nav-item active">
        <Link to="/admindashboard" className="nav-link">
    Dashboard
  </Link>
        </li>
      )
    }
  }
  const RenderLogin=()=>{
    const x=cheackISLoggedIn();
    if(x=='true'){
      return(
       
        <button type="button" class="btn btn-outline-info " onClick={handleLogout} >Logout</button>
      )
    }
    else{
      return(
        <Link to="/login" className="btn btn-outline-info my-2 my-sm-0 ">
        Login
      </Link>
      )
    }
  }
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div>
      <div id="mySidenav" className={`sidenav ${isSidebarOpen ? 'open' : ''}`} style={{zIndex:"7"}}>
      <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
       <Sidenav/>
      </div>

      <span style={{ fontSize: '20px', cursor: 'pointer',color:"#5bc0de" }} onClick={openNav}>&#9776;</span>
    </div>
    <Link class="navbar-brand" to="/">
    {/* <BsDatabaseFillCheck style={{ fontSize: '1.5em' }} className='mx-1'/> */}
    {/* <img src={/logo.png}></img> */}
    <img style={{width:"50px", height:"50px",marginLeft:"20px"}}  src= {'/public/logo.png  '} alt='image'/>

  </Link>
  <Link style={{fontSize:"23px"}} class="navbar-brand" to="/">Procurepilot</Link>
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    {/* <li className="nav-item active">
            
            <Link className="nav-link" to="/admin">Admin <span className="sr-only">(current)</span></Link>
          </li> */}
      <Dashboard/>
     
      <li class="nav-item">
      {/* <Link to="/searchByAI" className="nav-link">
  Search By AI
</Link> */}
      </li>
      {/* <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li> */}
    </ul>
    <form class="form-inline my-2 my-lg-0">
              <RenderLogin/>
    </form>
  </div>
</nav>
    </>
  )
}

export default Navbar