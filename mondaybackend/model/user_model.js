const mongoose = require('mongoose');


const User = mongoose.model('user',{
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true

    },
    userType:{
        type:String,
        enum:['User','Admin','Vip']
    },
    subrole: {
        type: String,
        enum: ['manager', 'waiter', 'cook', 'visitor'],
        default: 'visitor',
      }
})

module.exports = User;