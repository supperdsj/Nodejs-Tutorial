const jwt=require('jsonwebtoken');

const data={
    id:18
};

const token=jwt.sign(data,'abc!123');
console.log(token);

const decodeData=jwt.verify(token,'abc!123');
console.log(decodeData);


const decodeDataE=jwt.verify(token,'abc!123123');
console.log(decodeDataE);