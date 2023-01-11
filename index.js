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
// mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require( 'mongodb' );
const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.lbqhd62.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 } );

async function run () {
	const bannerCollection = client.db( "tour" ).collection( "banner" )
	const socialCollection = client.db( "tour" ).collection( "social" )
	const subscriberCollection = client.db( "tour" ).collection( "subscriber" )
	// home banner
	app.post( "/updatebanner", async ( req, res ) => {
		const request = req.body;
		//console.log( request )
		const udpateStatus = await bannerCollection.updateMany( { 'status': true }, { "$set": { 'status': false } } )
		const result = await bannerCollection.insertOne( request );
		res.send( result )
	} )
	app.get( "/banner", async ( req, res ) => {
		const query = { status: true }
		const result = await bannerCollection.findOne( query )
		res.send( result )
	} )
	// social 
	app.get( "/social", async ( req, res ) => {
		const id = "63bf1137037754a56bd0e41f";
		const query = { _id: ObjectId( id ) }
		const result = await socialCollection.findOne( query );
		res.send( result )
	} )
	app.patch( "/social", async ( req, res ) => {
		const updatedoc = {
			$set: req.body
		}
		const id = "63bf1137037754a56bd0e41f";
		const filter = { _id: ObjectId( id ) }
		const result = await socialCollection.updateOne( filter, updatedoc )

		res.send( result )
	} )
	// subscriber
	app.get( "/subscriber", async ( req, res ) => {
		const query = {};
		const result = await subscriberCollection.find( query ).toArray()
		res.send( result )
	} )
	app.post( "/subscriber", async ( req, res ) => {
		const query = req.body;
		//console.log( query )
		const result = await subscriberCollection.insertOne( query )
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