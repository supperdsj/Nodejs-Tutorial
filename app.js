console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
const command = argv._[0];

if (command === 'add') {
    let note=notes.addNote(argv.title, argv.body);
    if(note){
        console.log('Adding created');
        console.log(`Title:${note.title}`);
    }else{
        console.log('Note title taken');
    }
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    notes.getNote(argv.title);
} else if (command === 'remove') {
    notes.removeNote(argv.title);
} else {
    console.log('Command no recognized');
}