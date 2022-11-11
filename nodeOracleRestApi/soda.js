// mysoda.js
// This example uses Node 8's async/await syntax.

const oracledb = require('oracledb');

const mypw = 'pereira2022'  // set mypw to the hr schema password

oracledb.autoCommit = true;

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : "EDIO.PEREIRA",
      password      : mypw,
      connectString : "192.168.1.130:1521/Solustst"
    });

    // Create a new (or open an existing) document collection
    const soda = connection.getSodaDatabase();
    const collectionName = 'nodb_soda_collection';
    const myCollection = await soda.createCollection(collectionName);

    // Insert a new document
    const myContent = { name: "Sally", address: {city: "Melbourne"} };
    await myCollection.insertOne(myContent);

    // Print names of people living in Melbourne
    const filterSpec = { "address.city": "Melbourne" };
    const myDocuments = await myCollection.find().filter(filterSpec).getDocuments();
    myDocuments.forEach(function(element) {
      const content = element.getContent();
      console.log(content.name + ' lives in Melbourne.');
    });
  } catch(err) {
    console.log('Error in processing:\n', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log('Error in closing connection:\n', err);
      }
    }
  }
}

run();