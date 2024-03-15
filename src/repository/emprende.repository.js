const { GetCommand, PutCommand, ScanCommand, UpdateCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb") 
const {v4: uuidv4} = require('uuid')
const configureDynamoDBClient = require("../db");

const dynamodbDbClient = configureDynamoDBClient();
const EMPRENDE_FERIA_TABLE = process.env.EMPRENDE_FERIA_TABLE

class EmprendeRepository{
    static async getEmprendeById(emprendeId){
        const params = {
            TableName: EMPRENDE_FERIA_TABLE,
            Key:{
                emprendeId: emprendeId
            }
        };

        try {
            const {Item} = await dynamodbDbClient.send(new GetCommand(params))
            return Item;
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo traer el emprendimiento')
        }
    }

    static async getAllEmprende(){
        const params = {
            TableName: EMPRENDE_FERIA_TABLE
        };

        try {
            const { Items } = await dynamodbDbClient.send(new ScanCommand(params));
            return Items;
          } catch (error) {
            console.error(error);
            throw new Error("Could not retrieve all startups");
          }
    }

    static async createEmprendes(name, urlWeb, direccion, etiquetas, telefonos, imageUrl, latitud, longitud, email, description, verificado, activado,razonsolicitud ){
        const emprendeId = uuidv4();
        
        const params = {
            TableName: EMPRENDE_FERIA_TABLE,
            Item: {
                emprendeId: emprendeId,
                name: name,
                urlWeb: urlWeb,
                direccion: direccion,
                etiquetas: etiquetas,
                telefonos: telefonos,
                imageUrl: imageUrl,
                email: email,
                description: description,
                latitud: latitud,
                longitud: longitud,
                active: true,
                verificado: verificado?verificado:false, 
                activado: activado?activado:false,
                razonsolicitud: razonsolicitud,
                createDate: Date(),
                updateDate: null,
                deleteDate: null
            }
        }

        try {
            await dynamodbDbClient.send(new PutCommand(params))
            return {
                emprendeId,
                name,
                urlWeb,
                direccion,
                etiquetas,
                telefonos,
                imageUrl,
                email,
                description,
                latitud,
                longitud,
                verificado, activado, razonsolicitud
            }
        } catch (error) {
            console.error(error)
            throw new Error("No se pudo crear el emprendimiento")
        }
    }

}

module.exports = EmprendeRepository;