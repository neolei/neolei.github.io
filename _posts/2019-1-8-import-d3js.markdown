---
layout:     post
title:      “Introducing D3.js”
subtitle:   “Welcome to finally be in my blog”
date:       2019-1-8
author:     “Soptq”
header-img: "img/post_importd3js.jpg"
catalog:    true
d3:         true
tags:
    - Blog
---
### 引入

写上一篇博文的时候提到过 [setosa.io](http://setosa.io/ev/image-kernels/) 这个网站，里面用图表表示了很多高深的原理。我其实对此很感兴趣，但却没有深究。后来有人给我推荐了 [d3.js](https://github.com/d3/d3) 这个插件，我仿佛发现了新大陆。原来网页的表格也可以这么好看。于是赶忙花了点时间为我的博客引入这个插件，然后就顺便水篇博文吧。

本来表格的数据需要写在代码中，但国外有个[大佬](http://d3.js.yaml.jekyll.apievangelist.com/bar-chart/)表示可以把表格数据写在 jekyll 的 _data 文件夹下来使代码更加优雅。我也是按照他的方法来做的。

现在唯一的不足就是因为每一个表格的风格是不一样的，也就是说我必须为每一个表格单独写 CSS 和 JS，而且为了偷懒我是准备直接写在 post 文件下的，所以感觉现在博文有点混乱。其实可以考虑怎么统一一个风格。

### Demo

#### 表格

<div id="bar-chart"></div>
<script src="/js/Posts/d3demo.js"></script>





