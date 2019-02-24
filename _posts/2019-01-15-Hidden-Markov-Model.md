---
layout: post
title:  隐马尔科夫模型(1)
subtitle: "隐马尔科夫模型原理"
author: Neolei
date: 2019-01-15
mathjax:    true
catalog:    true
tags:
    - HMM
    - ML
---
### 隐马尔科夫模型的基本概念

隐马尔可夫模型（Hidden Markov Model；缩写：HMM）或称作隐性马尔可夫模型，是统计模型，它用来描述一个含有隐含未知参数的马尔可夫过程。其难点是从可观察的参数中确定该过程的隐含参数。然后利用这些参数来作进一步的分析，例如模式识别。

在正常的马尔可夫模型中，状态对于观察者来说是直接可见的。这样状态的转换概率便是全部的参数。而在隐马尔可夫模型中，状态并不是直接可见的，但受状态影响的某些变量则是可见的。每一个状态在可能输出的符号上都有一概率分布。因此输出符号的序列能够透露出状态序列的一些信息。

下边的图示强调了HMM的状态变迁。有时，明确的表示出模型的演化也是有用的,我们用$ x(t_1) $ 与$ x(t_2) $来表达不同时刻t1和t2的状态。

![](/img/hmm_2.png)

图中箭头方向则表示不同信息间的关系性，因此可以得知 $x(t)$和 $x(t_1)$有关，而 $x(t-1)$又和 $x(t-2)$有关。

而每个 $ y(t) $只和 $x(t)$有关，其中 $x(t)$我们称为隐藏变量（hidden variable），是观察者无法得知的变量。

隐性马尔可夫模型常被用来解决有未知条件的数学问题。

假设隐藏状态的值对应到的空间有 $N$个元素，也就是说在时间$t$时，隐藏状态会有 $N$种可能。

同样的， $$ t+1 $$也会有 $$ N $$ 种可能的值，所以从 $t$ 到 $t+1$间的关系会有 $N^2$种可能。

除了$x(t)$间的关系外，每组 $x(t)$，$y(t)$间也有对应的关系。

若观察到的 $y(t)$有 $M$种可能的值，则从 $x(t)$到 $y(t)$的输出模型复杂度为$O(NM)$。如果 $y(t)$是一个 $M$ 维的向量，则从 $x(t)$到 $y(t)$ 的输出模型复杂度为$O(NM^2)$。

在这个图中,每一个时间块$(x(t), y(t))$都可以向前或向后延伸。通常，时间的起点被设置为t=0 或 t=1。

### 马尔可夫模型的概率

假设观察到结果是$Y$:

$$ Y = y(0), y(1), y(2), y(3)..y(L-1)$$

隐藏条件是$X$：

$$ X = x(0), x(1), x(2), x(3)..x(L-1)$$

长度为$L$，则马尔可夫模型的概率可以表达为：

$$P(Y) = \sum_{X}P(Y|X)P(X)$$

>由这个概率模型来看，可以得知马尔可夫模型将该时间点前后的信息都纳入考量。

### 使用隐马尔可夫模型

#### HMM有三个典型(canonical)问题:

* 预测(filter):已知模型参数和某一特定输出序列，求最后时刻各个隐含状态的概率分布，即求$P(x(t) \mid y(1),y(2)..y(t))$. 通常使用前向算法解决.

* 平滑(smoothing):已知模型参数和某一特定输出序列，求中间时刻各个隐含状态的概率分布，即求$P(x(k)\mid y(1),y(2)..y(t)), k<t$. 通常使用前向-后向算法解决.

* 解码(most likely explanation):已知模型参数，寻找最可能的能产生某一特定输出序列的隐含状态的序列. 即求 $P([x(1), x(2)..x(t)]\mid y(1), y(2)...y(t))$, 通常使用Viterbi算法解决.

>已知输出序列，寻找最可能的状态转移以及输出概率.通常使用Baum-Welch算法以及Viterbi algorithm解决. 另外,最近的一些方法使用联结树算法来解决这三个问题。