var os = require('os');

console.log(os.platform());
console.log("freemen ",os.freemem()+ "bytes")
console.log("arch ",os.arch()+ "bit")
console.log(os.cpus().length+ "core")
console.log(os.hostname())