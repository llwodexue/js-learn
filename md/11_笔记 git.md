[toc]

# 11\_笔记

## 常用版本控制系统

- git：分布管理系统
  1. 部分操作需要联网
  2. 代码传输是以文件流的方式传输，速度相对来说比较快
- svn：集中版本管理系统
  1. 所有操作必须联网
  2. 代码传输是以文件的方式传输，速度相对来说比较慢

## git 工作原理 

- 工作区：平时写代码的区域
- 暂存区：临时存储代码
- 历史区：生成历史版本

## Windows 打开 cmd 的方法

- 找到文件夹路径，在文件资源位置输入 cmd，然后回车；打开dos窗口
- win + R：快速打开dos窗口
- 在桌面左下角搜索框中输入 cmd，然后回车，打开 dos 窗口

## git 使用

一般来说，日常使用只要记住以下 6 个命令

![Git](https://gitee.com/lilyn/pic/raw/master/Basics/git%E5%91%BD%E4%BB%A4.png)

- git 的全局配置

```bash
# 查看全局配置信息
git config --global --list
git config --global user.name 'xxx'  
git config --global user.email 'xxx@xxx'
```

- 查看状态

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

- 创建本地仓库，完成版本控制

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
touch ~/.bashr
# 每次进入 Git Bash，就会优先运行 ~/.bashrc 里面的命令
start ~/.bashrc

# alias
alias la='ls -a'
alias ll='ls -l'
alias ga.='git add .'
alias gs='git status'
alias gc='git commit -m'
alias gpl='git push origin master'
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

## 参考

[常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)