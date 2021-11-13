import React,{useEffect,createContext,useReducer,useContext} from 'react'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import SignIn from './components/screens/Signin'
import SignUp from './components/screens/Signup'
import Instalaciones from './components/screens/instalaciones'
import AgendarCita from './components/screens/agendarCita'
import MisReservaciones from './components/screens/misReservaciones'
import {reducer,initialState} from './reducers/userReducer'
import NavBar from './components/Navbar'

export const UserContext = createContext()

const Routing =()=>{
  //user auth logic
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push('/signin')
    }
  },[])

  return (
    <Switch>
      <Route exact path="/">
         <Home/>
      </Route>
      <Route path="/signin">
         <SignIn/>
      </Route>
      <Route path="/signup">
         <SignUp/>
      </Route>
      <Route path="/instalaciones">
         <Instalaciones/>
      </Route>
      <Route exact path="/agendar-cita">
         <AgendarCita/>
      </Route>
    </Switch>
  );
}

function App(){
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
             <NavBar/>
             <Routing/>
        </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
