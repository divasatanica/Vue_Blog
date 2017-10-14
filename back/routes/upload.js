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
    let fileArr = files.file[0];
    if(!fileArr) {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(JSON.stringify({message: 'No file specified'}));
      return;
    }
    // 生成七牛云上传token, 有效期为1小时
    const token = _genToken('gRg3qjpihTLupXOxG4NKwdacjguTiA4yRIF6DxGz', 'yMaUGpR1JZbBsSTFX64Ig4sMCGabz153YUIqBdxs');
    formUploader.putFile(token, undefined, fileArr.path, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
        fs.unlink(fileArr.path, (err) => {
          if(err) { throw err;}
          console.log(`$THE FILE ${fileArr.path} HAS BEEN DELETED`);
        });
        res.send(JSON.stringify(respBody));
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
        res.send(JSON.stringify(respBody));
      }
    });
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