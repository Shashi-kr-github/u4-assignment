const jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require("../model/user.model");

const newToken = (user) => {
 return  jwt.sign({user}, process.env.JWT_SECRET_KEY);
}

const register = async (req,res) => {
  let user;
 // console.log("user", user)
  try{
     user = await User.findOne({email: req.body.email});
     // console.log("user15", user);
      if(user) return res.status(400).send({message: "please check your email and password"})

      user = await User.create(req.body);
 // console.log("user19", user);
//  res.send({message: "sucess"})
      const token =  jwt.sign({user},"shashi");
  //console.log("token", token);
      return res.status(200).send({user,token});
  }
  catch(err)
  {
     return res.status(400).send({message: "sorry for inconvenience"})
  }

}


const login = async (req, res) => {
 try{
   let user = await User.findOne({ email: req.body.email });
    console.log("user36", user);

    if (!user)return res.status(400).send({ message: "please check your email and password" });
    res.send({ message: "sucess" });

    let match = user.checkPassword(req.body.password);
    console.log(match);

    if(! match)return res.status(400).send({ message: "please check your  password" });
    res.send({ message: "password matched" });

     const token = jwt.sign({ user }, "shashi");
     //console.log("token", token);
     return res.status(200).send({ user, token });

 }catch(err){
    return res.status(500).send({ message: "sorry for inconvenience" });
 }
};

module.exports = {register, login}