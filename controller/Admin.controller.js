const pg = require('../db/pg');
const { passHash, passCompare } = require('../utils/bcrypt');
const jwt = require('../utils/jwt');


const Register = async(req,res)=>{
try {
    const { username,password } = req.body;
    console.log(req.body);

    const findUser = await pg("select * from admin where username = $1",username);

    if (findUser.length) {
        return res.status(403).json({message:'username bor'})
    }
    const hashPass = await passHash(password);
    const newUser = (await pg("insert into admin(username,password)values($1,$2) returning *",username,hashPass))[0];
    res.status(201).json({message:"succes register" ,data:newUser})
} catch (error) {
    res.status(400).json({message:error})
}
}


const Login = async(req,res) => {
try {
    const { username,password } = req.body;
    console.log(username);
    const findUser = (await pg("select * from admin where username = $1",username))[0];

    if (!findUser) { 
        return res.status(403).json({message:'not user'})
    }
    const compare = await passCompare(password,findUser.password)
    if(!compare){
        return res.status(403).json({message:'Incorrent password or username'})
    }
    const token = await jwt.sign(username);
    res.cookie('token',token)
    res.status(200).json({message:'succes'})
} catch (error) {
    res.status(400).json({message:error})
}
}

const isAuth = async(req, res, next) => {
  const data = await pg("select * from admin")
  try {
    const token = req.cookies.token;
    let yes = true
    const verify = jwt.verify(token);
    console.log(verify);
    for (let i = 0; i < data.length; i++) {
      if (data[i].username == verify) {
        yes = false
        next();
      }  
    }
   if (yes) {
    res.status(400).json({message:'error'})
   }
  } catch (error) {
    res.status(400).json(error)
  }
};



module.exports = {
    Register,
    Login,
    isAuth
}