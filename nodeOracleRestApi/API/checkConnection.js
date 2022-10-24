const oracledb = require('oracledb');
// import oracledb from 'oracledb'
// hr schema password
var password = 'pereira2022'
// checkConnection asycn function
async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
      user: "EDIO.PEREIRA",
      password: password,
      connectString: "192.168.1.130:1521/Solustst"
    });
    console.log('connected to database');
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();