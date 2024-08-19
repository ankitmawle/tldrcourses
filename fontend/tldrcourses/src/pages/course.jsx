import { useContext, useEffect, useState } from 'react'
import icon_black_transparent from '/logo-black-transparent.png'
import image from '/image_laptop.png'
import '../assets/dashboard.css'
import GoogleSvg from "/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { UserContext } from '../App.jsx';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { collection,doc, getDoc, setDoc, getDocFromCache } from "firebase/firestore"; 


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

const Course = () => {
 
  const navigate = useNavigate();
  const {user, course_data, setCourseData}=useContext(UserContext);

    
    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
        populate_course_data()
        
    })
    
    async function getUserData() {
        
        const docRef = doc(db,'users', user.uid)
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            return docSnap.data()
        }
        else{
            return false
        }
    }

    async function start_course() {
        var data=await getUserData()
        if (!data){
            alert("Please create a profile first")
            navigate("/signup")
        }
        data["user"]=user.uid
        data["course"]=document.getElementById("course").value
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
              setCourseData(JSON.parse(this.responseText))
              navigate("/course")
            }
          };
        xhttp.open("POST", "http://localhost:3000/create_course", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data) );

    }
    

    return (
      <>
      <div id="nav">
        <img src={icon_black_transparent} alt="logo" />
        <div>
            <button>+ Create New Course</button>
            <button>Logout</button>
        </div>
      </div>
      <div id="main_container">
        <div id="sidebar">
            <p>Course Syllabus</p>
        </div>

        <div id="main">
        <div className="login-center">
              <h2>Welcome!</h2>
              <p>What do you want to learn today?</p>
              <form>
                <input type="text" id="course"placeholder="Course" />
                
                <div className="dashboard-center-buttons">
                  <button type="button" onClick={start_course} >Start Learning</button>
                  

                </div>
            

              </form>
            </div>
        </div>
      </div>
      </>
    );
  };
  
  export default Course;