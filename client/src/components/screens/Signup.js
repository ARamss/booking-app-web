import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

 const SignUp = ()=>{
   const history = useHistory()
   const [name,setName] = useState("")
   const [lastname,setlastName] = useState("")
   const [password,setPassword] = useState("")
   const [email,setEmail] = useState("")
   const [url,setURL] = useState(undefined)

   useEffect(()=>{
     if(url){
         uploadFields()
     }
   },[url])


   const uploadFields = ()=>{
           //email format verification
           if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
             M.toast({html:"Invalid email...",classes:"#d32f2f red darken-2"})
             return
           }
           fetch("/signup",{
             method:"post",
             headers:{
               "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 name,
                 password,
                 email,
             })
           }).then(res=>res.json())
           .then(data=>{
               if(data.error){
                  M.toast({html:data.error,classes:"#d32f2f red darken-2"})
               }
               else{
                  M.toast({html:data.message,classes:"#1de9b6 teal accent-3"})
                  history.push('/signin')
               }
           }).catch(error=>{
               console.log(error)
           })
         }

   const PostData = ()=>{
           uploadFields()
   }


   return(
         <div className="mycard">
           <div className="card auth-card input-field">
               <h2>Booking</h2>
               <input
                 type="text"
                 placeholder="name"
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
               />
               <input
                 type="text"
                 placeholder="name"
                 value={lastname}
                 onChange={(e)=>setlastName(e.target.value)}
               />
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
                 <Link to="/signin">Already have an account?</Link>
               </h5>
           </div>
         </div>
    )
 }

 export default SignUp
