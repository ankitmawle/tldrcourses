import { useContext, useEffect, useState } from 'react'
import icon_black_transparent from '/logo-black-transparent.png'
import image from '/image-signup.png'
import '../assets/login.css'
import GoogleSvg from "/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { UserContext } from '../App.jsx';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


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


const Signup = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const navigate = useNavigate();
    const {user, course_data, setCourseData}=useContext(UserContext);
    const db = getFirestore(app);
    

    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    });
    
    async function save_profile(){
       const docRef = collection(db,'users')
       var data={};
       data["age"]=document.getElementById("age").value;
       data["profession"]=document.getElementById("profession").value;
       data["experience"]=document.getElementById("experience").value;
       data["expertSkills"]=document.getElementById("expertSkills").value;
       data["intermediateSkills"]=document.getElementById("intermediateSkills").value;
       data["basicSkills"]=document.getElementById("basicSkills").value;

      await setDoc(doc(docRef, user.uid), data).then(() => {
          console.log('Data written successfully');
          alert("Profile created successfully");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error('Error writing data:', error);
        });
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
              <h2>Welcome {user.displayName}!</h2>
              <p>Please Provide us few details so we can provide you with tailored Courses</p>
              <form>
                
                <input type="number" id="age" placeholder="Age" />
                <input type="text" id="profession" placeholder="Profession/Student" />
                <input type="text" id="experience" placeholder="Experience in months mention college year for student" />
                <p>Please Mention skills you have expertise in separated by commas</p>
                <input type="input" id="expertSkills" list="skills"  placeholder="Skills" />
                <datalist id="skills">
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="React">React</option>
                  <option value="Node">Node</option>
                  <option value="Express">Express</option>
                  <option value="MongoDB">MongoDB</option>
                  <option value="MySQL">MySQL</option>
                </datalist>            
                <p>Please Mention skills you have intermediate knowledge of in separated by commas</p>
                <input type="input" id="intermediateSkills" list="skills"  placeholder="Skills" />
                  
                <p>Please Mention skills you have basic knowledge of in separated by commas</p>
                <input type="input" id="basicSkills" list="skills"  placeholder="Skills" />
                  
  
                <div className="login-center-options">


                </div>
                <div className="login-center-buttons">
                  <button type="button" onClick={save_profile}>Save</button>

                </div>
              </form>
            </div>
  

          </div>
        </div>
      </div>
    );
  };
  
  export default Signup;