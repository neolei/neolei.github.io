---
layout:     post
title:      “Hello World”
subtitle:   “Remember, remember, the 4th of Feb.”
date:       2018-02-04 00:00:00
author:     “Soptq”
header-img: "img/post-bg-2018-hello-world.jpg"
catalog:    true
tags:
    - Blog
    - Remembered Day
---


## 纪念今天
很久以前就很想做一个自己的博客网站，但是当时不会CSS、Javascript，更没有钱去做服务器。最近才刚刚了解到Github有Github Page服务可以帮助托管个人网页，十分兴奋但又没有设计网页经验。所以十分惭愧，我直接去fork了别人的blog[^1]来做我的。
现在终于建设好了我的“第一个个人博客”，还是记一下过程吧。

### 新建个人页面库
新建库，库名为 ‘**你的Github用户名.github.io**’

然后克隆你的库到本地。因为我用的框架是Jekyll，系统是OS X,所以我的讲解也主要围绕着它们。

OS X本身自带一个版本的ruby,但是太老旧了，所以我们首先更新ruby版本。

```ruby
rvm install 2.5.0
```

然后安装Jekyll，安装完后再本地创建一个博客本地地址。


```ruby
gem install jekyll
jekyll new myblog
cd meblog
```

然后在各种网站上寻找你觉得好看的Jekull模板，下载到本地后，解压后将整个文件内容全部复制到myblog文件夹，在终端中输入

```ruby
jekyll serve
```

开启服务

---

过程中很有可能遇见服务不能开启的情况，仔细阅读错误提示，一般是缺少某个组件，比如缺少bundle的话会提示

```ruby
require': cannot load such file -- bundler (LoadError)
```
这时在终端中输入


```ruby
gem install bundler
```

就可以解决问题

---
服务开其成功后会提示

```ruby
# => Now browse to http://localhost:4000
```

这时打开游览器进入地址 `http://localhost:4000` 就可预览网页了。

很多模板都会提供定制功能，使用文本编辑器打开 `_config.yml` 文件可以进行一定程度的定制，但是大幅度的动画或页面调整是需要学习css和javascript的，这里就不讨论了。

### 最后

将做好的网页复制进你克隆到本地的项目地址的文件中上传Github[^2]，等几分钟就可以在万维网上进入了。


[^1]: fork 的是基于 startbootstrap 二次开发的 Huxpro 主题，现在的我相当于在三次开发。还有就是一开始我是用 `Sublime text 3` 来进行网站的开发的，这是我开发这个网站以来犯下的最大的错误。强烈建议使用 IDEA 的 `WebStorm` 开发博客网页，你可以看这个博客的 commit 记录，从有一天开始就开始疯狂 commit 的那一天就是我开始用 `WebStorm` 的那一天，真的好用死我了。可以说 `WebStorm` 促使了这个博客的三次开发的成功。

[^2]: 上传的文件不需要包括 Jekyll 生成的 `_site` 文件夹，可以节省一点空间。
