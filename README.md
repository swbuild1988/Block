1.首先安装electron和electron-packager
npm install -g electron
npm install -g electron-packager

2.因为angular项目已经建好了，所以package.json已经建好了，我们只需要建main.js

3.package.json中添加属性 
    "main": "main.js",
并在script属性中添加
        "electron": "ng build && electron .",
        "electron-aot": "ng build -prod && electron ."

4.main.js是程序的主进口，修改win.loadURL中的index.html地址

5.打包命令 electron-packager . Block --win --out ../BlockApp --arch=x64 --app-version=0.0.1 --electron-version=3.0.4
大概是    electron-packager <应用目录> <应用名称> <打包平台> --out <输出目录> <架构> <应用版本> <electron版本>