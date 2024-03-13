const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
//const { isOffline } = require('./config');
const isOffline = process.env.IS_OFFLINE

const configureDynamoDBClient = () => {
  let client;

  if (isOffline) {
    client = new DynamoDBClient({
      region: 'localhost',
      endpoint: 'http://0.0.0.0:8000',
      credentials: {
        accessKeyId: 'MockAccessKeyId',
        secretAccessKey: 'MockSecretAccessKey'
      }
    });
  } else {
    // Configuración para el entorno en la nube (usando las credenciales y configuración reales)
    client = new DynamoDBClient({
      /* Configuración para el entorno en la nube */
    });
  }

  return DynamoDBDocumentClient.from(client);
};

module.exports = configureDynamoDBClient;
