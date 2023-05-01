// import service file
const dataService=require('./service/dataservice')
// import cors
const cors=require("cors")
// import json web token
const jwt=require('jsonwebtoken')
// import express
const express=require("express")
// creat app using express
const app=express()

//  connection string tp front end integration
app.use(cors({origin:'http://localhost:4200'}))
// to parse jason data from req body
app.use(express.json())
// middleware
const jwtmiddleware=(req,res,next)=>{
try{ 
  const token=req.headers['access_key']
// verify token
const data=jwt.verify(token,"supersecretkey123")
console.log(data);
next()
}
catch{
  res.status(422).json({
    statusCode:422,
    status:false,
    message:'please login'
  })

}
}
app.post('/register',(req,res)=>{

   dataService.dataRegister(req.body.uname,req.body.acnum,req.body.paswd).then(result=>{
    res.status(result.statusCode).json(result)
   })
  //convert object to json and send as responce
  

  //   console.log(req.body);
  // res.send("success")
})
app.post('/deposite',jwtmiddleware,(req,res)=>{

   dataService.Userdeposite(req.body.acnum,req.body.password,req.body.amount).then(result=>{
    res.status(result.statusCode).json(result)
   })
  //convert object to json and send as responce
  

  //   console.log(req.body);
  // res.send("success")
})
app.post('/withdraw',jwtmiddleware,(req,res)=>{
 dataService.userWithdraw(req.body.acnum,req.body.password,req.body.amount).then(result=>{
  res.status(result.statusCode).json(result)

 })
  //convert object to json and send as responce
  //   console.log(req.body);
  // res.send("success")
})

// login
app.post('/login',(req,res)=>{
     dataService.UserLogin(req.body.acnum,req.body.paswd).then(result=>{
      res.status(result.statusCode).json(result)
     })
   //convert object to json and send as responce
   
   //   console.log(req.body);
   // res.send("success")
 })
app.post   ('/transaction',jwtmiddleware,(req,res)=>{
     dataService.getTransaction(req.body.acno).then(result=>{ res.status(result.statusCode).json(result)})
   //convert object to json and send as responce
   
   //   console.log(req.body);
   // res.send("success")
 })

 app.delete('/delete/:acno',jwtmiddleware,(req,res)=>{
  dataService.deleteAcc(req.params.acno).then(result=>{
    res.status(result.statusCode).json(result)
  })
 })

// app.post('/',(req,res)=>{
//     res.send('get method...123...567')
// })
// app.put('/',(req,res)=>{
//     res.send('get method...123...567')
// })
// app.patch('/',(req,res)=>{
//     res.send('get method...123...567')
// })

// create port
app.listen(3000,()=>{console.log("server started at port 3000");})
