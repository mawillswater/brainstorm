# Jovida Daily Android 版本适配梳理

更新时间：2026-06-25

## 结论先行

Android 版不能直接复刻 iOS 版的系统入口设计。iOS 当前产品方向高度依赖 Shortcuts、Back Tap、Action Button、Siri、App Intents、Spotlight、Apple Calendar、Apple Reminders、StoreKit/APNs 等能力；Android 对应能力更分散，且很多能力没有一一对应物。

Android MVP 的产品策略建议是：

1. P0 保住 Jovida 核心闭环：创建 To-Do、Brain Dump、聊天确认、提醒、Focus、Email to To-Do、Google/Local Calendar 展示、订阅付费
2. 把 iOS Shortcuts/Back Tap 改成 Android 的桌面快捷方式、分享入口、Widget/通知入口，不承诺静默截屏或后台读剪贴板
3. 把 Siri/Spotlight/App Entities 降级为 Google Assistant App Actions + AppSearch/应用内搜索，不作为 Android 首发核心卖点
4. Apple Reminders 在 Android 首发应删除或替换为 Google Tasks/本地导入能力，避免出现平台不成立的功能
5. 提醒/闹钟/语音录制要按 Android 权限和后台限制重新设计，不要照搬 iOS 的开关和文案

## 参考范围

本次基于以下信息梳理：

- 本地原型：`jovida_prd/jovida_daily/v0.3/index.html`
- 本地代码：`jovida_daily_code/jovida-todo`、`jovida_daily_code/jovida-api`、`jovida_daily_code/jovida-agent-setting`
- 你提供的 Feishu 文档链接：当前环境无法直接读取正文，已结合 v0.3 原型和此前讨论内容补全判断
- Android 官方资料：App Actions、App Shortcuts、Direct Share、Calendar Provider、AppSearch、MediaProjection、通知权限、精确闹钟、前台服务、Clipboard 限制等

## iOS 到 Android 的能力映射

| iOS 能力 / 当前产品设计 | Android 对应能力 | 产品判断 |
| --- | --- | --- |
| iOS Shortcuts | App Shortcuts、Pinned Shortcuts、Deep Link、Share Sheet | 可替代，但需要换成 Android 语言 |
| Back Tap | 无标准第三方 App API | 删除，不做教程；可用桌面快捷方式/Widget 替代 |
| Action Button | 无通用 Android 等价物 | 删除；部分机型快捷键不做首发承诺 |
| Siri 添加/查找 To-Do | Google Assistant App Actions | P1；能力依赖 Google Play、Assistant/Gemini 状态和审核 |
| Spotlight 搜索 To-Do | AppSearch/应用内搜索，系统全局搜索不稳定 | P1/P2；首发不承诺系统全局可搜 |
| App Entities/App Intents | App Actions + Deep Links + AppSearch | 不是一一对应，需重写产品叙事 |
| Apple Calendar | Android Calendar Provider / Local Calendars | 可做，只读展示优先 |
| Google Calendar | Google OAuth + Calendar API / Calendar Provider | 可做，建议作为 Android 主力日历能力 |
| Apple Reminders | 无 Android 系统级 Reminders | 删除或改为 Google Tasks / Microsoft To Do 导入 |
| APNs | FCM | P0 替换 |
| StoreKit | Google Play Billing / Adapty Android | P0 替换 |
| 静默截屏快捷指令 | MediaProjection 需用户授权，或系统截图后 Share to Jovida | 不能静默复刻；改为分享截图到 Jovida |
| 后台读剪贴板 | Android 10+ 后台读剪贴板受限，Android 12+ 会提示 | 改为前台读取或分享文本 |
| Voice Brain Dump 自动录音 | RECORD_AUDIO + 前台启动；后台录音受限制 | 仅用户显式触发后进入前台录音 |

## P0：Android MVP 必须适配

### 1. Android 创建入口重构

**要做**

- Settings/Me 中删除 iOS-only 的 `Create To-Dos with Shortcuts` 叙事
- 新增 Android 版入口：`Quick Create`
- Quick Create 里提供：
  - Add Voice Dump shortcut
  - Add Text To-Do shortcut
  - Share screenshots to Jovida
  - Paste from clipboard in Jovida
- 支持桌面长按 App 图标出现快捷入口
- 支持用户把 `Voice Dump`、`Quick Create` pin 到桌面

**要删除/改文案**

- 删除 Back Tap 教程
- 删除 Action Button 教程
- 删除 “Double-Tap the Back” 首页引导
- 不再写 “from any app, double tap the back”

**建议 PRD 文案**

- 模块标题：`Quick Create on Android`
- 副标题：`Start from a home shortcut, share menu, or Jovida`
- 桌面快捷入口：
  - `Voice Dump`
  - `Text To-Do`
  - `Quick Create`
  - `Open Today`

**原因**

Android App Shortcuts 支持 static、dynamic、pinned 三类快捷方式，pinned shortcut 需要用户授权添加到 launcher。Android 没有 iOS Back Tap/Action Button 的通用第三方能力。

### 2. 截图创建 To-Do：从“自动截屏”改为“分享截图”

**iOS 设想**

用户触发 Shortcut，自动截屏当前界面，发送给 Jovida，生成 To-Do。

**Android 首发建议**

- 不做静默截屏
- 用户先使用系统截图
- 在系统截图预览或图库/聊天 App 中点击 Share
- Share Sheet 中选择 `Jovida`
- Jovida 进入聊天/确认流：`I received your screenshot and created a draft To-Do`

**可选增强**

- Direct Share 目标：`Send to Jovida`
- 支持图片、文本、URL、PDF 分享到 Jovida
- 分享后进入同一个 AI workflow：识别内容 → 生成 Todo → 聊天确认

**不要写进 P0**

- “双击背面自动截屏”
- “后台自动截屏当前 App”
- “无授权读取屏幕内容”

**原因**

Android 的 MediaProjection 能捕获屏幕，但需要用户授权，并且 Android 14+ 更强调单 App/全屏选择和前台服务限制；这不像 iOS Shortcut 的系统动作那样适合做轻量快捷入口。

### 3. 剪贴板创建 To-Do：改成前台动作

**要做**

- 入口文案从 `Clipboard Create` 调整为 `Paste from Clipboard`
- 用户点击后打开 Jovida，并在 Jovida 前台读取剪贴板
- 如果剪贴板为空或系统不允许读取，展示手动粘贴输入框

**体验建议**

- 从 Quick Create 进入：直接打开一个底部浮层
- 浮层标题：`Create from clipboard`
- 按钮：`Paste`
- 成功后：走聊天确认或直接生成 draft To-Do

**原因**

Android 10+ 后台读取剪贴板受限；Android 12+ App 读取剪贴板会有系统提示。产品上不要承诺“在任意 App 后台自动读取剪贴板”。

### 4. 语音 Brain Dump：只做用户主动前台触发

**要做**

- 用户点击桌面快捷方式、App 内按钮或分享入口后，打开 Jovida 并自动进入 Voice Dump
- 请求麦克风权限
- 自动开始录音，但必须发生在 App 前台
- 录音过程中使用清晰的系统录音状态和 App 内状态

**不做**

- 后台静默开始录音
- 从系统快捷入口触发后 App 不打开也录音

**原因**

Android 录音需要 `RECORD_AUDIO`，后台录音需要 foreground service，并且 microphone foreground service 受 while-in-use 限制。Jovida 的 Voice Dump 应保持“用户明确触发、App 前台录音”的产品边界。

### 5. 通知、提醒、闹钟提醒重做权限路径

**要做**

- Android 首次进入提醒功能时请求 `POST_NOTIFICATIONS`
- To-Do Reminder 默认用普通本地通知
- Alarm Reminder 单独解释：这是更强提醒，需要系统“Alarms & reminders”授权
- 如果授权失败，降级到普通通知，不阻断创建 To-Do
- 设置页保留 Permission Management，但 Android 权限项要独立：
  - Notifications
  - Alarms & reminders
  - Microphone
  - Calendar

**要谨慎**

- 当前 AndroidManifest 已声明 `SCHEDULE_EXACT_ALARM`、`USE_FULL_SCREEN_INTENT`、`SET_ALARM` 等，需要产品上明确哪些场景真的需要
- Google Play 对 exact alarm / full-screen intent 有审核和适用场景限制，不能把“Alarm Reminder”做成所有用户默认开启

**建议产品策略**

- P0：普通提醒体验必须稳定
- P0：闹钟提醒作为高级可选能力，失败有降级
- P1：再优化 alarm 权限引导、失败原因、不同厂商后台保活提示

### 6. Calendar / Reminder 导入重构

**Android Settings 顶部模块**

- `Email to To-Do`
- `Import & Integration`
- `Quick Create`
- `Siri to To-Do` 不出现在 Android；如要保留，改为 `Google Assistant`

**Import & Integration - Android P0**

- Calendar：
  - `Google Calendar`：Connect
  - `Local Calendars`：Connect
- Reminders：
  - 删除 `Apple Reminders`
  - 可暂时不展示 Reminders 分组

**Google Calendar**

- 作为 Android 主力能力
- 连接态显示：`Connected · user@gmail.com`
- 支持子日历显示/隐藏
- 支持 event rows、event detail、结束态置灰
- 是否双向同步 To-Do 到 Google Calendar 建议放 P1，不做 P0

**Local Calendars**

- 读取 Android Calendar Provider
- 只读展示为主
- 展示本机所有 calendar source / sub calendar
- 支持总开关和每个日历的 Shown/Hidden
- 权限未开时展示权限引导

**Apple Reminders**

- Android 不成立，P0 删除
- P1 可改为 `Google Tasks Import` 或 `Microsoft To Do Import`

### 7. Email to To-Do 基本可复用

**要做**

- Android 版保留 Email to To-Do
- 详情页展示专属 inbox 地址
- Copy / Reset 保留
- 邮件转 To-Do 后仍通过聊天告知结果
- Chat quota 不足时，展示同样的系统提示

**平台差异**

- 该能力核心在服务端 inbox + AI workflow，不依赖 iOS/Android
- Android 只需要处理 push、deep link、聊天页落地

**建议 P0 文案**

- `Forward emails here, and Jovida will create To-Dos and update you in chat`

### 8. 付费与额度：StoreKit 替换为 Google Play Billing

**要做**

- Android 版订阅走 Google Play Billing / Adapty Android
- Paywall 文案和权益表复用 iOS，但价格、本地货币、试用、促销、订阅管理入口按 Google Play 规则重做
- `Restore Purchase` 在 Android 上改为更自然的 `Manage subscription` 或 `Refresh purchase status`
- Email to To-Do 仍计入 Smart AI / Chats quota

**注意**

- 如果 Android 版面向中国大陆非 Google Play 渠道，Billing 方案需要另开一版 PRD
- Google Play 版和国内渠道版不要混在同一个首发范围里

### 9. 登录与账号体系

**要做**

- Google Sign-In 作为 Android 首发主入口
- Apple Sign-In 在 Android 不作为主入口；如保留，仅作为 Web OAuth fallback
- 设备 ID、push token、订阅 token 都要区分平台

**建议**

- Android 登录页：Google Sign-In + Email login
- Apple login 放 P1/P2，除非已有大量 iOS 用户需要跨端迁移

### 10. App 内核心体验复用

以下能力 P0 应尽量复用 iOS 产品逻辑：

- To-Do 列表 / For You / All
- 创建 To-Do
- To-Do Detail
- Magic Subtasks
- Magic Help
- Focus / Bottom Focus Tab
- Brain Dump
- Chat
- 订阅 Paywall
- Email to To-Do quota 状态

**Android UI 适配注意**

- 不要在 Android 版照搬 iOS 状态栏、刘海、底部 Home Indicator
- 权限弹窗、设置引导、系统分享入口要用 Android 语境
- 底部导航可以保留产品结构，但视觉需更接近 Material/Android，而不是 iOS mock

## P1：增强体验，建议第二阶段做

### 1. Google Assistant App Actions

**目标**

让用户可以说类似：

- “Hey Google, add buy milk in Jovida”
- “Hey Google, open Voice Dump in Jovida”
- “Hey Google, search Q3 review in Jovida”

**建议能力**

- `Create To-Do`
- `Open Voice Dump`
- `Open Today`
- `Search To-Do`

**产品判断**

- 这是 Siri to To-Do 的 Android 替代，但不要当成 P0，因为它依赖 Google Play、Assistant/Gemini 生态、语言覆盖和审核
- PRD 里要写成增强入口，而不是核心创建入口

**落地方式**

- Deep links 先做好
- 再通过 App Actions 的 Built-in Intents / Custom Intents 暴露
- 搜索用 `GET_THING` 或应用内搜索落地

### 2. Android Share Sheet 深度入口

**目标**

让用户从任何 App 分享内容到 Jovida：

- 分享文本 → 创建 To-Do
- 分享网页 URL → 创建 To-Do
- 分享截图/图片 → 创建 To-Do
- 分享 PDF/附件 → 进入聊天确认

**建议入口名**

- `Send to Jovida`
- `Create To-Do in Jovida`

**体验**

- 进入 Jovida 后先显示一条聊天消息或确认卡片
- Jovida 快速生成 draft To-Do
- 用户确认后入库

### 3. Widgets

**建议做 2 个 Widget**

- `Quick Create Widget`
  - Voice
  - Text
  - Paste
  - Open Today
- `Today Widget`
  - 今天的 To-Do
  - 当前 Focus
  - 快速添加

**定位**

Android 的 Widget 比 iOS Shortcuts 更适合承担“桌面常驻入口”。

### 4. AppSearch / 应用内搜索索引

**目标**

- 让 Jovida 内搜索更快
- 为未来 Android 系统搜索、Assistant 搜索、Gemini 入口打基础

**索引对象**

- Todo
- Subtask
- List
- Calendar Event
- Email-created Todo

**产品边界**

- P1 先做应用内搜索体验
- 不要承诺所有 Android 桌面搜索都能搜到 Jovida To-Do

### 5. Focus 常驻通知

**目标**

当用户正在 Focus，退出 App 后仍能看到轻量状态：

- 当前 To-Do 标题
- 已专注时间
- Pause
- Stop
- Open

**注意**

- 这是 Android 上替代 iOS Live Activity / Dynamic Island 的自然方式
- 需要通知权限和前台服务策略一起设计

### 6. Google Tasks / Microsoft To Do 导入

**替代 Apple Reminders**

- Google Tasks：更符合 Android/Google 用户
- Microsoft To Do：适合工作用户

**建议**

- P1 先做 Google Tasks one-time import
- 不承诺持续同步，避免和 Calendar 同步边界混乱

### 7. Wear OS / Android XR / Tablet

**P1 可考虑**

- Wear OS：查看今日、语音添加 To-Do、提醒处理
- Tablet/Foldable：列表 + 详情双栏
- ChromeOS：键盘快捷键、窗口化体验

## P2：探索，不建议写进首发承诺

### 1. Gemini 深度集成

目前 Android 侧公开、稳定、可审核的第三方 App 深度接入路径仍以 App Actions、Shortcuts、Deep Links 为主。Gemini 是否能像 Apple Intelligence + App Intents 那样稳定理解 Jovida 的 TodoEntity，不应作为近期 PRD 承诺。

**可探索**

- Gemini 分享内容到 Jovida
- Gemini 调起 Jovida deep link
- Gemini Extensions 类能力，如果 Google 后续开放稳定 API

### 2. 系统全局搜索 Jovida To-Do

Android 没有一个像 iOS Spotlight + App Entities 那样统一、产品可控的体验。可用 AppSearch 建本地索引，但“系统桌面搜索一定出现 Jovida To-Do card”不可作为 P0/P1 验收。

### 3. 无障碍服务做截屏/自动化

不要用 Accessibility Service 来做静默截屏、自动读屏、自动点击。虽然技术上可能绕出一些能力，但这是高风险路径，用户信任和 Play 审核都不值得。

### 4. 厂商私有能力

比如三星侧键、小米快捷手势、Pixel Quick Tap、ColorOS 智能侧边栏等，都不适合作为首发主路径。最多后续做厂商增强教程。

## 需要删除或改名的 iOS 文案

| 当前 iOS 文案 | Android 建议 |
| --- | --- |
| Create To-Dos with Shortcuts | Quick Create |
| Shortcuts Guide | Quick Create Setup |
| Back Tap | 删除 |
| Action Button | 删除 |
| Double-Tap Back to Create To-Dos Fast | Add a Jovida shortcut to your Home screen |
| Siri to To-Do | Google Assistant 或删除 |
| Add to-do via Siri | Add To-Dos with Google Assistant |
| Apple Calendar | Local Calendars |
| Apple Reminders | 删除 / Google Tasks Import |
| Screenshot Create | Share Screenshot |
| Clipboard Create | Paste from Clipboard |
| Restore Purchase | Manage subscription / Refresh purchase status |

## Android Settings 建议结构

P0 Settings 顶部模块：

1. Quick Create
2. Email to To-Do
3. Import & Integration

系统权限模块：

1. Permission Management
2. Notifications
3. Alarms & reminders
4. Microphone
5. Calendar

其他模块保持：

1. Sound Effects
2. Terms and Conditions
3. Privacy Policy
4. Redeem promo code
5. Account Management
6. Log out

## Android Import & Integration 建议结构

未连接态：

- Calendars
  - Google Calendar：Connect
  - Local Calendars：Connect

已连接态：

- Calendars
  - Google Calendar：Connected · user@gmail.com
  - Local Calendars：Connected

P1 再加：

- Imports
  - Google Tasks：Import
  - Microsoft To Do：Import

## Android Quick Create 建议结构

页面标题：`Quick Create`

说明：`Create To-Dos from your Home screen, share menu, or Jovida`

入口：

1. `Voice Dump`
   - `Start recording ideas right away`
2. `Text To-Do`
   - `Open a quick text input`
3. `Share Screenshot`
   - `Share a screenshot to Jovida`
4. `Paste from Clipboard`
   - `Open Jovida and paste copied text`
5. `Quick Create`
   - `Choose voice, text, screenshot, or clipboard`

底部教程：

- `Add shortcuts to Home screen`
- `Use Android share menu`
- `Enable notifications`

## P0 验收清单

### 创建与输入

- 用户可从 App 内创建 To-Do
- 用户可从桌面 shortcut 打开 Voice Dump
- 用户可从桌面 shortcut 打开 Text To-Do
- 用户可通过 Android Share Sheet 分享文本/图片到 Jovida
- 用户可在 Jovida 前台通过剪贴板创建 To-Do
- 截图创建不承诺自动截屏，只承诺分享截图

### 提醒

- 通知权限未开时有清楚引导
- 普通 Reminder 可正常触达
- Alarm Reminder 权限未开时可降级
- App 重启/设备重启后提醒状态不丢

### Calendar

- Google Calendar 可连接/断开
- Local Calendars 可授权读取
- 子日历可展示/隐藏
- Event row 在列表中展示时间段、日历来源、过期置灰状态
- Event detail 展示 calendar、reminder、repeat、location、attendee、note 等字段

### Email to To-Do

- 专属邮箱可复制/重置
- 转发邮件后后台生成 To-Do
- 通过聊天告知“收到邮件并生成 To-Do”
- Chat quota 不足时不生成 To-Do，并在聊天中提示升级

### 付费

- Android Paywall 使用 Google Play Billing
- Max quota 中明确 Email to To-Do 计入 Chats / Smart AI quota
- 订阅成功、失败、恢复/刷新状态都可闭环

### 平台一致性

- Android 版不出现 iOS Shortcuts、Back Tap、Action Button、Siri、Apple Reminders、StoreKit、APNs 等 iOS-only 文案
- 所有权限引导均使用 Android 语境

## 风险与待决策

### 市场与分发

如果 Android 版只做 Google Play，Google Sign-In、FCM、Google Calendar、Google Play Billing 都顺。如果要做中国大陆 Android 渠道，至少需要另开一版：

- 推送：FCM 替代方案
- 付费：国内支付/订阅方案
- 登录：手机号/微信/邮箱
- Calendar：Google Calendar 不再是默认主力
- Assistant：不能作为卖点

### Google Assistant 不稳定性

App Actions 官方仍可用，但其触发、审核、语言和 Gemini 时代的入口形态存在不确定性。产品上应该把它写成增强入口，而不是创建 To-Do 的主路径。

### Exact alarm 审核与用户授权

Jovida 是 To-Do/Reminder 类产品，可以争取闹钟/提醒能力，但仍要避免滥用 exact alarm 和 full-screen intent。P0 以普通通知稳定为先，Alarm Reminder 作为用户主动开启的强提醒。

### 截屏与剪贴板隐私

Android 对截屏和剪贴板越来越强调用户可见授权。Jovida 应把“用户主动分享/粘贴”作为产品原则，不走静默采集。

## 官方资料

- Android App Actions / Built-in Intents：https://developer.android.com/develop/devices/assistant/get-started
- Android Built-in Intents：https://developer.android.com/develop/devices/assistant/intents
- Android App Shortcuts：https://developer.android.com/develop/ui/compose/system/shortcuts
- Android Direct Share：https://developer.android.com/training/sharing/direct-share-targets
- Android Calendar Provider：https://developer.android.com/identity/providers/calendar-provider
- Android AppSearch：https://developer.android.com/develop/ui/views/search/appsearch
- Android MediaProjection：https://developer.android.com/media/grow/media-projection
- Android notification runtime permission：https://developer.android.com/develop/ui/compose/notifications/notification-permission
- Android exact alarms：https://developer.android.com/develop/background-work/services/alarms
- Android 14 exact alarm changes：https://developer.android.com/about/versions/14/changes/schedule-exact-alarms
- Android clipboard security：https://developer.android.com/privacy-and-security/risks/secure-clipboard-handling
- Android foreground service types：https://developer.android.com/develop/background-work/services/fgs/service-types
- Google Play Billing subscriptions：https://developer.android.com/google/play/billing/subscriptions
