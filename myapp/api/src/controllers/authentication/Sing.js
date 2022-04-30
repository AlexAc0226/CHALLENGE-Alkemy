/* const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../db.js');

//*Funcion de autenticacion con token
const singUser = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({ msg: 'El usuario no existe' });
    }else if(email === "" || password === ""){
        res.status(400).json({ msg: 'Rellene los camos antes de seguir' });
    }else{
        const token = generateAccesoToken(user);
        res.status(200).json({ msg: "Acceso correcto", token });
    }
}

const generateAccesoToken = (user) => {
    return jwt.sing(user, SECRET_KEY, {
        expiresIn: '5m'
    })
}

module.exports = singUser; */