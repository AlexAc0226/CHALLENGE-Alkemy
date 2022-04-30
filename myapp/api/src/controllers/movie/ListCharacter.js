/* const { Character } = require("../../db")

const listCharacter = async(req, res)=>{
    try{
        const listCharacters = await Character.findAll({
            attributes: ['name', 'image']
        })

        res.status(200).json(listCharacters)

    }catch(err){
        console.log(err)
    }
}

module.exports = listCharacter; */