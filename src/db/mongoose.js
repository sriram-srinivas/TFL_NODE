const mongoose = require('mongoose');
const validator = require('validator');

const url = 'mongodb://localhost:27017/';
const dbName = 'userConfigDB';

mongoose.connect(url+dbName,{
    useCreateIndex: true,
});

const userDetails = mongoose.model('userDetails',{
    UserName: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email Not Valid')
            }
        }
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        index:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email Not Valid')
            }
        }
    },
    UserType:{
        type: String,
        required: true
    },
    Grade:{
        type: String,
        enum:['PreKG','KG','Grade1','Grade2','Grade3']
    },
    oAuth: {
        type: Boolean,
        required: true
    },
    Active: {
        type: Boolean,
        default:true,
        required: true
    },
    CreatedBy: {
        type: String,
        default:"admin",
        required: true
    },
    CreatedDate: {
        type: Date,
        default:Date.now,
        required: true
    },
    UpdatedBy: {
        type: String,
        default:"admin",
        required: true
    },
    UpdatedDate: {
        type: Date,
        default:Date.now,
        required: true
    }
},'userDetails')
const userObj = {
    UserName: "test@test.com",
    Password: "welcome1",
    Email: "test@test.com",
    UserType:"person",
    Grade:"Grade 1",
    oAuth: false
};
const newUser = new userDetails(userObj)

newUser.save().then(addedUsr =>{
console.log(addedUsr);
}).catch(error =>{
    console.log(error);
})