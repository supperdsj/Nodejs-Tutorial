console.log('Starting note.js');
// module.exports.age = 27;
// module.exports.addNote = () => {
//   console.log('addNote');
//   return 'newNote';
// };
module.exports = {
    age: 27,
    addNote() {
        console.log('addNote');
        return 'newNote';
    },
    add(a, b) {
        return a + b;
    }
};