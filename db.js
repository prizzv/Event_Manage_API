//contains the connection to database

const { MongoClient, ObjectId } = require("mongodb");

//local host does not work now so use the below
const uri = "mongodb://0.0.0.0:27017/DeepThought";

const connection = new MongoClient(uri, (err, db) => {
    if(err) throw err;

    var dbo= db.db("DeepThought");
    dbo.collection("events").find().toArray(function(err, result){
        if(err) throw err;
        console.log(result);
        db.close();
    });
});


// block to  connect to DB and collection.
async function connectToDB () {
    try{
        await connection.connect()
        console.log("Connected to database");
        
        const myDb = connection.db("DeepThought");
        return myDb.collection("events");
        // const result = await coll.find().toArray();

        // console.log(result);
        
    }catch(e){
        console.error(e);
    }
};

module.exports.findEventById = async function(id) {
    try{
        eventsCollection = await connectToDB();
        return await eventsCollection.findOne({"_id": new ObjectId(id)});
        // result = await eventsCollection.findOne({"_id": new ObjectId(id)});
        
        // console.log(result);
        
    }catch(e){
        console.error(e);
    }finally{
        await connection.close();
    }
};

module.exports.insertEvent = async function(doc) {
    try{
        eventsCollection = await connectToDB();
        return await eventsCollection.insertOne(doc);
        
    }catch(e){
        console.error(e);
    }finally{
        await connection.close();
    }
}

// module.exports = {connection};