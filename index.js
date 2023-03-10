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
	const bannerContent = client.db( "tour" ).collection( "bannerContent" )
	const bannerSlidesCollection = client.db( "tour" ).collection( "bannerslides" )

	const socialCollection = client.db( "tour" ).collection( "social" )
	const subscriberCollection = client.db( "tour" ).collection( "subscriber" )
	const exploreSlideCollection = client.db( "tour" ).collection( "exploreSlide" )
	const exploreContentCollection = client.db( "tour" ).collection( "exploreContent" )
	const siteSettingCollection = client.db( "tour" ).collection( "setting" )

	// home banner
	app.post( "/updatebanner", async ( req, res ) => {
		const request = req.body;
		//console.log( request )
		const udpateStatus = await bannerCollection.updateMany( { 'status': true }, { "$set": { 'status': false } } )
		const result = await bannerCollection.insertOne( request );
		res.send( result )
	} )
	app.get( "/banner", async ( req, res ) => {
		const query = {}
		const result = await bannerContent.findOne( query )
		res.send( result )
	} )
	app.patch( "/banner", async ( req, res ) => {
		const updatedoc = {
			$set: req.body
		}
		const id = "63bf4e4c1e0f93ca8444f14f";
		const filter = { _id: ObjectId( id ) }
		const result = await bannerContent.updateOne( filter, updatedoc )

		res.send( result )
	} )

	// banner slide 
	app.get( "/bannerslide", async ( req, res ) => {
		const query = {}
		const result = await bannerSlidesCollection.find( query ).toArray()
		res.send( result )
	} )
	app.post( "/bannerslide", async ( req, res ) => {
		const query = req.body;
		const result = await bannerSlidesCollection.insertOne( query )
		res.send( result )
	} )
	app.delete( "/bannerslide/", async ( req, res ) => {
		const id = req.body.id;
		const query = { _id: ObjectId( id ) }
		const result = await bannerSlidesCollection.deleteOne( query )
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
	// explore slide 
	app.get( "/explore", async ( req, res ) => {
		const query = {}
		const result = await exploreSlideCollection.find( query ).toArray()
		res.send( result )
	} )
	app.post( "/explore", async ( req, res ) => {
		const query = req.body;
		const result = await exploreSlideCollection.insertOne( query )
		res.send( result )
	} )
	app.delete( "/explore/", async ( req, res ) => {
		const id = req.body.id;
		const query = { _id: ObjectId( id ) }
		const result = await exploreSlideCollection.deleteOne( query )
		res.send( result )
	} )
	app.get( "/explorecontent", async ( req, res ) => {
		const query = {}
		const result = await exploreContentCollection.find( query ).toArray()
		res.send( result )
	} )
	app.patch( "/explorecontent", async ( req, res ) => {
		const id = "63bf41bb454e0e6fab840fcf";
		const filter = { _id: ObjectId( id ) }
		const updatedoc = {
			$set: req.body
		}

		const result = await exploreContentCollection.updateOne( filter, updatedoc )
		res.send( result )
	} )
	// site config
	app.patch( "/config", async ( req, res ) => {
		const id = "63bf6152d8401f10d1441c31";
		const filter = { _id: ObjectId( id ) }
		const updatedoc = {
			$set: req.body
		}
		const result = await siteSettingCollection.updateOne( filter, updatedoc )
		res.send( result )
	} )
	app.get( "/config", async ( req, res ) => {
		const query = {}
		const result = await siteSettingCollection.findOne( query )
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