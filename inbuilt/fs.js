var fs = require('fs');

//write file
fs.writeFile('mytext.xls','Developer Funnel',function(err){
    if(err) throw err;
    console.log("File Created")
})

/*
fs.appendFile('mytext1.txt','Developer Funnel1 \n',function(err){
    if(err) throw err;
    console.log("Data Added")
})*/

//Read File
/*
fs.readFile('mytext1.txt','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})*/

//rename
/*fs.rename('mytext.txt','mytext2.txt',function(err){
    if(err) throw err;
    console.log('file rename')
})*/

/*
fs.unlink('mytext1.txt',function(err){
    if(err) throw err;
    console.log("File Deleted")
})*/