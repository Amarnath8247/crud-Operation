const express = require('express');
require('./db/conn');
const Student = require('./modles/students')
const app = express();
const port = process.env.PORT || 8000 ;
 
app.use(express.json());
 // post method 
 app.post( '/student' , async(req , res)=>{
    try{
        const user = new Student(req.body)
       const creatuser = await user.save()
         res.status(201).send(creatuser);
        
    }catch(e){res.status(400).send(e);}
    
 })
// get method
 app.get( '/student' , async(req , res)=>{
    try{
        
       const studentData = await Student.find()
         res.send(studentData);
        
    }catch(e){res.send(e);}
    
 })

 //patch method
 app.patch( '/student/:id' , async(req , res)=>{
    try{
         const _id = req.params.id ;

       const updateData = await Student.findByIdAndUpdate(_id , req.body ,{
        new:true
       })
         res.send(updateData);
        
    }catch(e){res.status(404).send(e);}

 })

// delete method
    app.delete( '/student/:id' , async(req , res)=>{
        try{
             const deleteId = req.params.id ;
    
           const deleteStudent = await Student.findByIdAndDelete(deleteId )
             if(!deleteId){
                return res.status(400).send()
             }
           
           res.send(deleteStudent);
            
        }catch(e){res.status(404).send(e);}
    
 })

app.listen(port ,()=>{
    console.log(port)
})
