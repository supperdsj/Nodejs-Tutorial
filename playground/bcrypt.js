const bcrypt=require('bcryptjs');

const password='123abc';

bcrypt.genSalt(10,(err,salt)=>{
   bcrypt.hash(password,salt,(err,hash)=>{
       console.log('hash',hash);
   })
});

let hashPassword='$2a$10$FbyxEReDAc/3lyozuu5/NeIOqE0kdH9sfchYkJsgffUe8xS/tSBG.';

bcrypt.compare(password,hashPassword,(err,res)=>{
    console.log('compare',res);
});