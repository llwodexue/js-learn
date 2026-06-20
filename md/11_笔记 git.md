[toc]



# 11_笔记


## 常用版本控制系统


+ git：分布式版本控制系统
    1. 部分操作需要联网
    2. 代码传输是以文件流的方式传输，速度相对来说比较快
+ svn：集中版本管理系统 
    1. 所有操作必须联网
    2. 代码传输是以文件的方式传输，速度相对来说比较慢



## git 工作原理


+ 工作区：平时写代码的区域
+ 暂存区：临时存储代码
+ 历史区：生成历史版本



## Windows 打开 cmd 的方法


+ 找到文件夹路径，在文件资源位置输入 cmd，然后回车；打开dos窗口
+ win + R：快速打开dos窗口
+ 在桌面左下角搜索框中输入 cmd，然后回车，打开 dos 窗口



## git 使用


一般来说，日常使用只要记住以下 6 个命令



<!-- 这是一张图片，ocr 内容为： -->
![](https://gitee.com/lilyn/pic/raw/master/Basics/git%E5%91%BD%E4%BB%A4.png)



+ git 的全局配置

安装 Git 后，要做的第一件事就是设置你的用户名和邮件地址



```bash
# 查看全局配置信息
git config --global --list
git config --global user.name 'xxx'  
git config --global user.email 'xxx@xxx'
```



+ 查看状态



```bash
# 查看文件提交状态
    # 红色：工作区
    # 绿色：暂存区
    # nothing to commit, working tree clean:没有任何更改或文件已经提交到历史区
git status
# 查看所有历史版本信息
git reflog
# 查看历史版本信息 commit 后面是一串hash值
git log
# 显示成一行
git log --oneline
```



+ 创建本地仓库，完成版本控制



```bash
# 创建本地仓库
git init
# 把所有文件提交到暂存区
git add .
# 把文件提交到历史区
git commit -m "描述内容"
# 切换版本
git reset --hard "hash(前七位)"
```



## 命令行技巧


```bash
# ~/.bashrc
touch ~/.bashrc
# 每次进入 Git Bash，就会优先运行 ~/.bashrc 里面的命令
start ~/.bashrc

# alias
alias la='ls -a'
alias ll='ls -l'
alias ga.='git add .'
alias gs='git status'
alias gc='git commit -m'
alias gpl='git pull origin master'
alias gpu='git push origin master'

# 环境变量
export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass"
```



## 远程仓库使用


```bash
# 查看本地和远程仓库的连接状态
git remote -v
# 远程连接仓库地址
git remote add origin "git仓库地址"
# 拉取远程仓库代码到本地
git pull origin master
# 推送本地代码到远程仓库
git push origin master
# 克隆远程仓库
git clone "git仓库地址"（相当于 git init git remote add git pull）
```



### SSH密钥
目前 Git 服务器验证手段主要有两种：

+ 方式一：基于 HTTP 的凭证存储（Credential Storage）
+ 方式二：基于 SSH 的密钥

因为本身 HTTP 协议是无状态的连接，所以每一个连接都需要用户名和密码：

+ 如果每次都这样操作，那么会非常麻烦
+ 幸运的是，Git 拥有一个凭证系统来处理这个事情

Secure Shell（安全外壳协议，简称 SSH）是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境

SSH 以非对称加密实现身份验证

+ 例如其中一种方法是使用自动生成的公钥-私钥对来简单地加密网络连接，随后使用密码认证进行登录
+ 另一种方法是人工生成一对公钥和私钥，通过生成的密钥进行认证，这样就可以在不输入密码的情况下登录
+ 公钥需要放在待访问的电脑之中，而对应的私钥需要由用户自行保管

如果我们以 SSH 的方式访问Git仓库，那么就需要生产对应的公钥和私钥：

```bash
$ ssh-keygen -t ed25519 -C “your email"
$ ssh-keygen -t rsa -b 2048 -C “your email"
```

## 参考


[常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

