console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
console.log('yargs:'+JSON.stringify(argv));

let command = argv._[0];
// console.log(process.argv);
// console.log(`Command:${command}`);

if (command === 'add') {
    console.log('Adding new note');
    notes.addNote(argv.title,argv.body);
} else if (command === 'list') {
    console.log('Listing all notes');
} else if (command === 'read') {
    console.log('Reading notes');
} else if (command === 'remove') {
    console.log('Removing notes');
} else {
    console.log('Command no recognized');
}