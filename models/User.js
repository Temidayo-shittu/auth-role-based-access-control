const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema= new mongoose.Schema(
    {
    firstname:{
        type: String,
        required: [true, 'Please provide your first-name'],
        minlength: 3,
        maxlength: 50
    },
    lastname:{
        type: String,
        required: [true, 'Please provide your last-name'],
        minlength: 3,
        maxlength: 50
    },
    fullname:{
            type: String,
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please provide your email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password:{
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 8,
        validate: {
            validator: function (value) {
                // Password must contain uppercase, lowercase, number, and special character
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
        }
    },
    dateOfBirth:{
        type: Date,
        required: [true, 'Please provide your date of birth'],
    },
    age:{
        type: Number,
    },
    role:{
        type:String,
        enum:['ADMIN','SHIPPER','CARRIER']
    },
},
{
    timestamps: true
})

UserSchema.pre('save',async function(){
    if(!this.isModified('password')) return
    const salt= await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password,salt)
})

UserSchema.methods.comparePassword= async function(userPassword){
    const isMatch= await bcrypt.compare(userPassword,this.password)
    return isMatch
}

module.exports= mongoose.model('User', UserSchema)