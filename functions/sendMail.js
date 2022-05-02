const MailazyClient = require('mailazy-node');
const client = new MailazyClient({ accessKey: 'c9fruopopc08t8plo5v0pPoYfJiLNo', accessSecret: 'ByDrNpsiwfOgqybJiPDhlQFsgra.PucPkmcnUA62TrEZsYAby4' });


const validate = require('jsonschema').validate

const schema = {
                
                    "properties": {
                        "email": {
                            "anyOf": [ 
                                { 
                                    "type": "string",
                                    "maxLength" : 0
                                }, 
                                { 
                        
                                    "type": "string",
                                    "format": "email"
                                }       
                            ]
                        },
                        "subject": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 100
                        },
                        "message": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 500
                        }
                    },
                    "required": [ "subject", "message" ]
                }

const supportedMethods = ['GET']

exports.handler = async (event) => {




    const validationResult = validate(event.queryStringParameters, schema)
    if ( validationResult.errors.length > 0 ) {

        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Schema validation error"}),
          }

    }

    if( ! supportedMethods.includes(event.httpMethod) ) {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method not allowed"}),
          }

    }

    if (event.httpMethod === 'GET') {

        let resp  = {}

        try {

            response = await client.send({
                to: 'xyzapip@gmail.com', // required
                from: 'support@adlichhammer.de', // Use domain you verified, required
                subject: event.queryStringParameters.subject , // required
                text:  `${event.queryStringParameters.email} sent the following message: \n ${event.queryStringParameters.message}`,
                html: '',
            });

            if ( 'error' in JSON.parse(response) ) {
                return {
                statusCode: 500,
                body: JSON.stringify({ message: JSON.stringify(response.error)}),
                }
            }
        
        } catch (e) {
            console.log("error: " + e);
            
            return {
                statusCode: 500,
                body: JSON.stringify({ message:  JSON.stringify(e)}),
                }
        } 


        return {
            statusCode: 202,
            body: JSON.stringify({ message: JSON.parse(response).message }),
            }

    }
        
    return {
        statusCode: 500,
        body: JSON.stringify({ message: "something went wrong"}),
      }



}