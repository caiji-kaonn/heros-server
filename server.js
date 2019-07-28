// 构建不用请求ajax的服务器
// 静态资源-请求ajax
// 把里面的资源弄成动态，就可以直接用服务器返回-使用art-template
// 引入http,fs,art-template
const http = require('http');
const fs = require('fs');
const template = require('art-template');
// 构建服务器
const server = http.createServer();
server.listen(8080, '172.20.10.2', () => {
    console.log('服务器已启用了，可通过 http://172.20.10.2:8080 访问')
})
server.on('request', (req, res) => {
    console.log('请求进来了，准备静态资源和动态资源');
    // 静态资源-此时只有一个文件夹
    if (req.url.startsWith('/assets')) {
        if (req.url.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        fs.readFile('.' + req.url, (err, data) => {
            if (err) console.log(err);
            res.end(data);
        })
    }
    // 动态资源---数据不用请求ajax，直接在这里请求
    else {
        if (req.url === '/views/index.html') {
            // 读取数据
            fs.readFile(__dirname + '/data/getAllheros.json', 'utf-8', (err, data) => {
                if (err) console.log(err);
                // 把数据转成数组
                let arr = JSON.parse(data);
                //    此时用第三方模板-渲染页面
                let html = template(__dirname + '/views/index.html', {
                    arr
                });
                res.end(html);

            })
        }
    }
})