const fs = require('fs');

function fetchNotes() {
    try {
        const noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch (error) {
        return [];
    }
}

function saveNotes(notes) {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

function addNote(title, body) {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };

    let duplicateNotes = notes.filter((note) =>  note.title === title)
    
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

function getAll() {
    return fetchNotes();
}

function removeNote(title) {
    let notes = fetchNotes();
    const filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}

function getNote(title) {
    let notes = fetchNotes();
    const filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
}

function logNote(note) {
    console.log('---------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}
module.exports = {
    addNote,
    getAll,
    removeNote, 
    getNote, 
    logNote
}