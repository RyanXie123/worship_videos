const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
// function moveJpgFilesToParent(dir) {
//   fs.readdirSync(dir).forEach(file => {
//     const filePath = path.join(dir, file);
//     const stats = fs.statSync(filePath);

//     if (stats.isDirectory()) {
//       moveJpgFilesToParent(filePath);
//     } else if (file.endsWith('.jpg')) {
//       const newPath = path.join(dir, '..', file);
//       fs.renameSync(filePath, newPath);
//     }
//   });
// }

//const folderPath = 'F:\\worship_videos\video\赞美之泉发行专辑';
//moveJpgFilesToParent(folderPath);
function convertWebpToJpg(webpPath, jpgPath) {
  sharp(webpPath)
    .metadata()
    .then(metadata => {
      const { width } = metadata;
      let resizeWidth = width;

      if (width >= 720) {
        resizeWidth = 600;
      }

      return sharp(webpPath)
        .resize(resizeWidth, null)
        .toFormat('jpeg')
        .toFile(jpgPath);
    })
    .then(info => {
      // console.log('转换完成', info);
    })
    .catch(err => {
      
      console.error('转换失败', err);
      console.log(webpPath);
    });
}
function copyJpgFilesToAnotherFolder(dir,destDir)
{
  var files = fs.readdirSync(dir);
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    console.log("filePath:"+filePath)
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      // for (let i = 0; i < files.length; i++) {
      //   const jpgFile = files[i];
      //   if (jpgFile.endsWith('.jpg') && jpgFile.includes(file)) {
      //     //00-赞美之泉敬拜赞美专辑(04) 彩虹下的约定 The Covenant Under the Rainbow
      //     //用正则去除 00- 0- 
      //     const newJpgFile = jpgFile.replace(/^(00-|0-)/, '');
      //     const newPath = path.join(destDir, newJpgFile);
      //     fs.copyFileSync(filePath, newPath);
      //   }
      // }
      console.log('文件夹：' + filePath);
      copyJpgFilesToAnotherFolder(filePath,destDir);
    } else if (file.endsWith('.webp')) {
      const newFile = file.replace('.webp', '.jpg');
      const newPath = path.join(destDir, newFile);
      try {
        //判断文件大小大于 1KB
        if (fs.statSync(filePath).size > 1024) {
          convertWebpToJpg(filePath, newPath);
        }
      } catch (err) {
        console.error('处理文件时出错:', filePath, err);
      }
      
    } else if (file.endsWith('.jpg') && (file.startsWith('00-') || file.startsWith('0-') || file.startsWith('000-'))) {
      const newFile = file.replace(/^(000-|00-|0-)/, '');
      const newPath = path.join(destDir, newFile);
      fs.copyFileSync(filePath, newPath);
    } else if(file.endsWith('.jpg')){
      const newPath = path.join(destDir, file);
      fs.copyFileSync(filePath, newPath);
    }
  });
}

copyJpgFilesToAnotherFolder('video/Roni Songbook','../public/pic');