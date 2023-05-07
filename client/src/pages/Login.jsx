import React, { useEffect,useState } from  'react'
import Alert from 'react-popup-alert'
import { useNavigate } from "react-router-dom";
import './login.css'



function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState({
    type: 'error',
    text: 'This is a alert message',
    show: false
  });

  function incorrectAlert(){
   setAlert({
      type: '',
      text: '',
      show: false
    })
};

 
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform authentication logic here with username and password
    // For demonstration purposes, we'll just log the values
    console.log('Username:', username);
    console.log('Password:', password);
    var object = {"username":username,"passwrod":password}
    console.log(JSON.stringify(object))
    fetch("http://localhost:3080/api/login", {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({"username":username,"password":password})
    }).then((response) => response.json())
    .then((data) => {
      if(data.msg === "correct"){
          setauthenticated(true)
          localStorage.setItem("authenticated", true);
           navigate("/");
      }
      // Handle data
   }).catch((err) => {
      console.log(err.message);
   });

  }

  return (
    <div className="container">
      <h1>Login</h1>
  
      <form onSubmit={handleSubmit}>
      <div className="box">
      <div className="loginbox">
        
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password :
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
           />
          </label>
          <button type="submit">Login</button>
        
        </div>
        </div>
        </form>

    </div>
  );

}
export default Login