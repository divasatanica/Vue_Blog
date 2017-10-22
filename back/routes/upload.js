const express = require('express');
const router = express.Router();
const multi = require('multiparty');
const qiniu = require('qiniu');
const fs = require('fs');

/* GET users listing. */
/* router.post('/image/', (req, res) => {
  let form = new multi.Form();
  saveFiles(req);
  function saveFiles(req){
    let response = [];
    form.parse(req, (err, fields, files) => {
      let fileArr = files.file;
      if(!fileArr){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(response);
        return response;
      }
      for(let i = 0;i < fileArr.length;i ++) {
        let file = fileArr[i];
        console.log(file)
        let pathInfo = ((path) => {
          let oriPath = path.split('\\').join('/');
          let filename = path.split('\\').pop();
          let destPath = "./public/upload/img";
          return {
            "filename": filename,
            "destPath": destPath,
            "oriPath": oriPath
          };
        })(file.path);
        if(!fs.existsSync(pathInfo.destPath)){
          fs.mkdir(pathInfo.destPath, () => {
            console.log(`The Content ${pathInfo.destPath} Has Been Created!`);
          });
        }
        let destPath = `${pathInfo.destPath}/${pathInfo.filename}`;
        fs.writeFileSync(destPath, fs.readFileSync(pathInfo.oriPath));
        let url = `http://comacc.top/upload/img/${pathInfo.filename}`;
        response.push({
          "url": url,
          "originalName": file.originalFilename
        });
        fs.unlinkSync(pathInfo.oriPath);
      }
      res.header("Access-Control-Allow-Origin", "*");
      res.send(response); 
    });
  }
}); */

router.post('/qiniu', (req, res) => {
  const form = new multi.Form();
  const config = new qiniu.conf.Config();
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z2;
  config.useCdnDomain = true;
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  // multipart包解析form-data数据
  form.parse(req, (err, fields, files) => {
    if(err) { throw err;}
    let fileArr = files.file;
    const _promise = [];
    if(!fileArr) {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(JSON.stringify({message: 'No file specified'}));
      return;
    }
    // 生成七牛云上传token, 有效期为1小时
    const token = _genToken('gRg3qjpihTLupXOxG4NKwdacjguTiA4yRIF6DxGz', 'yMaUGpR1JZbBsSTFX64Ig4sMCGabz153YUIqBdxs');
    // 使用Promise.all应对多张图片同时上传的情况，上传完毕后一次性返回结果
    for(let i = 0, len = fileArr.length;i < len;i ++) {
      _promise.push((function() {
        return new Promise(function(resolve, reject) {
          formUploader.putFile(token, undefined, fileArr[i].path, putExtra, function(respErr,
            respBody, respInfo) {
            if (respErr) {
              throw respErr;
            }
            if (respInfo.statusCode == 200) {
              resolve(respBody);
            } else {
              reject(respBody);
            }
          });
        })
      })());
      // 上传完成后删除缓存中的源文件
      fs.unlink(fileArr[i].path, (err) => {
        if(err) { throw err;}
        console.log(`$THE FILE ${fileArr[i].path} HAS BEEN DELETED`);
      });
    }
    // 这里可以改成Promise.race以防止有某个请求失败时导致不返回任何结果
    Promise.race(_promise).then(function(result) {
      result.url = `http://cdn.comacc.top/${result.hash}`
      res.send(JSON.stringify({message: 'Success', files: result}));
    }).catch(function(e){ throw new Error(e);});
  });
  function _genToken(accessToken, secretToken) {
    const _bucket = 'coma'
    const mac = new qiniu.auth.digest.Mac(accessToken, secretToken);
    const options = {
      scope: _bucket,
      expire: 3600,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
  }
})

module.exports = router;