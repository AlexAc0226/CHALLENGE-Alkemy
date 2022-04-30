const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');

const authConfig = require('../config/Auth');

//Modelo ficticio
const { User } = require('../db');

//router.post("/login", userSing)
//router.post("/register", userRegister)

//Register
const register = async (req, res) => {
    try{

        //Contraseña encriptada
        const password = bcrypt.hashSync(req.body.password, parseInt(authConfig.rounds));

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        });

        //Generar token
        const token = jwt.sign({ user: newUser }, authConfig.secret ,{
            expiresIn: authConfig.expires
        });

        res.json({
            user: newUser,
            token: token
        })
    }catch(err){
        console.log(err)
    }
}

//Login
const sing = async (req, res) => {
    try{

        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if(!user){
            return res.status(401).json({
                message: "Contraseña incorrecta"
            })
        }else{
            //Comparar contraseña => password.body vs user.password
            if(bcrypt.compareSync(password, user.password)){
                //Devolvemos token
                const token = jwt.sign({ user: user }, authConfig.secret ,{
                    expiresIn: authConfig.expires
                });

                res.json({
                    user: user,
                    token: token
                })
            }else{

            }
        }

    }catch(err){
        console.log(err)
    }
}


module.exports = router; 