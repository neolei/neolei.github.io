---
layout: post
title: Ray tune：一个可扩展的超参数优化Python库
subtitle: "Tune是一个超参数优化库，可以用于PyTorch、TensorFlow， MXnet，keras等深度学习框架"
date: 2019-9-1
header-img: "img/tune.png"
catalog:    true
reproduce:  false
mathjax:    false
tags:
    - pytorch
    - Ray tune
    - 超参数优化
---

### *超参数优化*

在深度学习中， 除了可以学习参数外，还存在很多超参数，这些超参数对于网络的性能影响也十分巨大，不同的机器学习任务往往需要不
同的超参数，常见的超参数有：
- 网络结构，包括神经元的连接关系，层数，每层的神经元的数量、激活函数的类型
- 优化参数，包括优化方法，学习率，小批量的样本数量等
- 正则化系数

对于超参数的搜索，一般使用的方法：*人工搜索*，*网格搜索*，*随机搜索*，*贝叶斯优化*

#### 动态资源分配

由于目前深度学习的优化方法一般都采取随机梯度下降，因此我们可以通
过一组超参数的学习曲线来预估这组超参数配置是否有希望得到比较好的结
果。如果一组超参数配置的学习曲线不收敛或者收敛比较差，我们可以应用早
期停止（early-stopping）策略来中止当前的训练。


### *Tune的核心特征*

1. 多计算节点的分布式超参数的查找
2. 支持多种深度学习框架，例如：pytorch，TensorFlow
3. 结果直接可以用tensorboard可视化
4. 可拓展的SOTA算法，例如：PBT，HyperBand/ASHA
5. 整合了很多超参数优化库， 例如：Ax， HyperOpt，Bayesian Optimization


### *快速开始*

安装下列工具：
```shell script
pip install ray torch torchvison filelock
```

实例是使用网格搜索来训练一个CNN模型

```python
import torch.optim as optim
from ray import tune
from ray.tune.examples.mnist_pytorch import get_data_loaders, ConvNet, train, test


def train_mnist(config):
    train_loader, test_loader = get_data_loaders()
    model = ConvNet()
    optimizer = optim.SGD(model.parameters(), lr=config["lr"])
    for i in range(10):
        train(model, optimizer, train_loader)
        acc = test(model, test_loader)
        tune.track.log(mean_accuracy=acc) # 传入acc


analysis = tune.run(
    train_mnist, config={"lr": tune.grid_search([0.001, 0.01, 0.1])})

print("Best config: ", analysis.get_best_config(metric="mean_accuracy"))

# Get a dataframe for analyzing trial results.
df = analysis.dataframe()
```

使用Tensorboard可视化实验结果：
```shell script
tensorboard --logdir ray_results
```
![](https://ray.readthedocs.io/en/latest/_images/tune-start-tb.png)

