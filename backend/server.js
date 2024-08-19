const express = require("express");
const app = express();
const dotenv = require('dotenv').config()
const admin = require("firebase-admin");
const credentials = require("./tldr-courses-firebase-adminsdk-mlt5f-44cdb3a7a4.json");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors')
app.use(cors())
gemini_api_key= process.env.gemini_key

const genAI = new GoogleGenerativeAI(gemini_api_key);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
admin.initializeApp({
    credential: admin.credential.cert(credentials)
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/create_course', async (req, res) => {
    console.log(req.body)
    const data ={
        age: req.body.age,
        profession: req.body.profession,
        experience: req.body.experience,
        expertSkills: req.body.expertSkills,
        intermediateSkills: req.body.intermediateSkills,
        basicSkills: req.body.basicSkills,
        course: req.body.course,
        user: req.body.user
        }

    const db = admin.firestore();
    const docRef = db.collection('courses').doc();
    const doc = await docRef.set(data); 
    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        // Set the `responseMimeType` to output JSON
        generationConfig: { responseMimeType: "application/json" },
        systemInstruction:`you are a highly experienced teaching course creator, creating course for ${data.profession} with ${data.experience} years of experience. and of ${data.basicSkills} and ${data.intermediateSkills} and ${data.expertSkills}. he is of ${data.age} years of age.`
     
      });
       let prompt = `
      create a in depth niche self learningcourse syllabus for ${data.course}. using this JSON schema:
      { "type": "object",
        "properties": {
          "course_name": { "type": "string" },
          "topics":{
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "topic_name": { "type": "string" },
                "subtopics": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "subtopic_name": { "type": "string" },}
          },
        
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      res.send(text);
})

app.post('/generate_topic', async (req, res) => {
    console.log(req.body)
    const data ={
        age: req.body.age,
        profession: req.body.profession,
        experience: req.body.experience,
        expertSkills: req.body.expertSkills,
        intermediateSkills: req.body.intermediateSkills,
        basicSkills: req.body.basicSkills,
        course: req.body.course,
        user: req.body.user, 
        topic: req.body.topic
        }

    const db = admin.firestore();
    const docRef = db.collection('courses').doc();
    const doc = await docRef.set(data); 
    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        // Set the `responseMimeType` to output JSON
        generationConfig: { responseMimeType: "application/json" },
        systemInstruction:`you are a highly experienced teaching course creator, creating course for ${data.profession} with ${data.experience} years of experience. and of ${data.basicSkills} and ${data.intermediateSkills} and ${data.expertSkills}. he is of ${data.age} years of age.`
     
      });
       let prompt = `
      create a in depth niche self learningcourse syllabus for ${data.course}. using this JSON schema:
      { "type": "object",
        "properties": {
          "course_name": { "type": "string" },
          "topics":{
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "topic_name": { "type": "string" },
                "subtopics": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "subtopic_name": { "type": "string" },}
          },
        
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      
      res.send(text);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})