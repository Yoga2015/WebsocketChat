const http = require('http');
const path = require('path');
const readStaticFile =require('./readStaticFile.js');

//异步函数里是应该有等待异步的
http.createServer(async(req,res)=>{

    //1、首先我们需要拿到请求过来的 url 地址 字符串，然后根据 这个字符串 去读取本地目录下的某个资源  
    let urlString = req.url;
    //2、根据 url 拼接合并成完整的路径,然后直接就递到我们下一个方法 readStaticFile()
    let filePathName = path.join(__dirname,'./public',urlString); 
    
    let {data,mimeType} = await readStaticFile(filePathName,res);  
    //它的目标时返回一个文件读取的流，读取完文件后，把流返给服务器，通过res.write()写到页面上去
    
    console.log(`${mimeType};charset=utf-8`);
    
    //往前端返回数据的同时，给了它头部一个mime类型
    res.writeHead(200,{
        'content-type':`${mimeType};charset=utf-8`
    });
    res.write(data);
    res.end();
    

}).listen(8080,()=>{
    console.log("localhost:8080 服务器启动了 ")
})