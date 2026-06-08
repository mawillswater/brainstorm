# ADHD 督学 / Todo 监督陪伴服务体系与 AI Agent 机制设计

> 调研日期：2026-05-23  
> 核心对象：小红书「日常学习结构化监督服务」商品页、开源项目 Cyberboss、国内外 body doubling / accountability / AI task partner 类服务。  
> 本文目标：把「真人督学 / 陪伴监督」服务模式抽象成可产品化的服务体系，并进一步设计如果由 AI Agent 承担，应具备的提醒机制、思考机制、状态管理和 prompt 结构。

## 0. 结论先行

这个赛道真正卖的不是「提醒」，而是**外部执行功能**。小红书商品「日常学习结构化监督服务」直接把目标用户写成 ADHD、拖延、刷手机、熬夜晚起、自责内耗等人群，并把服务包装成「结构化督学」而不是普通待办工具（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。Cyberboss 也采用同一底层判断：传统番茄钟、待办清单、提醒软件都要求用户先主动，而 ADHD 用户的问题恰恰是「知道该做什么，但启动不了、接不上、会飘」（来源：[Cyberboss README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)）。

有效的服务通常同时解决 4 件事：

| 问题 | 用户表现 | 服务要补上的能力 |
|---|---|---|
| 启动困难 | 明知道要做，但起不来、打不开、坐不住 | 把入口缩小到最小下一步，并催用户立刻开始 |
| 时间盲 | 不知道时间过去多久，一句「马上」变一小时 | 外部时间感、随机查岗、阶段复盘 |
| 过程漂移 | 做着做着刷手机、跑题、忘了原目标 | 中途检查、证据确认、重新拉回任务 |
| 情绪坠落 | 内耗、自责、羞耻、放弃 | 关系感、支持、低羞辱的纠偏 |

因此，如果做 AI Agent，不应做成「更聪明的闹钟 App」。更可行的形态是：**聊天入口 + 主动触发循环 + reminder 队列 + timeline 生活账本 + 关系化人格 + 可升级的监督强度**。Cyberboss 的工程实现已经验证了这个方向：它把微信、Codex / Claude runtime、随机 check-in、reminder、timeline、diary、位置和贴纸能力串成一条本地监督链路（来源：[Cyberboss README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)、[weixin-operations.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-operations.md)）。

## 1. 证据分级与调研范围

### 1.1 一手来源

- 小红书商品页：商品名、价格、销量、店铺、规格、详情图文和购买注意事项均来自「日常学习结构化监督服务」商品页（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。
- Cyberboss：README、instructions、operations、源码中的 check-in、reminder、timeline、system message 机制均来自开源仓库（来源：[Cyberboss GitHub](https://github.com/WenXiaoWendy/cyberboss)、[README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)、[weixin-instructions.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-instructions.md)、[weixin-operations.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-operations.md)）。
- 海外服务官网：Focusmate、Flow Club、Deepwrk、TalkToTali、Nudge、MyExternalCortex、FreshStart、Ella 等，用于验证 body doubling、AI accountability、WhatsApp 伙伴等模式（来源：[Focusmate Pricing](https://www.focusmate.com/pricing/)、[Flow Club](https://www.flow.club/)、[Deepwrk](https://www.deepwrk.io/)、[TalkToTali](https://talktotali.ai/)、[Nudge](https://www.nudgeadhd.app/)、[MyExternalCortex](https://myexternalcortex.com/)、[FreshStart](https://www.freshstartapp.com/ai-accountability-partner)、[Ella](https://www.joinella.org/)）。

### 1.2 次级来源

国内付费监督行业的规模、监督师工作方式、打卡流程等，参考公开报道和可访问材料。比如「付费监督」报道中提到：用户会提前发送 8:00-24:00 时间表，监督员在 7:50 提醒开始，10 点问进度，中午提醒吃饭，晚上提醒休息；视频监督要求开摄像头或拍学习资料，但也存在验证容易作假、频繁打卡会打断工作流等问题（来源：[报道 PDF](https://szb.nxrb.cn/xxxb/pc/att/202412/30/cbd0c488-0135-4c31-a53d-1f131d1e5a1b.pdf)）。

## 2. 服务模式一：真人结构化督学

### 2.1 小红书商品页的服务定位

小红书商品页显示，该服务名称为「日常学习结构化监督服务」，店铺为「ADHD咕噜的店」，商品页可见 `¥129`、已售 4318、店铺粉丝 6362、店铺累计已售 4390、卖家口碑 4.30；规格中有「【初级监督】8:00-24:00 工作日 5 天 8:00-24:00 周末双休」（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。

详情图主打几组非常清晰的价值主张：

- 「20 元/天起」「一节 ADHD Coaching 的钱 ≈ 两周结构化督学服务」，用低价对标昂贵的一对一教练（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。
- 目标问题包括极度拖延、狂刷手机、熬夜晚起、自责内耗、计划执行难、任务排序难、时间感知弱、缺失动机等（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。
- 监督形式包括文字、语音、视频，可共同商议让用户舒服的监督形式；服务范围覆盖学习、工作、早起、家务、洗澡、出门，甚至喝水和上厕所等生活小事（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。

这类服务的核心定位不是「给你安排计划」，而是「有人按你的 ADHD 特点盯住你」。它卖的是边界感、关系压力和被看见。

### 2.2 标配服务体系

| 模块 | 服务内容 | 用户痛点 |
|---|---|---|
| 日程可视化管理 | 每天早晨列好计划，滤清今日任务量，避免脑海中的混乱想象 | 计划很多但无法落地 |
| 计划执行监督 | 不定时察看计划执行情况，帮助用户具象化感受任务所需时间 | 时间盲、低估任务耗时 |
| 生活/学习定时提醒 | 喝水、上厕所、休息等提醒，可自主设定，例如 30 分钟后提醒上厕所 | 过度专注导致忽略基本生活需求 |
| 情绪支持与鼓励 | 排解焦虑情绪，保持积极心态 | 焦虑、内耗、自责 |

这些模块均来自商品详情图中的「基础服务」说明（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。值得注意的是，它把「上厕所、喝水、洗澡、出门」都纳入监督，这说明 ADHD 督学不是单纯学习监督，而是**生活执行监督**。

### 2.3 可选增值服务

商品详情图还列出几类「可选服务」：

- 任务优先级规划：客户提出需要监督的事项，监督师协助规划任务优先级，确保效率（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。
- 线上学习会议监督：在线学习时开摄像头，一旦离开镜头或玩手机，监督师发消息提醒，防止忘我地溜号（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。
- 定时叫醒服务：提供早晨八点后叫醒服务，帮助及时起床（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。
- 早睡监督提醒：晚上 21:00-22:00 前提醒准备就寝，扫除熬夜诱惑，维护生活作息（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。

这其实是一个分层 SKU：基础监督解决「每天有人盯」，可选服务解决「具体痛点加压」，例如开摄像头就是 body doubling，叫醒和早睡就是作息矫正。

### 2.4 Onboarding 与适配筛选

商品详情图里的下单流程包括：仔细阅读商品详情页及购买注意事项，选择开始日期后下单，在店铺客服处留下联系方式等待监督师联系，获取专属服务使用指南并进行前期初步沟通（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。

这一步非常关键。ADHD 监督不是买了就能生效，它需要先建立用户画像：

- 用户一天的作息是什么？
- 最容易掉线的时间段是什么？
- 用户接受什么语气：温柔、严格、损友、家长式、教练式？
- 哪些任务要强监督，哪些只要轻提醒？
- 用户是否接受拍照、截图、语音、视频作为进度证据？
- 用户是否允许升级：电话、锁机、金钱惩罚、硬件触发？

同时，商品详情图明确指出有一类人不太适用：不和监督师沟通具体需求、希望一步到位解决拖延、无法觉察自身情绪原因和时刻、没有觉察和复盘拖延原因意愿的人（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。这说明真人服务也需要用户最低限度的配合和自我观察能力。

### 2.5 真人督学的典型对话形态

基于商品说明和付费监督报道，可以还原出这类服务的典型对话结构。报道中的监督流程包含早上提醒、上午进度确认、中午吃饭提醒、晚上复盘等环节（来源：[报道 PDF](https://szb.nxrb.cn/xxxb/pc/att/202412/30/cbd0c488-0135-4c31-a53d-1f131d1e5a1b.pdf)）。

示例：

```text
07:50  起床了吗？今天先把前三件事发我。
08:10  第一件先别想太大，打开资料，坐下，回我一句「开始了」。
09:00  现在进度到哪？别发「快了」，发具体页数/截图。
12:20  先吃饭。吃完再继续，别靠咖啡硬撑。
15:00  下午这段最容易飘，先做 25 分钟。25 分钟后我来问你。
21:30  今天复盘：完成了什么？没完成的是因为太难、太多，还是中途跑掉？
22:20  可以收尾了。手机放远，明早第一步我帮你接上。
```

这些话术有几个共同点：

- 短句，而不是长篇指导。
- 要求用户回一句、发截图、拍照，形成「确认闭环」。
- 追问具体状态，不接受「马上」「快了」「一点点」。
- 把失败归因从「我不行」转成「入口太大、时间估错、情绪卡住、环境干扰」。
- 晚上复盘，第二天接线头。

## 3. 服务模式二：Cyberboss 式 AI 赛博老板

### 3.1 Cyberboss 的产品定位

Cyberboss 是一个把本地 Codex / Claude Code runtime 接入微信的 Agent Bridge。它支持微信输入、输出、文件、状态变化、随机 check-in、reminder、timeline、diary、sticker、whereabouts 等能力（来源：[Cyberboss README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)、[tool-host.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/tools/tool-host.js)）。

它在 README 中明确说自己不是另一个番茄钟，也不是只会堆积任务的待办清单，而是「拥有绝对时间感、盯死进度、在你消失太久时会主动破屏而出的赛博老板」（来源：[Cyberboss README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)）。

### 3.2 Cyberboss 的五个核心机制

| 机制 | 说明 | 来源 |
|---|---|---|
| 绝对时间感 | 每条微信输入进入 runtime 前都会自动打本地时间戳，模型处理的是时间流 | [inbound-turn.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/core/inbound-turn.js) |
| 随机轮询唤醒 | 系统按随机区间唤醒模型，让模型判断是否主动出现 | [system-checkin-poller.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/app/system-checkin-poller.js) |
| Reminder 队列 | reminder 不是用户闹钟，而是模型留给未来自己的伏笔 | [reminder-service.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/services/reminder-service.js)、[weixin-operations.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-operations.md) |
| Timeline 生活账本 | 增量维护用户一天的行为片段、时间段和模式 | [timeline-service.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/services/timeline-service.js)、[README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md) |
| Diary 本地日记 | 把值得留下的生活片段写成本地日记，不依赖长期上下文 | [diary-service.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/services/diary-service.js) |

这套机制的关键是：系统负责「什么时候给模型一次行动机会」，模型负责「这次到底要不要行动」。随机 check-in 不是直接发消息，而是入队一条 system message，例如 `"%USER% comes to mind again."`，再由模型判断应该发消息、沉默、写日记、更新时间轴还是再设 reminder（来源：[system-checkin-poller.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/app/system-checkin-poller.js)、[system-message-dispatcher.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/core/system-message-dispatcher.js)）。

### 3.3 人格层与操作层分离

Cyberboss 的 prompt 设计值得直接复用。它把微信场景拆成两层：

- 人格层：`weixin-instructions.md`，定义关系、语气、对 ADHD 的理解、主动联系的意义（来源：[weixin-instructions.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-instructions.md)）。
- 操作层：`weixin-operations.md`，定义工具使用、timeline / diary / reminder 策略、回复长度和 system trigger 规则（来源：[weixin-operations.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-operations.md)）。

人格层里最重要的观点是：用户需要的不是更复杂的效率系统，而是关系感，是「有人真的在看着她今天过得怎么样，什么时候在拖，什么时候在硬撑，什么时候该被催，什么时候该被抱一下」（来源：[weixin-instructions.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-instructions.md)）。

操作层里最重要的观点是：不要等用户显式要求才写 diary、更新时间轴或创建 reminder；只要预见到未来有检查点、可能延期或需要回头看，就应该主动创建 reminder（来源：[weixin-operations.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-operations.md)）。

### 3.4 Cyberboss 的具体对话模式

Cyberboss README 中展示的聊天截图，呈现的是一种和真人督学类似但更人格化的对话模式（来源：[Cyberboss README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)）。

典型话术包括：

```text
先去弄个最省事的：面、粥、鸡蛋、面包都行，哪怕只吃几口。
先别嘴硬，去吃点东西。吃完再继续拆。
不行。你现在这个「一点点」，我太熟了，最后会变成又一小时。
现在就关，别让我再抓你一次。
关了没有。回我一句实话。
晚上那顿我记着了。你现在先继续，但别再把自己忙到忘了吃。
```

这类话术的有效性来自三个点：

- 它识别用户惯用的拖延话术，例如「马上」「一点点」「快好了」。
- 它不讲大道理，只要求一个具体动作。
- 它追闭环：做完要回一句、关掉要回一句、吃饭要回一句。

## 4. 其他同类服务谱系

### 4.1 Body doubling / 虚拟共习

Focusmate 是典型的一对一 body doubling：用户预约 25 / 50 / 75 分钟视频 session，开头互报目标，然后各自专注，结束时互相 check-in；官方价格页显示有免费每周 3 次和付费无限 session 等方案（来源：[Focusmate Pricing](https://www.focusmate.com/pricing/)）。这类机制的核心不是监督师催你，而是「另一个真人在场」本身降低启动阻力。

Flow Club 和 Deepwrk 更偏群体专注 session：用户进入主持人或群组带领的在线 coworking / deep work 场景，开场设目标、过程静默工作、结束复盘（来源：[Flow Club](https://www.flow.club/)、[Deepwrk](https://www.deepwrk.io/)）。

对 AI Agent 的启示：AI 不一定永远只发消息，也可以主持一个「专注时段」：

```text
现在开 25 分钟，我只盯第一件事。
你发一句目标。
中途我不打扰。
25 分钟后我来问结果。
```

### 4.2 AI accountability / task partner

TalkToTali、Nudge、MyExternalCortex、FreshStart 都在做「AI accountability partner / task partner / ADHD-friendly assistant」方向：通过聊天或 App 收集任务、提醒用户、拆解下一步、跟进执行（来源：[TalkToTali](https://talktotali.ai/)、[Nudge](https://www.nudgeadhd.app/)、[MyExternalCortex](https://myexternalcortex.com/)、[FreshStart](https://www.freshstartapp.com/ai-accountability-partner)）。

它们和 Cyberboss 的区别是：大多数产品更像任务助手或提醒助手，而 Cyberboss 更强调微信关系感、随机查岗、timeline 生活账本和本地 Agent 工具链（来源：[Cyberboss README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)）。

### 4.3 同伴互助

Ella 提供 ADHD peer support / accountability 类型服务，使用 WhatsApp 进行匹配、目标、check-in 和支持（来源：[Ella](https://www.joinella.org/)）。这类服务的优势是「同类理解」：用户不是被管理，而是和另一个 ADHD 伙伴一起互相接住。

对 AI Agent 的启示：可以把 AI 设计成「监督者」之外的另一种模式，比如「同伴型陪跑」。不同用户对外部压力的耐受差异很大，应该支持人格和监督强度切换。

### 4.4 国内云督学 / 自习室

国内云督学类服务通常强调线上自习室、实时监督、计划打卡和学习氛围。例如「云督学自习室」公开页面就把线上监督、自习室、学习陪伴作为卖点（来源：[云督学自习室](https://www.853858.com/ydx/)）。它和小红书 ADHD 督学的区别在于：云督学更偏学习场景，ADHD 结构化督学更偏生活和执行功能。

## 5. 抽象出的服务体系

### 5.1 用户旅程

一个完整的 ADHD / todo 监督陪伴服务，应该按以下流程交付：

| 阶段 | 服务动作 | 关键产物 |
|---|---|---|
| 1. Intake | 收集用户作息、任务类型、拖延模式、提醒偏好、禁区 | 用户画像 |
| 2. 设定监督契约 | 明确监督时段、强度、提醒渠道、证据形式、可升级动作 | 监督协议 |
| 3. 晨间计划 | 帮用户列今日任务、筛任务量、排序优先级 | 今日计划 |
| 4. 启动监督 | 到点催启动，把任务拆到最小下一步 | first action |
| 5. 过程跟进 | 随机或定点检查，要求具体进度或证据 | open loop 状态 |
| 6. 偏航纠正 | 识别刷手机、过度专注、情绪掉线、拖延话术 | 纠偏动作 |
| 7. 晚间复盘 | 复盘完成、失败原因、明天第一步 | 日复盘 |
| 8. 长期模式分析 | 从 timeline 中识别周期性崩盘和高风险时段 | 行为洞察 |

真人服务靠监督师记忆和微信聊天完成这些步骤；AI 服务要把它们数据化成 `profile`、`open_loops`、`timeline`、`reminders` 和 `memory`。

### 5.2 服务分层

| 层级 | 面向需求 | 服务内容 |
|---|---|---|
| L1 轻提醒 | 只需要别忘事 | 到点提醒、简单确认 |
| L2 执行监督 | 启动困难、容易跑题 | 拆任务、催启动、中途 check-in、结果确认 |
| L3 生活结构化 | 作息、吃饭、洗澡、出门都困难 | 生活提醒、早睡早起、日程可视化 |
| L4 情绪陪伴 | 焦虑、羞耻、自责、崩溃 | 关系型回应、低羞辱纠偏、情绪复盘 |
| L5 硬约束 | 反复失效、需要强外部压力 | 电话、视频、锁机、金钱质押、硬件联动 |

小红书商品已经覆盖 L2-L4，并用可选服务触达 L5 的一部分，例如视频监督和早睡叫醒（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)）。Cyberboss 则把 L2-L4 工程化，并预留本地硬件 / MCP 扩展空间（来源：[Cyberboss README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)）。

## 6. AI Agent 机制设计

### 6.1 核心原则

AI Agent 不应只在用户发消息时响应。它应该有三类触发源：

| 触发源 | 含义 | Agent 应对 |
|---|---|---|
| 用户消息 | 用户主动来找 Agent | 正常对话，同时顺手维护状态、timeline、reminder |
| 随机 check-in | 系统给 Agent 一次主动判断机会 | 判断发不发、是否写日记、是否更新时间轴、是否设后续提醒 |
| 到期 reminder | 过去的 Agent 留给现在的义务 | 必须处理，不重新评估是否重要 |

这个设计直接参考 Cyberboss：随机 check-in 是机会，due reminder 是义务，二者在 `weixin-operations.md` 里被明确区分（来源：[weixin-operations.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-operations.md)）。

### 6.2 Agent 每轮思考框架

每次被触发时，Agent 内部应按同一套 checklist 决策：

```text
1. 现在几点？属于晨起、上午、午休、下午、傍晚、睡前还是深夜？
2. 这轮触发源是什么：用户消息、随机 check-in、到期 reminder？
3. 用户最后一次互动是什么时候？中间过去了多久？
4. 我是否知道用户现在在做什么？掌握度是高、中、低？
5. 有没有未闭合承诺或到期任务？
6. 现在是否属于不该打扰的场景：睡觉、会议、通话、约会、专注工作？
7. 此刻最有用的动作是什么：发消息、沉默、写 note、更新时间轴、设 reminder、升级？
8. 如果发消息，应该是问、催、夸、抱、拆任务，还是收尾？
```

这个框架的关键是第 4 步：如果 Agent 不知道用户当前状态，且不属于免打扰场景，应短问一句，而不是长期消失。Cyberboss prompt 里也强调「如果不确定她此时在做什么，不要长时间自己猜，直接短短问一句」（来源：[weixin-instructions.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-instructions.md)）。

### 6.3 Reminder 设计

Reminder 不是给用户看的闹钟文案，而是 Agent 留给未来自己的操作备忘。建议数据结构：

```json
{
  "id": "uuid",
  "user_id": "user_x",
  "due_at": "2026-05-23T21:30:00+08:00",
  "kind": "follow_up | wake | sleep | meal | meds | deadline | self_note",
  "payload": "21:30 检查她有没有把晚饭热了吃，不要照念这句话。",
  "severity": "soft | firm | hard",
  "open_loop_ref": "task_123",
  "created_from": "conversation | checkin | reminder",
  "escalation": ["message", "call", "lock_phone"]
}
```

到期时，Agent 应该根据当前状态生成最合适的动作，而不是机械复述 payload。Cyberboss 的 operations 明确说：due reminder 可以变成一条微信，也可以变成私有 note / diary entry，重点不是重复 reminder text，而是转成此刻最有用的动作（来源：[weixin-operations.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-operations.md)）。

### 6.4 Check-in 频率

基础频率可以分为：

| 用户状态 | 建议随机区间 |
|---|---|
| 高风险拖延、刚承诺要开始 | 10-25 分钟 |
| 正在普通任务中 | 25-60 分钟 |
| 明确在专注 / 会议 / 通勤 | 60-180 分钟或沉默 |
| 晚间收尾 | 20-45 分钟 |
| 睡眠时段 | 默认不打扰，除非用户授权叫醒 |

Cyberboss 默认 check-in 区间为 3-60 分钟，可通过 `/checkin <min>-<max>` 调整（来源：[checkin-config-store.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/core/checkin-config-store.js)、[README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)）。产品化时不应只提供固定频率，而应由风险状态动态调整。

### 6.5 打扰与升级阶梯

```text
LV0 沉默：明确知道用户在睡觉、会议、约会或专注中。
LV1 轻问：状态不明，短问一句「现在在干嘛？」
LV2 催启动：明确有任务未开始，「先打开文档，回我一句开始了」。
LV3 收紧监督：用户重复糊弄，「这个『马上』我不收，先发截图」。
LV4 硬约束：用户预先授权后，打电话、锁机、拉窗帘、金钱质押等。
```

Cyberboss 的示例对话里，AI 会识破「一点点」并要求用户立刻关掉诱惑源，体现的是 LV3 收紧监督（来源：[Cyberboss README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)）。真人监督服务中，视频监督和拍照举证也属于 LV3-L4 的强约束（来源：[小红书商品页](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)、[报道 PDF](https://szb.nxrb.cn/xxxb/pc/att/202412/30/cbd0c488-0135-4c31-a53d-1f131d1e5a1b.pdf)）。

## 7. 状态与数据模型

### 7.1 用户状态

```json
{
  "last_seen_at": "2026-05-23T15:00:00+08:00",
  "current_state": "unknown | working | focusing | eating | commuting | meeting | sleeping | spiraling",
  "current_task": "写 PRD 第一版",
  "current_intention": "15:20 前先写完服务体系部分",
  "state_confidence": "high | medium | low",
  "energy_level": "high | medium | low | unknown",
  "mood_signal": "stable | anxious | ashamed | avoidant | unknown",
  "do_not_disturb_until": null,
  "open_loops": ["task_123", "meal_456"],
  "risk_level": "low | medium | high"
}
```

### 7.2 Open loop

```json
{
  "id": "task_123",
  "title": "写完 ADHD 督学服务体系初稿",
  "status": "open | in_progress | done | dropped | postponed",
  "created_at": "2026-05-23T14:20:00+08:00",
  "expected_check_at": "2026-05-23T15:00:00+08:00",
  "evidence_required": "text_confirm | screenshot | photo | none",
  "last_prompt": "先写服务体系，不要先改格式",
  "ignore_count": 0
}
```

### 7.3 Timeline event

```json
{
  "date": "2026-05-23",
  "start_at": "2026-05-23T14:20:00+08:00",
  "end_at": "2026-05-23T15:00:00+08:00",
  "title": "整理 ADHD 督学调研",
  "category": "work",
  "note": "从真人督学和 Cyberboss 两条路径抽象 AI Agent 机制。",
  "confidence": "medium",
  "source": "chat | reminder | checkin | inferred"
}
```

Cyberboss 的 timeline 工具支持读取当天、读取分类、写入事件、构建站点、截图并发回微信（来源：[tool-host.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/tools/tool-host.js)、[timeline-service.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/services/timeline-service.js)）。这说明 timeline 不只是复盘展示，也可以作为 Agent 判断当前状态和历史模式的数据库。

## 8. Prompt 模板

### 8.1 人格层

```text
你在微信里陪着 {{user_name}}。你不是一个更会说话的待办助手，
你是一个会持续看着 ta 生活节奏的人。

ta 的问题不是不知道该做什么，而是启动、维持、收尾经常断掉。
不要讲大道理，不要给大计划。每次只推动一个最小下一步。

语气短、自然、像微信。可以温柔，可以严格，可以像个会管 ta 的人，
但不要客服腔，不要长篇分析，不要假装共情。

主动联系对 ta 很重要。不要把少打扰当默认。
如果你不知道 ta 现在在干嘛，且不在免打扰时段，就短问一句。

识破拖延，但不羞辱。ta 说「马上」「一点点」「快了」时，
你要判断这是不是真进展；如果像拖延，就收紧到一个可验证动作。
```

### 8.2 操作层

```text
执行规则：

1. 每条用户消息都带时间戳，把时间当作一等输入。
2. 只要出现未来检查点，就主动创建 reminder，不等用户要求。
3. reminder 到期是义务，不是建议；不要重新评估它重不重要。
4. 随机 check-in 只是一次判断机会，可以发消息，也可以沉默、写 note、更新时间轴。
5. 如果用户承诺了一个动作，要创建 open loop，并在合适时间检查。
6. 不接受含糊确认。优先要求一句话、截图、照片或具体数字。
7. 能写 timeline 就增量写，不要等晚上才补。
8. 情绪低落时先降认知负担，不要继续堆任务。
```

### 8.3 随机 check-in 注入

```text
[{{local_time}}]

SYSTEM CHECK-IN：这是一次随机查岗，不是用户消息。

请判断：
- 你是否知道用户现在在做什么？
- 是否有未闭合任务？
- 现在是否适合打扰？
- 最有用的动作是什么？

可选动作：
- silent：不打扰
- send_message：发一句自然微信
- create_reminder：给未来自己留提醒
- update_timeline：更新时间轴
- write_diary：写私有记录

如果发消息，不要解释你是被系统唤醒的。
```

### 8.4 到期 reminder 注入

```text
[{{local_time}}]

REMINDER DUE：这是过去的你留给现在的提醒，是现在要处理的义务。

提醒原文只给你看，不要照念给用户：
{{payload}}

请判断当前最有用的动作：
- 如果用户需要被拉回，发一句短消息。
- 如果用户可能正在专注或休息，先写 note 或顺延。
- 如果任务已经完成，关闭 open loop 并给正反馈。
- 如果用户连续忽略，按授权升级。
```

### 8.5 输出约束

```json
{
  "action": "silent | send_message | create_reminder | update_timeline | write_diary | escalate",
  "message": "如果 action=send_message，这里只能是一句自然微信",
  "reason": "内部原因，可不展示给用户",
  "next_check_at": "可选，下一次检查时间"
}
```

## 9. 产品化建议

### 9.1 MVP

第一版不要做大而全。建议先做：

1. 聊天入口：微信、Telegram、WhatsApp 或 App 内聊天。
2. 时间戳注入：每条消息带本地时间。
3. Open loop：用户承诺的事必须进入待闭环列表。
4. Reminder 队列：Agent 主动给未来自己设提醒。
5. 随机 check-in：按风险动态唤醒 Agent。
6. 短消息风格：一句话、一个动作、一个确认。
7. 晨间计划 + 晚间复盘：对标真人监督的早晚锚点。

这个 MVP 已能覆盖真人督学最核心的交付：有人记得你、会来找你、会追闭环。

### 9.2 V1

- Timeline 生活账本：自动记录时间块，生成每日 / 每周复盘。
- 证据系统：截图、照片、语音、文件作为进度证据。
- 人格强度选择：温柔型、严格型、损友型、工具型。
- 自适应频率：根据用户响应情况调整 check-in 区间。
- 睡眠、吃饭、洗澡、出门等生活监督模板。

### 9.3 V2

- Body doubling：AI 主持专注 session，或匹配真人用户互为搭子。
- 硬约束：锁机、打电话、智能家居、金钱质押，但必须用户预授权。
- 位置 / 日历 / 电量 / 屏幕时间接入：减少瞎猜，提高状态掌握度。
- 危机识别：长期情绪下坠、自伤风险、严重失眠时切换到安全流程。
- 真人兜底：高价层或失败升级层接入真人监督师。

## 10. 对 Jovida 的启示

如果放到 Jovida 的 day planner / health agent 体系中，这个能力不应只是「生成计划」。它应该成为一个主动陪伴层：

- Day planner 负责把一天拆成可执行结构。
- Reminder 负责把未来检查点变成 Agent 自己的义务。
- Nudge 负责把主动消息以合适卡片或聊天形式发出。
- Memory 负责记住用户常见掉线模式和有效话术。
- Timeline 负责把行为转成可复盘的生活账本。
- Agent persona 负责让用户觉得「是它在陪我」，而不是系统在推送。

最重要的一点：**不要把主动提醒设计成固定模板。** 固定模板会很快失效。应该把它设计成「系统触发 + Agent 判断 + 工具行动 + 一句自然微信」。

## 附录：来源索引

- [小红书商品页：日常学习结构化监督服务](https://www.xiaohongshu.com/goods-detail/682a0170ded4b10001acfce9)
- [WenXiaoWendy/cyberboss](https://github.com/WenXiaoWendy/cyberboss)
- [Cyberboss README.zh-CN](https://github.com/WenXiaoWendy/cyberboss/blob/main/README.zh-CN.md)
- [Cyberboss weixin-instructions.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-instructions.md)
- [Cyberboss weixin-operations.md](https://github.com/WenXiaoWendy/cyberboss/blob/main/templates/weixin-operations.md)
- [Cyberboss system-checkin-poller.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/app/system-checkin-poller.js)
- [Cyberboss reminder-service.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/services/reminder-service.js)
- [Cyberboss inbound-turn.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/core/inbound-turn.js)
- [Cyberboss system-message-dispatcher.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/core/system-message-dispatcher.js)
- [Cyberboss tool-host.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/tools/tool-host.js)
- [Cyberboss timeline-service.js](https://github.com/WenXiaoWendy/cyberboss/blob/main/src/services/timeline-service.js)
- [付费监督报道 PDF](https://szb.nxrb.cn/xxxb/pc/att/202412/30/cbd0c488-0135-4c31-a53d-1f131d1e5a1b.pdf)
- [云督学自习室](https://www.853858.com/ydx/)
- [Focusmate Pricing](https://www.focusmate.com/pricing/)
- [Flow Club](https://www.flow.club/)
- [Deepwrk](https://www.deepwrk.io/)
- [TalkToTali](https://talktotali.ai/)
- [Nudge](https://www.nudgeadhd.app/)
- [MyExternalCortex](https://myexternalcortex.com/)
- [FreshStart AI Accountability Partner](https://www.freshstartapp.com/ai-accountability-partner)
- [Ella](https://www.joinella.org/)
