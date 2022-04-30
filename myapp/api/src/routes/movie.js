const axios = require('axios');
const { Op } = require("sequelize");


const { Router } = require('express');
const router = Router();

const { Character, MovieSerie, Gender } = require("../db")

//*Busqueda por "nombre, años y id de la pelicula"
router.get("/characters", async(req, res)=>{
    try{
        const { name, age, idMovie } = req.query;
        
        if(name){
            const searchCharacter = await Character.findAll({
                where: { 
                  name: 
                  { [Op.iLike]: `%${name}%` } },
            });
            res.status(200).send(searchCharacter)
        }else if(age){
            const searchCharacter = await Character.findAll({
                where: { 
                  age: age 
                },
            });

            res.status(200).send(searchCharacter)
        }else if(idMovie){
            const searchCharacter = await MovieSerie.findAll({
                where:{
                    id: idMovie
                }, include: Character
                
            });

            res.status(200).send(searchCharacter)
        }else {
            const listCharacters = await Character.findAll({
                include: {
                    model: MovieSerie,
                    attributes: ["id","title", "release_date", "qualification"],
                    through: {
                      attributes: [],
                    }
                }
            })
            res.status(200).send(listCharacters)
        }
        
    }catch(err){
        console.log(err)
    }
})

/////////////////////////////
//*Crear, eliminar y actualizar personajes
router.post("/newCharacter", async(req, res)=>{
    const {name, age, weight, history, image, lMovies} = req.body;
    
    const newCharacter = await Character.create({
        name: name,
        age: age,
        weight: weight,
        history: history,
        image: image,
    })

    lMovies.forEach(async(el)=>{
        const [search, boolCreate] = await MovieSerie.findOrCreate({
            where: { title: el },
        })
        await newCharacter.addMovieSerie(search)
    })

    res.status(200).send("Personaje creado!!!")
})

router.delete("/deleteCharacter/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const deleteCharacter = await Character.destroy({
            where: {
                id: id
            }
        })

        res.status(200).send("Personaje eliminado!!!")
    }catch(err){
        console.log(err)
    }
}) 

router.put("/updateCharacter/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const {name, age, weight, history, image, arrayMovie} = req.body;
        const updateCharacter = await Character.update({
            name: name,
            age: age,
            weight: weight,
            history: history,
            image: image,
        },{
            where: {
                id: id
            }
        })

        arrayMovie.forEach(async(el)=>{
            const [cMovie, boolCreate] = await MovieSerie.findOrCreate({
                where: {
                    title: el
                }
            })
            await updateCharacter.addMovieSeries(cMovie)
        })

        res.status(200).send("Personaje actualizado!!!")
    }catch(err){
        console.log(err)
    }
})

///////////////////////////////////

//*Detalle de un personaje
router.get("/detailsCharacter/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        
        const listCharacters = await Character.findAll({
            where:{
                id: id
            },
            include: {
                model: MovieSerie,
                attributes: ["id", "title", "release_date", "qualification", "image"],
                through: {
                  attributes: [],
                }
              }
        })

        res.status(200).send(listCharacters)
    }catch(err){
        console.log(err)
    }
}) 

///////////////////////////////////

//*Mostrar titulo, fecha de lanzamiento e imagen de una pelicula
router.get("/movies", async(req, res)=>{
    try{
        const { name, genre, order } = req.query;

        if(name){
            const searchMovie = await MovieSerie.findAll({
                where: { 
                  title: 
                  { [Op.iLike]: `%${name}%` } },
            });
            res.status(200).send(searchMovie)
        }else if(genre){
            const searchForGender = await Gender.findAll({
                where:{
                    name: genre
                },
                include: MovieSerie
            })
            res.status(200).send(searchForGender)
        }else if(order === "asc"){
            const orderAsc = await MovieSerie.findAll({
                order:[
                    ['release_date', 'ASC']
                ]
            })
            res.status(200).send(orderAsc)
        }else if(order === "des"){
            const orderDes = await MovieSerie.findAll({
                order:[
                    ['release_date', 'DESC']
                ]
            })
            res.status(200).send(orderDes)
        }else{
            const showMovie = await MovieSerie.findAll({
                attributes: ["title", "release_date", "image"]
            })
    
            res.status(200).send(showMovie)
        }


    }catch(err){
        console.log(err);
    }
})

//*Detalles de una pelicula y sus personajes
router.get("/detailMovie/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const showMovie = await MovieSerie.findAll({
            where:{
                id: id
            },
            include: {
                model: Character,
                attributes: ["name", "age", "weight", "image", "history"],
                through: {
                  attributes: [],
                }
              }
        })

        res.status(200).send(showMovie)

    }catch(err){
        console.log(err);
    }
})

//*CRUD de peliculas
router.post("/newMovie", async(req, res)=>{
    const {title, release_date, qualification, image, arrayGenders} = req.body;
    
    const newMovie = await MovieSerie.create({
        title, 
        release_date,
        qualification,
        image
    })

    arrayGenders.forEach(async(el)=>{
        const [movie, boolCreate] = await Gender.findOrCreate({
            where: { name: el },
        })
        await newMovie.addGender(movie)
    })

    res.status(200).send("Pelicula creado!!!")
})

router.delete("/deleteMovie/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const deleteMovie = await MovieSerie.deletedestroy({
            where: {
                id: id
            }
        })

        res.status(200).send("Pelicula eliminado!!!")
    }catch(err){
        console.log(err)
    }
}) 

router.put("/updateMovie/:id", async(req, res)=>{
    try{
        const {id} = req.params;
        const {title, release_date, qualification, image, arrayGenders} = req.body;
        
        const updateMovie = await MovieSerie.update({
            title: title,
            release_date: release_date,
            qualification: qualification,
            image: image,
        },{
            where: {
                id: id
            }
        })

        arrayGenders.forEach(async(el)=>{
            const [cGender, boolCreate] = await Gender.findOrCreate({
                where: {
                    name: el
                }
            })
            await updateMovie.addGender(cGender)
        })

        res.status(200).send("Pelicula actualizada!!!")
    }catch(err){
        console.log(err)
    }
})

module.exports = router;