const { execSync } = require('child_process');
const fs = require('fs');
const command = 'yt-dlp --flat-playlist --skip-download --print-json "https://www.youtube.com/@solso2866/playlists"';
const options = { encoding: 'utf8' };
const { exec } = require('child_process');
try {
    const output = execSync(command, options);
    const fileName = 'playlists.txt';
    require('fs').writeFileSync(fileName, output, { encoding: 'utf8' });

    console.log(`命令行输出已保存到文件：${fileName}`);


    // 从文件中读取内容
    const rawContent = fs.readFileSync(fileName, 'utf8');

    // 将文本分割成多个JSON对象
    const jsonObjects = rawContent.split(/\r?\n(?=\{)/);

    // 将JSON对象转换为JavaScript对象
    const playlists = jsonObjects.map(rawJsonObject => JSON.parse(rawJsonObject));

    for (const playlist of playlists) {
        console.log(playlist.url);
        const url = playlist.url;
        console.log(playlist.title);

        // yt-dlp --output './video/%(uploader)s/%(playlist)s/%(title)s.%(ext)s'  -f "bv*[ext=mp4][vcodec^=avc1]+ba[ext=m4a]/b[ext=mp4] / bv*+ba/b"  --write-thumbnail 
        //var cmd = `yt-dlp -f 'bestaudio[ext=mp3]' --extract-audio --audio-format mp3 --add-metadata --geo-bypass -o "%(uploader)s/%(title)s.%(ext)s" "${url}"`;
        //var cmd = `yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / bv*+ba/b" -o "./video/%(uploader)s/%(playlist)s/%(title)s.%(ext)s" "${url}"`
        //var cmd = `yt-dlp -o "./video/%(uploader)s/%(playlist)s/%(title)s.%(ext)s" "${url}"`
        var cmd = `yt-dlp --output ./video/%(uploader)s/%(playlist)s/%(playlist_index)s-%(title)s.%(ext)s  -f "bv*[ext=mp4][vcodec^=avc1]+ba[ext=m4a]/b[ext=mp4] / bv*+ba/b"  --write-thumbnail "${url}"`
        console.log("即将执行 ：" + cmd);
        // execSync(cmd, options);
        exec(cmd, function (error, stdout, stderr) {
            if (error) {
                console.log('error:' + error);
            }
            console.log('stdout:' + stdout);
        });

        //execSync(cmd, { stdio: 'inherit', encoding: 'utf8'});
        console.log("Success");
    }

} catch (error) {
    console.error(`执行命令时出错：${error.message}`);
}