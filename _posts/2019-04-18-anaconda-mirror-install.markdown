---
layout: post
title: Anaconda 清华源关闭后，怎么办？
subtitle: "根据 Anaconda 软件源上的说明，Anaconda 和 Miniconda 是 Anaconda, Inc. 的商标，任何未经授权的公开镜像都是不允许的。因此清华镜像Tuna 关闭了Anaconda镜像服务"
date: 2019-04-18
header-img: "img/anaconda_tuna.jpg"
catalog:    true
reproduce:  true
tags:
    - pytorch
    - Anaconda
    - Python
---

> 根据 Anaconda 软件源上的说明，Anaconda 和 Miniconda 是 Anaconda, Inc. 的商标，任何未经授权的公开镜像都是不允许的。去年我们曾尝试与公司有关人员联系，但未能取得授权。
> 在没有上游授权的情况下，我们无法保证镜像的合法性与服务质量。因此我们决定，在取得授权之前无限期停止 Anaconda 镜像服务。即日起，我们将停止 Anaconda 的更新并隐藏镜像入口链接。一个月后，彻底关闭 Anaconda 镜像的文件下载。请现有用户尽快切换至官方下载地址，以免影响正常使用。
> 感谢您的理解与支持！

用过清华anaconda源的都知道，其速度要比官方源速度要快很多，但是清华anaconda源关闭了，怎么办？

### 下面推荐几个还能使用的anaconda国内源：

1. 中科大Anaconda 源：https://mirrors.ustc.edu.cn/anaconda/
2. 腾讯云Anaconda源：https://mirrors.cloud.tencent.com/anaconda/
3. 南京大学Anaconda源：http://mirrors.nju.edu.cn/anaconda/

### 配置命令：
例如, 添加USTC仓库镜像：

```Bash
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
```

Conda 附加库:

```Bash
# Conda Forge
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/

# msys2
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/msys2/

# bioconda
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda/

#menpo
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/menpo/

# pytorch
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/pytorch/
```