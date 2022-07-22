const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

module.exports = app => {
    app.get('/api/notes', (req, res) => {
        let data = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8')
        );
        res.json(data);
    });

    app.post('/api/notes', (req, res) => {
        const newNotes = req.body;

        newNotes.id = uuidv4();

        let data = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8')
        );
        data.push(newNotes);

        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(data)
        );
        res.json(data);
    });

    app.delete('/api/notes/:id', (req, res) => {
        let noteId = req.params.id;

        console.log('getting note ID');

        let data = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8')
        );
        const newData = data.filter(note => note.id !== noteId);

        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(newData)
        );

        console.log('deleted');

        res.json(newData);
    });
};
