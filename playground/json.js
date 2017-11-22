const fs =require('fs');
let originalNote = {
    title:'hey',
    body:'ha'
};
fs.writeFileSync('notes.json',JSON.stringify(originalNote));
let noteString=fs.readFileSync('notes.json');
console.log(noteString);
console.log(typeof noteString);
console.log(JSON.parse(noteString));