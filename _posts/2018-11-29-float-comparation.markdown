---
layout:     post
title:      “浮点数的比较”
subtitle:   “如何在程序中正确的比较浮点数”
date:       2018-11-29
author:     “Soptq”
header-img: "img/post_comparation.jpg"
catalog:    true
tags:
    - C++
---

### 实现

因为在存储浮点数的时候系统内部在转换过程中会造成精度损失，所以比较浮点数的时候不能比较相等（==），有以下两个方案可以做到比较。

#### 有精度损失的实现

当两个浮点数的差值小于一个极限的时候，我们可以认为他们是相等的，C++ 实现如下：

```cpp
#include <iostream>
#include <cstdio>
#include <cmath>

using namespace std;

int main(){
    float a;
    float b;
    float limit;
    cin >> a;
    cin >> b;
    cin >> limit;
    if (fabs(a - b) < limit){
        cout << "=" << endl;
    }else if(a > b){
        cout << ">" << endl;
    }else cout << "<" << endl;
    return 0;
}
```

#### 高精度的实现

但是鉴于系统的 float 或 double 本身存在精度限制，我们若要高精度比较浮点数的大小，可能考虑将浮点数读入为字符串来高精度对比。实现如下：

```cpp
#include <iostream>
#include <cstdio>
#include <cmath>
#include <string>
#include <cstdlib>

using namespace std;

bool exchanged = false;

void exchange(string *a, string *b){
    if (a->length() > b->length()){
        string temp;
        temp = *a;
        *a = *b;
        *b = temp;
        exchanged = true;
    }
}

void _cout(char c){
    if (!exchanged){
        cout << c << endl;
    }else if (c == '>'){
        cout << '<' << endl;
    }else cout << '>' << endl;
}

int main(){
    string a,b;
    cin >> a;
    cin >> b;
    exchange(&a, &b);
    if (a[0] == '-' && b[0] != '-') {
        _cout('<');
        exit(0);
    }
    if (a[0] != '-' && b[0] == '-') {
        _cout('>');
        exit(0);
    }
    int begin = 0;
    int len = (int)a.length();
    int end = (int)b.length();
    if (a[0] == '-') begin = 1;
    for (int i = begin; i < len; i++){
        if (a[i] == '.' && b[i] != '.'){
            _cout('<');
            exit(0);
        }
        if (a[i] != '.' && b[i] == '.'){
            _cout('>');
            exit(0);
        }
        if (a[i] == b[i]){
            continue;
        }else if(a[i] > b[i]){
            _cout('>');
            exit(0);
        }else {
            _cout('<');
            exit(0);
        }
    }
    for (int i = len; i < end; i++){
        if (b[i] != '0') {
            _cout('<');
            exit(0);
            
        }
    }
    cout << "=" << endl;
    return 0;
}
```



### 测试计划

|测试样例|测试数据A|测试数据B|预计结果|测试结果(有损失)|测试结果(无损失)|
|1|1.0|1.0|=|=|=|
|2|1.1|1.0|<|<|<|
|3|0.9|1.0|>|>|>|
|4|1.123456789|1.123456788|>|=|>|
|5|1.123456788|1.123456789|<|=|<|
|6|123.45|12.345|>|>|>|
|7|12.345|123.45|<|<|<|
|8|1.1231241|1.1232213|<|<|<|
|9|-1.2|-1.122|>|>|>|





