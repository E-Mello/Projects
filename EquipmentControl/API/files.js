const oracledb = require('oracledb');
const database = require('../services/database');

const createSql =
    `insert into jsao_files (
        file_name,
        content_type,
        blob_data
    ) values (
        :file_name,
        :content_type,
        empty_blob()
    ) returning
        id,
        blob_data
    into :id,
        :blob_data`;

async function create(fileName, contentType, contentStream){
    return new Promise(async (resolve, reject) => {
        let conn;

        try{
            conn = await oracledb.getConnection();

            let result = await conn.execute(
                createSql,
                {
                    file_name: fileName,
                    content_type: contentType,
                    id: {
                        type: oracledb.NUMBER,
                        dir: oracledb.BIND_INOUT,
                    },
                    blob_data: {
                        type: oracledb.BLOB,
                        dir: oracledb.BIND_OUT
                    }
                }
            );

            const lob = result.outBinds.blob_data[0];

            contentStream.pipe(lob);

            lob.on('error', async() => {
                try {
                    await conn.close();
                } catch (err) {
                    console.log(err);
                }

                reject(err);
            });

            lob.on('finish', async () => {
                try {
                    await conn.commit();
                    resolve(result.outBinds.id[0]);
                } catch (err) {
                    console.log(err);
                    reject(err);
                } finally {
                    try {
                        await conn.close();
                    } catch (err) {
                        console.error(err);
                    }
                }
            });            
        } catch (err) {
            reject(err);
        }
    });
}

module.exports.create = create;

const getSql = 
    `select file_name "file_name",
        dbms_lob.getlength(blob_data) "file_length",
        content_type "content_type",
        blob_data "blob_data"
    from jsao_files
    where id = :id`

async function get(id) {
    const binds = {
        id: id
    };

    let conn;

    try {
        conn = await oracledb.getConnection();

        const result = await conn.execute(statement, binds, {outFormat: oracledb.OBJECT});

        result.rows[0].blob_data.on('end', async () => {
            try {
                await conn.close();
            } catch (err) {
                console.log(err);
            }
        });

        return result.rows;
    } catch (err) {
        console.log(err);

        if(conn){
            try {
                await conn.close();
            } catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports.get = get;