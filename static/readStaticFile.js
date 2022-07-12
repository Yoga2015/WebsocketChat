const path = require('path');
const mime = require('mime');
const fs = require('fs');


function myReadFile(file){
    return new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            if(err){
                reject('你访问的是一个文件夹，且文件夹里没有 index.html');  //返回给data
            }else{
                resolve(data);
            }
        })
    }).catch(function(err){
        console.log(err)
    })
}

async function readStaticFile(filePathName){
    let ext = path.parse(filePathName).ext;  //解析"请求过来的路径"文件路径，并获取扩展名
    let mimeType = mime.getType(ext) || 'text/html'; //获取拿到 text/html，mime的一个数据类型
    let data;  //存储往前端返回数据的

    //判断 请求过来的路径下，是否有对应的 文件 或者 文件夹 , fs.existSync(path) 如果路径存在则返回true,否则返回false
    if(fs.existsSync(filePathName)){
        if(ext){
            data  = await myReadFile(filePathName);
        }else{
            data = await myReadFile(path.join(filePathName),'/index.html')
        }

    }else{
        data = ("file or folder not found");
    }

    return{
        data,
        mimeType
    };
}

module.exports = readStaticFile;  //因为是模块，所以需要暴露出去。
