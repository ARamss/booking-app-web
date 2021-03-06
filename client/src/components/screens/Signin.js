import React,{useState,useContext,} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from  '../../App';
import M from 'materialize-css';

 const SignIn = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          M.toast({html:"Invalid email...",classes:"#d32f2f red darken-2"})
          return
        }
        fetch("/signin",{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
              password,
              email
          })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
               M.toast({html:data.error,classes:"#d32f2f red darken-2"})
            }
            else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               //dispatch to user reducer
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"Welcome!",classes:"#1de9b6 teal accent-3"})
               history.push('/')
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>booking</h2>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                onClick={()=>PostData()}
                >
                  Sign In
                </button>
                <h5>
                  <Link to="/signup">No tienes cuenta?</Link>
                </h5>
            </div>
        </div>
    )
 }

 export default SignIn
