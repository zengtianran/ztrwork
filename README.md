# 基于VUE3项目测试

##### 导航首页

##### 生成目录tree
1. 全局安装
    - `npm install treer -g`
2. 常用命令 
    - `treer`    //查看目录树
    - `treer -d` <指定路径> //查看指定路径的目录树
    - `treer -e`     <导出路径> //导出当前目录的目录树到特定路径下文件
    - `treer -i "/^regex$/"`  //忽略目录或文件
3. 进入对应项目
    - `treer -e ./result.txt -i "/node_modules|.git|visitor|dist|public|server/"`