const fs = require('fs');
const _ = require('lodash');
console.log('Starting note.js');

const fetchNotes = () => {
    let notes = [];
    try {
        notes = JSON.parse(fs.readFileSync('notes-data.json'));
    }
    catch (e) {
    }
    return notes;
};
const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {title, body};
    let duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        return undefined;
    }
};
let getAll = () => {
    console.log('Getting all notes');
};
let getNote = (title) => {
    console.log('Getting note', title);
};
let removeNote = (title) => {
    console.log('Removing note', title);
};
module.exports = {addNote, getAll, getNote, removeNote};