// importing model database schema 
const User = require('../model/user_model');
const { secretkey } = require('../config');
 const express = require('express');
 const router = express.Router();
 const auth = require('../middleware/auth');

 var jwt = require('jsonwebtoken');

 var bcrypt = require('bcryptjs');

 const QRCode = require('qrcode');
 const fs = require('fs');
 const path = require('path');

//  const generateQRCodeSync = (data, filePath) => {
//   try {
//     QRCode.toFile(filePath, data, {
//       errorCorrectionLevel: 'H',
//       type: 'png',
//       quality: 0.92,
//       margin: 1,
//     });
//     console.log('QR code generated successfully');
//   } catch (err) {
//     console.error('Error generating QR code:', err);
//   }
// };


 router.post('/register', function (req, res) {
    // console.log("data console check", req.body);

    // requesting data from 
      const username1 = req.body.username;
      const email1 = req.body.email;
      const password1 = req.body.password;
      const userType1 = req.body.userType;
      const subrole1 = req.body.subrole;
  
    
      if (!username1 ||  !email1 || !password1 || !userType1 || !subrole1) {
        return res.status(422).json({ message: "empty data" });
      }
    
      //console check
      
    
      //password bcrypt
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password1, salt, function (err, hash) {
          // Store hash in your password DB.
          //converting object
          const user = new User({
            username: username1,
            email: email1,
            password: hash,
            userType: userType1,
            subrole:subrole1,
        
          });
     //data save
          user.save();

          

          const qrCodeData = `your Username: ${username1}- email: ${email1}- password:${password1}-userType${userType1}-Your subrole: ${subrole1}`;
             const email = email1;
             


             const filename = `${email}.png`;

          let stjson =JSON.stringify(qrCodeData);
          QRCode.toFile(filename,stjson,function(err,code){
            if(err) return console.log("error");
            console.log(`${code}`);
            // res.render(code);

            // res.render({filename}, { qrCodeFilePath });

            
          })







          // const qrCodeOptions = {
          //   errorCorrectionLevel: 'H',
          //   type: 'png',
          //   quality: 0.92,
          //   margin: 1,
          // };

          // const qrCodeImagePath = path.join(__dirname, '..', 'public', 'qrcodes', `${user._id}.png`);
          // generateQRCodeSync(qrCodeData, qrCodeImagePath);


          // res.status(200).json({ message: 'User registered successfully', userId: user._id });
          
           
      
          
        
          


          //data save
        //   //response
          res.send({ message: "successful registration on database" });

        //   const { username1, email1 } = req.query;
        // //  Adjust the naming convention based on your requirements
        //   const filePath = path.join(__dirname, 'path/to/images', filename); // Update the path to the location of the images on your server
        
        //   res.sendFile(filePath);

          
        });
      });
    
      //object data
    });


    router.post("/login", function (req, res) {
  
        const email = req.body.email;
        const password = req.body.password;
      //email check database bata
        User.findOne({ email: email })
          .then(function (userdata) {
      //userdata database ko store
    // check email false or true
      if(userdata==null){
        return res.status(403).json({message:"email doesnot matched"})
      }
      
            //password compare
            bcrypt.compare(password, userdata.password, function (err, result) {
              // res === true
    
    
              if(result==false){
                return res.status(403).json({message:"password doesnot matched"})
    
               
              }
              // creating token  
              var token = jwt.sign({userid:userdata._id },secretkey);
              res.status(200).json({message:"succesful login",token:token,userType:userdata.userType})
           
            });
          })
          .catch(function (err) {
            res.status(500).json({error:err});
          });
      });
      

      router.get('/manager',auth.verifyLogin,auth.verifymanager,function(req,res){
        res.status(200).json({message:"succesful login to manager"});
        res.json({ message: 'Manager Dashboard' });

      })


      router.get('/cook',auth.verifyLogin,auth.verifycook,function(req,res){

        res.json({ message: 'cook Dashboard' });

      })

      router.get('/waiter',auth.verifyLogin,auth.verifywaiter,function(req,res){

        res.json({ message: 'waiter dashboard'});

      })

      router.get('/visitor',auth.verifyvisitor,function(req,res){
        
        res.json({ message: 'visitor dashboard'});

      })


      router.get('/userall',auth.verifyLogin,auth.verifyAdmin,function(req,res){
        User.find().then(function(data){
          res.status(200).json(data)
        }).catch(function(err){
          res.status(500).json({error:err})
        });
      })



    
        router.post('/generateQRCode', (req, res) => {
          const email = req.body.email; // Retrieve the email ID from the form submission
         // Retrieve the password from the form submission
          const qrCodeFilePath = `${email}.png`; // Construct the file name using both the email ID and password
        
          QRCode.toFile(qrCodeFilePath, `${email}`, (err) => {
            if (err) {
              console.error('Error generating QR code:', err);
              res.sendStatus(500);
            } else {
              res.render('qrcode', { qrCodeFilePath });
            }
          });
        });
        

      // creating token  
     
    
  




     
 

      
    
module.exports = router;