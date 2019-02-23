---
layout:     post
title:      “为你的局域网树莓派添加公网 IP 和 Teamviewer”
subtitle:   “可以在外面码代码了”
date:       2018-10-05
author:     “Soptq”
header-img: "img/post_ssh.jpg"
catalog:    true
tags:
    - ssh
    - raspberry
---


### 登陆你的树莓派并修改 SSH 密码


以前树莓派自己一个人在局域网中使用还好，如果要放入公网中，那么 SSH 密码就不能是默认的 `raspberry` 了，使用 `ssh pi@[IP]` 登陆树莓派的 `pi` 用户后，键入命令 `passwd` 修改当前用户密码。

```
pi@mossbian:~ $ passwd
为 pi 更改 STRESS 密码。
（当前）UNIX 密码：
输入新的 UNIX 密码：
重新输入新的 UNIX 密码：
passwd：已成功更新密码
```

### 使用 ngrok 建立树莓派的公网映射

如果自己的网络被分配了公网的 ip 的话可以直接在路由器中开启映射，但是不幸的是我的运营商并没有为我分配公网 ip，就算分配了，忘记了路由器密码的我也无法使用路由器配置。有人问我为什么不重置路由器设置回复密码，因为我的 ssr 服务器地址也忘记了，只有路由器中配置好的的那个。如果重置路由器，那我的 ssr 也就废了。。。

所以让我们切入正题，配置 ngrok

#### 下载 `ngrok`

```
$ wget -P [YOURPATH] https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm.zip
```

这是 `ngrok` 的[官网](https://ngrok.com)

选择 `ngrok` 的理由很简单，它足够简单，也足够强大。免费计划就已经足够我们个人用户的使用。

#### 配置 `ngrok`

先解压刚刚下载的压缩包

```
$ unzip /path/to/ngrok.zip
```

解压后在当前文件夹（不用进入 `ngrok` 文件夹）使用命令

```
$ ./ngrok authtoken [YOURTOKEN]
```

这个 `token` 可以在官方网站注册后得到

然后，如果你需要查看 `ngrok` 的帮助文件

```
$ ./ngrok help
```

如果不需要，就可以直接开始使用了

```
$ ./ngrok tcp 22
```
然后会出现如下页面

```
Session Status                online                                            
Account                       xxxxx (Plan: Free)                                
Version                       2.2.8                                             
Region                        United States (us)                                
Web Interface                 http://127.0.0.1:4040                             
Forwarding                    tcp://0.tcp.ngrok.io:16089 -> localhost:22        
                                                                                
Connections                   ttl     opn     rt1     rt5     p50     p90       
                              0       0       0.00    0.00    0.00    0.00      
```

我们需要关注的就是 `Forwarding` 这一行，后面的 `tcp://0.tcp.ngrok.io:16089` 就注明了你的公网 ssh ip 和端口。注意免费计划的话这个端口是每一次开始映射的时候都会变的。

#### 测试

随便找一台电脑，命令：

```
$ ssh pi@0.tcp.ngrok.io 16089
```
得到

```
Linux mossbian 4.14.34-v7+ #1110 SMP Mon Apr 16 15:18:51 BST 2018 armv7l

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
```

就成功了

### 在树莓派上安装 TeamView

去去 ssh 控制怎么能满足我们的欲望，TeamView 图形化操作肯定是要试一试的。

#### 下载 TeamView 并安装

进入 https://www.teamviewer.com/en/download/linux.aspx 下载 teamviewer_linux_x64.deb

```
$ wget https://download.teamviewer.com/download/linux/teamviewer-host_armhf.deb
$ sudo dpkg -i teamviewer-host_armhf.deb
```

>注意：
>
>树莓派的系统构架事 ·`armhf` ，意味着它的下载链接不在网页界面上。
>
>树莓派的 TeamViewer 下载链接为
>
>https://download.teamviewer.com/download/linux/teamviewer-host_armhf.deb
>

#### 解决依赖

1. 尝试 `sudo apt-get update`
2. 尝试 `$ sudo apt-get -f install`来安装所有依赖或者使用 `sudo apt-get -f upgrade` 在安装依赖的同时升级其他模组。

>Install gdebi (GDebi can install local .deb packages with automatic dependency resolution (it automatically downloads and installs the required packages).):

```
$ sudo apt-get install gdebi
```

#### 通过 `gdebi` 安装 TeamViewer

```
$ sudo gdebi teamviewer_linux_x64.deb
```

#### 完成

安装完成后可以通过桌面-系统菜单启动TeamViewer，进入TeamViewer并登陆你的TeamViewer账号，并将所使用的树莓派注册到TeamViewer。授权该树莓派允许访问TeamViewer设备，使能轻松访问功能。

在UI界面输入用户名密码即可。

#### 通过命令行启动 TeamViewer

```
#查看帮助信息
$ teamviewer help

#查看本机ID
$ teamviewer info

#设置本机密码
$ teamviewer passwd 1234567890
```




>参考文献
>
>https://blog.csdn.net/realDonaldTrump/article/details/79694196
>
>https://www.techrrival.com/install-teamviewer-raspberry-pi/
>
>https://www.jianshu.com/p/0fda5460adf4






