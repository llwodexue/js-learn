# git版本控制系统
- 1、git(版本控制系统)；到底什么是git，git又是做什么的呢
    + 记录历史版本信息
    + 方便团队之间协作开发

- 国内常用的版本控制系统
    + git：分布式管理系统
    + svn：集中式版本管理系统
    + 分布式和集中式的各自特点

- 2、git的安装：
    > git官网  https://git-scm.com/downloads
    > 安装成功后在桌面右键会出来两个git选项(打开git bash here,然后执行git --version)
    > GIT是linux创始人研发的工具，所以GIT中的操作大部分都是linux操作命令


- 3、git的工作原理(分为三个区)
    + 工作区：我们平时写代码的区域
    + 暂存区：用来临时存储代码
    + 历史区：生成历史版本

## git的使用
    - 1、git的全局配置(新车上牌)
        + git config --global --list：查看全局配置信息
        + git config --global user.name 'xxx'  
        + git config --global user.email 'xxx@xxx'

    - 2、创建本地仓库，完成版本控制
        + 1、创建本地仓库
            + git init(会默认生成一个.git文件夹，这里是存放你本地git仓库的信息的，不能删除)
            + shift + cmmand + .  mac电脑显示隐藏目录

        + 2、在工作区编写代码完成后，提交到暂存区
            + git add 文件名(把指定文件提交到暂存区)
            + git add A(把工作区所有修改的文件提交到暂存区)
            + git add . (把工作区所有修改的文件提交到暂存区)
            + git status(查看当前文件提交状态)【红色代表在工作区；绿色代表在暂存区；没有文件，并显示clear之类的单词，说明文件已经提交到历史区或者没有任何更改】
            clear:清屏
        + 3、把文件提交到历史区
            + git commit -m'描述' (把文件提交到历史区，并生成此次提交的历史版本)
            + git log(查看提交的历史版本信息)
            + git reflog(查看所有的历史版本信息)

        + 4、回滚指定历史版本的代码
            + git reset --hard 七位历史版本号


## 远程仓库的使用

    - 1、介绍远程仓库github
        + github是一个开源的代码分享平台；每一个github账户都可以把自己的代码分享到这个平台上，那他就是充当中央服务器的角色，把代码提交到这个平台上之后，你可以在任何一个有网络的地方去下载代码，当然了，谁有下载的权限是有你来配置的

    - 2、创建一个远程仓库(点击左上角绿色的按钮 New)
        + Repository name：新建仓库的名称
        + Description：新建仓库的描述
        + Public/Private:新建仓库是公开还是私密的
        + Initialize this repository with:为仓库增加初始化文件(暂时不选)
        + 绿色按钮 Create repository: 创建新的仓库

    - 3、把本地仓库的代码提交到远程仓库
        + 1、本地仓库和远程仓库建立连接
            + git remote -v(查看本地和远程仓库的连接状态)
            + git remote add origin 远程仓库地址(和远程仓库的某个新项目建立连接，origin这个名可以改，但是大家都统一叫这个)
        + 2、git pull origin master (拉取远程仓库的代码到本地)
        + 3、git push origin master (推送本地的代码到远程仓库)
        【要输入用户名和密码 username  password】

    - 4、git clone 远程仓库地址 仓库的名字(如果不写默认原仓库名)
        + 其真正的开发中，大家都使用这个
        + 你们的项目老大把项目骨架搭建好之后你们每一个项目小组成员都去把远程的代码拉取到你们的本地去开发
        + git clone(相当于git init  git remove add  git pull)





// 周一    百度网盘 版本1
// 周二    百度网盘 版本2
// 周三    

1.1.1  1.1.2  1.2.1  2.1.1 

asgdjsadhsgdhsdh  老王    小王

git  svn
