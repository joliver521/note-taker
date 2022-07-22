const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// function for api requests
module.exports = app => {
    // API GET Requests
    app.get('/api/notes', (req, res) => {
        let data = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8')
        );
        res.json(data);
    });

    // API POST Requests
    app.post('/api/notes', (req, res) => {
        const newNotes = req.body;

        newNotes.id = uuidv4();

        // read the db.json file
        let data = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8')
        );
        data.push(newNotes);

        // write the new data to the db.json file
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(data)
        );
        res.json(data);
    });

    // API DELETE Requests
    app.delete('/api/notes/:id', (req, res) => {
        // find the index of the note to be deleted
        let noteId = req.params.id;

        console.log('getting note ID');

        // read the db.json file and parse it into an array
        let data = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8')
        );
        const newData = data.filter(note => note.id !== noteId);

        // write the new data to the db.json file
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(newData)
        );

        console.log('deleted');

        res.json(newData);
    });
};
