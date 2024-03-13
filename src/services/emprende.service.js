const EmprendeRepository = require("../repository/emprende.repository")
const Boom = require('@hapi/boom');

class EmprendeService{
    static async getEmprendeById(emprendeId){
        try {
            const emprende = await EmprendeRepository.getEmprendeById(emprendeId);
            if (emprende) {
                return {emprende}
            } else {
                throw Boom.notFound('Emprendimiento no encontrado');
            }
        } catch (error) {
            throw error;
        }
    }

    static async createEmprende(
        name,
        urlWeb, 
        direccion, 
        etiquetas, 
        telefonos, 
        imageUrl, 
        latitud, 
        longitud, 
        email, 
        description
    ){
        try {  

            return await EmprendeRepository.createEmprendes(
                name,
                urlWeb,
                direccion,
                etiquetas,
                telefonos,
                imageUrl,
                latitud,
                longitud,
                email,
                description
            )
        } catch (error) {
            throw error;
        }

    }
}

module.exports = EmprendeService