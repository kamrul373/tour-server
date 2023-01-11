// express server initialization
const express = require( "express" );
const app = express();
const port = process.env.PORT || 5000;
// cors
const cors = require( "cors" )
app.use( cors() )
// dotenv
require( "dotenv" ).config()
// data turn to json format
app.use( express.json() )




// base url api
app.get( "/", ( req, res ) => {
	res.send( "Agumentik tour server is running" );
} );
// listener
app.listen( port, () => {
	console.log( "Agumentik tour server is running at ", port );
} )