const users = [{
    id: 1,
    name: 'dongsj',
    schoolId: 101
}, {
    id: 2,
    name: 'wx',
    schoolId: 102
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 84
}, {
    id: 2,
    schoolId: 101,
    grade: 89
}, {
    id: 3,
    schoolId: 102,
    grade: 99
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        if (user) {
            resolve(user);
        } else {
            reject(`unable to find user with id of ${id}`);
        }
    })
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    })
};

const getStatus = (userId) => {
    let user = {};
    return getUser(userId).then((userTemp) => {
        user = userTemp;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return Object.assign(user, {average, grades});
    })
};

//async await

// ()=>{
//     return new Promise((resolve, reject) => {
//         reject('error');
//         resolve('dongsj');
//     });
// };
// const getStatusAlt=async (userId)=>{
//     throw new Error('error');
//     return 'dongsj';
// };

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return Object.assign(user, {average, grades});
};
// getUser(2).then(console.log).catch(console.log);
// getGrades(101).then(console.log);
// getStatus(1).then(console.log);
getStatusAlt(1).then(console.log).catch(console.error);