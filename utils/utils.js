module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, cb) => {
    setTimeout(() => cb(module.exports.add(a, b)), 1000);
};

module.exports.square = (x) => x * x;

module.exports.setName = (user, fullName) => Object.assign(user, {
    firstName: fullName.split(' ')[0],
    lastName: fullName.split(' ')[1]
});