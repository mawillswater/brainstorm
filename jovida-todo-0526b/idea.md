下面我提到的内容，为在 /Users/maodedog/Desktop/CodeProject/jovida_prd/v0.18/day_Planner/0520-2135_prototype.html 的基础上，改动。
但是不要改源文件，而是 /Users/maodedog/Desktop/CodeProject/jovida_prd/v0.18/day_planner_0522 在这里创建一个新的 html。
而且主要生产的其实是界面原型 / UI，及其说明。而用户画像、概念澄清等不沾边的就不用说了

-------

Todo(涉及到原来的 item 详情和 手动创建 item)
title 标题（必填）
notes 描述：文字、图片、（附件）
status 状态：待完成，已完成，已放弃。（暂时不做推迟状态）
scheduled time 时间：
- 单一时间：日期、具体时间
- 时间段：开始时间，结束时间
recurrence 重复：一系列重复规则的设置（待补充）
priority 优先级：无，低，中，高
reminder 提前提醒：N 个预设的提前时长 + 自定义
- 闹钟提醒：这期不做
tag 标签：一个 Todo 可以有多个标签
list 列表：一个 Todo 只能属于一个列表
subTodo 子任务

----------

提前提醒和重复，只有在 scheduled time 时间设置后，才会展示出来，做出这个界面
不需要每个界面点击具体栏目后的详情弹窗或者样式，那个是后面再加的，你先删除
其他乱七八糟的文字也删除，只保留界面和界面下方的简要文字说明

todo 的详情页，包括创建页，都要有一定的分隔，不是所有的待填事项都是一个类型
日期与时间分隔。里面有日期、时间、提前提醒、重复这几项
而组织分隔，里面有列表、标签、优先级这些字段
子任务单独放在下面，就跟现在一样

状态不是通过文案展示的，而是通过 Todo 标题左侧圆圈中的样式表示的：待完成是空心，已完成是实心，已放弃是叉子


Todo 详情页（包括新建 todo），应该是一个从下面拉起来的界面，而且没有占满屏，大概占 70%

Todo 详情页右上角有三个点，三个点里面有删除、放弃

应该有一个地方，展示几个快捷输入，是让 Jovida AI 快速地三个操作
- 让 Jovida 拆任务
- 让 Jovida 给执行建议
- 跟 Jovida 聊聊这个 Todo

--------

首页
底tab：For you、日历、待定、待定、Magic Jovida（Jovida 头像），尤其是 Magic Jovida 那个底栏，参考这个界面的最右下角那个：/Users/maodedog/Desktop/CodeProject/jovida_prd/v0.18/day_planner_0522/reference/tiimo 底栏.jpg

首页的 For you 页，在 /Users/maodedog/Desktop/CodeProject/jovida_prd/v0.18/day_Planner/0520-2135_prototype.html 的 B05 的基础上改
0. 右上角要有Streak 多少天的 UI
1. 不需要日历视图
2. 保留 For you、全部的tab 筛选。
3. 只有全部 tab，右上角才有视图筛选
4. For you tab，类似之前的今天 tab，保留 tab 下面的 Jovida 说的话
5. For you 页面，里面分为 Now, Today, Follow up, Coming Soon
    - Now 的条件：
        - scheduled time 在「现在 ±1 小时」
    - Today 的条件：
        - scheduled date = 今天(用户手动安排的,必显,这是红线)。按照时间排序，日期在今天的但是没有具体时间的排在后面
        - Jovida 建议今天做的 N 件（来自之前已经创建过的其他 Todo）
            Jovida 建议做的，要写上推荐理由，占地面积不要过大。而且视觉上要有一定区分能知道是 Jovida AI 建议的，而不是Todo 的时间本身就在这里的
    - Follow-Ups 的条件：
        - status = 待完成，且 scheduled time 在 current time 1 小时之前
    - Coming Up 的条件：
        - scheduled time 在明天之后的 N 条，N 可配
        - Jovida 建议近期做的 N 条，N 可配
            Jovida 建议做的，要写上推荐理由，占地面积不要过大。而且视觉上要有一定区分能知道是 Jovida AI 建议的，而不是Todo 的时间本身就在这里的


----------

Todo 详情页，应该有这么几个底栏按钮
右下角最大的是完成，左边是两个小的（带 AI 样式⭐️标）：拆任务、给建议
删除原来的这个模块
```
让 Jovida 帮你
🔨
让 Jovida
拆任务
💡
让 Jovida
给执行建议
💬
跟 Jovida
聊聊这个
```
不要删除创建 todo 的下方模块
```
让 Jovida 帮你
🔨
让 Jovida
拆任务
💡
让 Jovida
给执行建议
💬
跟 Jovida
聊聊这个
```

-------

首页
全局要有搜索功能
全局要有批量选择的功能

------

全部 tab 的细化
可以分组/排序：分组：按优先级、标签、时间、状态分组；排序：按时间、标签、优先级排序

--------

Chat / Capture（也就是底栏最右侧的那个 Jovida 头像）
用户把事情丢给 Jovida 的入口。
Capture 的默认体验应该是对话，不是表单。用户说完、打完或传完图之后，Jovida 在当前对话里生成 Todo 候选卡，而不是直接把内容丢进某个列表。每张候选卡都应支持加入、修改、取消；信息不足时，Jovida 可以继续追问。
支持：
- 文字输入（含混乱长文本 dump）
- 语音输入（要有一个比较
- 添加图片
底部聊天框上方应该有快捷输入：帮我安排今天，帮我安排本周，帮我安排本月

你应该做这么几个界面
1. 初次点击 “底栏最右侧的那个 Jovida 头像”。此时因为没有聊天记录，所以应该界面正中是空状态。说可以跟我 brain dump 任何事，我会帮你拆解为 Todo，还会跟进你完成，并给你建议之类的 xx 的话
2. 用户输入 brain dump 内容后，Agent 回复的样式（包含文字回复 + 给出的 todo 候选卡）


-------
