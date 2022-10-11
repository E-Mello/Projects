// myscript.js
// This example uses Node 8's async/await syntax.

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = SOLUS_TESTE  // set mypw to the hr schema password

async function run() {

    let connection;

    try {
        connection = await oracledb.getConnection({
            user: "hr",
            password: mypw,
            connectString: "localhost/XEPDB1"
        });

        const result = await connection.execute(
            `SELECT manager_id, department_id, department_name
       FROM departments
       WHERE manager_id = :id`,
            [103],  // bind value for :id
        );
        console.log(result.rows);

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

run();