const jwt=require('jsonwebtoken')

const db=require('./db.js')
//  userDetails={
//     1000:{acno:1000,username:"anu",password:"abc123",balance:0,transation:[]},
//     1001:{acno:1001,username:"binu",password:"abc123",balance:0,transation:[]},
//     1002:{acno:1002,username:"jenu",password:"abc123",balance:0,transation:[]},
//     1003:{acno:1003,username:"manu",password:"abc123",balance:0,transation:[]}
//  }

  dataRegister=(uname,acnum,paswd)=>{
    // if (acnum in userDetails) {
return  db.User.findOne({acnum}).then(user=>{
        if(user){
          return{
            status:false,
            message:'user already present',
            statusCode:401 
          }
        }
        else{
          // create a new user object in db 
          const newuser=new db.User({acno:acnum,
             username:uname, 
             password:paswd,
              balance:0,    
             transation:[]

          })
          newuser.save()
        return{
        status:true,
        message:'registersuccess',
        statusCode:200
      }
        }
      })
   
    }
    // else {
    //   userDetails[acnum] = { acno: acnum, username: uname, password: paswd, balance: 0, transation: [] }
    //   // console.log(this.userDetails);
    //   return{
    //     status:true,
    //     message:'registersuccess',
    //     statusCode:200
    //   }
    // }
  // }

    UserLogin=(acnum, paswd)=>{
    //  if (acnum in userDetails) {
     return db.User.findOne({acno:acnum,password:paswd}).then(user=>{
        if(user){
          currentuser = user.username
          // console.log(this.currentuser);
        currentaccountno= acnum
        const token=jwt.sign({currentaccountno},"supersecretkey123")
        return{
            status:true,
            message:'login success',
            statusCode:200,
            currentuser,
            currentaccountno,
            token 
          }
        }
        else{
          return{
            status:false,
            message:'incurrect password OR account number',
            statusCode:401 
          }

        }
      })
    //   if (paswd == userDetails[acnum]["password"]) {
      
    //   }
    //   else {
    //     return{
    //       status:false,
    //       message:'incurrect password',
    //       statusCode:401 
    //     }
    //   }
    // }
    // else {
    //   return{
    //     status:false,
    //     message:'not registerd',
    //     statusCode:401 
    //   }
    // }
    }

  Userdeposite=(acnum, password,amount)=>{
  
    // convert string amount to number
    var amnt = parseInt(amount)
       // if (acnum in userDetails) {
 // if (password == userDetails[acnum]["password"]) {
      return  db.User.findOne({acno:acnum,password}).then(user=>{
        if(user){
          user.balance += amnt
        user.transation.push({type: "cerdit", amount: amnt })
        user.save()
        return{
          status:true,
          message:`${amnt} is credited to your ac and the balance${user.balance}`,
          statusCode:200,
        }
      }
      else{
        return{
          status:false,
          message:'incurrect password OR account number',
          statusCode:401 
        }

      }

        })
      }  
        // userDetails[acnum]["balance"] += amnt
        // userDetails[acnum]["transation"].push({type: "cerdit", amount: amnt })
     

        // return{
        //   status:true,
        //   message:`${amnt} is credited to your ac and the balance${userDetails[acnum]["balance"]}`,
        //   statusCode:200,
        // }
          
      
  //     else {
  //       return{
  //         status:false,
  //         message:'incurrect password',
  //         statusCode:401 
  //       }
  //     }
  //   }
  //   else {
  //     return{
  //       status:false,
  //       message:'incurrect acno',
  //       statusCode:401 
  //     }
  //   }

  // }
  userWithdraw=(acnum,password,amount)=> {
   
    // convert string amount to number
    var amnt = parseInt(amount)
    // if (acnum in userDetails) {
      return  db.User.findOne({acno:acnum,password}).then(user=>{
        if(user){
          if(user.balance>=amnt){
            user.transation.push({ type: "debit", amount:amnt})
            user.balance-=amnt
            user.save()
            return{
              status:true,
              message:`${amnt} is debited to your ac and the balance${user.balance}`,
              statusCode:200,
            }
          }else{
            return{
              status:false,
              message:'balance un avilable',
              statusCode:401 
            }

          }
        }
        else{
          return{
            status:false,
            message:'passwordd OR account number not correct',
            statusCode:401 
          }
        }
      })
    }

    //   if (password == userDetails[acnum]["password"]) {
    //     if ((userDetails[acnum]["balance"] >= amnt)) {
    //       // update balance
    //       userDetails[acnum]["transation"].push({ type: "debit", amount: amnt })
    //       userDetails[acnum]["balance"] -= amnt
    //       console.log(userDetails);
    //       return{
    //         status:true,
    //         message:`${amnt} is debited to your ac and the balance${userDetails[acnum]["balance"]}`,
    //         statusCode:200,
    //       }
    //     }
    //     else {
    //       return{
    //         status:false,
    //         message:'balance un avilable',
    //         statusCode:401 
    //       }
    //       alert("balance un avilable")
    //       return false
    //     }
    //   }
    //   else {
    //     return{
    //       status:false,
    //       message:'passwordd not correct',
    //       statusCode:401 
    //     }
    // }
  //   }
  //   else {
  //     return{
  //       status:false,
  //       message:'not a user',
  //       statusCode:401 
  //     }
  //   }
  // }
  getTransaction=(acno)=>{
    return  db.User.findOne({acno}).then(user=>{
      if(user){
      return{
        status:true,
        statusCode:200,
        transaction:user.transation
       }
      }
    })
  }
  deleteAcc=(acno)=>{
    return db.User.deleteOne({acno}).then(user=>{
      if(user){
        return{
          status:true,
          statusCode:200,
          message:'account deleted'
        }

      }
    
    })
  }
  //   return{
  //     status:true,
  //     statusCode:200,
  //     transaction:userDetails[acno]["transation"]
  //    }
    
  // }

  module.exports={

    dataRegister,UserLogin,Userdeposite,userWithdraw,getTransaction,deleteAcc
 }