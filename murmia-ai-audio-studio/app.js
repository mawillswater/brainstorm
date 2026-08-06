const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const modeConfig = {
  speech: {
    placeholder: '输入或粘贴需要转换为语音的文本',
    emptyTitle: '输入一段文字',
    emptyHint: '描述表演方式，或直接粘贴你的脚本',
    button: '生成语音',
    models: [
      ['ElevenLabs v3', 'v3', '最自然的情绪和表演控制'],
      ['ElevenLabs v2', 'v2', '长文本稳定、多语言一致'],
      ['MiniMax Speech 2.8 HD', 'M2.8', '高保真、强音色复刻'],
      ['Seed Audio 1.0', 'Seed', '自然语气、多语言表达']
    ],
    voice: true,
    quick: [
      ['讲述一个故事', '凌晨的雨落在工坊窗上。他握着尚未完成的戒指，声音很轻，却不再躲闪。'],
      ['录制播客开场', '欢迎来到今天的科技播客。我们将用十分钟，拆解本周最值得关注的 AI 产品变化。'],
      ['引导一次冥想', '让肩膀慢慢放松。无需改变呼吸，只需要注意空气进入身体时细微的温度。'],
      ['生成产品解说', '现在开始，我们会把复杂的产品能力，解释成每个人都能理解的三个步骤。']
    ],
    params: ['稳定性', '42', '较低更有表现力，较高更稳定', '风格强度', '64', '提高情绪与表达风格的明显程度', '增强相似度', '让输出更接近所选音色']
  },
  sfx: {
    placeholder: '描述你想生成的声音、空间、距离与动作',
    emptyTitle: '描述一种声音',
    emptyHint: '例如：近距离铁锤敲击铁砧，干燥工坊，无背景音乐',
    button: '生成音效',
    models: [
      ['ElevenLabs 音效模型', '音效', '自然事件声与动作拟音'],
      ['Seed Audio 1.0', 'Seed', '复杂情境与长段声音'],
      ['AudioGen Studio', 'AG', '短促、清晰的事件音']
    ],
    voice: false,
    quick: [
      ['自然环境', '深夜森林中的细雨，树叶滴水，远处偶尔传来低沉雷声，宽阔立体声'],
      ['动作拟音', '近距离铁锤敲击铁砧三次，金属余响清晰，干燥安静的工坊'],
      ['奇妙 ASMR', '玻璃水果被柔软银色刀刃缓慢切开，细腻、清脆、贴近双耳'],
      ['空间氛围', '空旷旧火车站的午夜环境，远处列车低鸣，脚步声缓慢经过']
    ],
    params: ['提示词遵循度', '72', '越高越严格遵循声音描述', '变化程度', '48', '控制每次生成的随机性', '无缝循环', '让首尾自然衔接']
  },
  music: {
    placeholder: '描述风格、情绪、乐器、结构和使用场景',
    emptyTitle: '描述一段音乐',
    emptyHint: '例如：克制弦乐，温暖但不甜腻，适合情绪转折',
    button: '生成音乐',
    models: [
      ['Eleven Music v2', 'M v2', '完整结构与细腻风格控制'],
      ['Lyria 3 Pro', 'L3', '电影感配乐与器乐生成'],
      ['MusicGen Studio', 'MG', '快速生成短音乐小样']
    ],
    voice: false,
    quick: [
      ['电影配乐', '克制的弦乐与低音钢琴，缓慢积累力量，适合亲密故事的情绪转折'],
      ['睡眠音乐', '温暖的模拟合成器与极轻钢琴，无鼓点，缓慢呼吸般起伏'],
      ['播客片头', '未来感但可信赖的科技播客片头，12 秒，结尾干净落点'],
      ['儿童主题', '手风琴、木琴与柔和弦乐，轻快好奇，不幼稚']
    ],
    params: ['创意程度', '58', '控制风格探索与提示词一致性的平衡', '结构变化', '66', '提高段落之间的音乐发展', '纯器乐', '关闭人声与歌词生成']
  },
  changer: {
    placeholder: '先上传或录制一段声音，再描述希望转换成的音色',
    emptyTitle: '上传一段需要转换的声音',
    emptyHint: '保留原始表演，将声音转换成目标角色',
    button: '选择音频',
    models: [
      ['ElevenLabs 声音转换', '转换', '保留情绪与节奏的声音转换'],
      ['MiniMax 音色设计', 'MM', '高相似度角色音色设计'],
      ['Seed Audio 声音转换', 'Seed', '自然韵律与多语言转换']
    ],
    voice: true,
    quick: [
      ['上传录音', ''],
      ['保留表演情绪', '保留原始语速、停顿与情绪，只改变音色'],
      ['更年轻', '声音更年轻、清澈，但仍保持自然真人感'],
      ['角色化', '转换成沉稳、温暖、略带疲惫感的成年男性角色']
    ],
    params: ['音色相似度', '78', '提高与目标音色的接近程度', '表演保留', '86', '保留原始录音的节奏和情绪', '移除底噪', '转换前清理原始录音']
  },
  isolator: {
    placeholder: '上传含有人声、音乐或环境噪音的音频',
    emptyTitle: '上传需要分离人声的音频',
    emptyHint: '提取干净人声，并保留可单独下载的背景轨',
    button: '选择音频',
    models: [
      ['ElevenLabs 人声分离', '分离', '快速提取清晰人声'],
      ['Murmia 工作室分离', 'MS', '人声、音乐、环境三轨分离'],
      ['Demucs v4 高质量版', 'D4', '本地高质量多音轨分离']
    ],
    voice: false,
    quick: [
      ['提取人声', '从音频中提取干净人声，并去除背景音乐和环境噪声'],
      ['保留环境', '分离人声，但把房间氛围保留成独立音轨'],
      ['分离音乐', '将对白、背景音乐和其他声音分别导出'],
      ['清理录音', '去除持续空调声、电脑风扇声和轻微混响']
    ],
    params: ['分离强度', '70', '越高越彻底，但可能损伤细节', '细节保留', '74', '保留呼吸与细微辅音', '保留背景轨', '同时输出被分离的背景声音']
  }
};

const agentSkills = {
  'audio-roleplay': {name: '音频角色扮演', slug: '/audio-roleplay', placeholder: '描述角色、听众身份和想经历的情境，或上传已有脚本'},
  audiobook: {name: '有声书制作', slug: '/audiobook-production', placeholder: '粘贴或上传小说，告诉 Agent 想采用的旁白和角色方向'},
  'audio-drama': {name: '广播剧制作', slug: '/audio-drama-production', placeholder: '粘贴剧本或小说，Agent 会先整理章节、画本、角色与声音计划'},
  'kids-drama': {name: '儿童剧制作', slug: '/kids-audio-drama', placeholder: '描述年龄、主题、角色和时长，或上传儿童故事'},
  podcast: {name: '播客制作', slug: '/podcast-production', placeholder: '描述播客主题、听众和节目形式，或上传资料与提纲'},
  'story-asmr': {name: '故事 ASMR', slug: '/story-asmr', placeholder: '描述亲密故事、听众身份、空间和希望产生的情绪'}
};

const state = {
  workspace: 'generate',
  mode: 'speech',
  model: 'ElevenLabs v3',
  modelBadge: 'v3',
  voice: 'Arabella · 温暖叙事',
  agentSkill: ''
};

const appShell = $('.app-shell');
const homeSection = $('.home');
const workspacePage = $('#workspacePage');
const promptInput = $('#promptInput');
const promptEmpty = $('#promptEmpty');
const generateButton = $('#generateButton');
const modelMenu = $('#modelMenu');
const voiceMenu = $('#voiceMenu');
const agentSkillMenu = $('#agentSkillMenu');
const parameterPanel = $('#parameterPanel');
let toastTimer;
let redCliffDemoSeeded = false;
let pendingGenerateButton = null;
let commerceDemoStep = 0;
let semDemoReturnState = null;

const generationCosts = {
  speech: '预计 300 点',
  sfx: '预计 120 点',
  music: '预计 750 点',
  changer: '预计 120 点 / 分钟',
  isolator: '预计 90 点 / 分钟'
};

const commerceDemoSteps = [
  {title:'账户与余额入口', copy:'悬停顶栏账户区域，直接查看会员状态、当前余额和存储空间', action:'balance'},
  {title:'独立的点数历史', copy:'点数历史在新标签页打开，不打断当前正在进行的创作', action:'usage'},
  {title:'生成时额度不足', copy:'只说明当前余额和本月总额度，不展示容易造成压力的任务预估金额', action:'insufficient'},
  {title:'进入会员订阅', copy:'点击升级后打开订阅大浮窗，不离开当前作品或工具页面', action:'pricing'},
  {title:'默认年付优惠', copy:'默认展示年付方案，并突出显示立省 17% 的优惠标签', action:'yearly'},
  {title:'确认订阅方案', copy:'选择套餐后确认计费周期、每月点数与本次支付金额', action:'checkout'},
  {title:'升级完成', copy:'订阅成功后发放新额度，并让用户清楚知道会员已经生效', action:'success'}
];

const redCliffTenChapterText = `《赤壁之战》十章小说原文

第一章　江东急报
建安十三年秋，曹操率大军南下。战报一封接一封送入江东，孙权召集群臣议事。主降与主战之声在殿中相争，周瑜奉召自鄱阳归来。

第二章　曹军压境
曹军沿江列营，号称八十万。江面战船相连，旌旗遮天。江东斥候连夜回报，百姓与军士都感到大战将至。

第三章　群英聚会
诸葛亮随鲁肃过江，与孙权、周瑜相见。他逐一分析曹军远来疲惫、不习水战的弱点，江东终于定下抗曹之策。

第四章　蒋干盗书
蒋干渡江劝降，被周瑜设宴款待。夜深之后，他误将伪造的书信带回曹营，曹操因此斩杀熟悉水战的蔡瑁、张允。

第五章　苦肉计
黄盖当众顶撞周瑜，受刑之后秘密遣人向曹操诈降。曹操虽然多疑，仍被连番布置逐渐蒙蔽。

第六章　连环计
庞统来到曹营，建议把战船首尾相连，使北方军士如履平地。曹操欣然采纳，却没有察觉这正为火攻创造条件。

第七章　借取东风
火攻诸事俱备，只欠东南风。诸葛亮登上七星坛，观察天象。入夜之后，江旗转向，东南风终于吹起。

第八章　火烧赤壁
黄盖率蒙冲斗舰顺风驶向曹营。船中柴草同时点燃，火势借风扑向连环战船，江面顷刻化作一片火海。

第九章　败走华容
曹操率残军突围，在泥泞与风雨中奔向华容道。关羽念及旧恩，在杀与放之间作出选择。

第十章　战后余波
江上余火渐熄，三方势力重新划定边界。周瑜清点战果，诸葛亮遥望西方，知道真正的争夺才刚刚开始。

制作要求：先整理十章结构并生成第一章画本。只制作第一章完整音频，其余九章保持待生成。`;

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2300);
}

function closeCommerceModal() {
  $('#commerceModalBackdrop').hidden = true;
  $('#commerceModal').innerHTML = '';
  $('#commerceModal').className = 'commerce-modal';
}

function showCommerceModal(type, detail = {}) {
  const modal = $('#commerceModal');
  modal.className = `commerce-modal${type === 'pricing' ? ' subscription-modal' : ''}`;
  const planPurchase = {
    '免费版': {monthly:0, yearly:0, credits:'2,000'},
    '入门版': {monthly:9, yearly:90, credits:'12,000'},
    '创作者版': {monthly:29, yearly:290, credits:'45,000'},
    '专业版': {monthly:79, yearly:790, credits:'140,000'},
    '工作室版': {monthly:199, yearly:1990, credits:'400,000'}
  }[detail.plan] || {monthly:79, yearly:790, credits:'140,000'};
  const estimateAmount = detail.amount || '300';
  const isChapterEstimate = detail.context === 'chapter';
  const templates = {
    pricing: `
      <header class="subscription-modal-header"><div><small>会员订阅</small><h2>选择适合你的创作额度</h2></div><button data-commerce-close>×</button></header>
      <div class="subscription-pricing">${pricingPage()}</div>
    `,
    estimate: `
      <header><div><small>生成前确认</small><h2>预计消耗 ${estimateAmount} 点</h2></div><button data-commerce-close>×</button></header>
      <div class="cost-breakdown">
        ${isChapterEstimate ? `
          <span><b>角色语音与旁白</b><em>5,400 点</em></span>
          <span><b>核心音效与环境声</b><em>1,500 点</em></span>
          <span><b>背景音乐与工程验收</b><em>1,500 点</em></span>
        ` : `
          <span><b>高表现力语音</b><em>${estimateAmount} 点</em></span>
          <span><b>本次预计时长</b><em>约 1 分钟</em></span>
        `}
        <span><b>当前余额</b><em>34,200 点</em></span>
      </div>
      <p class="commerce-note">任务开始时先冻结预计点数，完成后按实际用量结算；生成失败自动退回</p>
      <footer><button data-commerce-close>返回修改</button><button class="primary" data-confirm-generation>确认生成</button></footer>
    `,
    insufficient: `
      <header><div><small>生成暂未开始</small><h2>本月额度不足</h2></div><button data-commerce-close>×</button></header>
      <div class="balance-status"><span><small>当前余额</small><b>120 点</b></span><span><small>本月总额度</small><b>45,000 点</b></span></div>
      <div class="quota-insufficient-note"><i>!</i><div><b>当前额度不足</b><span>升级会员可获得更高的每月点数额度</span></div></div>
      <footer><button class="primary" data-open-pricing>升级会员</button></footer>
    `,
    topup: `
      <header><div><small>充值点数</small><h2>完成本月的大项目</h2></div><button data-commerce-close>×</button></header>
      <p class="commerce-note">充值点数仅向付费会员开放，有效期 12 个月，优先使用即将过期的套餐点数</p>
      <div class="topup-grid">
        ${[['$10','10,000'],['$25','27,500'],['$50','60,000'],['$100','130,000']].map(([price,credits], index) => `<button class="${index === 1 ? 'selected' : ''}" data-topup-pack="${price}" data-topup-credits="${credits}"><b>${credits}</b><small>点</small><strong>${price}</strong></button>`).join('')}
      </div>
      <div class="after-balance"><span>充值后余额</span><b id="afterTopupBalance">61,700 点</b></div>
      <footer><button data-commerce-close>取消</button><button class="primary" data-confirm-topup>确认购买 $25</button></footer>
    `,
    checkout: `
      <header><div><small>确认订阅</small><h2>${detail.plan || '专业版'}</h2></div><button data-commerce-close>×</button></header>
      <div class="checkout-summary">
        <span><small>计费周期</small><b>${detail.yearly ? '年付' : '月付'}</b></span>
        <span><small>每月点数</small><b>${planPurchase.credits} 点</b></span>
        <span><small>本次支付</small><b>$${detail.yearly ? planPurchase.yearly : planPurchase.monthly}.00</b></span>
      </div>
      <ul class="checkout-benefits"><li>付费内容商业使用许可</li><li>所有核心模型均可使用</li><li>点数最多滚存两个月</li><li>按月发放点数，不会一次性透支全年额度</li></ul>
      <footer><button data-commerce-close>返回套餐</button><button class="primary" data-confirm-subscription>确认并订阅</button></footer>
    `,
    export: `
      <header><div><small>导出作品</small><h2>第一章 · 江东急报</h2></div><button data-commerce-close>×</button></header>
      <div class="export-options">
        <label class="selected"><input type="radio" name="export" checked><span><b>MP3 成品</b><small>直接发布 · 免费</small></span><em>可用</em></label>
        <label><input type="radio" name="export"><span><b>WAV 成品</b><small>48 kHz · 继续精修</small></span><em>可用</em></label>
        <label><input type="radio" name="export"><span><b>分轨 Stems</b><small>对白、音效、环境与配乐</small></span><em>创作者版</em></label>
      </div>
      <div class="rights-check"><span>✓</span><div><b>商业使用与素材授权检查通过</b><small>2 条 CC BY 素材的作者信息将写入授权清单</small></div></div>
      <p class="commerce-note">导出已有结果不消耗点数</p>
      <footer><button data-commerce-close>取消</button><button class="primary" data-confirm-export>开始导出</button></footer>
    `,
    success: `
      <div class="commerce-success"><span>✓</span><small>订阅已更新</small><h2>现在是专业版</h2><p>140,000 点已发放到本月余额，高优先队列立即生效</p><button class="primary" data-page-after-modal="订阅与账单">查看订阅与账单</button></div>
    `
  };
  modal.innerHTML = templates[type] || templates.estimate;
  $('#commerceModalBackdrop').hidden = false;
}

function clearDemoFocus() {
  $$('.commerce-demo-focus').forEach(item => item.classList.remove('commerce-demo-focus'));
}

function openPage(page) {
  if (page === '价格与套餐') {
    closeTopbarMenus();
    showCommerceModal('pricing');
    return;
  }
  if (page === '点数与用量') {
    window.open('./index.html?view=points', '_blank', 'noopener');
    return;
  }
  const nav = $(`.nav-item[data-page="${page}"]`);
  showWorkspacePage(page, nav);
}

function revealSidebarItem(navItem) {
  if (!navItem) return;
  appShell.classList.remove('sidebar-collapsed');
  navItem.classList.remove('route-arrival');
  void navItem.offsetWidth;
  navItem.classList.add('route-arrival');
  requestAnimationFrame(() => navItem.scrollIntoView({behavior:'smooth', block:'center', inline:'nearest'}));
  window.setTimeout(() => navItem.classList.remove('route-arrival'), 1400);
}

const topbarToolPages = new Set(['文本转语音','音效','音乐生成','音色设计','音色克隆','视频配音','声音转换','人声分离','音频增强','录音工作室','制作人标签','音频编辑器']);
const topbarWorkPages = new Set(['AI 播客生成','AI 有声书生成','脚本转广播剧','AI 儿童剧生成','故事 ASMR 生成','内容转音频']);

function closeTopbarMenus(except = null) {
  $$('[data-top-menu]').forEach(menu => {
    if (menu !== except) menu.hidden = true;
  });
  $$('[data-top-menu-trigger]').forEach(trigger => {
    const menu = $(`[data-top-menu="${trigger.dataset.topMenuTrigger}"]`);
    trigger.setAttribute('aria-expanded', String(menu === except && !menu.hidden));
  });
  if (except !== $('#topProfileMenu')) {
    $('#topProfileMenu').hidden = true;
    $('#topProfileButton').setAttribute('aria-expanded', 'false');
  }
}

function syncTopNavigation(page) {
  $$('[data-top-page], [data-top-group], #topProfileButton').forEach(item => item.classList.remove('active'));
  if (page === '首页') $('[data-top-page="首页"]')?.classList.add('active');
  else if (page === '音色库') $('[data-top-page="音色库"]')?.classList.add('active');
  else if (page === '资产库') $('[data-top-page="资产库"]')?.classList.add('active');
  else if (page === '价格与套餐') $('[data-top-page="价格与套餐"]')?.classList.add('active');
  else if (['订阅与账单','点数与用量'].includes(page)) $('#topProfileButton')?.classList.add('active');
  else if (topbarToolPages.has(page)) $('[data-top-group="tools"]')?.classList.add('active');
  else if (topbarWorkPages.has(page) || page === '音频创作 Agent') $('[data-top-group="works"]')?.classList.add('active');
}

function closeMenus(except) {
  [
    [modelMenu, $('#modelButton')],
    [voiceMenu, $('#voiceButton')],
    [agentSkillMenu, $('#agentSkillButton')]
  ].forEach(([menu, button]) => {
    if (menu !== except) {
      menu.hidden = true;
      button.classList.remove('open');
    }
  });
}

function renderModelMenu() {
  const config = modeConfig[state.mode];
  modelMenu.innerHTML = config.models.map(([name, badge, description], index) => `
    <button data-model="${name}" data-badge="${badge}" class="${state.model === name ? 'selected' : ''}">
      <span class="model-option-icon">${badge}</span>
      <span><b>${name}</b><small>${description}</small></span>
      <em>${index === 0 ? '1× 点数' : index === 1 ? '0.7× 点数' : '0.8× 点数'}</em>
    </button>
  `).join('');

  $$('[data-model]', modelMenu).forEach(button => {
    button.addEventListener('click', () => {
      state.model = button.dataset.model;
      state.modelBadge = button.dataset.badge;
      $('#modelLabel').textContent = state.model;
      $('#modelBadge').textContent = state.modelBadge;
      renderModelMenu();
      modelMenu.hidden = true;
      $('#modelButton').classList.remove('open');
      showToast(`已切换至 ${state.model}`);
    });
  });
}

function updateGenerationCost() {
  $('#generationCost').textContent = state.workspace === 'agent'
    ? '规划免费 · 生成素材前确认'
    : generationCosts[state.mode];
}

function renderQuickPrompts() {
  const config = modeConfig[state.mode];
  $('#quickPrompts').innerHTML = config.quick.map(([label, prompt]) =>
    `<button data-prompt="${prompt.replaceAll('"', '&quot;')}">${label}</button>`
  ).join('');
  $$('[data-prompt]', $('#quickPrompts')).forEach(button => {
    button.addEventListener('click', () => {
      const prompt = button.dataset.prompt;
      if (!prompt && (state.mode === 'changer' || state.mode === 'isolator')) {
        showToast('模拟打开系统文件选择器');
        return;
      }
      promptInput.value = prompt;
      updatePromptState();
      promptInput.focus();
    });
  });
}

function renderParameters() {
  const p = modeConfig[state.mode].params;
  $('#rangeOneLabel').textContent = p[0];
  $('#rangeOne').value = p[1];
  $('#rangeOneValue').textContent = p[1];
  $('#rangeOneHint').textContent = p[2];
  $('#rangeTwoLabel').textContent = p[3];
  $('#rangeTwo').value = p[4];
  $('#rangeTwoValue').textContent = p[4];
  $('#rangeTwoHint').textContent = p[5];
  $('#toggleLabel').textContent = p[6];
  $('#toggleHint').textContent = p[7];
  $('#paramsSummary').textContent = `${p[0]} ${p[1]} · ${p[3]} ${p[4]}`;
}

function selectDefaultModel() {
  const first = modeConfig[state.mode].models[0];
  state.model = first[0];
  state.modelBadge = first[1];
  $('#modelLabel').textContent = first[0];
  $('#modelBadge').textContent = first[1];
}

function updatePromptState() {
  const hasValue = Boolean(promptInput.value.trim());
  promptEmpty.classList.toggle('hidden', hasValue);
  const uploadMode = state.mode === 'changer' || state.mode === 'isolator';
  generateButton.disabled = !hasValue && !uploadMode && state.workspace === 'generate';
  if (state.workspace === 'agent') generateButton.disabled = !hasValue;
}

function switchMode(mode) {
  state.mode = mode;
  const config = modeConfig[mode];
  $$('.mode-button').forEach(button => button.classList.toggle('active', button.dataset.mode === mode));
  promptInput.value = '';
  promptInput.placeholder = config.placeholder;
  $('#emptyTitle').textContent = config.emptyTitle;
  $('#emptyHint').textContent = config.emptyHint;
  $('#generateText').textContent = config.button;
  $('#voiceSelectWrap').hidden = !config.voice;
  selectDefaultModel();
  renderModelMenu();
  renderQuickPrompts();
  renderParameters();
  updateGenerationCost();
  closeMenus();
  parameterPanel.hidden = true;
  updatePromptState();
}

function switchWorkspace(workspace) {
  state.workspace = workspace;
  $$('.creation-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.workspace === workspace));
  const isAgent = workspace === 'agent';
  $('#modeRow').hidden = false;
  $('[data-home-agent-mode]')?.classList.toggle('active', isAgent);
  $('#agentContext').hidden = true;
  $('#modelSelectWrap').hidden = isAgent;
  $('#voiceSelectWrap').hidden = isAgent || !modeConfig[state.mode].voice;
  $('#paramsButton').hidden = isAgent;
  $('#agentSkillWrap').hidden = !isAgent;

  promptInput.value = '';
  if (isAgent) {
    $$('.mode-button[data-mode]').forEach(button => button.classList.remove('active'));
    const skill = agentSkills[state.agentSkill];
    promptInput.placeholder = skill?.placeholder || '描述想完成的作品，或粘贴、上传脚本和参考资料';
    $('#emptyTitle').textContent = '从一个想法、脚本或参考音频开始';
    $('#emptyHint').textContent = skill ? `已加载 ${skill.name}` : '可以先选择一个 Skill，也可以直接告诉 Agent 你的想法';
    $('#generateText').textContent = '开始创作';
    $('#quickPrompts').innerHTML = `
      <button data-agent-seed="我有一篇小说，希望做成多角色广播剧">上传剧本或小说</button>
      <button data-agent-seed="我想做一个发生在深夜工坊的亲密音频角色扮演作品，有雨声、锻造音效和完整配乐">描述作品想法</button>
      <button data-agent-seed="请参考我上传的音频，保留相似的情绪强度与空间感">添加参考音频</button>
    `;
    $$('[data-agent-seed]').forEach(button => button.addEventListener('click', () => {
      promptInput.value = button.dataset.agentSeed;
      updatePromptState();
      promptInput.focus();
    }));
    state.model = 'Murmia Agent';
    state.modelBadge = 'AI';
    $('#modelLabel').textContent = '自动选择音频模型';
    $('#modelBadge').textContent = 'AI';
    $('#agentSkillLabel').textContent = skill ? skill.name : '选择创作 Skill';
    $('#agentSkillButton').classList.toggle('loaded', Boolean(skill));
    $$('[data-load-skill]', agentSkillMenu).forEach(button => button.classList.toggle('selected', button.dataset.loadSkill === state.agentSkill));
    $$('[data-quick-skill]').forEach(button => button.classList.toggle('active', button.dataset.quickSkill === state.agentSkill));
  } else {
    $('[data-home-agent-mode]')?.classList.remove('active');
    switchMode(state.mode);
    $$('[data-quick-skill]').forEach(button => button.classList.remove('active'));
  }
  parameterPanel.hidden = true;
  closeMenus();
  updateGenerationCost();
  updatePromptState();
}

function addGeneratedResult() {
  const label = state.workspace === 'agent'
    ? ['沉浸式音频作品 · 制作计划', '音频创作 Agent · 自动选择模型 · 刚刚']
    : [`${modeConfig[state.mode].button} · 新版本`, `${state.model} · 刚刚`];
  const item = document.createElement('article');
  item.className = 'home-project-card';
  item.innerHTML = `
    <span class="project-type">${state.workspace === 'agent' ? '完整作品' : '音频素材'}</span>
    <b>${label[0]}</b>
    <small>${label[1]}</small>
    <i style="--progress:100%"></i>
  `;
  $('#recentList')?.prepend(item);
  item.animate([{opacity: 0, transform: 'translateY(-8px)'}, {opacity: 1, transform: 'none'}], {duration: 360, easing: 'ease-out'});
}

$('#sidebarToggle').addEventListener('click', () => {
  appShell.classList.toggle('sidebar-collapsed');
});

function showHome(workspace = 'generate', activeItem) {
  appShell.classList.remove('editor-active');
  $('#editorBackButton').hidden = true;
  workspacePage.hidden = true;
  workspacePage.classList.remove('editor-page');
  homeSection.hidden = false;
  $('#pageName').textContent = '首页';
  syncTopNavigation(workspace === 'agent' ? '音频创作 Agent' : '首页');
  $$('.nav-item').forEach(nav => nav.classList.toggle('active', nav === activeItem));
  switchWorkspace(workspace);
  if (new URLSearchParams(window.location.search).get('view') === 'voices') {
    history.replaceState(null, '', window.location.pathname);
  }
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function openSystemPicker(uploadZone) {
  const picker = document.createElement('input');
  picker.type = 'file';
  picker.accept = 'audio/*,video/*,image/*,.txt,.doc,.docx,.pdf';
  picker.addEventListener('change', () => {
    const file = picker.files?.[0];
    if (!file) return;
    uploadZone?.classList.add('has-file');
    const title = $('b', uploadZone);
    const hint = $('small', uploadZone);
    if (title) title.textContent = file.name;
    if (hint) hint.textContent = '文件已就绪，可继续设置并处理';
    showToast(`已选择 ${file.name}`);
  });
  picker.click();
}

function applyVoiceLibraryFilters() {
  const cards = $$('[data-voice-filter-result]', workspacePage);
  if (!cards.length) return;
  const query = $('.voice-library-search .library-search', workspacePage)?.value.trim().toLowerCase() || '';
  const activeTab = $('[data-voice-tab].active', workspacePage)?.dataset.voiceTab || '全部';
  const groups = {};
  $$('[data-voice-filter].active', workspacePage).forEach(button => {
    const value = button.dataset.filterValue;
    if (value === '全部') return;
    const group = button.dataset.voiceFilter === 'model' ? 'model' : button.dataset.voiceFilter;
    groups[group] ||= [];
    groups[group].push(value.toLowerCase());
  });

  const filtering = Boolean(query) || activeTab !== '全部' || Object.keys(groups).length > 0;
  const visibleIds = new Set();
  cards.forEach(card => {
    const haystack = card.dataset.searchItem.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesFilters = Object.values(groups).every(values => values.some(value => haystack.includes(value)));
    const favorite = $('[data-favorite].active', card) !== null;
    const matchesTab = activeTab === '全部' || (activeTab === '我的音色' && card.dataset.owned === 'true') || (activeTab === '收藏' && favorite);
    card.hidden = !(matchesQuery && matchesFilters && matchesTab);
    if (!card.hidden) visibleIds.add(card.dataset.voiceId);
  });

  $$('[data-voice-filter-summary]', workspacePage).forEach(summary => {
    const group = summary.dataset.voiceFilterSummary;
    const selected = $$(`[data-voice-filter="${group}"].active`, workspacePage)
      .filter(button => button.dataset.filterValue !== '全部')
      .map(button => $('span', button)?.textContent || button.dataset.filterValue);
    summary.textContent = selected.length === 0 ? '全部' : selected.length === 1 ? selected[0] : `已选 ${selected.length} 项`;
  });

  const topicContent = $('[data-voice-topic-content]', workspacePage);
  const results = $('[data-voice-filter-results]', workspacePage);
  if (topicContent) topicContent.hidden = filtering;
  if (results) results.hidden = !filtering;
  const note = $('[data-voice-results-note]', workspacePage);
  if (note) note.textContent = `找到 ${visibleIds.size} 个音色`;
  const empty = $('[data-voice-empty]', workspacePage);
  if (empty) empty.hidden = !filtering || visibleIds.size > 0;
}

function initWorkspaceInteractions() {
  if (workspacePage.dataset.interactionsBound === 'true') return;
  workspacePage.dataset.interactionsBound = 'true';

  workspacePage.addEventListener('click', event => {
    if (!event.target.closest('.voice-filter-control')) {
      $$('[data-voice-filter-popover]', workspacePage).forEach(popover => { popover.hidden = true; });
      $$('[data-voice-filter-menu]', workspacePage).forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
    }

    const pageLink = event.target.closest('[data-page-link]');
    if (pageLink) {
      openPage(pageLink.dataset.pageLink);
      showToast(`已进入 ${pageLink.dataset.pageLink}`);
      return;
    }

    const voiceFilterMenu = event.target.closest('[data-voice-filter-menu]');
    if (voiceFilterMenu) {
      const group = voiceFilterMenu.dataset.voiceFilterMenu;
      const popover = $(`[data-voice-filter-popover="${group}"]`, workspacePage);
      const nextOpen = popover?.hidden !== false;
      $$('[data-voice-filter-popover]', workspacePage).forEach(item => { item.hidden = true; });
      $$('[data-voice-filter-menu]', workspacePage).forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
      if (popover) popover.hidden = !nextOpen;
      voiceFilterMenu.setAttribute('aria-expanded', String(nextOpen));
      return;
    }

    const voiceFilterClose = event.target.closest('[data-voice-filter-close]');
    if (voiceFilterClose) {
      const control = voiceFilterClose.closest('.voice-filter-control');
      $('[data-voice-filter-popover]', control).hidden = true;
      $('[data-voice-filter-menu]', control).setAttribute('aria-expanded', 'false');
      return;
    }

    const voiceTab = event.target.closest('[data-voice-tab]');
    if (voiceTab) {
      $$('[data-voice-tab]', workspacePage).forEach(button => button.classList.toggle('active', button === voiceTab));
      applyVoiceLibraryFilters();
      return;
    }

    const voiceFilter = event.target.closest('[data-voice-filter]');
    if (voiceFilter) {
      const group = voiceFilter.dataset.voiceFilter;
      const value = voiceFilter.dataset.filterValue;
      if (group === 'tag') {
        voiceFilter.classList.toggle('active');
      } else if (value === '全部') {
        $$(`[data-voice-filter="${group}"]`, workspacePage).forEach(button => button.classList.toggle('active', button === voiceFilter));
      } else {
        voiceFilter.classList.toggle('active');
        const allOption = $(`[data-voice-filter="${group}"][data-filter-value="全部"]`, workspacePage);
        if (allOption) allOption.classList.remove('active');
        const selected = $$(`[data-voice-filter="${group}"].active`, workspacePage).filter(button => button.dataset.filterValue !== '全部');
        if (!selected.length && allOption) allOption.classList.add('active');
      }
      applyVoiceLibraryFilters();
      return;
    }

    const voiceClear = event.target.closest('[data-voice-clear]');
    if (voiceClear) {
      const input = $('.voice-library-search .library-search', workspacePage);
      if (input) input.value = '';
      $$('[data-voice-tab]', workspacePage).forEach((button, index) => button.classList.toggle('active', index === 0));
      ['language','age','model'].forEach(group => {
        $$(`[data-voice-filter="${group}"]`, workspacePage).forEach(button => button.classList.toggle('active', button.dataset.filterValue === '全部'));
      });
      $$('[data-voice-filter="tag"]', workspacePage).forEach(button => button.classList.remove('active'));
      applyVoiceLibraryFilters();
      return;
    }

    const voiceTopic = event.target.closest('[data-voice-topic]');
    if (voiceTopic) {
      const section = $(`[data-voice-section="${voiceTopic.dataset.voiceTopic}"]`, workspacePage);
      section?.scrollIntoView({behavior:'smooth', block:'start'});
      return;
    }

    const billingCycle = event.target.closest('[data-billing-cycle]');
    if (billingCycle) {
      $$('[data-billing-cycle]', workspacePage).forEach(button => button.classList.toggle('active', button === billingCycle));
      const yearly = billingCycle.dataset.billingCycle === 'yearly';
      $$('[data-monthly-price]', workspacePage).forEach(price => {
        price.textContent = yearly ? price.dataset.yearlyPrice : price.dataset.monthlyPrice;
        const suffix = price.nextElementSibling;
        if (suffix) suffix.textContent = yearly ? suffix.dataset.yearlySuffix : suffix.dataset.monthlySuffix;
      });
      showToast(yearly ? '已切换年付，全年价格相当于十个月' : '已切换月付');
      return;
    }

    const plan = event.target.closest('[data-plan-select]');
    if (plan && !plan.classList.contains('current')) {
      const yearly = $('[data-billing-cycle="yearly"]', workspacePage)?.classList.contains('active');
      showCommerceModal('checkout', {plan: plan.dataset.planSelect, yearly});
      return;
    }

    if (event.target.closest('[data-buy-credits]')) {
      showCommerceModal('topup');
      return;
    }

    const semTarget = event.target.closest('[data-sem-target]');
    if (semTarget) {
      semDemoReturnState = {
        scrollY: window.scrollY,
        family: $('[data-sem-family].active', workspacePage)?.dataset.semFamily || '全部',
        prototypeOnly: $('[data-sem-prototype-filter]', workspacePage)?.dataset.semPrototypeFilter === 'true',
        keyword: semTarget.dataset.semKeyword || ''
      };
      showWorkspacePage(semTarget.dataset.semTarget, null, {
        semBack: true,
        sourceKeyword: semDemoReturnState.keyword
      });
      showToast(`已进入 ${semTarget.dataset.semTarget} 落地页`);
      return;
    }

    const semBack = event.target.closest('[data-sem-back]');
    if (semBack && semDemoReturnState) {
      const restoreState = {...semDemoReturnState};
      semDemoReturnState = null;
      const semNav = $('.nav-item[data-page="SEM 演示"]');
      showWorkspacePage('SEM 演示', semNav, {scroll: false});
      $$('[data-sem-family]', workspacePage).forEach(button => {
        button.classList.toggle('active', button.dataset.semFamily === restoreState.family);
      });
      const prototypeFilter = $('[data-sem-prototype-filter]', workspacePage);
      if (prototypeFilter) {
        prototypeFilter.dataset.semPrototypeFilter = String(Boolean(restoreState.prototypeOnly));
        prototypeFilter.classList.toggle('active', Boolean(restoreState.prototypeOnly));
      }
      $$('[data-sem-row]', workspacePage).forEach(row => {
        const familyMismatch = restoreState.family !== '全部' && row.dataset.semRow !== restoreState.family;
        const prototypeMismatch = restoreState.prototypeOnly && row.dataset.semPrototype !== 'true';
        row.hidden = familyMismatch || prototypeMismatch;
      });
      requestAnimationFrame(() => {
        window.scrollTo({top: restoreState.scrollY, behavior: 'auto'});
      });
      showToast(`已返回 SEM 演示${restoreState.keyword ? ` · ${restoreState.keyword}` : ''}`);
      return;
    }

    const semFamily = event.target.closest('[data-sem-family]');
    if (semFamily) {
      $$('[data-sem-family]', semFamily.parentElement).forEach(button => button.classList.toggle('active', button === semFamily));
      const family = semFamily.dataset.semFamily;
      const prototypeOnly = $('[data-sem-prototype-filter]', workspacePage)?.dataset.semPrototypeFilter === 'true';
      $$('[data-sem-row]', workspacePage).forEach(row => {
        const familyMismatch = family !== '全部' && row.dataset.semRow !== family;
        const prototypeMismatch = prototypeOnly && row.dataset.semPrototype !== 'true';
        row.hidden = familyMismatch || prototypeMismatch;
      });
      showToast(family === '全部' ? '已展示全部关键词' : `已筛选 ${family}`);
      return;
    }

    const semPrototypeFilter = event.target.closest('[data-sem-prototype-filter]');
    if (semPrototypeFilter) {
      const nextState = semPrototypeFilter.dataset.semPrototypeFilter !== 'true';
      semPrototypeFilter.dataset.semPrototypeFilter = String(nextState);
      semPrototypeFilter.classList.toggle('active', nextState);
      const family = $('[data-sem-family].active', workspacePage)?.dataset.semFamily || '全部';
      $$('[data-sem-row]', workspacePage).forEach(row => {
        const familyMismatch = family !== '全部' && row.dataset.semRow !== family;
        const prototypeMismatch = nextState && row.dataset.semPrototype !== 'true';
        row.hidden = familyMismatch || prototypeMismatch;
      });
      showToast(nextState ? '只展示可体验原型' : '已展示全部关键词');
      return;
    }

    const sfxView = event.target.closest('[data-sfx-view]');
    if (sfxView) {
      $$('[data-sfx-view]', workspacePage).forEach(button => button.classList.toggle('active', button === sfxView));
      $$('[data-sfx-panel]', workspacePage).forEach(panel => {
        panel.hidden = panel.dataset.sfxPanel !== sfxView.dataset.sfxView;
      });
      showToast(sfxView.dataset.sfxView === 'search' ? '已切换到搜索音效' : '已切换到生成音效');
      return;
    }

    const sfxQuery = event.target.closest('[data-sfx-query]');
    if (sfxQuery) {
      const input = $('.sfx-search-input', workspacePage);
      input.value = sfxQuery.dataset.sfxQuery;
      input.focus();
      return;
    }

    const sfxSearch = event.target.closest('[data-sfx-search]');
    if (sfxSearch) {
      const input = $('.sfx-search-input', workspacePage);
      const results = $$('[data-sfx-result]', workspacePage);
      sfxSearch.disabled = true;
      sfxSearch.textContent = '搜索中…';
      results.forEach(result => result.classList.add('is-searching'));
      setTimeout(() => {
        sfxSearch.disabled = false;
        sfxSearch.textContent = '搜索';
        results.forEach((result, index) => {
          result.hidden = false;
          result.classList.remove('is-searching');
          result.animate(
            [{opacity: 0, transform: 'translateY(5px)'}, {opacity: 1, transform: 'none'}],
            {duration: 220 + index * 35, easing: 'ease-out'}
          );
        });
        const count = $('[data-sfx-result-count]', workspacePage);
        if (count) count.textContent = `为“${input.value.trim() || '全部音效'}”找到 6 个候选`;
        showToast('已完成多素材库搜索');
      }, 650);
      return;
    }

    const sfxSource = event.target.closest('[data-sfx-source]');
    if (sfxSource) {
      $$('[data-sfx-source]', sfxSource.parentElement).forEach(button => button.classList.toggle('active', button === sfxSource));
      const source = sfxSource.dataset.sfxSource;
      let visible = 0;
      $$('[data-sfx-result]', workspacePage).forEach(result => {
        result.hidden = source !== '全部来源' && result.dataset.source !== source;
        if (!result.hidden) visible += 1;
      });
      const count = $('[data-sfx-result-count]', workspacePage);
      if (count) count.textContent = source === '全部来源' ? '找到 6 个适合继续编辑的声音' : `${source} · ${visible} 个声音`;
      return;
    }

    const addSoundAsset = event.target.closest('[data-sfx-add]');
    if (addSoundAsset) {
      addSoundAsset.classList.toggle('added');
      addSoundAsset.textContent = addSoundAsset.classList.contains('added') ? '已加入资产' : '加入资产';
      showToast(addSoundAsset.classList.contains('added') ? `已将 ${addSoundAsset.dataset.sfxAdd} 加入资产库` : '已从资产库移除');
      return;
    }

    const workUpload = event.target.closest('[data-work-upload]');
    if (workUpload) {
      $('[data-work-file-picker]', workspacePage)?.click();
      return;
    }

    const workRemove = event.target.closest('[data-work-remove]');
    if (workRemove) {
      const picker = $('[data-work-file-picker]', workspacePage);
      if (picker) picker.value = '';
      const attachment = $('[data-work-attachment]', workspacePage);
      if (attachment) attachment.hidden = true;
      showToast('已移除文件');
      return;
    }

    const workSample = event.target.closest('[data-work-sample]');
    if (workSample) {
      const playing = !workSample.classList.contains('playing');
      $$('[data-work-sample]', workspacePage).forEach(button => {
        button.classList.toggle('playing', playing);
        const icon = $('i, span', button);
        if (icon) icon.textContent = playing ? 'Ⅱ' : '▶';
      });
      showToast(playing ? '正在播放 30 秒作品示例' : '已暂停示例');
      return;
    }

    const workProcess = event.target.closest('[data-open-work-process]');
    if (workProcess) {
      const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
      showEditorPage('音频创作 Agent', agentNav, {title: workProcess.dataset.openWorkProcess});
      showToast(`已打开 ${workProcess.dataset.openWorkProcess} 的制作过程`);
      return;
    }

    const useWorkSkill = event.target.closest('[data-use-work-skill]');
    if (useWorkSkill) {
      const prompt = $('.agent-work-prompt', workspacePage);
      prompt?.focus();
      prompt?.scrollIntoView({behavior:'smooth', block:'center'});
      showToast(`已加载 ${useWorkSkill.dataset.useWorkSkill}`);
      return;
    }

    const workStart = event.target.closest('[data-work-start]');
    if (workStart) {
      const prompt = $('.agent-work-prompt', workspacePage);
      const attachment = $('[data-work-attachment]', workspacePage);
      if (!prompt?.value.trim() && attachment?.hidden !== false) {
        prompt?.focus();
        showToast('请先描述作品或上传文件');
        return;
      }
      const original = workStart.innerHTML;
      workStart.disabled = true;
      workStart.innerHTML = '<span>Analyzing…</span><b>···</b>';
      const plan = $('[data-work-plan]', workspacePage);
      if (plan) plan.hidden = true;
      setTimeout(() => {
        workStart.disabled = false;
        workStart.innerHTML = original;
        if (plan) {
          plan.hidden = false;
          plan.animate(
            [{opacity:0, transform:'translateY(8px)'}, {opacity:1, transform:'none'}],
            {duration:280, easing:'ease-out'}
          );
          plan.scrollIntoView({behavior:'smooth', block:'center'});
        }
        showToast('内容分析完成，已生成第一版计划');
      }, 900);
      return;
    }

    const tab = event.target.closest('[data-subtab]');
    if (tab) {
      $$('.page-tab', tab.parentElement).forEach(item => item.classList.toggle('active', item === tab));
      showToast(`已切换到${tab.dataset.subtab}`);
      return;
    }

    const segment = event.target.closest('[data-segment]');
    if (segment) {
      const group = segment.closest('.source-switch, .view-switch, .segmented-control') || segment.parentElement;
      $$('[data-segment]', group).forEach(item => item.classList.toggle('active', item === segment));
      showToast(`已选择 ${segment.dataset.segment || segment.textContent.trim()}`);
      return;
    }

    const filter = event.target.closest('.filter-chip');
    if (filter) {
      filter.classList.toggle('active');
      return;
    }

    const changerSample = event.target.closest('[data-changer-sample]');
    if (changerSample) {
      changerSample.classList.toggle('playing');
      const icon = changerSample.matches('.changer-preview')
        ? changerSample
        : $('span', changerSample);
      if (icon) icon.textContent = changerSample.classList.contains('playing') ? 'Ⅱ' : '▶';
      showToast(changerSample.classList.contains('playing') ? `正在试听 ${changerSample.dataset.changerSample}` : '已暂停试听');
      return;
    }

    const changerVoice = event.target.closest('[data-changer-voice]');
    if (changerVoice) {
      $$('[data-changer-voice]', workspacePage).forEach(button => button.classList.toggle('selected', button === changerVoice));
      const target = $('[data-changer-target]', workspacePage);
      if (target) target.textContent = `目标：${changerVoice.dataset.changerVoice}`;
      const resultTitle = $('[data-vc-result-title]', workspacePage);
      if (resultTitle) resultTitle.textContent = `${changerVoice.dataset.changerVoice} · Converted take`;
      showToast(`已选择 ${changerVoice.dataset.changerVoice}`);
      return;
    }

    const changerInput = event.target.closest('[data-changer-input]');
    if (changerInput) {
      $$('[data-changer-input]', workspacePage).forEach(button => button.classList.toggle('active', button === changerInput));
      $$('[data-changer-panel]', workspacePage).forEach(panel => {
        panel.hidden = panel.dataset.changerPanel !== changerInput.dataset.changerInput;
      });
      return;
    }

    const vcRecord = event.target.closest('[data-vc-record]');
    if (vcRecord) {
      vcRecord.classList.toggle('recording');
      const title = $('b', vcRecord);
      const hint = $('small', vcRecord);
      if (title) title.textContent = vcRecord.classList.contains('recording') ? '正在录音 00:08' : '开始录音';
      if (hint) hint.textContent = vcRecord.classList.contains('recording') ? '再次点击结束并保留录音' : '使用浏览器麦克风';
      showToast(vcRecord.classList.contains('recording') ? '正在模拟录音' : '录音已保留');
      return;
    }

    const vcGenerate = event.target.closest('[data-vc-generate]');
    if (vcGenerate) {
      const original = vcGenerate.innerHTML;
      vcGenerate.disabled = true;
      vcGenerate.innerHTML = '<span>Changing…</span><b>···</b>';
      const result = $('[data-vc-result]', workspacePage);
      if (result) result.hidden = true;
      setTimeout(() => {
        vcGenerate.disabled = false;
        vcGenerate.innerHTML = original;
        if (result) {
          result.hidden = false;
          result.animate(
            [{opacity:0, transform:'translateY(8px)'}, {opacity:1, transform:'none'}],
            {duration:280, easing:'ease-out'}
          );
        }
        showToast('声音转换完成');
      }, 900);
      return;
    }

    const voiceChoice = event.target.closest('[data-voice-choice]');
    if (voiceChoice) {
      $$('[data-voice-choice]', workspacePage).forEach(button => {
        const selected = button === voiceChoice;
        button.classList.toggle('selected', selected);
        const hint = $('small', button);
        if (hint) hint.textContent = selected ? '当前音色' : '试听并选择';
      });
      $$('[data-selected-voice]', workspacePage).forEach(label => {
        label.textContent = voiceChoice.dataset.voiceChoice;
      });
      const resultTitle = $('[data-result-title]', workspacePage);
      if (resultTitle) resultTitle.textContent = `${voiceChoice.dataset.voiceChoice} · New take`;
      showToast(`已选择 ${voiceChoice.dataset.voiceChoice}`);
      return;
    }

    const voiceSample = event.target.closest('[data-voice-sample]');
    if (voiceSample) {
      voiceSample.classList.toggle('playing');
      const icon = $('.sample-play-icon, .result-play span', voiceSample);
      if (icon) icon.textContent = voiceSample.classList.contains('playing') ? 'Ⅱ' : '▶';
      showToast(voiceSample.classList.contains('playing') ? '正在播放示例音频' : '已暂停示例音频');
      return;
    }

    const voiceGenerate = event.target.closest('[data-voice-generate]');
    if (voiceGenerate) {
      const input = $('.voice-generator-input', workspacePage);
      if (!input?.value.trim()) {
        input?.focus();
        showToast('请先输入要生成的文字');
        return;
      }
      const original = voiceGenerate.innerHTML;
      voiceGenerate.disabled = true;
      voiceGenerate.innerHTML = '<span>Generating…</span><b>···</b>';
      const result = $('[data-voice-result]', workspacePage);
      if (result) result.hidden = true;
      setTimeout(() => {
        voiceGenerate.disabled = false;
        voiceGenerate.innerHTML = original;
        if (result) {
          result.hidden = false;
          result.animate(
            [{opacity:0, transform:'translateY(8px)'}, {opacity:1, transform:'none'}],
            {duration:260, easing:'ease-out'}
          );
        }
        showToast('示例语音已生成');
      }, 900);
      return;
    }

    const play = event.target.closest('.mini-play, [data-voice-play]');
    if (play) {
      play.classList.toggle('playing');
      if (play.matches('.mini-play')) play.textContent = play.classList.contains('playing') ? 'Ⅱ' : '▶';
      if (play.matches('[data-voice-play]')) {
        const icon = $('i', play);
        if (icon) icon.textContent = play.classList.contains('playing') ? 'Ⅱ' : '▶';
        else play.textContent = play.classList.contains('playing') ? 'Ⅱ' : '▶';
      }
      showToast(play.classList.contains('playing') ? '正在模拟试听' : '已暂停试听');
      return;
    }

    const favorite = event.target.closest('[data-favorite]');
    if (favorite) {
      const nextState = !favorite.classList.contains('active');
      const voiceId = favorite.closest('[data-voice-id]')?.dataset.voiceId;
      const targets = voiceId ? $$(`[data-voice-id="${voiceId}"] [data-favorite]`, workspacePage) : [favorite];
      targets.forEach(button => {
        button.classList.toggle('active', nextState);
        button.textContent = nextState ? '★' : '☆';
      });
      const favoriteType = favorite.closest('.sfx-result') ? '音效' : '音色';
      applyVoiceLibraryFilters();
      showToast(nextState ? `已收藏${favoriteType}` : '已取消收藏');
      return;
    }

    const useVoice = event.target.closest('[data-voice-use]');
    if (useVoice) {
      $$('.voice-use', workspacePage).forEach(button => {
        button.classList.remove('selected');
        button.textContent = '使用';
      });
      useVoice.classList.add('selected');
      useVoice.textContent = '已选择';
      showToast(`已选择 ${useVoice.dataset.voiceUse}`);
      return;
    }

    const upload = event.target.closest('[data-upload]');
    if (upload) {
      openSystemPicker(upload.closest('.upload-zone') || $('.upload-zone', workspacePage));
      return;
    }

    const promptFill = event.target.closest('[data-fill-prompt]');
    if (promptFill) {
      const prompt = $('.console-prompt, .design-prompt', workspacePage);
      if (prompt) {
        prompt.value = promptFill.dataset.fillPrompt;
        prompt.focus();
        prompt.dispatchEvent(new Event('input', {bubbles: true}));
      }
      return;
    }

    const generate = event.target.closest('[data-page-generate]');
    if (generate) {
      const cloneConsent = $('.clone-consent input', workspacePage);
      if (cloneConsent && !cloneConsent.checked) {
        showToast('请先确认你拥有声音授权');
        return;
      }
      pendingGenerateButton = generate;
      showCommerceModal('estimate');
      return;
    }

    const demoAction = event.target.closest('[data-demo-action]');
    if (demoAction) showToast(demoAction.dataset.demoAction);
  });

  workspacePage.addEventListener('input', event => {
    if (event.target.matches('.voice-generator-input')) {
      const count = $('[data-voice-count]', workspacePage);
      if (count) count.textContent = event.target.value.length;
      return;
    }

    if (event.target.matches('.voice-library-search .library-search')) {
      applyVoiceLibraryFilters();
      return;
    }

    if (event.target.matches('.library-search')) {
      const query = event.target.value.trim().toLowerCase();
      $$('[data-search-item]', workspacePage).forEach(item => {
        item.hidden = Boolean(query) && !item.dataset.searchItem.toLowerCase().includes(query);
      });
      return;
    }

    if (event.target.matches('input[type="range"]')) {
      const output = event.target.closest('label, .range-row')?.querySelector('output');
      if (!output) return;
      const speedRange = event.target.min === '70' && event.target.max === '130';
      output.textContent = speedRange ? `${(Number(event.target.value) / 100).toFixed(2)}×` : event.target.value;
    }
  });

  workspacePage.addEventListener('change', event => {
    if (!event.target.matches('[data-work-file-picker]')) return;
    const file = event.target.files?.[0];
    if (!file) return;
    const attachment = $('[data-work-attachment]', workspacePage);
    const name = $('[data-work-file-name]', workspacePage);
    const meta = $('[data-work-file-meta]', workspacePage);
    if (name) name.textContent = file.name;
    if (meta) {
      const extension = file.name.split('.').pop()?.toUpperCase() || '文件';
      const size = file.size >= 1024 * 1024
        ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
        : `${Math.max(1, Math.round(file.size / 1024))} KB`;
      meta.textContent = `${extension} · ${size} · 已准备分析`;
    }
    if (attachment) {
      attachment.hidden = false;
      attachment.animate(
        [{opacity:0, transform:'translateY(5px)'}, {opacity:1, transform:'none'}],
        {duration:180, easing:'ease-out'}
      );
    }
    showToast(`已上传 ${file.name}`);
  });

  workspacePage.addEventListener('keydown', event => {
    if (event.target.matches('.sfx-search-input') && event.key === 'Enter') {
      event.preventDefault();
      $('[data-sfx-search]', workspacePage)?.click();
    }
  });
}

function showWorkspacePage(page, activeItem, options = {}) {
  if (!window.MurmiaPages?.has(page)) return false;
  appShell.classList.remove('editor-active');
  $('#editorBackButton').hidden = true;
  homeSection.hidden = true;
  workspacePage.hidden = false;
  workspacePage.classList.remove('editor-page');
  workspacePage.innerHTML = window.MurmiaPages.render(page, options);
  if (options.semBack) {
    workspacePage.insertAdjacentHTML('afterbegin', `
      <div class="sem-return-bar">
        <button data-sem-back aria-label="返回 SEM 演示">← 返回 SEM 演示</button>
        ${options.sourceKeyword ? `<span>来自关键词 <b>${options.sourceKeyword}</b></span>` : ''}
      </div>
    `);
  }
  $('#pageName').textContent = page;
  syncTopNavigation(page);
  $$('.nav-item').forEach(nav => nav.classList.toggle('active', nav === activeItem));
  initWorkspaceInteractions();
  if (page === '音色库') {
    history.replaceState(null, '', `${window.location.pathname}?view=voices&v=20260803-voice-library-v3`);
    requestAnimationFrame(applyVoiceLibraryFilters);
  } else if (new URLSearchParams(window.location.search).get('view') === 'voices') {
    history.replaceState(null, '', window.location.pathname);
  }
  if (options.scroll !== false) window.scrollTo({top: 0, behavior: 'smooth'});
  return true;
}

function showEditorPage(page = '音频创作 Agent', activeItem, options = {}) {
  if (!window.MurmiaEditor) return false;
  appShell.classList.add('editor-active');
  $('#editorBackButton').hidden = false;
  homeSection.hidden = true;
  workspacePage.hidden = false;
  workspacePage.classList.add('editor-page');
  workspacePage.innerHTML = window.MurmiaEditor.render();
  $('#pageName').textContent = options.title || (page === '音频创作 Agent' ? '赤壁之战 · 第一章' : `${page} · 新作品`);
  syncTopNavigation('音频创作 Agent');
  $$('.nav-item').forEach(nav => nav.classList.toggle('active', nav === activeItem));
  window.MurmiaEditor.init(workspacePage, showToast);
  window.scrollTo({top: 0});
  return true;
}

$('#editorBackButton').addEventListener('click', () => {
  const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
  showWorkspacePage('音频创作 Agent', agentNav);
  showToast('已返回音频创作 Agent');
});

$$('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (item.dataset.page === '首页') {
      showHome('generate', item);
      return;
    }
    if (item.dataset.page === '我的创作') {
      showHome('generate', item);
      requestAnimationFrame(() => $('#myProjects')?.scrollIntoView({behavior:'smooth', block:'start'}));
      return;
    }
    if (item.dataset.agentSkill) {
      state.agentSkill = item.dataset.agentSkill;
      showHome('agent', item);
      showToast(`已加载 ${agentSkills[state.agentSkill].name} Skill`);
      return;
    }
    if (showWorkspacePage(item.dataset.page, item)) return;
    showToast(`${item.dataset.page} 页面将在下一阶段制作`);
  });
});

$$('.creation-tab').forEach(tab => tab.addEventListener('click', () => {
  const workspace = tab.dataset.workspace;
  switchWorkspace(workspace);
  const matchingNav = workspace === 'agent'
    ? $('.nav-item[data-page="音频创作 Agent"]')
    : $('.nav-item[data-page="首页"]');
  $$('.nav-item').forEach(nav => nav.classList.toggle('active', nav === matchingNav));
}));
$$('.mode-button[data-mode]').forEach(button => button.addEventListener('click', () => {
  if (state.workspace === 'agent') switchWorkspace('generate');
  switchMode(button.dataset.mode);
}));

$('[data-home-agent-mode]')?.addEventListener('click', () => {
  const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
  switchWorkspace('agent');
  $$('.nav-item').forEach(nav => nav.classList.toggle('active', nav === agentNav));
  promptInput.focus();
});

$('#composerAddButton')?.addEventListener('click', () => openSystemPicker());

$$('[data-quick-skill]').forEach(button => {
  button.addEventListener('click', () => {
    state.agentSkill = button.dataset.quickSkill;
    const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
    showHome('agent', agentNav);
    showToast(`已切换到 Agent，并加载 ${agentSkills[state.agentSkill].name} Skill`);
    promptInput.focus();
  });
});

$$('[data-home-work-page]').forEach(button => {
  button.addEventListener('click', () => {
    const page = button.dataset.homeWorkPage;
    const navItem = $(`.nav-item[data-page="${page}"]`);
    if (!window.MurmiaPages?.has(page) || !navItem) return;
    showWorkspacePage(page, navItem);
    revealSidebarItem(navItem);
    showToast(`已进入 ${page}`);
  });
});

$$('[data-home-agent]').forEach(button => {
  button.addEventListener('click', () => {
    const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
    state.agentSkill = '';
    showWorkspacePage('音频创作 Agent', agentNav);
    showToast('已进入音频创作 Agent');
  });
});

$$('[data-work-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.workFilter;
    $$('[data-work-filter]').forEach(item => item.classList.toggle('active', item === button));
    $$('.discover-card').forEach(card => {
      card.hidden = category !== '全部' && card.dataset.workCategory !== category;
    });
  });
});

$$('[data-product-step]').forEach(button => {
  button.addEventListener('click', () => {
    const step = button.dataset.productStep;
    $$('[data-product-step]').forEach(item => item.classList.toggle('active', item === button));
    $$('[data-product-panel]').forEach(panel => {
      panel.hidden = panel.dataset.productPanel !== step;
      panel.classList.toggle('active', panel.dataset.productPanel === step);
    });
  });
});

$$('[data-story-start]').forEach(button => {
  button.addEventListener('click', () => {
    const current = $('.story-step-list button.active');
    const next = current?.nextElementSibling;
    if (next?.matches('[data-product-step]')) {
      next.click();
      return;
    }
    const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
    showHome('agent', agentNav);
    promptInput.focus();
  });
});

const homePreviewAudio = new Audio('./assets/audio/demo_voice_sample.mp3');
let activeHomePreviewButton = null;
let activeHomePreviewTitle = '';

function formatHomeAudioTime(value) {
  const seconds = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function syncHomeAudioUI() {
  const duration = Number.isFinite(homePreviewAudio.duration) ? homePreviewAudio.duration : 18;
  const current = Number.isFinite(homePreviewAudio.currentTime) ? homePreviewAudio.currentTime : 0;
  $('#homeAudioProgress').value = duration ? String(current / duration * 100) : '0';
  $('#homeAudioTime').textContent = `${formatHomeAudioTime(current)} / ${formatHomeAudioTime(duration)}`;
  $('#homeAudioToggle').textContent = homePreviewAudio.paused ? '▶' : 'Ⅱ';
  if (activeHomePreviewButton) {
    activeHomePreviewButton.textContent = homePreviewAudio.paused ? '▶' : 'Ⅱ';
    activeHomePreviewButton.classList.toggle('playing', !homePreviewAudio.paused);
  }
}

function playHomePreview(title, button) {
  const switching = title !== activeHomePreviewTitle;
  if (activeHomePreviewButton && activeHomePreviewButton !== button) {
    activeHomePreviewButton.classList.remove('playing');
    activeHomePreviewButton.textContent = '▶';
  }
  activeHomePreviewTitle = title;
  activeHomePreviewButton = button;
  $('#homeAudioTitle').textContent = title;
  $('#homeAudioDock').hidden = false;
  if (switching) homePreviewAudio.currentTime = 0;
  if (homePreviewAudio.paused || switching) {
    homePreviewAudio.play().then(syncHomeAudioUI).catch(() => showToast('点击播放器按钮开始试听'));
  } else {
    homePreviewAudio.pause();
    syncHomeAudioUI();
  }
}

$$('[data-preview-audio]').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
    playHomePreview(button.dataset.previewAudio, button);
  });
});

$$('[data-open-work-process]').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
    homePreviewAudio.pause();
    const title = button.dataset.openWorkProcess;
    const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
    showEditorPage('音频创作 Agent', agentNav, {title});
    showToast(`已打开《${title}》的完整多轨制作过程`);
  });
});

homePreviewAudio.addEventListener('timeupdate', syncHomeAudioUI);
homePreviewAudio.addEventListener('loadedmetadata', syncHomeAudioUI);
homePreviewAudio.addEventListener('play', syncHomeAudioUI);
homePreviewAudio.addEventListener('pause', syncHomeAudioUI);
homePreviewAudio.addEventListener('ended', () => {
  homePreviewAudio.currentTime = 0;
  syncHomeAudioUI();
});

$('#homeAudioToggle').addEventListener('click', () => {
  if (homePreviewAudio.paused) {
    homePreviewAudio.play().catch(() => showToast('暂时无法播放示例音频'));
  } else {
    homePreviewAudio.pause();
  }
});
$('#homeAudioProgress').addEventListener('input', event => {
  if (!Number.isFinite(homePreviewAudio.duration)) return;
  homePreviewAudio.currentTime = Number(event.target.value) / 100 * homePreviewAudio.duration;
});
$('#homeAudioClose').addEventListener('click', () => {
  homePreviewAudio.pause();
  $('#homeAudioDock').hidden = true;
  if (activeHomePreviewButton) {
    activeHomePreviewButton.classList.remove('playing');
    activeHomePreviewButton.textContent = '▶';
  }
  activeHomePreviewButton = null;
  activeHomePreviewTitle = '';
});

$$('[data-load-skill]', agentSkillMenu).forEach(button => {
  button.addEventListener('click', () => {
    state.agentSkill = button.dataset.loadSkill;
    $('#agentSkillLabel').textContent = agentSkills[state.agentSkill].name;
    $('#agentSkillButton').classList.add('loaded');
    promptInput.placeholder = agentSkills[state.agentSkill].placeholder;
    $$('[data-load-skill]', agentSkillMenu).forEach(item => item.classList.toggle('selected', item === button));
    $$('[data-quick-skill]').forEach(item => item.classList.toggle('active', item.dataset.quickSkill === state.agentSkill));
    agentSkillMenu.hidden = true;
    $('#agentSkillButton').classList.remove('open');
    showToast(`已加载 ${agentSkills[state.agentSkill].name} Skill`);
    promptInput.focus();
  });
});

promptInput.addEventListener('input', updatePromptState);
promptInput.addEventListener('focus', () => promptEmpty.classList.add('hidden'));
promptInput.addEventListener('blur', updatePromptState);

$('#modelButton').addEventListener('click', event => {
  event.stopPropagation();
  if (state.workspace === 'agent') {
    showToast('Agent 会根据任务自动选择语音、音效与音乐模型');
    return;
  }
  const willOpen = modelMenu.hidden;
  closeMenus(modelMenu);
  modelMenu.hidden = !willOpen;
  $('#modelButton').classList.toggle('open', willOpen);
});

$('#voiceButton').addEventListener('click', event => {
  event.stopPropagation();
  const willOpen = voiceMenu.hidden;
  closeMenus(voiceMenu);
  voiceMenu.hidden = !willOpen;
  $('#voiceButton').classList.toggle('open', willOpen);
});

$('#agentSkillButton').addEventListener('click', event => {
  event.stopPropagation();
  const willOpen = agentSkillMenu.hidden;
  closeMenus(agentSkillMenu);
  agentSkillMenu.hidden = !willOpen;
  $('#agentSkillButton').classList.toggle('open', willOpen);
});

$$('[data-voice]', voiceMenu).forEach(button => {
  button.addEventListener('click', () => {
    state.voice = button.dataset.voice;
    $('#voiceLabel').textContent = state.voice;
    $('.voice-avatar', $('#voiceButton')).textContent = button.dataset.letter;
    voiceMenu.hidden = true;
    $('#voiceButton').classList.remove('open');
    showToast(`已选择 ${state.voice}`);
  });
});

$('#paramsButton').addEventListener('click', event => {
  event.stopPropagation();
  closeMenus();
  parameterPanel.hidden = !parameterPanel.hidden;
});
$('#closeParams').addEventListener('click', () => parameterPanel.hidden = true);

['rangeOne', 'rangeTwo'].forEach((id, index) => {
  $(`#${id}`).addEventListener('input', event => {
    $(`#${id}Value`).textContent = event.target.value;
    const p = modeConfig[state.mode].params;
    const first = index === 0 ? event.target.value : $('#rangeOne').value;
    const second = index === 1 ? event.target.value : $('#rangeTwo').value;
    $('#paramsSummary').textContent = `${p[0]} ${first} · ${p[3]} ${second}`;
  });
});

function runCommerceDemoAction(action) {
  clearDemoFocus();
  closeCommerceModal();
  const homeNav = $('.nav-item[data-page="首页"]');
  if (action === 'balance') {
    showHome('generate', homeNav);
    openTopProfileMenu();
    $('.top-account-cluster').classList.add('commerce-demo-focus');
  } else if (action === 'usage') {
    openPage('点数与用量');
    showToast('点数历史已在新标签页打开');
  } else if (action === 'insufficient') {
    showCommerceModal('insufficient');
  } else if (action === 'pricing') {
    openPage('价格与套餐');
    $('.pricing-plan.featured', $('#commerceModal'))?.classList.add('commerce-demo-focus');
  } else if (action === 'yearly') {
    openPage('价格与套餐');
    $('.billing-cycle', $('#commerceModal'))?.classList.add('commerce-demo-focus');
  } else if (action === 'checkout') {
    openPage('价格与套餐');
    showCommerceModal('checkout', {plan:'专业版', yearly:true});
  } else if (action === 'success') {
    showCommerceModal('success');
  }
}

function updateCommerceDemo(step) {
  commerceDemoStep = Math.max(0, Math.min(step, commerceDemoSteps.length));
  const current = commerceDemoSteps[commerceDemoStep - 1];
  $('#commerceDemoProgress').style.width = `${commerceDemoStep / commerceDemoSteps.length * 100}%`;
  $('#commerceDemoTitle').textContent = current?.title || '从余额入口开始';
  $('#commerceDemoCopy').textContent = current?.copy || '点击下一步，查看用户从哪里进入收费界面';
  $('#commerceDemoNext').textContent = commerceDemoStep >= commerceDemoSteps.length
    ? '演示完成'
    : `下一步 ${commerceDemoStep + 1}/${commerceDemoSteps.length}`;
  $('#commerceDemoNext').disabled = commerceDemoStep >= commerceDemoSteps.length;
  updateGlobalDemoStepper('commerce', commerceDemoStep, commerceDemoSteps.length);
  if (current) runCommerceDemoAction(current.action);
}

const topProfileWrap = $('.top-profile-wrap');
let topProfileHoverTimer = null;
const openTopProfileMenu = () => {
  window.clearTimeout(topProfileHoverTimer);
  const menu = $('#topProfileMenu');
  closeTopbarMenus(menu);
  menu.hidden = false;
  $('#topProfileButton').setAttribute('aria-expanded', 'true');
};
const scheduleTopProfileMenuClose = () => {
  window.clearTimeout(topProfileHoverTimer);
  topProfileHoverTimer = window.setTimeout(() => closeTopbarMenus(), 140);
};

topProfileWrap?.addEventListener('mouseenter', openTopProfileMenu);
topProfileWrap?.addEventListener('mouseleave', scheduleTopProfileMenuClose);

document.addEventListener('click', event => {
  const topMenuTrigger = event.target.closest('[data-top-menu-trigger]');
  if (topMenuTrigger) {
    const menu = $(`[data-top-menu="${topMenuTrigger.dataset.topMenuTrigger}"]`);
    const willOpen = menu.hidden;
    closeTopbarMenus(willOpen ? menu : null);
    menu.hidden = !willOpen;
    topMenuTrigger.setAttribute('aria-expanded', String(willOpen));
    return;
  }

  if (event.target.closest('[data-open-pricing]')) {
    closeTopbarMenus();
    showCommerceModal('pricing');
    return;
  }

  if (event.target.closest('.top-account-cluster')) {
    openTopProfileMenu();
    return;
  }

  if (event.target.closest('[data-top-home]')) {
    const homeNav = $('.nav-item[data-page="首页"]');
    closeTopbarMenus();
    showHome('generate', homeNav);
    return;
  }

  if (event.target.closest('[data-top-agent]')) {
    const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
    state.agentSkill = '';
    closeTopbarMenus();
    showHome('agent', agentNav);
    promptInput.focus();
    showToast('已进入 Agent 完整作品创作');
    return;
  }

  if (event.target.closest('[data-top-my-projects]')) {
    const homeNav = $('.nav-item[data-page="首页"]');
    closeTopbarMenus();
    showHome('generate', homeNav);
    requestAnimationFrame(() => $('#myProjects')?.scrollIntoView({behavior:'smooth', block:'start'}));
    return;
  }

  const globalPageLink = event.target.closest('[data-page-link]');
  if (globalPageLink && !workspacePage.contains(globalPageLink)) {
    closeTopbarMenus();
    openPage(globalPageLink.dataset.pageLink);
    $('#profileMenu').hidden = true;
    showToast(`已进入 ${globalPageLink.dataset.pageLink}`);
  }

  if (event.target.closest('#profileButton')) {
    $('#profileMenu').hidden = !$('#profileMenu').hidden;
  } else if (!event.target.closest('.profile-wrap')) {
    $('#profileMenu').hidden = true;
  }

  if (!event.target.closest('.top-nav-menu') && !event.target.closest('.top-profile-wrap')) closeTopbarMenus();

  if (event.target.closest('.top-search')) showToast('搜索项目与素材 · ⌘ K');

  if (event.target.closest('[data-commerce-close]') || event.target === $('#commerceModalBackdrop')) {
    closeCommerceModal();
    pendingGenerateButton = null;
  }
  const modalBillingCycle = event.target.closest('#commerceModal [data-billing-cycle]');
  if (modalBillingCycle) {
    $$('[data-billing-cycle]', $('#commerceModal')).forEach(button => button.classList.toggle('active', button === modalBillingCycle));
    const yearly = modalBillingCycle.dataset.billingCycle === 'yearly';
    $$('[data-monthly-price]', $('#commerceModal')).forEach(price => {
      price.textContent = yearly ? price.dataset.yearlyPrice : price.dataset.monthlyPrice;
      const suffix = price.nextElementSibling;
      if (suffix) suffix.textContent = yearly ? suffix.dataset.yearlySuffix : suffix.dataset.monthlySuffix;
    });
    showToast(yearly ? '已切换年付，全年价格相当于十个月' : '已切换月付');
    return;
  }
  const modalPlan = event.target.closest('#commerceModal [data-plan-select]');
  if (modalPlan && !modalPlan.classList.contains('current')) {
    const yearly = $('[data-billing-cycle="yearly"]', $('#commerceModal'))?.classList.contains('active');
    showCommerceModal('checkout', {plan:modalPlan.dataset.planSelect, yearly});
    return;
  }
  if (event.target.closest('[data-buy-credits]') && !workspacePage.contains(event.target.closest('[data-buy-credits]'))) {
    showCommerceModal('topup');
  }
  const topupPack = event.target.closest('[data-topup-pack]');
  if (topupPack) {
    $$('[data-topup-pack]', $('#commerceModal')).forEach(button => button.classList.toggle('selected', button === topupPack));
    $('#afterTopupBalance').textContent = `${(34200 + Number(topupPack.dataset.topupCredits.replace(',', ''))).toLocaleString()} 点`;
    $('[data-confirm-topup]', $('#commerceModal')).textContent = `确认购买 ${topupPack.dataset.topupPack}`;
  }
  if (event.target.closest('[data-confirm-topup]')) {
    closeCommerceModal();
    showToast('点数已到账，有效期 12 个月');
  }
  if (event.target.closest('[data-confirm-subscription]')) {
    showCommerceModal('success');
  }
  const afterModal = event.target.closest('[data-page-after-modal]');
  if (afterModal) {
    closeCommerceModal();
    openPage(afterModal.dataset.pageAfterModal);
  }
  if (event.target.closest('[data-confirm-export]')) {
    closeCommerceModal();
    showToast('正在导出作品，已有结果不扣点');
  }
  if (event.target.closest('[data-confirm-generation]')) {
    closeCommerceModal();
    if (pendingGenerateButton === generateButton) {
      pendingGenerateButton = null;
      performHomeGeneration();
    } else if (pendingGenerateButton) {
      const button = pendingGenerateButton;
      pendingGenerateButton = null;
      const original = button.dataset.originalLabel || button.textContent.trim();
      button.dataset.originalLabel = original;
      button.disabled = true;
      button.textContent = '处理中…';
      setTimeout(() => {
        button.disabled = false;
        button.textContent = original;
        showToast('模拟结果已生成并按实际用量结算');
      }, 900);
    } else {
      showToast('已冻结预计点数并开始生成，失败会自动退回');
    }
  }

  if (!event.target.closest('.select-wrap')) closeMenus();
});

function performHomeGeneration() {
  generateButton.classList.add('loading');
  generateButton.disabled = true;
  setTimeout(() => {
    generateButton.classList.remove('loading');
    if (state.workspace === 'agent') {
      const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
      showEditorPage('音频创作 Agent', agentNav);
      if (redCliffDemoSeeded) {
        redCliffDemoSeeded = false;
        $('#globalDemoOrb span').textContent = '演示';
        const internalDemoTrigger = $('#editorDemoOrb', workspacePage);
        if (internalDemoTrigger) internalDemoTrigger.click();
        const redcliffFlow = $('[data-demo-flow="redcliff"]', workspacePage);
        if (redcliffFlow) redcliffFlow.click();
        const firstEditorStep = $('#editorDemoNext', workspacePage);
        if (firstEditorStep) firstEditorStep.click();
      }
      showToast('已建立完整作品编辑项目');
      return;
    }
    addGeneratedResult();
    updatePromptState();
    showToast(state.workspace === 'agent' ? 'Agent 已创建作品计划' : '模拟音频已生成');
  }, 1300);
}

generateButton.addEventListener('click', () => {
  if (generateButton.disabled) return;
  if (state.workspace === 'agent') {
    performHomeGeneration();
    return;
  }
  pendingGenerateButton = generateButton;
  showCommerceModal('estimate');
});

$('#recentList').addEventListener('click', event => {
  const button = event.target.closest('.play-button');
  if (!button) return;
  button.classList.toggle('playing');
  showToast(button.classList.contains('playing') ? '正在模拟播放' : '已暂停');
});

function advanceCreationDemo() {
  const editor = $('.agent-editor', workspacePage);
  if (editor) {
    const internalDemoTrigger = $('#editorDemoOrb', workspacePage);
    if (internalDemoTrigger) internalDemoTrigger.click();
    const redcliffFlow = $('[data-demo-flow="redcliff"]', workspacePage);
    if (redcliffFlow) redcliffFlow.click();
    showToast('已打开赤壁之战完整作品演示');
    return;
  }

  if (redCliffDemoSeeded && !homeSection.hidden && state.workspace === 'agent') {
    generateButton.click();
    return;
  }

  state.agentSkill = 'audio-drama';
  const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
  showHome('agent', agentNav);
  promptInput.value = redCliffTenChapterText;
  updatePromptState();
  promptInput.focus();
  promptInput.setSelectionRange(0, 0);
  promptInput.scrollTop = 0;
  redCliffDemoSeeded = true;
  updateGlobalDemoStepper('creation-home', 0, 1);
  showToast('演示第 1 步：已在 Agent 输入框粘贴十章小说文本');
}

function startTtsRoutingDemo() {
  const agentNav = $('.nav-item[data-page="音频创作 Agent"]');
  showEditorPage('音频创作 Agent', agentNav, {title: '单段语音需求'});
  const internalDemoTrigger = $('#editorDemoOrb', workspacePage);
  if (internalDemoTrigger) internalDemoTrigger.click();
  const ttsFlow = $('[data-demo-flow="tts"]', workspacePage);
  if (ttsFlow) ttsFlow.click();
  showToast('已打开单段语音工具分流演示');
}

let activeGlobalDemoFlow = '';
const updateGlobalDemoStepper = (flow, step, total) => {
  activeGlobalDemoFlow = flow;
  const stepper = $('#globalDemoStepper');
  stepper.hidden = false;
  stepper.dataset.flow = flow;
  $('#globalDemoPrevious').disabled = step <= 0;
  $('#globalDemoNext').disabled = step >= total;
  $('#globalDemoPrevious').title = step <= 0 ? '已经是第一步' : '上一步';
  $('#globalDemoNext').title = step >= total ? '演示已完成' : '下一步';
};

window.addEventListener('murmia:editor-demo-status', event => {
  updateGlobalDemoStepper('editor', event.detail?.step || 0, event.detail?.total || 1);
});

$('#globalDemoPrevious').addEventListener('click', () => {
  if (activeGlobalDemoFlow === 'commerce') {
    updateCommerceDemo(commerceDemoStep - 1);
    return;
  }
  window.dispatchEvent(new CustomEvent('murmia:editor-demo-navigate', {detail:{direction:'previous'}}));
});

$('#globalDemoNext').addEventListener('click', () => {
  if (activeGlobalDemoFlow === 'commerce') {
    updateCommerceDemo(commerceDemoStep + 1);
    return;
  }
  if (activeGlobalDemoFlow === 'creation-home') {
    advanceCreationDemo();
    return;
  }
  window.dispatchEvent(new CustomEvent('murmia:editor-demo-navigate', {detail:{direction:'next'}}));
});

$('#globalDemoOrb').addEventListener('click', () => {
  $('#globalDemoMenu').hidden = !$('#globalDemoMenu').hidden;
});

$('#closeGlobalDemo').addEventListener('click', () => {
  $('#globalDemoMenu').hidden = true;
});

$$('[data-demo-case]').forEach(button => button.addEventListener('click', () => {
  $('#globalDemoMenu').hidden = true;
  if (button.dataset.demoCase === 'creation') {
    advanceCreationDemo();
    return;
  }
  if (button.dataset.demoCase === 'tts') {
    startTtsRoutingDemo();
    return;
  }
  $('#commerceDemoPanel').hidden = true;
  updateCommerceDemo(0);
  showToast('已打开订阅与点数流程演示');
}));

$('#closeCommerceDemo').addEventListener('click', () => {
  $('#commerceDemoPanel').hidden = true;
  clearDemoFocus();
  closeCommerceModal();
});

$('#restartCommerceDemo').addEventListener('click', () => {
  updateCommerceDemo(0);
});

$('#commerceDemoNext').addEventListener('click', () => {
  if (commerceDemoStep >= commerceDemoSteps.length) return;
  updateCommerceDemo(commerceDemoStep + 1);
});

window.addEventListener('murmia:open-commerce', event => {
  pendingGenerateButton = null;
  showCommerceModal(event.detail?.type || 'estimate', event.detail || {});
});

window.addEventListener('murmia:open-tts', event => {
  const ttsNav = $('.nav-item[data-page="文本转语音"]');
  showWorkspacePage('文本转语音', ttsNav);
  revealSidebarItem(ttsNav);
  const textarea = $('.stage-textarea', workspacePage);
  if (textarea) {
    textarea.value = event.detail?.text || '';
    const count = $('.stage-hints span', workspacePage);
    if (count) count.textContent = `${textarea.value.length} / 5,000 字`;
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }
  showToast('已进入文本转语音，并自动带入原文');
});

renderModelMenu();
renderQuickPrompts();
renderParameters();
updateGenerationCost();
updatePromptState();

const initialView = new URLSearchParams(window.location.search).get('view');
const initialPage = new URLSearchParams(window.location.search).get('page');
if (initialView === 'agent') {
  const initialAgentNav = $('.nav-item[data-page="音频创作 Agent"]');
  showEditorPage('音频创作 Agent', initialAgentNav);
} else if (initialView === 'voices') {
  const initialVoiceNav = $('.nav-item[data-page="音色库"]');
  showWorkspacePage('音色库', initialVoiceNav);
} else if (initialView === 'pricing') {
  const homeNav = $('.nav-item[data-page="首页"]');
  showHome('generate', homeNav);
  showCommerceModal('pricing');
} else if (initialView === 'points') {
  showWorkspacePage('点数与用量', null);
} else if (initialView === 'workspace' && initialPage) {
  const initialPageNav = $(`.nav-item[data-page="${CSS.escape(initialPage)}"]`);
  showWorkspacePage(initialPage, initialPageNav);
}
