const CustomError = require('../errors');

const userAge = (birthYear)=>{
    const today = new Date();
    const birthDate = new Date(birthYear);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return  age;

};

module.exports = userAge ;