const files = require('../API/files.js');
const { Transform } = require('stream');
const { request } = require('http');

class FileValidator extends Transform {
    constructor(options) {
        super(options.streamOptions);

        this.maxFileSize = options.maxFileSize;
        this.totalBytesInBuffer = 0;
    }

    _transform(chunk, encoding, callback) {
        this.totalBytesInBuffer += chunk.length;

        if (this.totalBytesInBuffer >= this.maxFileSize) {
            const err = new Error(`The file size exceeded the limit of ${this.maxFileSize} bytes`);
            err.code = 'MAXFILESIZEEXCEEDED';
            callback(err);
            return;
        }

        this.push(chunk);

        callback(null);
    }

    _flush(done) {
        done();
    }
}

async function post(req, res, next) {
    try {
        const fileValidator = new FileValidator({
            maxFileSize: 1024 * 1024 * 50 //50MB
        });
        let contentType = req.headers['content-type'] || 'application/octet';
        let fileName = req.headers['x-file-name'];

        if (fileName === '') {
            res.status(400).json({ error: `The file name must be passed to the via x-file-name header` });
            return;
        }

        const contentStream = req.pipe(fileValidator);

        contentStream.on('error', err => {
            if (err.code === 'MAXFILESIZEEXCEEDED') {
                console.log('made it here');
                res.header('Connection', 'close');
                res.status(413).json({ error: err.message });

                require.connection.destroy();
            } else {
                next(err);
            }
        });

        try {
            const fileId = await files.create(fileName, contentType, contentStream);

            res.status(201).json({ fileId: fileId });
        } catch (err) {
            console.log(err);

            res.header('Connection', 'close');
            res.status(500).json({ error: 'Oops, something broke!' });

            req.connection.destroy();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;

async function get(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ error: `The id of the file must be provided` });
            return;
        }

        const rows = await files.get(id);

        if (rows.length === 1) {
            res.status(200);

            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': rows[0].content_type,
                'Content-Length': rows[0].file_length,
                'Content-Disposition': 'attachment; filename=' + rows[0].filename
            });

            rows[0].blob_data.pipe(res);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;