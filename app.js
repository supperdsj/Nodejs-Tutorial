console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
const command = argv._[0];

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note was created');
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
} else if (command === 'list') {
    console.log(notes.getAll());
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if (note) {
        console.log('Note was found');
        notes.logNote(note);
    } else {
        console.log('Note title not found');
    }
} else if (command === 'remove') {
    let note = notes.removeNote(argv.title);
    if (note) {
        console.log('Note was removed');
        notes.logNote(note);
    } else {
        console.log('Note title not found');
    }
} else {
    console.log('Command no recognized');
}