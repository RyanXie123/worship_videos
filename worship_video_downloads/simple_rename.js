const fs = require('fs');
const path = require('path');
const nodejieba = require('nodejieba');
const { toSimplified } = require('nodejieba');

// 定义要处理的文件夹路径
const folderPath = '/path/to/folder';

// 递归遍历文件夹
function traverseFolder(folderPath) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // 如果是子文件夹，则递归调用traverseFolder
      traverseFolder(filePath);
    } else {
      // 如果是文件，则读取文件内容并转换中文繁体为简体
      const content = fs.readFileSync(filePath, 'utf8');
      const simplifiedContent = toSimplified(content);

      // 将简体内容写回文件
      fs.writeFileSync(filePath, simplifiedContent, 'utf8');
    }
  });
}

// 开始遍历文件夹
traverseFolder(folderPath);