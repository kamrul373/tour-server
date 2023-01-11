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



const { MongoClient, ServerApiVersion, ObjectId } = require( 'mongodb' );
const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.lbqhd62.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } );

async function run () {
	const bannerCollection = client.db( "tour" ).collection( "banner" )

	app.post( "/updatebanner", async ( req, res ) => {
		const request = req.body;
		console.log( request )
		//const query = {_id : ObjectId(request.id)}
		const result = await bannerCollection.insertOne( request );
		res.send( result )
	} )
}

run().catch( error => console.log( error ) )


// base url api
app.get( "/", ( req, res ) => {
	res.send( "Agumentik tour server is running" );
} );
// listener
app.listen( port, () => {
	console.log( "Agumentik tour server is running at ", port );
} )