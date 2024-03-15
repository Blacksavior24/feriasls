const EmprendeService = require("../services/emprende.service");


const getEmprendeById = async (req, res) =>{
    try {
        const {id} = req.params;

        const emprende = await EmprendeService.getEmprendeById(id);
        res.json(emprende)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getEmprendes = async (req, res)=>{
    try {
        const emprendimientos = await EmprendeService.getEmprendes();
        res.json(emprendimientos)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const createEmprende = async (req, res) =>{
    try {
        const {name, urlWeb, direccion, etiquetas, telefonos, imageUrl, latitud, longitud, email, description, verificado, activado, razonsolicitud} = req.body;

        const newEmprende = await EmprendeService.createEmprende(name, urlWeb, direccion, etiquetas, telefonos, imageUrl, latitud, longitud, email, description, verificado, activado,razonsolicitud)

        res.json(newEmprende)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {getEmprendeById, createEmprende, getEmprendes}