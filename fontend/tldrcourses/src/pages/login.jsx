import { useContext, useEffect, useState } from 'react'
import icon_black_transparent from '/logo-black-transparent.png'
import image from '/image_laptop.png'
import '../assets/login.css'
import GoogleSvg from "/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { UserContext } from '../App.jsx';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { useNavigate } from 'react-router-dom';
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyC5d34oavtEJCKEZQwU3gnoOZcnEbybAOo",
    authDomain: "tldr-courses.firebaseapp.com",
    projectId: "tldr-courses",
    storageBucket: "tldr-courses.appspot.com",
    messagingSenderId: "755406451812",
    appId: "1:755406451812:web:be52d741df6cb16c8c9b71",
    measurementId: "G-3X3T8B8VGK"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);


const Login = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const navigate = useNavigate();
    const {user, course_data, setCourseData}=useContext(UserContext);

    useEffect(()=>{
        if(user){
            if(!check_signup()){
                navigate("/signup");
                return
            }
            navigate("/dashboard");
        }
    })
    
    function google_login() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                writeStorage("user", user)
                if(!check_signup()){
                    navigate("/signup");
                    return
                }
                navigate("/dashboard");
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                alert(error);
                // ...
            });
    }
    async function check_signup(){
        const docRef = collection(db,'/users/', user.uid)
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
          return true
      }
      else{
          return false
      }
    }

    return (
      <div className="login-main">
        <div className="login-left">
          <img src={image} alt="" />
        </div>
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-logo">
              <img src={icon_black_transparent} alt="" />
            </div>
            <div className="login-center">
              <h2>Welcome!</h2>
              <p>use google to signup or login</p>
              <form>
                <input type="email" placeholder="Email" disabled/>
                <div className="pass-input-div">
                  <input type={showPassword ? "text" : "password"} placeholder="Password" />
                  {showPassword ? <FaEyeSlash onClick={() => {setShowPassword(!showPassword)}} /> : <FaEye onClick={() => {setShowPassword(!showPassword)}} />}
                  
                </div>
  
                <div className="login-center-options">
                  <div className="remember-div">
                    <input type="checkbox" id="remember-checkbox" disabled/>
                    <label htmlFor="remember-checkbox">
                      Remember for 30 days
                    </label>
                  </div>

                </div>
                <div className="login-center-buttons">
                  <button type="button" disabled>Log In *only google login allowed*</button>
                  <button onClick={google_login} type="button">
                    <img src={GoogleSvg} alt="" />
                    Log In with Google
                  </button>
                </div>
              </form>
            </div>
  

          </div>
        </div>
      </div>
    );
  };
  
  export default Login;