import React,{useEffect,createContext,useReducer,useContext} from 'react'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import SignIn from './components/screens/Signin'
import SignUp from './components/screens/Signup'
import Formularios from './components/screens/Formularios'
import NuevoFormulario from './components/screens/nuevoFormulario'
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
      <Route path="/formularios">
         <Formularios/>
      </Route>
      <Route exact path="/nuevo-formulario">
         <NuevoFormulario/>
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
