const pageIcon = (symbol, tone = '') => `<span class="page-icon ${tone}">${symbol}</span>`;

const pageHeader = (title, description, action = '') => `
  <header class="workspace-heading">
    <div>
      <p class="workspace-kicker">MURMIA 工具</p>
      <h1>${title}</h1>
      <p>${description}</p>
    </div>
    ${action}
  </header>
`;

const pageTabs = (tabs, active = tabs[0]) => `
  <div class="page-tabs">
    ${tabs.map(tab => `<button class="page-tab ${tab === active ? 'active' : ''}" data-subtab="${tab}">${tab}</button>`).join('')}
  </div>
`;

const modelSelect = (label, model) => `
  <button class="inline-select" data-demo-action="已打开${label}选择">
    <span><small>${label}</small><b>${model}</b></span><i>⌄</i>
  </button>
`;

const historyRows = (rows) => `
  <div class="history-block">
    <div class="block-heading"><b>最近记录</b><button data-demo-action="已打开全部记录">查看全部</button></div>
    <div class="history-rows">
      ${rows.map(([name, meta, duration]) => `
        <div class="history-row" data-search-item="${name} ${meta}">
          <button class="mini-play" aria-label="试听">▶</button>
          <span><b>${name}</b><small>${meta}</small></span>
          <time>${duration}</time>
          <button class="row-action" data-demo-action="已下载 ${name}">↓</button>
          <button class="row-action" data-demo-action="已打开更多操作">•••</button>
        </div>
      `).join('')}
    </div>
  </div>
`;

const voiceCatalog = {
  arabella: {name:'Arabella', role:'温暖叙事女声', language:'英文', age:'青年', provider:'ElevenLabs', tags:['narration','conversational','治愈'], image:'assets/generated/voices/arabella.png', owned:true},
  ronin: {name:'Ronin', role:'克制电影男声', language:'英文', age:'中年', provider:'ElevenLabs', tags:['narration','character','深沉'], image:'assets/generated/voices/ronin.png'},
  maya: {name:'Maya', role:'清澈情绪女声', language:'英文', age:'青年', provider:'MiniMax', tags:['conversational','sexy','自然'], image:'assets/generated/voices/maya.png'},
  fangbai: {name:'芳白', role:'端庄中文旁白', language:'中文', age:'青年', provider:'MiniMax', tags:['narration','educational','古典'], image:'assets/generated/voices/fangbai.png', owned:true},
  theo: {name:'Theo', role:'可信赖纪录片男声', language:'英文', age:'中年', provider:'Seed Audio', tags:['narration','educational','沉稳'], image:'assets/generated/voices/theo.png'},
  noor: {name:'Noor', role:'柔和睡眠引导女声', language:'英文', age:'青年', provider:'ElevenLabs', tags:['conversational','治愈','低语'], image:'assets/generated/voices/noor.png'},
  zhouyu: {name:'周瑜', role:'儒雅古装角色', language:'中文', age:'青年', provider:'MiniMax', tags:['character','广播剧','古典'], image:'assets/generated/voices/zhouyu.png'},
  elena: {name:'Elena', role:'知性双语主持人', language:'英文', age:'中年', provider:'ElevenLabs', tags:['podcast','advertisement','conversational'], image:'assets/generated/voices/elena.png'},
  jun: {name:'Jun', role:'轻快自然青年男声', language:'日语', age:'青年', provider:'Seed Audio', tags:['conversational','character','anime'], image:'assets/generated/voices/jun.png'},
  iris: {name:'Iris', role:'亲密耳语女声', language:'英文', age:'青年', provider:'ElevenLabs', tags:['sexy','低语','conversational'], image:'assets/generated/voice-library/character-04.png'},
  valentina: {name:'Valentina', role:'自信拉丁主持人', language:'西班牙语', age:'青年', provider:'ElevenLabs', tags:['podcast','advertisement','conversational'], image:'assets/generated/voice-library/character-05.png'},
  evelyn: {name:'Evelyn', role:'成熟文学叙述', language:'英文', age:'老年', provider:'Seed Audio', tags:['narration','audiobook','沉稳'], image:'assets/generated/voice-library/character-06.png'},
  zuri: {name:'Zuri', role:'活力文化节目主持', language:'英文', age:'青年', provider:'MiniMax', tags:['podcast','advertisement','活力'], image:'assets/generated/voice-library/character-07.png'},
  marcus: {name:'Marcus', role:'力量感体育评论', language:'英文', age:'中年', provider:'Fish Audio', tags:['advertisement','podcast','力量'], image:'assets/generated/voice-library/basketball-00.png'},
  caleb: {name:'Caleb', role:'年轻科技播客男声', language:'英文', age:'少年', provider:'MiniMax', tags:['podcast','educational','青年'], image:'assets/generated/voice-library/basketball-01.png'},
  nia: {name:'Nia', role:'干练新闻播报女声', language:'英文', age:'青年', provider:'Fish Audio', tags:['narration','podcast','清晰'], image:'assets/generated/voice-library/basketball-02.png'},
  hudson: {name:'Hudson', role:'复古广告男声', language:'英文', age:'中年', provider:'ElevenLabs', tags:['advertisement','character','复古'], image:'assets/generated/voice-library/basketball-03.png'},
  darius: {name:'Darius', role:'低沉动作角色', language:'英文', age:'青年', provider:'Fish Audio', tags:['character','广播剧','低沉'], image:'assets/generated/voice-library/basketball-04.png'},
  kai: {name:'Kai', role:'克制东方角色', language:'日语', age:'青年', provider:'Seed Audio', tags:['character','narration','克制'], image:'assets/generated/voice-library/basketball-05.png'},
  andre: {name:'Andre', role:'成熟悬疑旁白', language:'英文', age:'中年', provider:'ElevenLabs', tags:['narration','广播剧','悬疑'], image:'assets/generated/voice-library/basketball-06.png'},
  skye: {name:'Skye', role:'冷静科幻女声', language:'英文', age:'青年', provider:'MiniMax', tags:['character','educational','科幻'], image:'assets/generated/voice-library/basketball-07.png'},
  ghostface: {name:'Ghostface', role:'惊悚蒙面低语', language:'英文', age:'中年', provider:'Fish Audio', tags:['trending','character','horror'], image:'assets/generated/voice-library/horror-00.png'},
  golden: {name:'Golden Bark', role:'快乐金毛拟声', language:'非语言', age:'青年', provider:'ElevenLabs', tags:['trending','dog','娱乐'], image:'assets/generated/voice-library/dog-00.png'},
  nova: {name:'Nova', role:'友好未来机器人', language:'英文', age:'青年', provider:'Seed Audio', tags:['trending','robot','character'], image:'assets/generated/voice-library/character-00.png'},
  raven: {name:'Dark Raven', role:'幽暗兜帽角色', language:'英文', age:'中年', provider:'ElevenLabs', tags:['trending','horror','character'], image:'assets/generated/voice-library/horror-02.png'},
  corgi: {name:'Corgi Talk', role:'活泼柯基拟声', language:'非语言', age:'青年', provider:'MiniMax', tags:['trending','dog','娱乐'], image:'assets/generated/voice-library/dog-02.png'},
  porcelain: {name:'Porcelain', role:'破碎瓷偶耳语', language:'英文', age:'青年', provider:'Fish Audio', tags:['trending','horror','低语'], image:'assets/generated/voice-library/horror-01.png'},
  courtside: {name:'Radio Warden', role:'防毒面具广播声', language:'英文', age:'中年', provider:'Fish Audio', tags:['trending','horror','character'], image:'assets/generated/voice-library/horror-03.png'},
  atlas: {name:'Atlas 74', role:'复古机械播报', language:'英文', age:'中年', provider:'Seed Audio', tags:['trending','robot','character'], image:'assets/generated/voice-library/character-01.png'},

  lia: {name:'Lia', role:'温柔安心陪伴', language:'英文', age:'青年', provider:'ElevenLabs', tags:['sexy','低语','conversational','治愈'], image:'assets/generated/voice-library-sheets/intimate-companion-v1.png', crop:[3,0,0]},
  amari: {name:'Amari', role:'沉静可靠陪伴', language:'英文', age:'青年', provider:'Fish Audio', tags:['低语','conversational','治愈'], image:'assets/generated/voice-library-sheets/intimate-companion-v1.png', crop:[3,1,0]},
  priya: {name:'Priya', role:'成熟疗愈引导', language:'英文', age:'中年', provider:'Seed Audio', tags:['narration','低语','治愈'], image:'assets/generated/voice-library-sheets/intimate-companion-v1.png', crop:[3,2,0]},
  elliot: {name:'Elliot', role:'克制脆弱男声', language:'英文', age:'青年', provider:'MiniMax', tags:['character','低语','conversational'], image:'assets/generated/voice-library-sheets/intimate-companion-v1.png', crop:[3,0,1]},
  samira: {name:'Samira', role:'宁静亲密女声', language:'英文', age:'青年', provider:'ElevenLabs', tags:['sexy','低语','治愈'], image:'assets/generated/voice-library-sheets/intimate-companion-v1.png', crop:[3,1,1]},
  mateo: {name:'Mateo', role:'温暖守护男声', language:'西班牙语', age:'中年', provider:'Fish Audio', tags:['character','conversational','治愈'], image:'assets/generated/voice-library-sheets/intimate-companion-v1.png', crop:[3,2,1]},

  camila: {name:'Camila', role:'文化节目主持', language:'西班牙语', age:'青年', provider:'ElevenLabs', tags:['podcast','advertisement','conversational'], image:'assets/generated/voice-library-sheets/podcast-v1.png', crop:[4,0,0]},
  kenji: {name:'Kenji', role:'科技深谈主持', language:'日语', age:'中年', provider:'Seed Audio', tags:['podcast','educational','沉稳'], image:'assets/generated/voice-library-sheets/podcast-v1.png', crop:[4,1,0]},
  malcolm: {name:'Malcolm', role:'体育活力主持', language:'英文', age:'青年', provider:'Fish Audio', tags:['podcast','advertisement','活力'], image:'assets/generated/voice-library-sheets/podcast-v1.png', crop:[4,2,0]},
  claire: {name:'Claire', role:'调查新闻主播', language:'英文', age:'青年', provider:'ElevenLabs', tags:['podcast','narration','清晰'], image:'assets/generated/voice-library-sheets/podcast-v1.png', crop:[4,3,0]},
  arjun: {name:'Arjun', role:'轻松对谈主持', language:'英文', age:'青年', provider:'MiniMax', tags:['podcast','conversational','自然'], image:'assets/generated/voice-library-sheets/podcast-v1.png', crop:[4,0,1]},
  monique: {name:'Monique', role:'商业访谈主持', language:'英文', age:'中年', provider:'Fish Audio', tags:['podcast','educational','沉稳'], image:'assets/generated/voice-library-sheets/podcast-v1.png', crop:[4,1,1]},
  alex: {name:'Alex', role:'轻喜剧节目主持', language:'英文', age:'青年', provider:'ElevenLabs', tags:['podcast','conversational','活力'], image:'assets/generated/voice-library-sheets/podcast-v1.png', crop:[4,2,1]},
  haruko: {name:'Haruko', role:'历史人文主讲', language:'日语', age:'老年', provider:'Seed Audio', tags:['podcast','educational','narration'], image:'assets/generated/voice-library-sheets/podcast-v1.png', crop:[4,3,1]},

  beatrice: {name:'Beatrice', role:'英伦文学叙述', language:'英文', age:'中年', provider:'ElevenLabs', tags:['audiobook','narration','文学'], image:'assets/generated/voice-library-sheets/audiobook-v1.png', crop:[4,0,0]},
  elias: {name:'Elias', role:'厚重智慧旁白', language:'英文', age:'老年', provider:'Fish Audio', tags:['audiobook','narration','沉稳'], image:'assets/generated/voice-library-sheets/audiobook-v1.png', crop:[4,1,0]},
  lin: {name:'林汐', role:'抒情小说叙述', language:'中文', age:'青年', provider:'MiniMax', tags:['audiobook','narration','治愈'], image:'assets/generated/voice-library-sheets/audiobook-v1.png', crop:[4,2,0]},
  grant: {name:'Grant', role:'犯罪悬疑旁白', language:'英文', age:'中年', provider:'ElevenLabs', tags:['audiobook','narration','悬疑'], image:'assets/generated/voice-library-sheets/audiobook-v1.png', crop:[4,3,0]},
  ananya: {name:'Ananya', role:'奇幻史诗叙述', language:'英文', age:'青年', provider:'Seed Audio', tags:['audiobook','narration','奇幻'], image:'assets/generated/voice-library-sheets/audiobook-v1.png', crop:[4,0,1]},
  shiro: {name:'志郎', role:'东方经典叙述', language:'日语', age:'老年', provider:'Fish Audio', tags:['audiobook','narration','古典'], image:'assets/generated/voice-library-sheets/audiobook-v1.png', crop:[4,1,1]},
  imani: {name:'Imani', role:'当代情感叙述', language:'英文', age:'青年', provider:'ElevenLabs', tags:['audiobook','narration','情感'], image:'assets/generated/voice-library-sheets/audiobook-v1.png', crop:[4,2,1]},
  omar: {name:'Omar', role:'历史史诗旁白', language:'英文', age:'中年', provider:'MiniMax', tags:['audiobook','narration','历史'], image:'assets/generated/voice-library-sheets/audiobook-v1.png', crop:[4,3,1]},

  ziyu: {name:'子瑜', role:'古装谋士', language:'中文', age:'青年', provider:'MiniMax', tags:['character','广播剧','古典'], image:'assets/generated/voice-library-sheets/audio-drama-v1.png', crop:[4,0,0]},
  adaeze: {name:'Adaeze', role:'铁血女统帅', language:'英文', age:'中年', provider:'ElevenLabs', tags:['character','广播剧','力量'], image:'assets/generated/voice-library-sheets/audio-drama-v1.png', crop:[4,1,0]},
  cole: {name:'Cole', role:'疲惫悬疑侦探', language:'英文', age:'中年', provider:'Fish Audio', tags:['character','广播剧','悬疑'], image:'assets/generated/voice-library-sheets/audio-drama-v1.png', crop:[4,2,0]},
  ren: {name:'Ren', role:'冷静星际飞行员', language:'日语', age:'青年', provider:'Seed Audio', tags:['character','广播剧','科幻'], image:'assets/generated/voice-library-sheets/audio-drama-v1.png', crop:[4,3,0]},
  layla: {name:'Layla', role:'神秘幻术师', language:'英文', age:'青年', provider:'ElevenLabs', tags:['character','广播剧','奇幻'], image:'assets/generated/voice-library-sheets/audio-drama-v1.png', crop:[4,0,1]},
  vicente: {name:'Vicente', role:'克制反派领主', language:'西班牙语', age:'老年', provider:'Fish Audio', tags:['character','广播剧','反派'], image:'assets/generated/voice-library-sheets/audio-drama-v1.png', crop:[4,1,1]},
  nyx: {name:'Nyx', role:'赛博机械师', language:'英文', age:'青年', provider:'MiniMax', tags:['character','广播剧','科幻'], image:'assets/generated/voice-library-sheets/audio-drama-v1.png', crop:[4,2,1]},
  dev: {name:'Dev', role:'沉稳王室顾问', language:'英文', age:'中年', provider:'Seed Audio', tags:['character','广播剧','古典'], image:'assets/generated/voice-library-sheets/audio-drama-v1.png', crop:[4,3,1]}
};

const voiceCollections = [
  {id:'featured', title:'精选音色', description:'编辑团队挑选的高完成度通用音色', voices:['arabella','ronin','maya','fangbai','theo','noor','zhouyu','elena','jun']},
  {id:'intimate', title:'亲密陪伴', description:'近距离、治愈、带有角色关系感的声音', voices:['lia','amari','priya','elliot','samira','mateo']},
  {id:'podcast', title:'播客常用', description:'主持、对谈、访谈与品牌节目的稳定选择', voices:['camila','kenji','malcolm','claire','arjun','monique','alex','haruko']},
  {id:'audiobook', title:'有声书常用', description:'适合长时间收听的叙事与角色音色', voices:['beatrice','elias','lin','grant','ananya','shiro','imani','omar']},
  {id:'drama', title:'广播剧常用', description:'角色辨识度、戏剧张力与多人搭配优先', voices:['ziyu','adaeze','cole','ren','layla','vicente','nyx','dev']}
];

const renderVoiceAvatar = voice => voice.crop
  ? `<span class="voice-avatar-crop ${voice.image.includes('audio-drama') ? 'portrait-grid' : ''}" style="--avatar-cols:${voice.crop[0]};--avatar-col:${voice.crop[1]};--avatar-row:${voice.crop[2]}"><img src="${voice.image}" alt="${voice.name} 专属头像"></span>`
  : `<img src="${voice.image}" alt="${voice.name} 专属头像">`;

const voiceModelLabels = {
  'ElevenLabs':'ElevenLabs v3',
  'MiniMax':'MiniMax Speech 2.8 HD',
  'Seed Audio':'Seed Audio 1.0',
  'Fish Audio':'Fish Audio S1'
};

const voiceFilterMenus = [
  ['language','语言',[['全部','全部'],['中文','中文'],['英文','英文'],['日语','日语'],['西班牙语','西班牙语'],['非语言','非语言']]],
  ['age','年龄',[['全部','全部'],['少年','少年'],['青年','青年'],['中年','中年'],['老年','老年']]],
  ['model','模型',[['全部','全部'],['ElevenLabs','ElevenLabs v3'],['MiniMax','MiniMax Speech 2.8 HD'],['Seed Audio','Seed Audio 1.0'],['Fish Audio','Fish Audio S1']]]
];

const voiceStyleFilters = [
  ['narration','旁白'],
  ['conversational','对话'],
  ['educational','教育'],
  ['advertisement','广告'],
  ['sexy','性感'],
  ['character','角色'],
  ['podcast','播客'],
  ['audiobook','有声书'],
  ['广播剧','广播剧'],
  ['治愈','治愈'],
  ['悬疑','悬疑'],
  ['科幻','科幻'],
  ['horror','恐怖'],
  ['robot','机器人'],
  ['dog','宠物拟声'],
  ['低语','低语']
];

const renderVoiceFilterControl = ([group, label, options]) => `
  <div class="voice-filter-control">
    <button class="voice-filter-trigger" data-voice-filter-menu="${group}" aria-expanded="false"><span>${label}</span><b data-voice-filter-summary="${group}">全部</b><i>⌄</i></button>
    <div class="voice-filter-popover" data-voice-filter-popover="${group}" hidden>
      <header><b>${label}</b><button data-voice-filter-close aria-label="关闭">×</button></header>
      <div>${options.map(([value, text], index) => `<button class="voice-filter-option ${index === 0 ? 'active' : ''}" data-voice-filter="${group}" data-filter-value="${value}"><i>✓</i><span>${text}</span></button>`).join('')}</div>
    </div>
  </div>`;

const renderVoiceCard = (id, compact = false) => {
  const voice = voiceCatalog[id];
  const model = voiceModelLabels[voice.provider] || voice.provider;
  return `
    <article class="voice-library-card ${compact ? 'compact' : ''}" data-voice-id="${id}" data-owned="${voice.owned ? 'true' : 'false'}" data-search-item="${voice.name} ${voice.role} ${voice.language} ${voice.age} ${voice.provider} ${model} ${voice.tags.join(' ')}">
      <button class="voice-avatar-play" data-voice-play aria-label="试听 ${voice.name}">
        ${renderVoiceAvatar(voice)}
        <i>▶</i>
      </button>
      <div class="voice-library-copy"><b>${voice.name}</b><span>${voice.role}</span><small>${voice.language} · ${voice.age} · ${model}</small></div>
      <button class="favorite-button" data-favorite aria-label="收藏 ${voice.name}">☆</button>
      <button class="voice-use" data-voice-use="${voice.name}">使用</button>
    </article>`;
};

const voiceLibrary = () => `
  ${pageHeader('音色库', '试听、筛选并管理用于语音生成和完整作品的角色音色',
    '<div class="voice-header-actions"><button class="outline-action" data-page-link="音色克隆">克隆音色</button><button class="primary-action" data-page-link="音色设计">设计音色</button></div>')}
  <div class="voice-library-tabs" role="tablist">
    ${['全部','我的音色','收藏'].map((tab, index) => `<button class="${index === 0 ? 'active' : ''}" data-voice-tab="${tab}">${tab}</button>`).join('')}
  </div>
  <div class="library-toolbar voice-library-search">
    <label class="wide-search">⌕<input class="library-search" placeholder="搜索音色名称、角色、语言、标签或模型"></label>
    <button class="outline-action" data-voice-clear>清除筛选</button>
  </div>
  <div class="voice-filter-bar">
    ${voiceFilterMenus.map(renderVoiceFilterControl).join('')}
    <div class="popular-filter-tags">
      ${voiceStyleFilters.map(([value, label]) => `<button class="voice-filter-tag" data-voice-filter="tag" data-filter-value="${value}">${label}</button>`).join('')}
    </div>
  </div>
  <section class="voice-filter-results" data-voice-filter-results hidden>
    <header><div><small>FILTERED VOICES</small><h2>筛选结果</h2></div><span data-voice-results-note>找到 0 个音色</span></header>
    <div class="voice-library-grid voice-filter-results-grid">
      ${Object.keys(voiceCatalog).map(id => renderVoiceCard(id, true).replace('<article', '<article data-voice-filter-result')).join('')}
    </div>
    <div class="voice-empty-state" data-voice-empty hidden><b>没有符合当前条件的音色</b><span>减少筛选条件或换一个关键词试试</span><button data-voice-clear>清除筛选</button></div>
  </section>
  <div data-voice-topic-content>
  ${voiceCollections.filter(collection => collection.id === 'featured').map(collection => `
    <section class="voice-topic" data-voice-section="${collection.id}">
      <header><div><h2>${collection.title}</h2><p>${collection.description}</p></div><button data-demo-action="已打开${collection.title}全部音色">查看全部 →</button></header>
      <div class="voice-library-grid">${collection.voices.map(id => renderVoiceCard(id, false)).join('')}</div>
    </section>
  `).join('')}
  <section class="voice-topic trending-topic" data-voice-section="trending">
    <header><div><small>RISING THIS WEEK</small><h2>Trending voices</h2><p>角色梗、拟声与当下高热度搜索音色</p></div><span>每周更新</span></header>
    <div class="trending-voice-grid">
      ${['ghostface','golden','nova','raven','corgi','porcelain','courtside','atlas'].map((id, index) => {
        const voice = voiceCatalog[id];
        return `<article class="trending-voice-card" data-voice-id="${id}" data-owned="false" data-search-item="${voice.name} ${voice.role} ${voice.language} ${voice.age} ${voice.provider} ${voice.tags.join(' ')}">
          <span class="trend-rank">0${index + 1}</span><img src="${voice.image}" alt="${voice.name} 专属头像"><div><b>${voice.name}</b><small>${voice.role}</small><em>↗ ${88 - index * 7}%</em></div><button data-voice-play aria-label="试听 ${voice.name}">▶</button><button data-favorite aria-label="收藏 ${voice.name}">☆</button>
        </article>`;
      }).join('')}
    </div>
  </section>
  ${voiceCollections.filter(collection => collection.id !== 'featured').map(collection => `
    <section class="voice-topic" data-voice-section="${collection.id}">
      <header><div><h2>${collection.title}</h2><p>${collection.description}</p></div><button data-demo-action="已打开${collection.title}全部音色">查看全部 →</button></header>
      <div class="voice-library-grid">${collection.voices.map(id => renderVoiceCard(id, collection.id !== 'featured')).join('')}</div>
    </section>
  `).join('')}
  </div>
`;

const assetCards = [
  ['语', '工坊里的承诺', '语音', 'ElevenLabs v3 · 00:18', 'lime'],
  ['雨', '雨夜玻璃房', '音效', 'ElevenLabs 音效模型 · 00:32', 'blue'],
  ['乐', '克制弦乐主题', '音乐', 'Lyria 3 Pro · 02:41', 'violet'],
  ['声', 'Arabella 角色音色', '音色', '自定义音色 · 英文', 'peach'],
  ['文', 'Forged Together 脚本', '文本', '1,272 词 · 单章', 'paper'],
  ['语', '科技播客开场', '语音', 'MiniMax 2.8 HD · 00:24', 'green']
];

const assetLibrary = () => `
  ${pageHeader('资产库', '统一管理生成、上传和作品中采用的所有音频与文本资产',
    '<button class="primary-action" data-upload>＋ 上传资产</button>')}
  <div class="library-toolbar">
    <label class="wide-search">⌕<input class="library-search" placeholder="搜索资产名称、模型或标签"></label>
    <button class="outline-action" data-demo-action="已刷新资产库">刷新</button>
  </div>
  <div class="asset-controls">
    <div class="source-switch">
      <button class="active" data-segment>生成资产</button><button data-segment>上传资产</button><button data-segment>作品素材</button>
    </div>
    <div class="filter-line">
      ${['全部 24', '语音 10', '音效 6', '音乐 3', '音色 2', '文本 3'].map((tag, index) =>
        `<button class="filter-chip ${index === 0 ? 'active' : ''}">${tag}</button>`).join('')}
    </div>
    <div class="view-switch"><button class="active" data-segment>▦</button><button data-segment>☷</button></div>
  </div>
  <div class="asset-section-heading">
    <div><b>最近资产</b><small>按最近修改时间排序</small></div>
    <div class="storage-usage"><span>已使用 48 / 50 GB</span><i><em></em></i><button data-page-link="价格与套餐">升级空间</button></div>
  </div>
  <div class="asset-grid">
    ${assetCards.map(([icon, name, type, meta, tone]) => `
      <article class="asset-card" data-search-item="${name} ${type} ${meta}">
        <div class="asset-preview ${tone}"><span>${icon}</span><div class="asset-wave"></div><button class="mini-play">▶</button></div>
        <div class="asset-meta"><b>${name}</b><small>${type} · ${meta}</small></div>
        <div class="asset-actions">
          <button data-demo-action="已将 ${name} 加入当前项目">加入项目</button>
          <button data-demo-action="已下载 ${name}">↓</button>
          <button data-demo-action="已打开更多操作">•••</button>
        </div>
      </article>
    `).join('')}
  </div>
`;

const textToSpeech = () => `
  ${pageHeader('文本转语音', '使用多家语音模型生成自然、可控、可继续编辑的角色表演')}
  <div class="tool-split">
    <section class="tool-stage speech-stage">
      <textarea class="stage-textarea" placeholder="输入或粘贴要转换成语音的文本">凌晨的雨落在工坊窗上。他握着尚未完成的戒指，声音很轻，却不再躲闪。</textarea>
      <div class="stage-hints">
        <button data-demo-action="已插入情绪标签">＋ 情绪</button>
        <button data-demo-action="已插入停顿">＋ 停顿</button>
        <button data-demo-action="已插入发音规则">＋ 发音规则</button>
        <span>42 / 5,000 字</span>
      </div>
      <div class="stage-footer">
        <div>${modelSelect('模型', 'ElevenLabs v3')}${modelSelect('音色', 'Arabella · 温暖叙事')}</div>
        <button class="primary-action" data-page-generate>生成语音</button>
      </div>
    </section>
    <aside class="tool-inspector">
      ${pageTabs(['设置', '历史'], '设置')}
      <label class="inspector-range"><span><b>语速</b><output>1.00×</output></span><input type="range" min="70" max="130" value="100"></label>
      <label class="inspector-range"><span><b>稳定性</b><output>42</output></span><input type="range" min="0" max="100" value="42"></label>
      <label class="inspector-range"><span><b>风格强度</b><output>64</output></span><input type="range" min="0" max="100" value="64"></label>
      <label class="inspector-range"><span><b>音色相似度</b><output>78</output></span><input type="range" min="0" max="100" value="78"></label>
      <label class="inspector-select"><span><b>输出格式</b><small>用于继续编辑</small></span><select><option>WAV · 48 kHz</option><option>MP3 · 44.1 kHz</option></select></label>
    </aside>
  </div>
  ${historyRows([
    ['工坊里的承诺', 'Arabella · ElevenLabs v3', '00:18'],
    ['科技播客开场', 'Maya · MiniMax 2.8 HD', '00:24'],
    ['睡前引导开场', '苏禾 · Seed Audio 1.0', '00:31']
  ])}
`;

const soundSearchRows = [
  ['铁锤敲击铁砧', '三次沉重敲击，金属余响清晰', 'Freesound', 'CC BY 4.0', 'InspectorJ', '00:04', 'hammer anvil metal workshop'],
  ['雨夜工坊环境', '雨打木窗、远处低雷与稳定室内底噪', 'Openverse', 'CC0', 'klankbeeld', '00:32', 'rain workshop room ambience thunder'],
  ['沉重机械门开启', '低频金属摩擦、锁扣释放与气压尾声', 'Pixabay', 'Pixabay Content License', 'SoundReality', '00:07', 'mechanical door metal pressure'],
  ['铁链落在石地', '近距离铁链坠落，干燥石室，无人声', 'Freesound', 'CC BY 4.0', 'Kinoton', '00:05', 'chain drop stone dry foley'],
  ['篝火与微弱夜风', '稳定火焰噼啪声，偶尔木柴断裂', 'Openverse', 'CC BY 3.0', 'inchadney', '01:12', 'campfire night wind ambience'],
  ['玻璃球滚过木桌', '细小玻璃球由左向右滚动，近距离收音', 'Freesound', 'CC0', 'qubodup', '00:09', 'glass marble rolling wood asmr']
];

const soundSearchResults = () => `
  <div class="sfx-search-toolbar">
    <label class="sfx-search-field">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>
      <input class="sfx-search-input" value="铁锤敲击铁砧，干燥工坊" placeholder="描述声音，或输入关键词">
      <kbd>↵</kbd>
    </label>
    <button class="primary-action" data-sfx-search>搜索</button>
  </div>
  <div class="sfx-search-options">
    <div class="filter-line">
      ${['全部来源', 'Freesound', 'Openverse', 'Pixabay'].map((tag, index) =>
        `<button class="filter-chip ${index === 0 ? 'active' : ''}" data-sfx-source="${tag}">${tag}</button>`).join('')}
    </div>
    <button class="sfx-license-filter" data-demo-action="已打开许可证筛选">
      <span>许可证</span><b>允许商业使用</b><i>⌄</i>
    </button>
  </div>
  <div class="sfx-suggestion-line">
    <span>试试</span>
    ${[
      ['工坊锻造', '铁锤敲击铁砧，干燥工坊'],
      ['自然环境', '雨夜森林，树叶滴水，远处低雷'],
      ['奇妙 ASMR', '玻璃球滚过木桌，近距离双耳'],
      ['转场音效', '短促低频冲击，干净电影转场']
    ].map(([label, query]) => `<button data-sfx-query="${query}">${label}</button>`).join('')}
  </div>
  <div class="sfx-result-heading">
    <div><b>搜索结果</b><small data-sfx-result-count>找到 6 个适合继续编辑的声音</small></div>
    <button data-demo-action="已切换为相关度排序">相关度最高 ↕</button>
  </div>
  <div class="sfx-results">
    ${soundSearchRows.map(([name, description, source, license, author, duration, keywords], index) => `
      <article class="sfx-result" data-sfx-result data-source="${source}" data-search-item="${name} ${description} ${source} ${keywords}">
        <button class="mini-play sfx-result-play" aria-label="试听">▶</button>
        <div class="sfx-result-copy">
          <b>${name}</b>
          <small>${description}</small>
          <div><span>${source}</span><span>${license}</span><span>作者 ${author}</span></div>
        </div>
        <div class="sfx-result-wave wave-${(index % 3) + 1}" aria-hidden="true"></div>
        <time>${duration}</time>
        <button class="sfx-result-icon" data-favorite aria-label="收藏">☆</button>
        <button class="outline-action sfx-download" data-demo-action="已下载 ${name}">下载</button>
        <button class="primary-action sfx-add-asset" data-sfx-add="${name}">加入资产</button>
      </article>
    `).join('')}
  </div>
  <p class="sfx-rights-note"><b>授权随素材保存</b><span>加入资产时会一并记录来源、作者、原始链接与许可证，导出作品前再次检查</span></p>
`;

const soundEffects = () => `
  ${pageHeader('音效', '生成新的声音，或从公开音效库搜索可继续编辑的素材')}
  <div class="sfx-mode-switch" role="tablist" aria-label="音效获取方式">
    <button class="active" data-sfx-view="generate" role="tab">
      <span>✦</span><b>生成音效</b><small>描述不存在的声音或精确控制听感</small>
    </button>
    <button data-sfx-view="search" role="tab">
      <span>⌕</span><b>搜索音效</b><small>从公开素材库寻找已有录音</small>
    </button>
  </div>
  <div class="sfx-view" data-sfx-panel="generate">
    <div class="inspiration-strip">
      ${[['动','动作拟音','lime'],['境','环境声场','blue'],['奇','奇妙音效','violet'],['自','自然声音','green'],['机','机械装置','amber'],['转','场景转场','rose']].map(([icon,name,tone]) =>
        `<button class="inspiration-tile ${tone}" data-fill-prompt="${name}">${icon}<span>${name}</span></button>`).join('')}
    </div>
    <section class="prompt-console">
      <textarea class="console-prompt" placeholder="描述声音、动作、材质、空间和距离">近距离铁锤敲击铁砧三次，金属余响清晰，干燥安静的工坊</textarea>
      <div class="console-examples">
        <button data-fill-prompt="雨滴打在木窗上，室内视角，远处低雷">雨打木窗</button>
        <button data-fill-prompt="玻璃球缓慢滚过木桌，近距离双耳">玻璃滚动</button>
        <button data-fill-prompt="厚重机械门开启，低频摩擦与气压释放">机械门</button>
      </div>
      <div class="console-footer">
        <div>
          ${modelSelect('模型', 'ElevenLabs 音效模型')}
          <button class="inline-control active" data-segment>自动时长</button>
          <button class="inline-control" data-segment>无缝循环</button>
        </div>
        <button class="primary-action" data-page-generate>生成音效</button>
      </div>
    </section>
    ${historyRows([
      ['铁锤敲击铁砧', 'AI 生成 · 动作拟音 · 干燥工坊', '00:04'],
      ['工坊环境床', 'AI 生成 · 环境声 · 无缝循环', '00:24'],
      ['雨打木窗', 'AI 生成 · 自然声 · 室内视角', '00:18']
    ])}
  </div>
  <div class="sfx-view" data-sfx-panel="search" hidden>
    ${soundSearchResults()}
  </div>
`;

const music = () => `
  ${pageHeader('音乐生成', '生成完整音乐、叙事配乐、片头曲和可循环背景音乐')}
  ${pageTabs(['灵感', '生成记录', '收藏'], '灵感')}
  <section class="music-console">
    <div class="music-copy">
      <p>音乐描述</p>
      <textarea class="console-prompt" placeholder="描述风格、情绪、乐器和结构">克制的弦乐与低音钢琴，缓慢积累力量，适合亲密故事的情绪转折</textarea>
      <div class="console-examples">
        <button data-fill-prompt="温暖的睡眠氛围音乐，无鼓点，缓慢呼吸般起伏">睡眠氛围</button>
        <button data-fill-prompt="未来感科技播客片头，12 秒，结尾干净落点">播客片头</button>
        <button data-fill-prompt="轻快好奇的儿童冒险主题，木琴与柔和弦乐">儿童冒险</button>
      </div>
      <div class="music-settings">
        ${modelSelect('模型', 'Lyria 3 Pro')}
        ${modelSelect('时长', '02:30')}
        ${modelSelect('结构', '自动编排')}
      </div>
      <button class="primary-action music-generate" data-page-generate>生成音乐</button>
    </div>
    <div class="music-inspiration">
      <article class="music-art art-one"><span>叙事配乐</span><b>情绪弧线</b></article>
      <article class="music-art art-two"><span>睡眠音乐</span><b>缓慢呼吸</b></article>
      <article class="music-art art-three"><span>品牌声音</span><b>短促记忆点</b></article>
      <article class="music-art art-four"><span>儿童主题</span><b>明亮好奇</b></article>
    </div>
  </section>
  ${historyRows([
    ['克制弦乐主题', 'Lyria 3 Pro · 叙事配乐', '02:41'],
    ['雨夜睡眠氛围', 'Eleven Music v2 · 无鼓点', '08:00'],
    ['科技播客片头', 'MusicGen · 品牌声音', '00:12']
  ])}
`;

const uploadZone = (title, hint, record = false) => `
  <button class="upload-zone" data-upload>
    <span class="upload-symbol">＋</span>
    <b>${title}</b>
    <small>${hint}</small>
    ${record ? '<em>或点击录音</em>' : ''}
  </button>
`;

const voiceIsolator = () => `
  ${pageHeader('人声分离', '从混合音频中提取干净人声，并保留可单独下载的背景轨')}
  <section class="processor-stage">
    ${uploadZone('上传或拖入音频', '支持 MP3、WAV、M4A，单个文件不超过 500 MB', true)}
    <div class="processor-footer"><span>0 / 500 MB</span>${modelSelect('处理模型', 'Murmia 工作室分离')}<button class="primary-action" data-page-generate>开始分离</button></div>
  </section>
  ${historyRows([
    ['采访录音_07', '已分离人声与背景 · WAV', '18:24'],
    ['工坊原始混音', '已分离对白、音乐、环境', '07:31'],
    ['手机录音_睡眠引导', '已提取人声', '04:12']
  ])}
`;

const voiceChanger = () => `
  ${pageHeader('声音转换', '保留原录音的节奏与情绪，将声音转换为目标角色音色')}
  <div class="tool-split">
    <section class="tool-stage upload-stage">
      ${uploadZone('上传需要转换的声音', '可上传音频或视频，也可以直接录音', true)}
      <div class="stage-footer"><span>总时长 00:00</span><button class="primary-action" data-page-generate>生成转换声音</button></div>
    </section>
    <aside class="tool-inspector">
      ${pageTabs(['设置', '历史'], '设置')}
      ${modelSelect('目标音色', 'Christian · 亲密男声')}
      ${modelSelect('模型', 'ElevenLabs 声音转换')}
      <label class="inspector-range"><span><b>音色相似度</b><output>78</output></span><input type="range" min="0" max="100" value="78"></label>
      <label class="inspector-range"><span><b>表演保留</b><output>86</output></span><input type="range" min="0" max="100" value="86"></label>
      <label class="toggle-row"><span><b>转换前降噪</b><small>清理持续底噪但保留呼吸</small></span><input type="checkbox" checked></label>
    </aside>
  </div>
  ${historyRows([
    ['Toby_试音_take03', '转换为 Christian · 表演保留 86', '00:20'],
    ['角色小样_年轻版', '转换为 Maya · 音色相似度 72', '00:12']
  ])}
`;

const dubbing = () => `
  ${pageHeader('视频配音', '翻译并重新配制视频中的对白，保持说话节奏与角色一致')}
  <section class="dubbing-stage">
    <div class="source-switch dubbing-switch"><button class="active" data-segment>上传文件</button><button data-segment>粘贴网址</button></div>
    ${uploadZone('选择视频或音频文件', '支持 MP4、MOV、MP3、WAV，也可以拖入文件')}
    <div class="dubbing-settings">
      ${modelSelect('原始语言', '自动识别')}
      ${modelSelect('目标语言', '英语')}
      ${modelSelect('说话人', '自动识别并匹配')}
      <button class="outline-action" data-demo-action="已打开高级设置">高级设置</button>
      <button class="primary-action" data-page-generate>开始配音</button>
    </div>
  </section>
  <div class="feature-note"><span>译</span><div><b>保留每个角色的身份与情绪</b><small>自动识别说话人、翻译对白并同步语速，生成后仍可逐句修改</small></div><button data-demo-action="正在播放配音示例">试听示例</button></div>
  ${historyRows([
    ['产品介绍_英文版', '中文 → 英语 · 2 位说话人', '02:18'],
    ['儿童短剧_西语版', '中文 → 西班牙语 · 4 位角色', '04:36']
  ])}
`;

const voiceDesign = () => `
  ${pageHeader('音色设计', '用自然语言描述一个不存在的角色声音，并生成可复用音色')}
  <div class="design-layout">
    <section class="design-main">
      <label class="field-label">描述目标音色</label>
      <textarea class="design-prompt">成年女性，声音温暖、自然、略带气息感。平静中有深层力量，不紧绷，也不过度甜美，适合治愈故事与睡眠引导。</textarea>
      <div class="trait-chips">
        ${['年轻温柔', '激愤解说', '悬疑故事', '摇篮曲声', '严厉教师', '自然气声'].map(tag =>
          `<button class="filter-chip" data-fill-prompt="${tag}">${tag}</button>`).join('')}
      </div>
      <label class="field-label">试听文本</label>
      <textarea class="preview-text">你不需要立刻解决所有事情。先让呼吸慢下来，然后感受自己仍然站在这里。</textarea>
      <div class="design-footer"><span>将生成 3 个候选音色</span><button class="primary-action" data-page-generate>生成音色</button></div>
    </section>
    <aside class="design-guide">
      <b>怎样描述得更准确</b>
      <ol><li>年龄与性别感</li><li>音高、质感和气息</li><li>情绪基调与力量来源</li><li>使用场景与不希望出现的特征</li></ol>
      <div class="guide-example"><small>示例</small><p>“不是播音腔，不要虚弱或过度平静，要像一个经历过很多事情、仍愿意温柔说话的人”</p></div>
    </aside>
  </div>
`;

const voiceClone = () => `
  ${pageHeader('音色克隆', '使用已获得授权的声音样本，创建可用于生成的专属音色')}
  <div class="clone-layout">
    <section class="clone-main">
      <label class="field-label">选择使用场景</label>
      <div class="scenario-chips">
        ${['有声读物', '影视配音', '播客', '教育培训', '智能客服', '角色创作'].map((tag, index) =>
          `<button class="filter-chip ${index === 0 ? 'active' : ''}">${tag}</button>`).join('')}
      </div>
      ${uploadZone('录制或上传声音样本', '建议 30 秒至 3 分钟，环境安静、只有一个说话人', true)}
      <label class="field-label">试听文本</label>
      <textarea class="preview-text">你好，很高兴能为您提供语音服务。选择您感兴趣的音色，让我们一起开启声音创作之旅。</textarea>
      <label class="consent-row"><input type="checkbox"><span><b>我确认拥有该声音的使用授权</b><small>不得克隆未获授权的真实人物声音</small></span></label>
      <div class="design-footer"><span>克隆后可在音色库中管理</span><button class="primary-action" data-page-generate>创建音色克隆</button></div>
    </section>
    <aside class="recording-quality">
      <div class="clone-quota"><span><b>3 / 5</b><small>音色槽位</small></span><button data-page-link="价格与套餐">增加槽位</button></div>
      <b>样本质量</b>
      <div class="quality-meter"><i></i><i></i><i></i><i></i><i></i></div>
      <small>上传后会检测底噪、混响、削波和说话人数量</small>
      <ul><li>避免背景音乐和其他人声</li><li>保持自然语速与完整句子</li><li>不要使用经过强降噪的素材</li></ul>
    </aside>
  </div>
`;

const audioEnhancer = () => `
  ${pageHeader('音频增强', '清理底噪、混响、爆音和忽大忽小的音量，让录音更接近可发布状态')}
  <section class="sem-tool-stage enhancer-stage">
    ${uploadZone('上传需要修复的录音', '支持 WAV、MP3、M4A，处理前后都可试听', true)}
    <div class="sem-preset-grid">
      ${[
        ['智能清理', '同时处理底噪、混响与响度'],
        ['去除背景噪音', '空调、风扇、路噪与电流声'],
        ['修复房间混响', '减少空房间和墙面反射'],
        ['统一人声响度', '保留动态但避免忽大忽小']
      ].map(([title, hint], index) => `<button class="${index === 0 ? 'active' : ''}" data-segment><b>${title}</b><small>${hint}</small></button>`).join('')}
    </div>
    <div class="sem-action-row"><span>输出 WAV · 48 kHz</span><button class="primary-action" data-page-generate>开始增强</button></div>
  </section>
`;

const audioRecorder = () => `
  ${pageHeader('录音工作室', '在浏览器中录制播客、旁白和角色台词，完成后直接交给 Agent 或编辑器')}
  <section class="recorder-stage">
    <div class="recording-meter"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <button class="record-button" data-demo-action="正在模拟录音"><span></span>开始录音</button>
    <p>默认麦克风 · 48 kHz · 单声道</p>
    <div class="recording-options">
      <label><input type="checkbox" checked> 实时降噪</label>
      <label><input type="checkbox" checked> 自动防削波</label>
      <label><input type="checkbox"> 同时录制系统声音</label>
    </div>
  </section>
  ${historyRows([
    ['播客访谈_take04', '浏览器录音 · 双人远程', '24:18'],
    ['旁白补录_第三章', '浏览器录音 · 实时降噪', '03:42']
  ])}
`;

const producerTag = () => `
  ${pageHeader('制作人标签生成器', '用一句短促、有记忆点的声音签名建立作品或音乐人的辨识度')}
  <div class="producer-tag-layout">
    <section>
      <label class="field-label">标签文案</label>
      <input class="sem-text-input" value="Murmia made this sound">
      <label class="field-label">声音方向</label>
      <div class="sem-choice-row">
        ${['电影预告感', '贴耳女声', '机器人广播', '低沉耳语'].map((item, index) => `<button class="${index === 1 ? 'active' : ''}" data-segment>${item}</button>`).join('')}
      </div>
      <div class="sem-action-row"><span>将生成 4 个版本</span><button class="primary-action" data-page-generate>生成标签</button></div>
    </section>
    <aside class="producer-preview"><span>0:03</span><b>MURMIA</b><div class="landing-wave"></div><button class="mini-play">▶</button></aside>
  </div>
`;

const audioEditor = () => `
  ${pageHeader('音频编辑器', '快速剪切、拼接、淡入淡出和调整响度，适合处理单条音频')}
  <section class="mini-editor">
    <div class="mini-editor-toolbar"><button data-demo-action="已执行撤销">↶</button><button data-demo-action="已切割片段">✂ 切割</button><button data-demo-action="已添加淡入">淡入</button><button data-demo-action="已标准化响度">响度标准化</button><button data-upload>＋ 导入音频</button></div>
    <div class="mini-editor-ruler"><span>00:00</span><span>00:15</span><span>00:30</span><span>00:45</span></div>
    <div class="mini-editor-track"><b>主音轨</b><div class="mini-editor-clip"><span>访谈录音_07.wav</span><div class="landing-wave"></div></div></div>
    <div class="sem-action-row"><button class="mini-play">▶</button><span>00:00 / 00:52</span><button class="primary-action" data-demo-action="已打开导出设置">导出</button></div>
  </section>
`;

const spritePosition = index => {
  const x = ['0%', '33.333%', '66.667%', '100%'][index % 4];
  const y = index < 4 ? '0%' : '100%';
  return `--avatar-x:${x};--avatar-y:${y}`;
};

const voiceAvatarList = ({sheet, names, start = 0}) => names.map((name, index) => `
  <button class="voice-choice ${index === 0 ? 'selected' : ''}" data-voice-choice="${name}">
    <span class="voice-avatar-image" style="--avatar-sheet:url('${sheet}');${spritePosition(start + index)}"></span>
    <span class="voice-choice-copy"><b>${name}</b><small>${index === 0 ? '当前音色' : '试听并选择'}</small></span>
  </button>
`).join('');

const voiceGeneratorLanding = ({
  title,
  eyebrow,
  description,
  example,
  tone,
  note = '',
  sheet,
  voices,
  start = 0,
  model = 'ElevenLabs v3'
}) => `
  <main class="voice-generator-page ${tone}">
    <header class="voice-generator-intro">
      <p class="workspace-kicker">${eyebrow}</p>
      <h1>${title}</h1>
      <p>${description}</p>
    </header>

    <section class="voice-generator-console">
      <div class="voice-picker-heading">
        <div><small>CHOOSE A VOICE</small><h2>选择一种声音开始</h2></div>
        <button class="voice-sample-play" data-voice-sample>
          <span class="sample-play-icon">▶</span>
          <span><b>试听 <em data-selected-voice>${voices[0]}</em></b><small>8 秒示例音频</small></span>
          <i class="sample-mini-wave" aria-hidden="true"></i>
        </button>
      </div>

      <div class="voice-choice-grid">
        ${voiceAvatarList({sheet, names:voices, start})}
      </div>

      <div class="voice-prompt-heading">
        <label for="voiceGeneratorPrompt">输入要生成的文字</label>
        <span><b data-voice-count>${example.length}</b> / 500</span>
      </div>
      <textarea id="voiceGeneratorPrompt" class="voice-generator-input" maxlength="500">${example}</textarea>

      <div class="voice-generator-footer">
        <div class="voice-generator-settings">
          ${modelSelect('模型', model)}
          ${modelSelect('语言', 'English')}
        </div>
        <button class="voice-generate-button" data-voice-generate>
          <span>Generate</span><b>→</b>
        </button>
      </div>

      <div class="voice-generation-result" data-voice-result hidden>
        <button class="result-play" data-voice-sample><span>▶</span></button>
        <div><small>GENERATED AUDIO</small><b data-result-title>${voices[0]} · New take</b><i class="generated-wave" aria-hidden="true"></i></div>
        <span>0:08</span>
        <button class="result-download" data-demo-action="已下载生成的音频">↓ 下载</button>
      </div>
    </section>

    ${note ? `<div class="voice-rights-note"><b>使用说明</b><span>${note}</span></div>` : ''}
  </main>
`;

const famousVoiceLanding = (options = {}) => {
  const keyword = String(options.sourceKeyword || '').toLowerCase();
  const isBasketball = keyword.includes('lebron') || keyword.includes('james');
  if (isBasketball) {
    return voiceGeneratorLanding({
      title:'LeBron James AI Voice Generator',
      eyebrow:'BASKETBALL VOICE COLLECTION',
      description:'输入一句文字，快速试听不同篮球人物方向的表达效果，并选择最适合内容的声音',
      example:'Championships are won in the moments when preparation meets pressure.',
      tone:'athlete',
      sheet:'./assets/voices/basketball-sprite.png',
      voices:['LeBron James','Veteran Guard','Power Forward','Court Leader','Clutch Scorer','Defensive Captain','Rising Rookie','Studio Analyst'],
      note:'本页是关键词落地体验原型。真人声音只有在身份与商业授权核验通过后才开放生成，否则使用原创相似风格'
    });
  }
  return voiceGeneratorLanding({
    title: keyword.includes('trump') ? 'Donald Trump AI Voice Generator' : 'Celebrity AI Voice Generator',
    eyebrow:'WORLD LEADER VOICE COLLECTION',
    description:'输入一句文字，选择不同领导者与公众表达风格，试听节奏、力量与演讲感的差异',
    example:'The future belongs to those who are ready to build it together.',
    tone:'leader',
    sheet:'./assets/voices/leaders-sprite.png',
    voices:['Donald Trump','Narendra Modi','Angela Merkel','Xi Jinping','Volodymyr Zelenskyy','Ngozi Okonjo','Justin Trudeau','Jacinda Ardern'],
    note:'本页是关键词落地体验原型。真人声音只有在身份与商业授权核验通过后才开放生成，否则使用原创相似风格'
  });
};

const changerAvatarList = ({sheet, voices, start = 0}) => voices.map((voice, index) => `
  <button class="changer-voice-choice ${index === 0 ? 'selected' : ''}" data-changer-voice="${voice}">
    <span class="changer-avatar-wrap">
      <span class="voice-avatar-image" style="--avatar-sheet:url('${sheet}');${spritePosition(start + index)}"></span>
      <i class="changer-preview" data-changer-sample="${voice}">▶</i>
      ${index === 0 ? '<em>最匹配</em>' : ''}
    </span>
    <b>${voice}</b>
    <small>${index === 0 ? '当前目标音色' : index < 4 ? '相近变体' : '相似音色'}</small>
  </button>
`).join('');

const voiceChangerLanding = ({
  title,
  eyebrow = 'AI VOICE CHANGER',
  description,
  note = '',
  sheet,
  voices,
  start = 0,
  tone = 'neutral'
}) => `
  <main class="keyword-changer-page ${tone}">
    <header class="keyword-changer-intro">
      <p class="workspace-kicker">${eyebrow}</p>
      <h1>${title}</h1>
      <p>${description}</p>
    </header>

    <section class="keyword-changer-workspace">
      <div class="changer-section-heading">
        <div><small>STEP 1</small><h2>选择目标音色</h2></div>
        <span>第一项与当前搜索最匹配</span>
      </div>
      <div class="changer-voice-grid">
        ${changerAvatarList({sheet, voices, start})}
      </div>

      <div class="changer-source-grid">
        <section class="changer-source">
          <div class="changer-section-heading compact">
            <div><small>STEP 2</small><h2>加入你的原始表演</h2></div>
            <span>保留节奏、停顿和情绪</span>
          </div>
          <div class="changer-input-tabs">
            <button class="active" data-changer-input="upload">上传音频</button>
            <button data-changer-input="record">直接录音</button>
          </div>
          <div class="changer-input-panel" data-changer-panel="upload">
            <button class="vc-upload-zone upload-zone" data-upload>
              <span>↑</span><b>上传或拖入音频</b><small>MP3、WAV、M4A · 最长 5 分钟</small>
            </button>
          </div>
          <div class="changer-input-panel" data-changer-panel="record" hidden>
            <button class="vc-record-button" data-vc-record><i></i><b>开始录音</b><small>使用浏览器麦克风</small></button>
          </div>
        </section>

        <section class="changer-controls">
          <div class="changer-section-heading compact">
            <div><small>STEP 3</small><h2>转换设置</h2></div>
            <span data-changer-target>目标：${voices[0]}</span>
          </div>
          <label class="changer-toggle">
            <span><b>去除背景噪声</b><small>源录音有底噪时建议开启</small></span>
            <input type="checkbox"><i></i>
          </label>
          <div class="changer-setting-row">
            ${modelSelect('转换模型', 'ElevenLabs Multilingual STS v2')}
            ${modelSelect('输出', 'MP3 · 44.1 kHz')}
          </div>
          <p class="changer-billing">按源音频实际时长计费，失败自动退回点数</p>
          <button class="changer-submit" data-vc-generate><span>Change Voice</span><b>→</b></button>
        </section>
      </div>

      <div class="changer-result" data-vc-result hidden>
        <button data-changer-sample="result"><span>▶</span></button>
        <div><small>CONVERTED AUDIO</small><b data-vc-result-title>${voices[0]} · Converted take</b><i class="generated-wave"></i></div>
        <span>0:18</span>
        <button data-demo-action="已下载转换结果">↓ 下载</button>
      </div>
    </section>

    ${note ? `<div class="voice-rights-note"><b>使用说明</b><span>${note}</span></div>` : ''}
  </main>
`;

const voiceChangerSet = {
  girl: options => {
    const keyword = String(options.sourceKeyword || '').toLowerCase();
    const isKid = keyword.includes('kid');
    return voiceChangerLanding({
      title:isKid ? 'Kid Voice Changer' : keyword.includes('best') ? 'Best Girl Voice Changer' : 'Girl Voice Changer',
      description:'上传一段原始表演，在保留语速与情绪的同时转换为清澈、年轻、自然的角色声音',
      sheet:'./assets/voices/character-sprite.png',
      voices:isKid ? ['Bright Kid','Curious Kid','Playful Kid','Story Kid'] : ['Clear Girl','Warm Girl','Playful Girl','Soft Girl'],
      start:4,
      tone:'girl'
    });
  },
  female: () => voiceChangerLanding({
    title:'Female Voice Changer',
    description:'选择不同年龄感、气息和叙事力量的自然女声，同时保留原始录音中的真实表演',
    sheet:'./assets/voices/character-sprite.png',
    voices:['Warm Narrator','Soft Spoken','Confident Host','Calm Guide'],
    start:4,
    tone:'female'
  }),
  male: () => voiceChangerLanding({
    title:'Male Voice Changer',
    description:'把原始录音转换为不同质感的成年男声，保留讲话节奏、停顿和情绪变化',
    sheet:'./assets/voices/basketball-sprite.png',
    voices:['Natural Baritone','Warm Narrator','Confident Host','Young Lead','Deep Performer','Studio Voice','Calm Mentor','Energetic Actor'],
    tone:'male'
  }),
  deep: options => {
    const keyword = String(options.sourceKeyword || '').toLowerCase();
    const isRobot = keyword.includes('robot');
    const isScary = keyword.includes('scary');
    if (isRobot) {
      return voiceChangerLanding({
        title:'Robot Voice Changer',
        description:'把真人表演转换成机器人角色声音，保留原始节奏，并改变金属感、声码器强度与距离感',
        sheet:'./assets/voices/character-sprite.png',
        voices:['Chrome Unit','Retro Droid','Neon Assistant','Battle Mech'],
        tone:'robot'
      });
    }
    return voiceChangerLanding({
      title:isScary ? 'Scary Voice Changer' : 'Deep Voice Changer',
      description:isScary ? '把原始表演变成紧张、低沉的原创恐怖角色声音，适合游戏、万圣节和音频剧' : '增强低频厚度与空间压迫感，生成适合悬疑、游戏和角色表演的深沉声音',
      sheet:'./assets/voices/horror-sprite.png',
      voices:isScary ? ['Masked Caller','Cracked Whisper','Midnight Hood','Radio Stalker','Shadow Detective','Corridor Spirit','Carnival Host','Deep Revenant'] : ['Deep Revenant','Shadow Detective','Radio Stalker','Midnight Hood','Masked Caller','Cracked Whisper','Carnival Host','Corridor Spirit'],
      tone:'horror'
    });
  },
  ghostface: () => voiceChangerLanding({
    title:'Ghostface Voice Changer',
    eyebrow:'HORROR VOICE CHANGER',
    description:'上传或录制一句台词，转换成紧绷、贴耳、具有电话质感的原创蒙面恐怖角色声音',
    sheet:'./assets/voices/horror-sprite.png',
    voices:['Ghostface','Masked Caller','Cracked Whisper','Midnight Hood','Radio Stalker','Shadow Detective','Corridor Spirit','Deep Revenant'],
    tone:'horror',
    note:'头像为原创恐怖角色视觉，不复制电影角色造型；商用前仍需确认名称、角色与声音的相关权利'
  }),
  celebrity: options => {
    const keyword = String(options.sourceKeyword || '').toLowerCase();
    const isTrump = keyword.includes('trump');
    return voiceChangerLanding({
      title:isTrump ? 'Trump Voice Changer' : 'Celebrity Voice Changer',
      description:'上传原始表演，选择经过授权核验的公众人物声音或原创公众演讲风格',
      sheet:'./assets/voices/leaders-sprite.png',
      voices:['Donald Trump','Narendra Modi','Angela Merkel','Xi Jinping','Volodymyr Zelenskyy','Ngozi Okonjo','Justin Trudeau','Jacinda Ardern'],
      tone:'leader',
      note:'真人声音只有在身份与商业授权核验通过后才开放生成，否则使用原创相似风格'
    });
  }
};

const workSampleCatalog = {
  redCliff: {name:'赤壁之战 · 江东急报', type:'广播剧', duration:'12:08', cover:'./assets/generated/covers/red-cliff.png', description:'从十章小说拆解画本，以六位角色、江面环境与战争音效完成第一章', stats:[['6','个角色'],['14','个音效'],['3','段音乐']]},
  hollowStation: {name:'The Hollow Station', type:'广播剧', duration:'22:45', cover:'./assets/generated/covers/hollow-station.png', description:'发生在废弃轨道站的科幻悬疑广播剧，以空间广播和机械环境构建压迫感', stats:[['5','个角色'],['19','个音效'],['4','段音乐']]},
  fogHarbor: {name:'雾港来信', type:'广播剧', duration:'18:52', cover:'./assets/generated/covers/fog-harbor.png', description:'围绕一封失踪来信展开的都市悬疑，以港口环境、电话录音和多人对白推进故事', stats:[['4','个角色'],['16','个音效'],['3','段音乐']]},
  forged: {name:'Forged Together', type:'亲密音频故事', duration:'07:21', cover:'./assets/generated/covers/forged-together.png', description:'雨夜工坊中的近距离情绪故事，以锻造动作、呼吸细节和克制配乐建立沉浸感', stats:[['1','个角色'],['21','个音效'],['3','段音乐']]},
  midnight: {name:'Midnight Check-In', type:'亲密音频故事', duration:'11:36', cover:'./assets/generated/covers/midnight-checkin.png', description:'深夜酒店中的双角色亲密叙事，通过贴耳对白、房间环境和细微动作建立空间感', stats:[['2','个角色'],['17','个音效'],['2','段音乐']]},
  neighbor: {name:'The Neighbor Upstairs', type:'亲密音频故事', duration:'09:48', cover:'./assets/generated/covers/neighbor-upstairs.png', description:'楼上传来的脚步与一场意外对话构成亲密角色扮演，强调距离变化和生活化表演', stats:[['2','个角色'],['13','个音效'],['2','段音乐']]},
  signalNoise: {name:'Signal / Noise', type:'播客', duration:'28:16', cover:'./assets/generated/covers/signal-noise.png', description:'两位主持人讨论生成式音频的下一阶段，包含片头、章节转场和结尾行动建议', stats:[['2','位主持人'],['12','个音效'],['4','段音乐']]},
  founders: {name:'Founders After Midnight', type:'播客', duration:'34:02', cover:'./assets/generated/covers/founders-after-midnight.png', description:'围绕创业者深夜决策的访谈节目，保留自然对话，同时完成章节化声音包装', stats:[['2','位嘉宾'],['8','个章节'],['3','段音乐']]},
  questions: {name:'Unfinished Questions', type:'播客', duration:'19:20', cover:'./assets/generated/covers/unfinished-questions.png', description:'以未解问题为线索的叙事播客，将旁白、采访切片和档案声音编排成完整节目', stats:[['1','位主持人'],['9','段素材'],['3','段音乐']]},
  clockmaker: {name:'The Clockmaker’s Daughter', type:'有声书', duration:'04:32:10', cover:'./assets/generated/covers/clockmakers-daughter.png', description:'旁白与三位角色保持统一音色，关键场景使用克制环境声增强空间和情绪', stats:[['1','位旁白'],['3','个角色'],['12','章规划']]},
  lighthouse: {name:'The Last Lighthouse', type:'有声书', duration:'02:18:40', cover:'./assets/generated/covers/last-lighthouse.png', description:'孤岛灯塔题材的沉浸式有声书，使用稳定旁白、少量角色和连续海岸环境声', stats:[['1','位旁白'],['2','个角色'],['8','章规划']]},
  threeKingdoms: {name:'三国演义 · 火烧赤壁', type:'有声书', duration:'01:46:20', cover:'./assets/generated/covers/three-kingdoms.png', description:'十章中文长篇有声书，管理旁白与核心人物音色，并保持跨章节节奏一致', stats:[['1','位旁白'],['6','个角色'],['10','章规划']]},
  moonPost: {name:'月亮邮差 · 第一集', type:'儿童剧', duration:'09:36', cover:'./assets/generated/covers/clockmakers-daughter.png', description:'三位角色帮助迷路的小星星回家，用清晰对白、趣味动作音效和温柔配乐完成一集故事', stats:[['3','个角色'],['14','个音效'],['2','段音乐']]},
  youngKingdoms: {name:'少年三国 · 草船借箭', type:'儿童剧', duration:'12:18', cover:'./assets/generated/covers/three-kingdoms.png', description:'将经典故事改编为适龄对白和鲜明角色，用轻量战争音效帮助孩子理解情节', stats:[['5','个角色'],['12','个音效'],['3','段音乐']]},
  littleLighthouse: {name:'小灯塔守护者', type:'儿童剧', duration:'08:42', cover:'./assets/generated/covers/last-lighthouse.png', description:'关于勇气和互助的海边故事，使用清晰旁白、可爱角色和柔和海浪环境声', stats:[['4','个角色'],['10','个音效'],['2','段音乐']]}
};

const workLanding = ({
  title,
  description,
  skill,
  placeholder,
  formats,
  outputs,
  sample,
  samples = []
}) => {
  const examples = samples.length ? samples : [sample];
  return `
  <main class="complete-work-page">
    <header class="complete-work-intro">
      <p class="workspace-kicker">创作完整音频作品</p>
      <h1>${title}</h1>
      <p>${description}</p>
    </header>

    <section class="agent-creation-box">
      <textarea class="agent-work-prompt" placeholder="${placeholder}"></textarea>
      <div class="work-file-attachment" data-work-attachment hidden>
        <span>文</span>
        <div><b data-work-file-name>document.pdf</b><small data-work-file-meta>PDF · 已准备分析</small></div>
        <button data-work-remove aria-label="移除文件">×</button>
      </div>
      <div class="agent-work-toolbar">
        <div class="agent-work-input-tools">
          <button class="work-upload-button" data-work-upload><span>＋</span><b>上传文件</b></button>
          <input type="file" data-work-file-picker accept=".pdf,.doc,.docx,.txt,.md,.epub" hidden>
          <span class="work-format-hint">${formats}</span>
        </div>
        <div class="agent-work-actions">
          <span class="work-skill-loaded">✦ ${skill}</span>
          <button class="work-start-button" data-work-start><span>开始创作</span><b>→</b></button>
        </div>
      </div>
    </section>

    <div class="work-conversion-facts">
      <div><span>01</span><p><b>先给出生成计划</b><small>分析内容和章节，不会立即消耗整部作品的点数</small></p></div>
      <div><span>02</span><p><b>关键内容由你确认</b><small>角色音色、长音乐和核心音效先生成小样</small></p></div>
      <div><span>03</span><p><b>生成前展示预计消耗</b><small>素材失败自动退回点数，已有结果可以继续编辑</small></p></div>
    </div>

    <div class="work-output-line">
      <span>可生成</span>
      ${outputs.map(output => `<b>${output}</b>`).join('')}
    </div>

    <div class="work-analysis-preview" data-work-plan hidden>
      <span>✓</span>
      <div><small>内容分析完成</small><b>Agent 已整理第一版生成计划</b><p>接下来确认章节结构、核心角色音色和长音乐方向，再开始生成素材</p></div>
      <button data-demo-action="已打开生成计划">查看生成计划 →</button>
    </div>

    <section class="work-gallery">
      <header><div><p class="workspace-kicker">作品示例</p><h2>从示例开始创作</h2></div><span>${examples.length} 个可试听案例</span></header>
      <div class="work-gallery-grid">
        ${examples.map(item => `<article>
          <div class="work-gallery-cover" style="background-image:url('${item.cover}')">
            <span>${item.type}</span>
            <button data-work-sample aria-label="播放 ${item.name}">▶</button>
          </div>
          <small>${item.type} · ${item.duration}</small>
          <b>${item.name}</b>
          <p>${item.description}</p>
          <footer>
            <button data-work-sample>试听 30 秒</button>
            <button data-use-work-skill="${skill}">使用同款 Skill</button>
            <button data-open-work-process="${item.name}">制作过程 →</button>
          </footer>
        </article>`).join('')}
      </div>
    </section>
  </main>
  `;
};

const semKeywordRows = [
  ['text to speech','核心产品功能',246000,518,0,96,'文本转语音','主投补充'],
  ['ai voice generator','核心产品功能',90500,245,0,76,'文本转语音','主投'],
  ['voice changer','核心产品功能',90500,191,0,81,'声音转换','主投补充'],
  ['english to hindi translate in voice audio','核心产品功能',40500,85,0,32,'视频配音','主投补充'],
  ['how to remove background noise audio','核心产品功能',22200,47,0,75,'音频增强','主投补充'],
  ['ring tone ringtone','核心产品功能',12100,25,0,43,'音乐生成','主投补充'],
  ['podcast recording software','核心产品功能',3600,10,0,54,'录音工作室','主投'],
  ['ai voice cloning','核心产品功能',4400,9,0,74,'音色克隆','主投补充'],
  ['ai audio generator','核心产品功能',2900,6,1.70,69,'音效','主投补充'],
  ['producer tag','核心产品功能',2400,5,0,29,'制作人标签','主投补充'],
  ['video audio editor','核心产品功能',720,1,0,87,'音频编辑器','主投补充'],
  ['dog translator','具体音色生成',14800,480,0,32,'狗语翻译器','主投补充'],
  ['robot voice generator','具体音色生成',4400,143,1.23,28,'机器人音色生成','主投补充'],
  ['robot voice','具体音色生成',2400,58,0,39,'机器人声音生成','主投补充'],
  ['celebrity voice generator','具体音色生成',1300,32,.67,58,'授权名人音色','主投补充'],
  ['robotic voice generator','具体音色生成',1000,31,0,24,'机械音色生成','主投'],
  ['donald trump voice generator','具体音色生成',5400,0,0,12,'授权名人音色','受限研究'],
  ['lebron ai','具体音色生成',2400,0,0,10,'授权名人音色','受限研究'],
  ['lebron james ai','具体音色生成',880,0,0,10,'授权名人音色','受限研究'],
  ['female voice generator','具体音色生成',480,20,0,50,'女声音色生成','主投'],
  ['best girl voice changer','具体音色转换',2900,130,0,22,'少女声转换','主投'],
  ['girl voice changer','具体音色转换',2900,102,0,25,'少女声转换','主投补充'],
  ['female voice changer','具体音色转换',1300,44,0,31,'女声转换','主投'],
  ['male voice changer','具体音色转换',590,27,0,50,'男声转换','主投'],
  ['celebrity voice changer','具体音色转换',720,24,0,47,'授权名人声音转换','主投'],
  ['ghostface voice changer','具体音色转换',6600,175,.22,28,'恐怖声音转换','主投'],
  ['deep voice changer','具体音色转换',480,22,0,18,'深沉声音转换','主投'],
  ['kid voice changer','具体音色转换',320,14,0,25,'少女声转换','主投'],
  ['robot voice changer','具体音色转换',480,13,0,27,'深沉声音转换','主投补充'],
  ['scary voice changer','具体音色转换',260,12,0,24,'深沉声音转换','主投'],
  ['trump voice changer','具体音色转换',480,0,0,9,'授权名人声音转换','受限研究'],
  ['ai podcast generator','完整作品生成',5400,89,2.97,49,'AI 播客生成','主投'],
  ['ai story writer','完整作品生成',6600,64,0,73,'脚本转广播剧','主投补充'],
  ['boyfriend asmr','完整作品生成',3600,46,0,32,'故事 ASMR 生成','主投补充'],
  ['asmr roleplay','完整作品生成',1900,24,0,27,'故事 ASMR 生成','主投补充'],
  ['podcast maker','完整作品生成',1300,21,1.73,60,'AI 播客生成','主投'],
  ['audiobook reader','完整作品生成',1000,16,0,57,'AI 有声书生成','主投'],
  ['pdf to audio','完整作品生成',1000,10,0,24,'内容转音频','主投补充'],
  ['pdf to audiobook','完整作品生成',880,8,0,28,'内容转音频','主投补充'],
  ['ai roleplay generator','完整作品生成',320,5,.91,20,'故事 ASMR 生成','主投'],
  ['script to audio','完整作品生成',320,4,1.87,70,'内容转音频','主投补充']
];

const semPrototypeTargets = new Set([
  '文本转语音',
  '声音转换',
  '视频配音',
  '音频增强',
  '音乐生成',
  '录音工作室',
  '音色克隆',
  '音效',
  '制作人标签',
  '音频编辑器',
  '狗语翻译器',
  '机器人音色生成',
  '机器人声音生成',
  '机械音色生成',
  '授权名人音色',
  '女声音色生成',
  '少女声转换',
  '女声转换',
  '男声转换',
  '授权名人声音转换',
  '恐怖声音转换',
  '深沉声音转换',
  'AI 播客生成',
  '脚本转广播剧',
  '故事 ASMR 生成',
  'AI 有声书生成',
  '内容转音频'
]);

const semPrototypeRepresentatives = (() => {
  const claimedTargets = new Set();
  return [...semKeywordRows]
    .filter(row => semPrototypeTargets.has(row[6]))
    .sort((a, b) => b[3] - a[3])
    .filter(row => {
      if (claimedTargets.has(row[6])) return false;
      claimedTargets.add(row[6]);
      return true;
    });
})();

const semPrototypeKeywords = new Set(semPrototypeRepresentatives.map(row => row[0]));
const semDisplayRows = [
  ...semPrototypeRepresentatives,
  ...semKeywordRows
    .filter(row => !semPrototypeKeywords.has(row[0]))
    .sort((a, b) => b[3] - a[3])
];

const semDemo = () => `
  ${pageHeader('SEM 演示', '已完成的可交互原型置顶展示，黄色入口可以直接点击体验')}
  <div class="sem-overview">
    <div><small>演示关键词</small><strong>${semKeywordRows.length}</strong></div>
    <div class="sem-prototype-count"><small>可体验原型</small><strong>${semPrototypeRepresentatives.length}</strong></div>
    <div><small>预计月点击</small><strong>${semKeywordRows.reduce((sum, row) => sum + row[3], 0).toLocaleString()}</strong></div>
    <p><b>黄色行已完成原型</b><br>每个独立页面只置顶一次，其余同页关键词在下方保留</p>
  </div>
  <div class="sem-filter-row">
    ${['全部','核心产品功能','具体音色生成','具体音色转换','完整作品生成'].map((item, index) => `<button class="${index === 0 ? 'active' : ''}" data-sem-family="${item}">${item}</button>`).join('')}
    <span class="sem-filter-divider"></span>
    <button class="sem-prototype-filter" data-sem-prototype-filter="false"><i></i>只看可体验原型</button>
  </div>
  <div class="sem-demo-table-wrap">
    <table class="sem-demo-table">
      <thead><tr><th>关键词</th><th>类型</th><th>Volume</th><th>预计月点击</th><th>CPC</th><th>KD</th><th>判断</th><th>落地页</th></tr></thead>
      <tbody>
        ${semDisplayRows.map(row => {
          const isPrototype = semPrototypeKeywords.has(row[0]);
          return `<tr class="${isPrototype ? 'sem-prototype-row' : ''}" data-sem-row="${row[1]}" data-sem-prototype="${isPrototype}">
            <td><b>${row[0]}</b>${isPrototype ? '<small class="sem-prototype-badge">可体验原型</small>' : ''}</td>
            <td><span>${row[1]}</span></td>
            <td>${row[2].toLocaleString()}</td>
            <td><strong>${row[3]}</strong></td>
            <td>${row[4] ? `$${row[4].toFixed(2)}` : '—'}</td>
            <td>${row[5]}</td>
            <td><em class="${row[7] === '受限研究' ? 'risk' : ''}">${row[7]}</em></td>
            <td><button class="${isPrototype ? 'sem-prototype-link' : 'sem-shared-link'}" data-sem-target="${row[6]}" data-sem-keyword="${row[0]}">${isPrototype ? '打开原型' : '同一原型'} <span>→</span></button></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>
`;

const pricingPlans = [
  {name:'免费版', monthly:0, yearly:0, credits:2000, audience:'完成一个短小样', storage:'1 GB', concurrency:'1', voiceDesign:'0', voiceClone:'0', paid:false},
  {name:'入门版', monthly:9, yearly:90, credits:12000, audience:'偶尔制作短音频', storage:'10 GB', concurrency:'1', voiceDesign:'1', voiceClone:'1', paid:true},
  {name:'创作者版', monthly:29, yearly:290, credits:45000, audience:'持续制作完整作品', featured:true, storage:'50 GB', concurrency:'2', voiceDesign:'5', voiceClone:'5', paid:true},
  {name:'专业版', monthly:79, yearly:790, credits:140000, audience:'多章节高频创作', storage:'200 GB', concurrency:'4', voiceDesign:'20', voiceClone:'20', paid:true},
  {name:'工作室版', monthly:199, yearly:1990, credits:400000, audience:'团队与批量生产', storage:'1 TB', concurrency:'8', voiceDesign:'50', voiceClone:'50', paid:true}
];

const generationCapacityRows = [
  {group:'语音生成', name:'ElevenLabs v3 / Multilingual v2', detail:'约 1,000 字符/分钟 · MP3 44.1kHz 192kbps', unit:'分钟', apiCost:0.10},
  {group:'语音生成', name:'ElevenLabs Flash v2.5', detail:'约 1,000 字符/分钟 · 低延迟', unit:'分钟', apiCost:0.05},
  {group:'语音生成', name:'MiniMax Speech 2.8 HD', detail:'按 1,000 字符/分钟折算 · 32kHz 128kbps', unit:'分钟', apiCost:0.10},
  {group:'语音生成', name:'MiniMax Speech 2.8 Turbo', detail:'按 1,000 字符/分钟折算 · 32kHz 128kbps', unit:'分钟', apiCost:0.06},
  {group:'语音生成', name:'Fish Audio S1', detail:'官方口径 1M UTF-8 bytes ≈ 12 小时', unit:'分钟', apiCost:15 / (12 * 60)},
  {group:'语音生成', name:'BytePlus Voice Replication 2.0', detail:'按 1,000 字符/分钟折算 · PAYG', unit:'分钟', apiCost:0.03},
  {group:'音乐与音效', name:'Eleven Music v2', detail:'44.1kHz · 128–192kbps', unit:'分钟', apiCost:0.15},
  {group:'音乐与音效', name:'MiniMax Music 2.6', detail:'完整歌曲 · 每首 $0.15', unit:'首', apiCost:0.15},
  {group:'音乐与音效', name:'ElevenLabs Sound Effects', detail:'按 10 秒音效计算 · WAV 48kHz', unit:'条', apiCost:0.12 / 6},
  {group:'声音处理', name:'ElevenLabs Voice Changer', detail:'按输入音频时长计费', unit:'分钟', apiCost:0.12},
  {group:'声音处理', name:'ElevenLabs Voice Isolator', detail:'降噪与人声分离 · 按输入时长', unit:'分钟', apiCost:0.12},
  {group:'声音处理', name:'ElevenLabs Dubbing v1', detail:'无水印 · 按输入时长', unit:'分钟', apiCost:0.50},
  {group:'声音处理', name:'ElevenLabs Scribe v2', detail:'语音识别 · 按输入时长', unit:'分钟', apiCost:0.22 / 60},
  {group:'音色', name:'MiniMax 音色设计', detail:'每个音色 $3', unit:'个', apiCost:3, quotaKey:'voiceDesign'},
  {group:'音色', name:'MiniMax 快速音色克隆', detail:'每个音色 $1.5', unit:'个', apiCost:1.5, quotaKey:'voiceClone'}
];

const generationGroupDescriptions = {
  '语音生成': '文本转语音',
  '音乐与音效': '声音素材生成',
  '声音处理': '转换与增强',
  '音色': '声音身份'
};

const pointsPerDollar = 1000 / 0.30;
const capacityForPlan = (plan, row) => {
  const costLimit = Math.floor(plan.credits / (row.apiCost * pointsPerDollar));
  if (!row.quotaKey) return costLimit.toLocaleString('zh-CN');
  return Math.min(costLimit, Number(plan[row.quotaKey])).toLocaleString('zh-CN');
};

const pricingPage = () => `
  <div class="pricing-heading">
    <div><p class="workspace-kicker">套餐与点数</p><h1>按作品规模选择额度</h1><p>所有付费档开放核心模型和商业使用，高成本模型消耗更多点数</p></div>
    <div class="billing-cycle" role="group"><button data-billing-cycle="monthly">月付</button><button class="active" data-billing-cycle="yearly">年付 <span class="billing-save-badge">立省 17%</span></button></div>
  </div>
  <div class="pricing-grid">
    ${pricingPlans.map(plan => `
      <article class="pricing-plan ${plan.featured ? 'featured' : ''}" data-pricing-plan="${plan.name}">
        ${plan.featured ? '<em>推荐</em>' : ''}
        <div><small>${plan.audience}</small><h2>${plan.name}</h2></div>
        <div class="plan-price"><strong data-monthly-price="$${plan.monthly}" data-yearly-price="$${plan.yearly}">$${plan.yearly}</strong><span data-monthly-suffix="/ 月" data-yearly-suffix="/ 年">${plan.yearly ? '/ 年' : ''}</span></div>
        <div class="plan-credits"><b>${plan.credits.toLocaleString('zh-CN')}</b><span>点 / 月</span></div>
        <ul>
          <li>${plan.storage} 存储</li>
          <li>${plan.concurrency} 个并发任务</li>
          <li>${plan.voiceDesign} 个音色设计</li>
          <li>${plan.voiceClone} 个音色克隆</li>
          <li>${plan.paid ? '加速生成' : '标准生成速度'}</li>
          <li>${plan.paid ? '无声音水印' : '带声音水印'}</li>
          <li>${plan.paid ? '支持分轨导出' : '仅混音成品导出'}</li>
        </ul>
        <button data-plan-select="${plan.name}" ${plan.name === '创作者版' ? 'class="current"' : ''}>${plan.name === '创作者版' ? '当前套餐' : plan.monthly ? `选择${plan.name}` : '降级至免费版'}</button>
      </article>
    `).join('')}
  </div>
  <section class="generation-capacity">
    <header>
      <div><p class="workspace-kicker">每月生成数量 / 时长</p><h2>不同模型能生成多少</h2></div>
      <p>以下是单独使用某一模型时的理论上限，实际作品通常会组合多种模型</p>
    </header>
    <div class="capacity-table-wrap">
      <table class="capacity-table">
        <thead>
          <tr>
            <th class="capacity-capability-head">能力</th>
            <th class="capacity-model-head"><b>模型与计价参数</b><small>输出规格不影响计价时仅作质量说明</small></th>
            ${pricingPlans.map(plan => `<th class="${plan.featured ? 'capacity-featured' : ''}"><b>${plan.name}</b><small>${plan.credits.toLocaleString('zh-CN')} 点</small></th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${Object.keys(generationGroupDescriptions).map(group => {
            const rows = generationCapacityRows.filter(row => row.group === group);
            return rows.map((row, index) => `
              <tr class="${index === 0 ? 'group-start' : ''}">
                ${index === 0 ? `<th class="capacity-category" rowspan="${rows.length}"><b>${group}</b><small>${generationGroupDescriptions[group]}</small></th>` : ''}
                <td class="capacity-model"><b>${row.name}</b><small>${row.detail}</small></td>
                ${pricingPlans.map(plan => `<td class="capacity-value ${plan.featured ? 'capacity-featured' : ''}"><span>${capacityForPlan(plan, row)} ${row.unit}</span></td>`).join('')}
              </tr>
            `).join('');
          }).join('')}
        </tbody>
      </table>
    </div>
    <div class="capacity-method">
      <b>测算口径</b>
      <p>1,000 点按 $0.30 供应商 API 参考成本折算，结果向下取整，不含失败重试、存储、带宽、混音和平台运维成本。TTS 采用供应商公开的字符或时长换算；音色行同时受套餐音色数量上限约束</p>
      <div>
        <a href="https://elevenlabs.io/pricing/api?price.platform=api" target="_blank" rel="noreferrer">ElevenLabs API 价格</a>
        <a href="https://platform.minimax.io/subscribe/token-plan?tab=api-enterprise" target="_blank" rel="noreferrer">MiniMax API 价格</a>
        <a href="https://docs.fish.audio/developer-guide/models-pricing/pricing-and-rate-limits" target="_blank" rel="noreferrer">Fish Audio API 价格</a>
        <a href="https://docs.byteplus.com/api/docs/byteplusvoice/voicereplicationbilling" target="_blank" rel="noreferrer">BytePlus 价格</a>
      </div>
    </div>
  </section>
`;

const usagePage = () => `
  ${pageHeader('点数历史', '查看当前余额、点数构成与每一笔获取或消耗')}
  <section class="points-overview">
    <header><small>当前点数总余额</small><div><i>✦</i><strong>34,200</strong><span>点</span></div></header>
    <div class="points-balance-grid">
      <article>
        <div><small>会员订阅积分</small><strong>33,000 <span>点</span></strong><p>2026 年 8 月 28 日到期</p></div>
        <button data-open-pricing>升级会员</button>
      </article>
      <article>
        <div><small>免费积分</small><strong>1,200 <span>点</span></strong><p>活动与系统赠送</p></div>
      </article>
    </div>
  </section>
  <section class="points-ledger">
    <header><h2>点数明细</h2><span>最近 30 天</span></header>
    <div class="points-table-wrap">
      <table class="points-table">
        <thead><tr><th>时间</th><th>类型</th><th>名称</th><th>模型</th><th>点数</th></tr></thead>
        <tbody>
          ${[
            ['2026-08-03 14:32','消耗','生成语音','ElevenLabs v3','−900'],
            ['2026-08-03 14:28','获取','生成失败退回','ElevenLabs Sound Effects','+160'],
            ['2026-08-02 22:14','消耗','生成背景音乐','Eleven Music v2','−750'],
            ['2026-08-02 18:06','消耗','生成环境音效','ElevenLabs Sound Effects','−120'],
            ['2026-08-01 00:00','获取','会员订阅积分','—','+45,000'],
            ['2026-07-31 21:40','消耗','音色设计','MiniMax Voice Design','−3,000'],
            ['2026-07-30 10:15','获取','新用户赠送','—','+1,200']
          ].map(row => `<tr><td>${row[0]}</td><td><span class="points-type ${row[1] === '获取' ? 'gain' : 'spend'}">${row[1]}</span></td><td>${row[2]}</td><td>${row[3]}</td><td class="points-change ${row[4].startsWith('+') ? 'gain' : 'spend'}">${row[4]}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>
`;

const billingPage = () => `
  ${pageHeader('订阅与账单', '管理套餐、续费周期、支付方式与历史订单')}
  <div class="billing-current">
    <div><small>当前套餐</small><h2>创作者版</h2><p>45,000 点 / 月 · 商业使用 · 2 个并发任务</p></div>
    <div><small>下次续费</small><b>2026 年 8 月 30 日</b><span>$29.00 · 月付</span></div>
    <div><button data-page-link="价格与套餐">升级或更改套餐</button><button data-buy-credits>购买点数</button></div>
  </div>
  <div class="billing-columns">
    <section><header><h2>支付方式</h2><button data-demo-action="已打开支付方式编辑">编辑</button></header><div class="payment-method"><span>VISA</span><b>•••• 4242</b><small>有效期 08/29</small></div></section>
    <section><header><h2>订阅设置</h2></header><div class="billing-setting"><span><b>自动续费</b><small>续费前 3 天发送提醒</small></span><input type="checkbox" checked></div><button class="text-danger" data-demo-action="已打开取消订阅确认">取消订阅</button></section>
  </div>
  <section class="invoice-list"><header><h2>订单与发票</h2><button data-demo-action="已下载全部发票">下载全部</button></header>
    ${[['2026-07-30','创作者版 · 月付','$29.00','已支付'],['2026-06-30','创作者版 · 月付','$29.00','已支付'],['2026-05-30','入门版 · 月付','$9.00','已支付']].map(row => `<div><span>${row[0]}</span><b>${row[1]}</b><span>${row[2]}</span><em>${row[3]}</em><button data-demo-action="已下载发票">下载发票</button></div>`).join('')}
  </section>
`;

const renderers = {
  '音色库': voiceLibrary,
  '资产库': assetLibrary,
  '文本转语音': textToSpeech,
  '音效': soundEffects,
  '音乐生成': music,
  '音色设计': voiceDesign,
  '音色克隆': voiceClone,
  '视频配音': dubbing,
  '声音转换': voiceChanger,
  '人声分离': voiceIsolator,
  '音频增强': audioEnhancer,
  '录音工作室': audioRecorder,
  '制作人标签': producerTag,
  '音频编辑器': audioEditor,
  '狗语翻译器': () => voiceGeneratorLanding({title:'Dog AI Voice Generator', eyebrow:'PET VOICE PLAYGROUND', description:'输入一句话，选择不同犬种，生成具有明显品种个性的娱乐性狗狗声音', example:'Dinner is ready. Let us go for a walk!', tone:'pet', sheet:'./assets/voices/dog-sprite.png', voices:['Golden Retriever','German Shepherd','Corgi','Husky','Shiba Inu','French Bulldog','Border Collie','Beagle'], model:'Murmia Pet Voice', note:'仅用于娱乐和创作，不用于判断动物健康、真实情绪或行为风险'}),
  '机器人音色生成': () => voiceGeneratorLanding({title:'Robot AI Voice Generator', eyebrow:'ROBOT VOICE COLLECTION', description:'从复古合成器到现代 AI 助手，选择角色方向并输入文字，生成清晰可控的机器人声音', example:'System online. Welcome to the next generation of sound.', tone:'robot', sheet:'./assets/voices/character-sprite.png', voices:['Chrome Unit','Retro Droid','Neon Assistant','Battle Mech']}),
  '机器人声音生成': () => voiceGeneratorLanding({title:'Robot AI Voice Generator', eyebrow:'ROBOT VOICE COLLECTION', description:'试听不同机械质感、广播距离和故障程度，再把文字变成完整角色声音', example:'Your access has been confirmed. Opening the main gate now.', tone:'robot-soft', sheet:'./assets/voices/character-sprite.png', voices:['Chrome Unit','Retro Droid','Neon Assistant','Battle Mech']}),
  '机械音色生成': () => voiceGeneratorLanding({title:'Robotic AI Voice Generator', eyebrow:'ROBOTIC VOICE COLLECTION', description:'选择机械角色，控制金属感、声码器强度与失真，生成适合游戏与音频剧的原创声音', example:'Unit seven reporting. The workshop is secure.', tone:'machine', sheet:'./assets/voices/character-sprite.png', voices:['Chrome Unit','Retro Droid','Neon Assistant','Battle Mech']}),
  '授权名人音色': options => famousVoiceLanding(options),
  '女声音色生成': () => voiceGeneratorLanding({title:'Female AI Voice Generator', eyebrow:'FEMALE VOICE COLLECTION', description:'按年龄感、气息、情绪力量与使用场景选择自然女声，再输入文字生成完整语音', example:'Take a slow breath. You are allowed to begin again.', tone:'female', sheet:'./assets/voices/character-sprite.png', voices:['Arabella','Maya','Serena','Nova'], start:4}),
  '少女声转换': options => voiceChangerSet.girl(options),
  '女声转换': options => voiceChangerSet.female(options),
  '男声转换': options => voiceChangerSet.male(options),
  '授权名人声音转换': options => voiceChangerSet.celebrity(options),
  '深沉声音转换': options => voiceChangerSet.deep(options),
  '恐怖声音转换': options => voiceChangerSet.ghostface(options),
  '音频创作 Agent': () => workLanding({
    title:'AI 音频创作 Agent',
    description:'从一个想法、脚本或文件开始，Agent 帮你完成脚本、角色声音、音效、音乐和可继续编辑的多轨作品',
    skill:'通用音频作品创作 Skill',
    placeholder:'描述你想创作的声音作品，或粘贴、上传脚本、小说、资料与参考内容…',
    formats:'支持 PDF、DOCX、TXT、MD、EPUB 与参考音频',
    outputs:['创作计划','脚本与画本','角色语音','音效','背景音乐','多轨工程'],
    samples:[workSampleCatalog.redCliff, workSampleCatalog.forged, workSampleCatalog.signalNoise, workSampleCatalog.clockmaker, workSampleCatalog.hollowStation, workSampleCatalog.midnight, workSampleCatalog.founders, workSampleCatalog.lighthouse]
  }),
  'AI 播客生成': () => workLanding({
    title:'创作播客',
    description:'上传资料或描述节目，Agent 将生成节目结构、多人对话、音乐和可继续编辑的多轨成品',
    skill:'播客制作 Skill',
    placeholder:'描述播客主题、嘉宾和期望的节目风格，或粘贴提纲与研究资料…',
    formats:'支持 PDF、DOCX、TXT、MD',
    outputs:['节目脚本','多人语音','片头音乐','转场音效','多轨工程'],
    samples:[workSampleCatalog.signalNoise, workSampleCatalog.founders, workSampleCatalog.questions]
  }),
  '脚本转广播剧': () => workLanding({
    title:'创作广播剧',
    description:'上传剧本或小说，Agent 将识别角色与场次，生成表演、环境声、动作音效和多轨成品',
    skill:'广播剧制作 Skill',
    placeholder:'粘贴故事梗概、剧本或小说片段，也可以直接上传完整文件…',
    formats:'支持 PDF、DOCX、TXT、EPUB',
    outputs:['分场画本','角色语音','环境声','动作音效','背景音乐','多轨工程'],
    samples:[workSampleCatalog.redCliff, workSampleCatalog.hollowStation, workSampleCatalog.fogHarbor]
  }),
  '故事 ASMR 生成': () => workLanding({
    title:'创作亲密音频故事',
    description:'描述听众、角色关系和情境，Agent 将生成亲密叙事表演、双耳细节音效、氛围与完整混音',
    skill:'亲密音频故事制作 Skill',
    placeholder:'例如：深夜工坊中的亲密故事，角色一边锻造戒指，一边重新面对一段关系…',
    formats:'支持 PDF、DOCX、TXT、MD',
    outputs:['表演脚本','贴耳语音','双耳音效','环境床','情绪配乐','多轨工程'],
    samples:[workSampleCatalog.forged, workSampleCatalog.midnight, workSampleCatalog.neighbor]
  }),
  'AI 有声书生成': () => workLanding({
    title:'创作有声书',
    description:'上传长篇小说，Agent 将拆分章节、管理旁白与角色音色，并生成跨章节一致的有声书',
    skill:'有声书制作 Skill',
    placeholder:'粘贴小说章节或上传整本书，补充期望的旁白气质、角色数量和节奏…',
    formats:'支持 PDF、DOCX、TXT、EPUB',
    outputs:['章节结构','旁白语音','角色语音','章节一致性','轻量音效','多轨工程'],
    samples:[workSampleCatalog.clockmaker, workSampleCatalog.lighthouse, workSampleCatalog.threeKingdoms]
  }),
  'AI 儿童剧生成': () => workLanding({
    title:'创作儿童剧',
    description:'上传儿童故事或描述主题，Agent 将生成适龄剧本、鲜明角色、趣味音效和可继续编辑的多轨成品',
    skill:'儿童剧创作 Skill',
    placeholder:'描述适合的年龄、故事主题、角色数量和期望时长，或直接上传儿童故事…',
    formats:'支持 PDF、DOCX、TXT、EPUB',
    outputs:['适龄剧本','角色语音','趣味音效','背景音乐','多轨工程'],
    samples:[workSampleCatalog.moonPost, workSampleCatalog.youngKingdoms, workSampleCatalog.littleLighthouse]
  }),
  '内容转音频': () => workLanding({
    title:'文档转音频',
    description:'上传 PDF、文章或报告，Agent 将重组内容、生成旁白、音乐和适合收听的完整音频',
    skill:'内容转音频 Skill',
    placeholder:'上传 PDF，或粘贴希望转换成音频的文章内容，并说明听众和期望时长…',
    formats:'支持 PDF、DOCX、TXT、MD',
    outputs:['内容提炼','音频脚本','旁白语音','章节提示','背景音乐','多轨工程'],
    sample:{name:'AI Audio 2026 · 8-minute Briefing', type:'报告音频', duration:'08:03', cover:'./assets/work-samples/podcast.png', description:'把 32 页行业报告重组为适合通勤收听的八分钟音频，保留关键数据和来源提示', stats:[['32','页原文'],['8','分钟成品'],['7','个重点']]}
  }),
  'SEM 演示': semDemo,
  '价格与套餐': pricingPage,
  '点数与用量': usagePage,
  '订阅与账单': billingPage
};

window.MurmiaPages = {
  has(page) {
    return Boolean(renderers[page]);
  },
  render(page, options = {}) {
    return renderers[page] ? renderers[page](options) : '';
  }
};
