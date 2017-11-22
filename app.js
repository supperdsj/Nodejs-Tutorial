console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions,
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
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