const editorWave = (count = 38) => Array.from({length: count}, (_, index) =>
  `<i style="--h:${28 + ((index * 17) % 62)}%"></i>`).join('');

const editorChapters = [
  ['第一章', '江东急报', '已完成'],
  ['第二章', '曹军压境', '待生成'],
  ['第三章', '群英聚会', '待生成'],
  ['第四章', '蒋干盗书', '待生成'],
  ['第五章', '苦肉计', '待生成'],
  ['第六章', '连环计', '待生成'],
  ['第七章', '借取东风', '待生成'],
  ['第八章', '火烧赤壁', '待生成'],
  ['第九章', '败走华容', '待生成'],
  ['第十章', '战后余波', '待生成']
];

const clipData = {
  narrator: {
    title: '旁白 · 江东风云', kind: '角色语音', model: 'MiniMax Speech 2.8 HD',
    prompt: '建安十三年秋，长江之上战云密布。曹操率大军南下，江东上下，一时人心惶惶。',
    voice: '沉稳历史叙事 · 相似度 78 · 情绪强度 46', duration: '00:00–00:16'
  },
  zhouyu: {
    title: '周瑜 · 请孔明入帐', kind: '角色语音', model: 'ElevenLabs v3',
    prompt: '[克制、警觉] 孔明先生，曹军号称八十万，顺江而下。依先生之见，此战当如何应对？',
    voice: 'Ronan · Stability 0.42 · Style 0.58', duration: '00:18–00:34'
  },
  zhuge: {
    title: '诸葛亮 · 破敌之策', kind: '角色语音', model: 'Seed Audio 1.0',
    prompt: '[从容、笃定，稍作停顿] 都督无需多虑。曹军虽众，却不习水战。只需借得一物，破敌便在旦夕。',
    voice: '清朗谋士 · 温度 0.35 · 表现力 0.62', duration: '00:36–00:55'
  },
  thunder: {
    title: '远雷与军帐震动', kind: '核心音效', model: 'ElevenLabs Sound Effects',
    prompt: '远处低沉闷雷滚过长江，军帐布料轻微震动，压迫感逐渐靠近，无雨声，电影级空间感',
    voice: 'Prompt influence 0.72 · 立体声', duration: '00:10–00:23'
  },
  river: {
    title: '长江夜营环境床', kind: '环境声', model: '授权素材库 + Murmia Loop',
    prompt: '深夜江面，缓慢水流，远处木船吱呀与模糊军营声，稳定、低动态、可无缝循环',
    voice: '循环 · -18 LUFS · 宽立体声', duration: '00:00–01:12'
  },
  music: {
    title: '第一章 · 战云将至', kind: '背景音乐', model: 'Lyria 3 Pro',
    prompt: '低沉鼓点与克制弦乐，古代战争前夜的肃杀感；从疑虑缓慢累积到诸葛亮开口后的笃定，不要宏大终章感',
    voice: '器乐 · 72 BPM · D minor', duration: '00:00–01:12'
  }
};

const chapterList = () => editorChapters.map(([number, title, status], index) => `
  <button class="chapter-entry ${index === 0 ? 'active' : ''}" data-editor-chapter="${index}">
    <span><b>${number}　${title}</b><small>${index === 0 ? '6 个片段 · 01:12' : '画本已确认'}</small></span>
    <em class="${index === 0 ? 'done' : ''}">${status}</em>
  </button>
`).join('');

const trackControl = (tone, avatar, name, meta) => `
  <header class="track-identity">
    <i class="track-tone ${tone}"></i>
    <span class="track-avatar ${tone}">${avatar}</span>
    <span class="track-name"><b>${name}</b><small>${meta}</small></span>
    <span class="track-buttons">
      <button data-track-action="mute" title="静音">M</button>
      <button data-track-action="solo" title="独奏">S</button>
    </span>
    <label class="track-volume" title="音量"><span>−</span><input type="range" min="0" max="100" value="72"></label>
  </header>
`;

const audioClip = (id, left, width, tone, step) => {
  const clip = clipData[id];
  return `
    <button class="story-clip ${tone}" style="--left:${left}%;--width:${width}%" data-editor-clip="${id}" data-ready-step="${step}">
      <span class="clip-copy"><b>${clip.title}</b><small>${clip.prompt}</small></span>
      <span class="clip-wave">${editorWave()}</span>
      <span class="clip-meta">${clip.model}　${clip.duration}</span>
      <i class="trim-handle start"></i><i class="trim-handle end"></i>
    </button>
  `;
};

const trackRow = (kind, tone, avatar, name, meta, clips, step) => `
  <div class="hybrid-track" data-track-kind="${kind}" data-appear-step="${step}">
    ${trackControl(tone, avatar, name, meta)}
    <div class="clip-lane">${clips}</div>
  </div>
`;

const railPanel = type => {
  if (type === '角色') return `
    <div class="project-panel-heading"><div><small>当前项目</small><b>角色</b></div><button>＋</button></div>
    <label class="project-search">⌕<input placeholder="搜索角色"></label>
    <div class="character-list">
      ${[
        ['旁', '旁白', '沉稳历史叙事', 'olive'],
        ['周', '周瑜', 'Ronan · ElevenLabs', 'red'],
        ['诸', '诸葛亮', '清朗谋士 · Seed Audio', 'blue'],
        ['孙', '孙权', '青年君主 · 待确认', 'gold'],
        ['曹', '曹操', '雄浑中年 · 待确认', 'violet']
      ].map(([a, n, v, tone]) => `<button class="character-entry"><i class="${tone}">${a}</i><span><b>${n}</b><small>${v}</small></span><em>试听</em></button>`).join('')}
    </div>
  `;
  if (type === '资产') return `
    <div class="project-panel-heading"><div><small>当前项目</small><b>资产库</b></div><button>＋</button></div>
    <label class="project-search">⌕<input placeholder="搜索项目资产"></label>
    <div class="asset-mini-tabs"><button class="active">全部</button><button>语音</button><button>音效</button><button>音乐</button></div>
    <div class="project-assets">
      ${[
        ['语', '旁白 · 江东风云', '00:16'],
        ['语', '周瑜 · 请孔明入帐', '00:16'],
        ['语', '诸葛亮 · 破敌之策', '00:19'],
        ['效', '远雷与军帐震动', '00:13'],
        ['环', '长江夜营环境床', '01:12'],
        ['乐', '战云将至', '01:12']
      ].map(([a, n, d]) => `<button class="project-asset"><i>${a}</i><span><b>${n}</b><small>${d}</small></span><em>▶</em></button>`).join('')}
    </div>
  `;
  return `
    <div class="project-panel-heading"><div><small>三国演义</small><b>目录</b></div><button title="添加章节">＋</button></div>
    <div class="chapter-summary"><b>赤壁之战</b><small>10 章 · 约 01:46:20</small></div>
    <div class="chapter-list">${chapterList()}</div>
  `;
};

const projectSidebar = (expanded = '目录', stage = 11) => `
  <header class="project-sidebar-heading">
    <span><small>当前项目</small><b>赤壁之战</b></span>
    <button title="项目设置">•••</button>
  </header>
  <div class="project-sidebar-groups">
    <section class="project-sidebar-group ${expanded === '目录' ? 'expanded' : ''}">
      <button class="project-group-trigger" data-project-view="目录">
        <span><i>章</i><b>章节</b><small>${editorChapters.length}</small></span><em>${expanded === '目录' ? '⌃' : '⌄'}</em>
      </button>
      <div class="project-group-content"><div class="chapter-list">${chapterList()}</div><button class="project-group-add">＋ 添加章节</button></div>
    </section>
    <section class="project-sidebar-group ${expanded === '角色' ? 'expanded' : ''}">
      <button class="project-group-trigger" data-project-view="角色">
        <span><i>角</i><b>角色</b><small>${demoCharacters.length}</small></span><em>${expanded === '角色' ? '⌃' : '⌄'}</em>
      </button>
      <div class="project-group-content character-list">
        ${demoCharacters.map(character => `<button class="character-entry"><i class="${character.tone}">${character.avatar}</i><span><b>${character.name}</b><small>${character.voice}</small></span><em>▶</em></button>`).join('')}
        <button class="project-group-add">＋ 添加角色</button>
      </div>
    </section>
    <section class="project-sidebar-group ${expanded === '资产' ? 'expanded' : ''}">
      <button class="project-group-trigger" data-project-view="资产">
        <span><i>资</i><b>素材</b><small>${stage >= 9 ? 6 : 0}</small></span><em>${expanded === '资产' ? '⌃' : '⌄'}</em>
      </button>
      <div class="project-group-content project-assets">
        ${stage < 9 ? '<p class="project-assets-empty">开始生成后，语音、音效和音乐会出现在这里</p>' : [
          ['语', '旁白 · 江东风云', '00:16'],
          ['语', '周瑜 · 请孔明入帐', '00:16'],
          ['语', '诸葛亮 · 破敌之策', '00:19'],
          ['效', '远雷与军帐震动', '00:13'],
          ['环', '长江夜营环境床', '01:12'],
          ['乐', '战云将至', '01:12']
        ].map(([avatar, name, duration]) => `<button class="project-asset"><i>${avatar}</i><span><b>${name}</b><small>${duration}</small></span><em>▶</em></button>`).join('')}
        <button class="project-group-add">＋ 添加素材</button>
      </div>
    </section>
  </div>
`;

const chatIntro = () => `
  <div class="agent-message">
    <span class="message-author">MURMIA AGENT</span>
    <p>第一章已经完成画本、声音素材与初步混音。你可以直接修改片段文本，也可以告诉我想调整什么</p>
  </div>
  <div class="agent-summary">
    <b>第一章 · 江东急报</b>
    <span>6 个音频片段</span><span>5 条音轨</span><span>01:12</span>
    <button data-editor-play>▶ 试听第一章</button>
  </div>
`;

const editorTemplate = () => `
  <div class="agent-editor production-layout" data-demo-stage="11" data-demo-flow="redcliff">
    <aside class="project-sidebar" id="projectSidebar" aria-label="项目内容">${projectSidebar('目录')}</aside>

    <section class="hybrid-editor">
      <header class="editor-toolbar">
        <div><small>赤壁之战</small><b id="editorChapterTitle">第一章 · 江东急报</b></div>
        <div class="transport">
          <button title="回到开头">↤</button>
          <button class="transport-play" data-editor-play title="播放">▶</button>
          <time id="editorTime">00:00.0 / 01:12.0</time>
        </div>
        <div class="timeline-tools">
          <button class="active" data-snap-toggle>⌁ 吸附</button>
          <div class="layer-toggles" aria-label="片段显示内容">
            <span>显示</span>
            <button class="active" data-layer-toggle="prompt">文本</button>
            <button class="active" data-layer-toggle="waveform">波形</button>
          </div>
          <label>−<input type="range" min="60" max="140" value="100">＋</label>
          <button data-editor-action="导出作品">导出</button>
        </div>
      </header>

      <div class="chapter-pending" id="chapterPending" hidden>
        <span>○</span><b>本章画本已经确认，音频尚未生成</b><small>可让 Agent 批量生成，也可以从任一片段开始</small>
        <button data-editor-action="生成本章">生成本章 · 预计 8,400 点</button>
      </div>

      <div class="timeline-shell" id="timelineShell">
        <div class="time-ruler">
          <span class="ruler-spacer">音轨与内容</span>
          <div class="ruler-line"><i>00:00</i><i>00:15</i><i>00:30</i><i>00:45</i><i>01:00</i><i>01:12</i></div>
        </div>
        <div class="playhead" id="editorPlayhead"><i></i></div>
        <div class="track-stack">
          ${trackRow('dialogue', 'olive', '旁', '旁白', 'MiniMax Speech 2.8 HD',
            audioClip('narrator', 1, 27, 'voice', 6), 6)}
          ${trackRow('dialogue', 'red', '周', '周瑜', 'Ronan · ElevenLabs v3',
            audioClip('zhouyu', 29, 28, 'voice-red', 6), 6)}
          ${trackRow('dialogue', 'blue', '诸', '诸葛亮', 'Seed Audio 1.0',
            audioClip('zhuge', 58, 34, 'voice-blue', 6), 6)}
          ${trackRow('sfx', 'gold', '效', '核心音效', 'ElevenLabs SFX',
            audioClip('thunder', 15, 25, 'sfx', 7), 7)}
          ${trackRow('ambience', 'teal', '环', '环境声', '素材库 · 无缝循环',
            audioClip('river', 1, 96, 'ambience', 7), 7)}
          ${trackRow('music', 'violet', '乐', '背景音乐', 'Lyria 3 Pro',
            audioClip('music', 1, 96, 'music', 8), 8)}
        </div>
      </div>
    </section>

    <aside class="agent-chat">
      <header class="chat-heading">
        <div><small>创作搭档</small><b>Murmia Agent</b></div>
        <button title="新对话">＋</button><button title="历史会话">☷</button>
      </header>
      <div class="chat-messages" id="editorChatMessages">${chatIntro()}</div>
      <div class="decision-composer" id="editorDecisionComposer" hidden></div>
      <div class="chat-composer" id="editorChatComposer">
        <div class="chat-reference" id="chatReference" hidden></div>
        <textarea id="editorChatInput" placeholder="告诉 Agent 想修改什么，输入 @ 引用片段"></textarea>
        <div><span><button title="上传">＋</button><button>自动模型⌄</button><button>Skill⌄</button></span><button class="chat-send" id="editorChatSend">↑</button></div>
      </div>
    </aside>

    <aside class="clip-inspector" id="clipInspector" hidden>
      <header><div><small id="inspectorKind">角色语音</small><b id="inspectorTitle">片段详情</b></div><button data-close-inspector>×</button></header>
      <div class="inspector-wave">${editorWave(52)}</div>
      <label><span>完整文本 / Prompt</span><textarea id="inspectorPrompt"></textarea></label>
      <dl>
        <div><dt>生成模型</dt><dd id="inspectorModel"></dd></div>
        <div><dt>音色与参数</dt><dd id="inspectorVoice"></dd></div>
        <div><dt>时间范围</dt><dd id="inspectorDuration"></dd></div>
      </dl>
      <div class="inspector-primary"><button data-editor-action="试听片段">▶ 试听</button><button data-editor-action="重新生成片段">重新生成</button></div>
      <div class="inspector-edit"><button data-editor-action="剪切片段">✂ 剪切</button><button data-editor-action="复制片段">▣ 复制</button><button class="danger" data-editor-action="删除片段">删除</button></div>
    </aside>

    <div class="markdown-preview-backdrop" id="markdownPreview" hidden>
      <article class="markdown-preview">
        <header>
          <div><small>MARKDOWN · 画本</small><b>第一章 · 江东急报</b></div>
          <button data-close-markdown aria-label="关闭">×</button>
        </header>
        <div class="markdown-body">
          <h1>第一章 · 江东急报</h1>
          <blockquote>声音方向：长江夜色中的压迫感逐渐逼近。对白保持近景，环境声拉宽，远雷位于后方</blockquote>
          <h2>场景一 · 江东军帐</h2>
          <p><strong>环境声</strong>　长江夜风、缓慢水流、远处船板轻响，整场持续</p>
          <p><strong>旁白［沉稳、克制］</strong><br>建安十三年秋，长江之上战云密布。曹操率大军南下，江东上下，一时人心惶惶</p>
          <p><strong>音效 Cue 00:10</strong>　远雷滚过，军帐布料轻微震动</p>
          <p><strong>周瑜［克制、警觉］</strong><br>孔明先生，曹军号称八十万，顺江而下。依先生之见，此战当如何应对？</p>
          <p><strong>诸葛亮［从容、笃定，稍作停顿］</strong><br>都督无需多虑。曹军虽众，却不习水战。只需借得一物，破敌便在旦夕</p>
          <h2>声音装配</h2>
          <ul>
            <li>旁白、周瑜、诸葛亮分别使用独立角色音轨</li>
            <li>环境声覆盖整场，远雷在 00:10–00:23 出现</li>
            <li>配乐由疑虑缓慢累积，在诸葛亮开口后转为笃定</li>
          </ul>
        </div>
        <footer><span>最后更新于刚刚 · 842 字</span><button data-close-markdown>返回对话</button></footer>
      </article>
    </div>

    <div class="character-editor-backdrop" id="characterEditor" hidden>
      <article class="character-editor-panel">
        <header>
          <button data-close-character-editor aria-label="返回角色列表">‹</button>
          <span><small>角色详情</small><b id="characterEditorTitle">编辑角色</b></span>
          <button data-close-character-editor aria-label="关闭">×</button>
        </header>
        <div class="character-editor-body">
          <label><span>名称</span><input id="characterEditorName"></label>
          <label><span>人物描述</span><textarea id="characterEditorDescription"></textarea></label>
          <label><span>试听例句</span><input id="characterEditorExample"></label>
          <section class="voice-picker">
            <nav><button class="active" data-voice-tab="推荐">推荐</button><button data-voice-tab="探索">探索</button><button data-voice-tab="我的音色">我的音色</button></nav>
            <div class="voice-recommendations">
              ${[
                ['Ronan', '深沉、克制、有戏剧张力', 'ElevenLabs v3'],
                ['清朗谋士', '从容、睿智、具有掌控感', 'Seed Audio 1.0'],
                ['青年君主', '沉着、坚定、不过度老成', 'MiniMax Speech 2.8 HD'],
                ['雄浑统帅', '威压、成熟、低频厚实', 'Fish Audio S1']
              ].map(([name, description, model], index) => `
                <button class="voice-recommendation ${index === 0 ? 'selected' : ''}" data-voice-option data-voice-name="${name}" data-voice-model="${model}">
                  <i>${name.slice(0, 1)}</i><span><b>${name}</b><small>${description} · ${model}</small></span>
                  <em data-character-voice-preview>▶</em>
                  <audio preload="metadata" src="./assets/audio/demo_voice_sample.mp3"></audio>
                </button>
              `).join('')}
            </div>
          </section>
        </div>
        <footer><button data-close-character-editor>取消</button><button class="primary" data-save-character>保存角色与音色</button></footer>
      </article>
    </div>

    <button class="editor-demo-orb" id="editorDemoOrb">演示</button>
    <aside class="editor-demo-panel" id="editorDemoPanel" hidden>
      <header><div><small>交互演示</small><b id="editorDemoTitle">从十章小说到第一章成品</b></div><button data-demo-close>×</button></header>
      <nav class="demo-flow-switch" aria-label="选择演示">
        <button class="active" data-demo-flow="redcliff"><b>十章广播剧</b><small>章节、角色与多轨作品</small></button>
        <button data-demo-flow="tts"><b>单段语音分流</b><small>确认意图并进入文本转语音</small></button>
      </nav>
      <div class="demo-progress"><i id="demoProgressBar"></i></div>
      <p id="demoStepCopy">Agent 会通过对话完成拆章、画本确认和声音试听</p>
      <div class="demo-step-list" id="editorDemoStepList">
        <span>粘贴原文</span><span>确认方向</span><span>编辑章节</span><span>角色音色</span><span>生成范围</span><span>确认画本</span>
        <span>试听音效</span><span>试听配乐</span><span>生成素材</span><span>完成混音</span>
      </div>
      <footer>
        <select id="editorDemoMode"><option value="manual">手动演示</option><option value="auto">自动播放</option></select>
        <button id="editorDemoStart">重新开始</button>
        <button class="demo-next" id="editorDemoNext">下一步 1/11</button>
      </footer>
    </aside>
  </div>
`;

const chatAudioTool = (title, meta, selected = false) => `
  <div class="chat-audio-tool ${selected ? 'selected' : ''}">
    <button class="chat-audio-play" data-chat-audio-play aria-label="播放">▶</button>
    <div class="chat-audio-main">
      <span><b>${title}</b><small>${meta}</small></span>
      <div class="chat-audio-progress">
        <input type="range" min="0" max="1000" value="0" data-chat-audio-seek aria-label="${title}播放进度">
        <time>00:00</time>
      </div>
    </div>
    <audio preload="metadata" src="./assets/audio/demo_voice_sample.mp3"></audio>
  </div>
`;

const chapterTool = () => `
  <section class="agent-structure-tool chapter-structure-tool" data-chapter-tool>
    <header>
      <span><small>章节工具</small><b>识别到 10 个章节</b></span>
      <em>可直接编辑</em>
    </header>
    <p>修改名称，或使用箭头调整顺序。变更会同步到目录和后续画本</p>
    <div class="chapter-tool-list" data-chapter-tool-list>
      ${editorChapters.map(([number, title], index) => `
        <div class="chapter-tool-row" data-chapter-tool-row>
          <span class="chapter-drag" title="拖动排序">⠿</span>
          <i>${index + 1}</i>
          <input value="${number} · ${title}" aria-label="第 ${index + 1} 章名称">
          <span class="chapter-row-actions">
            <button data-chapter-move="up" title="上移">↑</button>
            <button data-chapter-move="down" title="下移">↓</button>
            <button class="danger" data-chapter-delete title="删除">×</button>
          </span>
        </div>
      `).join('')}
    </div>
    <footer>
      <button class="tool-secondary" data-chapter-add>＋ 添加章节</button>
      <button class="tool-primary" data-tool-confirm="chapters">确认章节结构</button>
    </footer>
  </section>
`;

const demoCharacters = [
  {id:'narrator', avatar:'旁', name:'旁白', voice:'沉稳历史叙事', model:'MiniMax Speech 2.8 HD', example:'建安十三年秋，长江之上战云密布。', tone:'olive', description:'负责交代时代背景、战局变化和场景转换，语气沉稳克制，不抢角色表演。'},
  {id:'zhouyu', avatar:'周', name:'周瑜', voice:'Ronan · 克制锋利', model:'ElevenLabs v3', example:'孔明先生，依先生之见，此战当如何应对？', tone:'red', description:'江东水军都督，判断果断，外表克制，试探诸葛亮时保持锋利但不外露。'},
  {id:'zhuge', avatar:'诸', name:'诸葛亮', voice:'清朗谋士 · 从容', model:'Seed Audio 1.0', example:'都督无需多虑，破敌之机，就在这长江之上。', tone:'blue', description:'从容笃定，拥有全局判断。声音不应显得轻浮，停顿要给听众思考和掌控感。'},
  {id:'sunquan', avatar:'孙', name:'孙权', voice:'青年君主 · 沉着', model:'MiniMax Speech 2.8 HD', example:'江东基业，绝不能拱手让人。', tone:'gold', description:'年轻君主，在犹疑与决断之间变化，既有压力也有统御者的稳定。'},
  {id:'caocao', avatar:'曹', name:'曹操', voice:'雄浑中年 · 威压', model:'Fish Audio S1', example:'顺江而下，江东可一战而定。', tone:'violet', description:'久经战阵的统帅，声音具有压迫感和自信，但不要夸张成脸谱化反派。'}
];

const characterToolRow = character => `
  <div class="character-tool-row" data-character-row="${character.id}" data-character-name="${character.name}" data-character-description="${character.description}" data-character-example="${character.example}" data-character-voice="${character.voice}" data-character-model="${character.model}" data-character-tone="${character.tone}" data-character-avatar="${character.avatar}">
    <span class="character-tool-avatar ${character.tone}">${character.avatar}</span>
    <span class="character-tool-copy">
      <b>${character.name}</b><em>${character.voice}</em>
      <small>“${character.example}”</small>
      <i>${character.model}</i>
    </span>
    <span class="character-tool-actions">
      <button data-character-preview title="试听例句">▶</button>
      <button data-character-edit title="编辑角色">编辑</button>
      <button class="danger" data-character-delete title="删除角色">×</button>
    </span>
    <audio preload="metadata" src="./assets/audio/demo_voice_sample.mp3"></audio>
  </div>
`;

const characterTool = () => `
  <section class="agent-structure-tool character-voice-tool" data-character-tool>
    <header>
      <span><small>角色与音色工具</small><b>识别到 5 个核心角色</b></span>
      <em>已自动匹配</em>
    </header>
    <p>试听例句，进入详情可修改人物设定、例句、模型和音色</p>
    <div class="character-tool-list" data-character-tool-list>
      ${demoCharacters.map(characterToolRow).join('')}
    </div>
    <footer>
      <button class="tool-secondary" data-character-add>＋ 添加角色</button>
      <button class="tool-primary" data-tool-confirm="characters">确认角色与音色</button>
    </footer>
  </section>
`;

const redCliffDemoDecisions = {
  2: {
    mode: 'batch',
    questions: [
      {
        mode: 'single',
        question: '这部长篇小说，希望改编成什么整体风格？',
        options: [
          ['沉浸式广播剧', '多角色表演、空间音效与电影化配乐'],
          ['传统多人有声书', '旁白为主，角色对白适度表演'],
          ['章回说书', '突出叙述节奏和古典讲述感']
        ],
        placeholder: '输入其他改编风格'
      },
      {
        mode: 'multiple',
        question: '第一章需要重点表现哪些听觉体验？',
        options: [
          ['人物交锋', '突出周瑜与诸葛亮的试探和张力'],
          ['战争压迫感', '远雷、战船、军营和逼近感'],
          ['长江夜色', '强化水面、夜风和空间纵深'],
          ['电影化节奏', '用配乐推动疑虑到笃定的转折']
        ],
        placeholder: '补充其他重点，可与已选项同时提交'
      },
      {
        mode: 'single',
        question: '对白和旁白采用哪种语言风格？',
        options: [
          ['半文半白', '保留时代感，同时保证易听懂'],
          ['现代口语', '降低理解门槛，节奏更直接'],
          ['偏古典表达', '保留章回小说的措辞和气质']
        ],
        placeholder: '输入其他语言要求'
      }
    ]
  },
  5: {
    mode: 'single',
    count: '生成范围',
    question: '角色和音色已经确认，接下来希望生成多少内容？',
    options: [
      ['先生成第一章', '先完成第一章画本与音频，试听确认后再继续后续章节'],
      ['完整生成', '确认十章画本后，按章节连续生成整部作品']
    ],
    placeholder: '输入其他生成范围，例如先生成前三章',
    defaultIndex: 0
  },
  7: {
    mode: 'single',
    count: '单次确认',
    question: '远雷与军帐震动这条核心音效，如何处理？',
    options: [
      ['采用远雷 B', '距离更远，不遮挡对白'],
      ['再近一些', '提高冲击感，但继续避让人声'],
      ['再生成两版', '保留当前版本并补充不同空间距离']
    ],
    placeholder: '输入其他音效修改要求'
  },
  8: {
    mode: 'single',
    count: '单次确认',
    question: '第一章背景音乐小样，如何继续？',
    options: [
      ['采用配乐 B 并生成全长', '保持克制鼓点和悬念感'],
      ['减少鼓点', '让弦乐和江面环境更突出'],
      ['再生成两个方向', '保留当前版本作为对照']
    ],
    placeholder: '输入其他配乐修改要求'
  }
};

const renderDecisionComposer = (decision, questionIndex = 0, answers = []) => {
  const isBatch = decision.mode === 'batch';
  const question = isBatch ? decision.questions[questionIndex] : decision;
  const savedValues = answers[questionIndex] || [];
  const defaultIndex = question.defaultIndex ?? 0;
  return `
  <header>
    <span class="decision-title"><b>${question.question}</b>${question.mode === 'multiple' ? '<small>可多选</small>' : ''}</span>
    <span class="decision-count">
      <button ${!isBatch || questionIndex === 0 ? 'disabled' : 'data-decision-prev'} aria-label="上一题">‹</button>
      <em>${isBatch ? `${questionIndex + 1}/${decision.questions.length}` : decision.count}</em>
      <button disabled aria-label="下一题">›</button>
    </span>
  </header>
  <div class="decision-options" data-choice-mode="${question.mode}">
    ${question.options.map(([title, detail], index) => {
      const selected = savedValues.includes(title) || (!savedValues.length && question.mode !== 'multiple' && index === defaultIndex);
      return `
      <button class="decision-option ${selected ? 'selected' : ''}" data-decision-value="${title}">
        <i>${index + 1}</i><span><b>${title}</b><small>${detail}</small></span>
      </button>
    `}).join('')}
    <label class="decision-custom-option">
      <i>${question.options.length + 1}</i><input value="${savedValues.find(value => value.startsWith('自定义：'))?.replace('自定义：', '') || ''}" placeholder="${question.placeholder}">
    </label>
  </div>
  <footer>
    <button class="decision-ignore" data-decision-ignore>忽略</button>
    <button class="decision-continue" data-decision-confirm>${isBatch && questionIndex < decision.questions.length - 1 ? '下一题' : '提交选择'}</button>
  </footer>
  `;
};

const redCliffDemoSteps = [
  {
    copy: '用户把《赤壁之战》十章小说原文粘贴给 Agent',
    chat: `<div class="user-message"><span class="message-author">你</span><p>我想把这份《赤壁之战》小说做成十章广播剧。先帮我整理章节结构和角色，正式生成前再让我确认生成范围</p><button class="chat-attachment">文　赤壁之战_十章原文.txt <small>38,420 字</small></button></div>`
  },
  {
    copy: 'Agent 在继续工作前集中确认改编方向；全部选完后才发送一条完整回复',
    chat: `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>我已经读完原稿。开始拆章和改写画本前，需要先确认三件会影响整部作品的事：整体改编风格、第一章的听觉重点，以及对白语言风格</p></div>`
  },
  {
    copy: 'Agent 先展示章节工具；用户可以增删改、排序并确认识别出的十章结构',
    chat: `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>我已经按故事推进、场景切换和每章预计时长识别出十个章节。先请确认章节结构；您可以直接修改名称、增删章节或调整顺序。确认后，我再识别全书角色并匹配音色</p>${chapterTool()}</div>`
  },
  {
    copy: '章节确认后，Agent 展示角色与匹配音色；可试听、增删角色或进入详情编辑',
    chat: `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>章节结构已确认。我从十章原文中识别出旁白、周瑜、诸葛亮、孙权和曹操五个核心声音身份，并根据人物气质匹配了第一版音色。请试听例句；进入角色详情还可以修改人物描述、例句、模型和音色</p>${characterTool()}</div>`
  },
  {
    copy: '角色确认后，Agent 暂停并询问生成范围；可以先做第一章、完整生成或自行输入',
    chat: `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>角色身份和基础音色已经确认。为了控制生成成本并决定后续节奏，请选择这次要生成的内容范围</p></div>`
  },
  {
    copy: 'Agent 根据用户选择进入对应生成范围，并先展示第一章画本供继续确认',
    chat: `<div class="agent-message" data-generation-scope-result><span class="message-author">MURMIA AGENT</span><p data-generation-scope-copy>我会采用沉浸式广播剧、半文半白的方向，重点强化人物交锋、战争压迫感和长江夜色。第一章《江东急报》的画本已完成，其余九章暂不生成音频</p><div class="agent-inline-result"><b data-generation-scope-title>第一章进入制作</b><span data-generation-scope-meta>1 章画本已完成 · 9 章待生成</span></div>
      <button class="markdown-artifact" data-markdown-artifact>
        <span class="markdown-file-icon">M↓</span>
        <span><b>第一章_江东急报_音频画本.md</b><small>对白、表演提示、音效 Cue 与配乐范围 · 842 字</small></span>
        <em>查看详情 →</em>
      </button>
    </div>`
  },
  {
    copy: '试听核心音效；环境声不抢对白，远雷负责提示战争逼近',
    chat: `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>我生成了两版远雷。B 版距离更远，不会盖住周瑜台词，但在耳机里仍能感到军帐轻微震动</p><div class="chat-audio-stack">${chatAudioTool('远雷 B · 更远', '核心音效小样 · 8 秒', true)}</div></div>`
  },
  {
    copy: '试听第一章长背景音乐小样，确认后再生成完整长度',
    chat: `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>背景音乐先做了 18 秒小样。B 版鼓点更克制，诸葛亮开口时弦乐会从疑虑转为笃定</p><div class="chat-audio-stack">${chatAudioTool('配乐 B · 悬念感', 'Lyria 3 Pro · 18 秒', true)}</div></div>`
  },
  {
    copy: 'Agent 按用户选择的范围开始生成，第一章素材与画本中的文本和 Cue 自动绑定',
    chat: `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>第一章 6 个素材已经生成，并与画本中的文本和 Cue 自动绑定。现在修改文本时，可以明确选择是否重新生成对应声音；后续章节会按您确认的范围继续</p><div class="generation-status"><i></i><b>6 / 6 已完成</b><span>语音 3 · 音效 1 · 环境 1 · 配乐 1</span></div></div>`
  },
  {
    copy: '完成响度、空间、淡入淡出和对白避让，第一章可播放，其余章节保持待生成',
    chat: `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>第一章初混完成：对白保持在听觉中心，环境床拉宽，远雷后移，配乐在人声出现时自动避让 4 dB</p></div><div class="agent-summary"><b>第一章 · 江东急报</b><span>响度 -16 LUFS</span><span>峰值 -1 dB</span><span>01:12</span><button data-editor-play>▶ 播放成品</button></div>`
  }
];

const ttsDemoDecisions = {
  1: {
    mode: 'single',
    count: '确认需求',
    question: '你希望把这段文字生成语音吗？',
    options: [
      ['是，生成语音', '进入文本转语音工具并自动带入这段文字'],
      ['不是，继续处理文本', '留在对话中修改、翻译或润色这段文字']
    ],
    placeholder: '输入其他处理方式',
    defaultIndex: 0
  }
};

const ttsDemoSteps = [
  {
    copy: '用户只发送一段疑似需要配音的文字，Agent 先判断意图并请求确认',
    chat: `<div class="user-message"><span class="message-author">你</span><p>Sometimes the quietest moment is where your strength returns.</p></div><div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>这看起来是一段可能需要配音的英文文案。你希望我把它生成语音吗？</p></div>`
  },
  {
    copy: '确认是语音生成后，Agent 推荐最合适的单点工具；点击卡片会带着原文进入文本转语音页',
    chat: `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>明白了。这是一次单段语音生成，不需要创建章节、角色表或多轨工程。建议使用文本转语音工具，原文会自动带入，你可以继续选择模型、音色和参数</p><button class="agent-tool-card" data-open-tts-tool data-tts-text="Sometimes the quietest moment is where your strength returns."><i>声</i><span><b>文本转语音</b><small>已准备好原文 · 选择模型、音色与生成参数</small></span><em>打开工具 →</em></button></div>`
  }
];

function setEditorStage(root, stage) {
  const shell = $('.agent-editor', root);
  shell.dataset.demoStage = stage;
  const flow = shell.dataset.demoFlow || 'redcliff';
  shell.classList.remove('planning-layout', 'structured-layout', 'production-layout', 'tts-layout');
  if (flow === 'tts') shell.classList.add('tts-layout');
  else if (stage >= 9) shell.classList.add('production-layout');
  else if (stage >= 5) shell.classList.add('structured-layout');
  else shell.classList.add('planning-layout');
  $$('[data-appear-step]', root).forEach(track => {
    track.hidden = stage < Number(track.dataset.appearStep);
  });
  $$('[data-ready-step]', root).forEach(clip => {
    clip.classList.toggle('generated', stage >= 9);
    clip.classList.toggle('planned', stage >= Number(clip.dataset.readyStep) && stage < 9);
  });
  $$('.chapter-entry', root).forEach((chapter, index) => {
    const status = $('em', chapter);
    if (stage < 3) {
      chapter.classList.toggle('demo-hidden', index > 0);
      status.textContent = index === 0 ? '识别中' : '待识别';
    } else {
      chapter.classList.remove('demo-hidden');
      status.textContent = index === 0 && stage >= 11 ? '已完成' : index === 0 ? '制作中' : '待生成';
    }
    status.classList.toggle('done', index === 0 && stage >= 11);
  });
}

function openClipInspector(root, id) {
  const clip = clipData[id];
  $('#inspectorKind', root).textContent = clip.kind;
  $('#inspectorTitle', root).textContent = clip.title;
  $('#inspectorPrompt', root).value = clip.prompt;
  $('#inspectorModel', root).textContent = clip.model;
  $('#inspectorVoice', root).textContent = clip.voice;
  $('#inspectorDuration', root).textContent = clip.duration;
  $('#clipInspector', root).hidden = false;
}

function initEditor(root, toast) {
  const chat = $('#editorChatMessages', root);
  let currentDemoFlow = 'redcliff';
  let demoStep = 11;
  let autoTimer;
  let playTimer;
  let playbackSeconds = 0;
  let editingCharacterRow = null;
  const decisionAnswers = {};
  const structureConfirmed = {chapters: false, characters: false};
  const activeDemoSteps = () => currentDemoFlow === 'tts' ? ttsDemoSteps : redCliffDemoSteps;
  const activeDemoDecisions = () => currentDemoFlow === 'tts' ? ttsDemoDecisions : redCliffDemoDecisions;
  const totalDemoSteps = () => activeDemoSteps().length;

  const scrollChat = () => chat.scrollTo({top: chat.scrollHeight, behavior: 'smooth'});
  const escapeText = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[character]);
  const formatAudioTime = seconds => {
    if (!Number.isFinite(seconds)) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };
  const bindChatAudio = tool => {
    const audio = $('audio', tool);
    if (audio.dataset.bound) return audio;
    audio.dataset.bound = 'true';
    const seek = $('[data-chat-audio-seek]', tool);
    const time = $('time', tool);
    const playButton = $('[data-chat-audio-play]', tool);
    audio.addEventListener('loadedmetadata', () => {
      time.textContent = `00:00 / ${formatAudioTime(audio.duration)}`;
    });
    audio.addEventListener('timeupdate', () => {
      seek.value = audio.duration ? Math.round(audio.currentTime / audio.duration * 1000) : 0;
      time.textContent = `${formatAudioTime(audio.currentTime)} / ${formatAudioTime(audio.duration)}`;
    });
    audio.addEventListener('ended', () => {
      playButton.textContent = '▶';
      tool.classList.remove('playing');
    });
    return audio;
  };
  const setPanel = type => {
    const sidebar = $('#projectSidebar', root);
    if (!sidebar) return;
    sidebar.innerHTML = projectSidebar(type, demoStep);
  };
  const syncChapterDirectory = () => {
    const rows = $$('[data-chapter-tool-row]', root);
    if (!rows.length) return;
    const chapters = rows.map((row, index) => {
      const raw = $('input', row).value.trim();
      const parts = raw.split('·');
      const number = parts.length > 1 ? parts.shift().trim() : `第${index + 1}章`;
      const title = parts.length ? parts.join('·').trim() : raw || `未命名章节 ${index + 1}`;
      return [number, title, index === 0 && demoStep >= totalDemoSteps() ? '已完成' : '待生成'];
    });
    editorChapters.splice(0, editorChapters.length, ...chapters);
    setPanel('目录');
  };
  const appendStructureConfirmation = type => {
    if (structureConfirmed[type]) return;
    const isChapters = type === 'chapters';
    const count = isChapters
      ? $$('[data-chapter-tool-row]', root).length
      : $$('[data-character-row]', root).length;
    chat.insertAdjacentHTML('beforeend', `<div class="user-message compact"><span class="message-author">你</span><p>${isChapters ? `确认这 ${count} 个章节，继续识别角色` : `确认这 ${count} 个角色及当前音色，继续选择生成范围`}</p></div>`);
    structureConfirmed[type] = true;
  };
  const setDecisionComposer = step => {
    const panel = $('#editorDecisionComposer', root);
    const composer = $('#editorChatComposer', root);
    const decision = activeDemoDecisions()[step];
    panel.hidden = !decision;
    composer.hidden = Boolean(decision);
    if (!decision) {
      panel.innerHTML = '';
      return;
    }
    decisionAnswers[step] = [];
    panel.dataset.questionIndex = '0';
    panel.innerHTML = renderDecisionComposer(decision, 0, decisionAnswers[step]);
  };
  const saveCurrentDecision = () => {
    const panel = $('#editorDecisionComposer', root);
    const questionIndex = Number(panel.dataset.questionIndex || 0);
    const custom = $('.decision-custom-option input', panel).value.trim();
    const selected = $$('.decision-option.selected', panel).map(option => option.dataset.decisionValue);
    decisionAnswers[demoStep][questionIndex] = [...selected, ...(custom ? [`自定义：${custom}`] : [])];
  };
  const closeDecisionComposer = () => {
    const panel = $('#editorDecisionComposer', root);
    panel.hidden = true;
    $('#editorChatComposer', root).hidden = false;
    scrollChat();
  };
  const appendDecisionMessage = decision => {
    const answers = decisionAnswers[demoStep];
    if (decision.mode === 'batch') {
      const rows = decision.questions.map((question, index) => {
        const values = answers[index]?.length ? answers[index] : ['未选择'];
        return `<b>${escapeText(question.question)}</b><br>${values.map(escapeText).join('、')}`;
      });
      chat.insertAdjacentHTML('beforeend', `<div class="user-message decision-response"><span class="message-author">你</span><p>${rows.join('<br><br>')}</p></div>`);
    } else {
      const values = answers[0]?.length ? answers[0] : ['采用当前方案'];
      chat.insertAdjacentHTML('beforeend', `<div class="user-message compact"><span class="message-author">你</span><p>我的选择：${values.map(escapeText).join('、')}</p></div>`);
    }
  };
  const advanceDecision = () => {
    const panel = $('#editorDecisionComposer', root);
    if (panel.hidden) return {handled: false, complete: true};
    const decision = activeDemoDecisions()[demoStep];
    const questionIndex = Number(panel.dataset.questionIndex || 0);
    saveCurrentDecision();
    if (decision.mode === 'batch' && questionIndex < decision.questions.length - 1) {
      const nextIndex = questionIndex + 1;
      panel.dataset.questionIndex = String(nextIndex);
      panel.innerHTML = renderDecisionComposer(decision, nextIndex, decisionAnswers[demoStep]);
      return {handled: true, complete: false};
    }
    appendDecisionMessage(decision);
    closeDecisionComposer();
    return {handled: true, complete: true};
  };

  const applyGenerationScope = () => {
    const results = $$('[data-generation-scope-result]', chat);
    const result = results[results.length - 1];
    if (!result) return;
    const selected = decisionAnswers[5]?.[0]?.[0] || '先生成第一章';
    const customScope = selected.startsWith('自定义：') ? selected.replace('自定义：', '') : '';
    const copy = $('[data-generation-scope-copy]', result);
    const title = $('[data-generation-scope-title]', result);
    const meta = $('[data-generation-scope-meta]', result);

    if (selected === '完整生成') {
      copy.textContent = '我会采用沉浸式广播剧、半文半白的方向，进入十章完整生成流程。先完成第一章并给您试听，同时继续按章节生成后续内容';
      title.textContent = '整部作品进入生成';
      meta.textContent = '10 章画本已确认 · 第一章优先生成';
      return;
    }
    if (customScope) {
      copy.textContent = `我会按“${customScope}”执行。先完成第一章画本并给您确认，再继续所选范围`;
      title.textContent = '按自定义范围生成';
      meta.textContent = `${customScope} · 第一章优先生成`;
      return;
    }
    copy.textContent = '我会采用沉浸式广播剧、半文半白的方向，重点强化人物交锋、战争压迫感和长江夜色。第一章《江东急报》的画本已完成，其余九章暂不生成音频';
    title.textContent = '第一章进入制作';
    meta.textContent = '1 章画本已完成 · 9 章待生成';
  };

  const updateDemo = step => {
    demoStep = step;
    const steps = activeDemoSteps();
    const total = totalDemoSteps();
    const shell = $('.agent-editor', root);
    shell.dataset.demoFlow = currentDemoFlow;
    if (step === 0) {
      if (currentDemoFlow === 'redcliff') setPanel('目录');
      structureConfirmed.chapters = false;
      structureConfirmed.characters = false;
    }
    setEditorStage(root, step);
    if (currentDemoFlow === 'redcliff' && step === 9) setPanel('资产');
    setDecisionComposer(step);
    $('#demoProgressBar', root).style.width = `${step / total * 100}%`;
    $('#editorDemoNext', root).textContent = step >= total ? '演示完成' : `下一步 ${step + 1}/${total}`;
    $('#editorDemoNext', root).disabled = step >= total;
    $('#demoStepCopy', root).textContent = step ? steps[step - 1].copy : currentDemoFlow === 'tts' ? '已切换为单段语音分流，点击下一步发送一段文字' : '已回到初始项目，点击下一步粘贴十章小说原文';
    if (step === 0) {
      chat.innerHTML = currentDemoFlow === 'tts'
        ? `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>把需要处理的文字发给我。我会先理解你的意图，再推荐合适的音频工具</p></div>`
        : `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>把小说、剧本或故事梗概发给我。我会先确认章节和画本，不会直接消耗额度生成全部音频</p></div>`;
    } else {
      chat.insertAdjacentHTML('beforeend', steps[step - 1].chat);
      if (currentDemoFlow === 'redcliff' && step === 6) applyGenerationScope();
    }
    scrollChat();
    window.dispatchEvent(new CustomEvent('murmia:editor-demo-status', {
      detail: {step, total, flow: currentDemoFlow}
    }));
  };

  const replayDemoTo = targetStep => {
    clearTimeout(autoTimer);
    const target = Math.max(0, Math.min(targetStep, totalDemoSteps()));
    updateDemo(0);
    for (let step = 1; step <= target; step += 1) {
      const previous = step - 1;
      if (currentDemoFlow === 'redcliff' && previous === 3) appendStructureConfirmation('chapters');
      if (currentDemoFlow === 'redcliff' && previous === 4) appendStructureConfirmation('characters');
      updateDemo(step);
    }
  };

  const nextDemo = () => {
    const total = totalDemoSteps();
    if (demoStep >= total) return;
    const decisionResult = advanceDecision();
    if (decisionResult.handled && !decisionResult.complete) {
      if ($('#editorDemoMode', root).value === 'auto') {
        clearTimeout(autoTimer);
        autoTimer = setTimeout(nextDemo, 1700);
      }
      return;
    }
    if (currentDemoFlow === 'redcliff' && demoStep === 3) appendStructureConfirmation('chapters');
    if (currentDemoFlow === 'redcliff' && demoStep === 4) appendStructureConfirmation('characters');
    updateDemo(demoStep + 1);
    if ($('#editorDemoMode', root).value === 'auto' && demoStep < totalDemoSteps()) {
      clearTimeout(autoTimer);
      autoTimer = setTimeout(nextDemo, 1700);
    }
  };

  const refreshChapterTool = list => {
    $$('[data-chapter-tool-row]', list).forEach((row, index) => {
      $('i', row).textContent = index + 1;
      $('input', row).setAttribute('aria-label', `第 ${index + 1} 章名称`);
    });
    const heading = $('[data-chapter-tool] header b', root);
    if (heading) heading.textContent = `识别到 ${$$('[data-chapter-tool-row]', list).length} 个章节`;
    syncChapterDirectory();
  };
  const refreshCharacterTool = list => {
    const heading = $('[data-character-tool] header b', root);
    if (heading) heading.textContent = `识别到 ${$$('[data-character-row]', list).length} 个核心角色`;
  };
  const openCharacterEditor = row => {
    editingCharacterRow = row;
    $('#characterEditorTitle', root).textContent = `编辑${row.dataset.characterName}`;
    $('#characterEditorName', root).value = row.dataset.characterName;
    $('#characterEditorDescription', root).value = row.dataset.characterDescription;
    $('#characterEditorExample', root).value = row.dataset.characterExample;
    const currentVoice = row.dataset.characterVoice;
    const voiceOptions = $$('[data-voice-option]', root);
    const matchedOption = voiceOptions.find(option => currentVoice.includes(option.dataset.voiceName)) || voiceOptions[0];
    voiceOptions.forEach(option => {
      option.classList.toggle('selected', option === matchedOption);
    });
    $('#characterEditor', root).hidden = false;
  };

  root.addEventListener('click', event => {
    const view = event.target.closest('[data-project-view]');
    if (view) {
      const currentGroup = view.closest('.project-sidebar-group');
      if (currentGroup?.classList.contains('expanded')) {
        currentGroup.classList.remove('expanded');
        $('em', view).textContent = '⌄';
        return;
      }
      setPanel(view.dataset.projectView);
      return;
    }

    const chapterMove = event.target.closest('[data-chapter-move]');
    if (chapterMove) {
      const row = chapterMove.closest('[data-chapter-tool-row]');
      const list = row.parentElement;
      if (chapterMove.dataset.chapterMove === 'up' && row.previousElementSibling) list.insertBefore(row, row.previousElementSibling);
      if (chapterMove.dataset.chapterMove === 'down' && row.nextElementSibling) list.insertBefore(row.nextElementSibling, row);
      refreshChapterTool(list);
      return;
    }
    if (event.target.closest('[data-chapter-delete]')) {
      const row = event.target.closest('[data-chapter-tool-row]');
      const list = row.parentElement;
      row.remove();
      refreshChapterTool(list);
      return;
    }
    if (event.target.closest('[data-chapter-add]')) {
      const list = $('[data-chapter-tool-list]', root);
      const index = $$('[data-chapter-tool-row]', list).length + 1;
      list.insertAdjacentHTML('beforeend', `<div class="chapter-tool-row" data-chapter-tool-row><span class="chapter-drag" title="拖动排序">⠿</span><i>${index}</i><input value="第${index}章 · 新章节" aria-label="第 ${index} 章名称"><span class="chapter-row-actions"><button data-chapter-move="up" title="上移">↑</button><button data-chapter-move="down" title="下移">↓</button><button class="danger" data-chapter-delete title="删除">×</button></span></div>`);
      refreshChapterTool(list);
      $('input', list.lastElementChild).select();
      return;
    }

    if (event.target.closest('[data-character-delete]')) {
      const row = event.target.closest('[data-character-row]');
      const list = row.parentElement;
      row.remove();
      refreshCharacterTool(list);
      return;
    }
    if (event.target.closest('[data-character-add]')) {
      const list = $('[data-character-tool-list]', root);
      const index = $$('[data-character-row]', list).length + 1;
      const character = {id:`custom-${Date.now()}`, avatar:'新', name:`新角色 ${index}`, voice:'尚未选择音色', model:'待选择模型', example:'点击编辑角色并填写试听例句', tone:'teal', description:'补充角色身份、性格、年龄和表演方向'};
      list.insertAdjacentHTML('beforeend', characterToolRow(character));
      refreshCharacterTool(list);
      openCharacterEditor(list.lastElementChild);
      return;
    }
    if (event.target.closest('[data-character-preview]')) {
      const row = event.target.closest('[data-character-row]');
      const audio = $('audio', row);
      const button = $('[data-character-preview]', row);
      if (audio.paused) {
        audio.play();
        button.textContent = 'Ⅱ';
        audio.onended = () => { button.textContent = '▶'; };
      } else {
        audio.pause();
        button.textContent = '▶';
      }
      return;
    }
    if (event.target.closest('[data-character-edit]')) {
      openCharacterEditor(event.target.closest('[data-character-row]'));
      return;
    }
    if (event.target.closest('[data-close-character-editor]')) {
      $('#characterEditor', root).hidden = true;
      return;
    }
    const voiceTab = event.target.closest('[data-voice-tab]');
    if (voiceTab) {
      $$('[data-voice-tab]', root).forEach(button => button.classList.toggle('active', button === voiceTab));
      toast(`${voiceTab.dataset.voiceTab}音色 · 模拟列表已切换`);
      return;
    }
    const voicePreview = event.target.closest('[data-character-voice-preview]');
    if (voicePreview) {
      const option = voicePreview.closest('[data-voice-option]');
      const audio = $('audio', option);
      if (audio.paused) {
        audio.play();
        voicePreview.textContent = 'Ⅱ';
        audio.onended = () => { voicePreview.textContent = '▶'; };
      } else {
        audio.pause();
        voicePreview.textContent = '▶';
      }
      return;
    }
    const voiceOption = event.target.closest('[data-voice-option]');
    if (voiceOption) {
      $$('[data-voice-option]', root).forEach(option => option.classList.toggle('selected', option === voiceOption));
      return;
    }
    if (event.target.closest('[data-save-character]')) {
      if (!editingCharacterRow) return;
      const selectedVoice = $('[data-voice-option].selected', root);
      const name = $('#characterEditorName', root).value.trim() || '未命名角色';
      const description = $('#characterEditorDescription', root).value.trim();
      const example = $('#characterEditorExample', root).value.trim();
      const voice = selectedVoice?.dataset.voiceName || editingCharacterRow.dataset.characterVoice;
      const model = selectedVoice?.dataset.voiceModel || editingCharacterRow.dataset.characterModel;
      editingCharacterRow.dataset.characterName = name;
      editingCharacterRow.dataset.characterDescription = description;
      editingCharacterRow.dataset.characterExample = example;
      editingCharacterRow.dataset.characterVoice = voice;
      editingCharacterRow.dataset.characterModel = model;
      $('.character-tool-copy b', editingCharacterRow).textContent = name;
      $('.character-tool-copy em', editingCharacterRow).textContent = voice;
      $('.character-tool-copy small', editingCharacterRow).textContent = `“${example}”`;
      $('.character-tool-copy i', editingCharacterRow).textContent = model;
      $('#characterEditor', root).hidden = true;
      toast('角色设定与音色已保存');
      return;
    }
    const toolConfirm = event.target.closest('[data-tool-confirm]');
    if (toolConfirm) {
      clearTimeout(autoTimer);
      nextDemo();
      return;
    }

    const chapter = event.target.closest('[data-editor-chapter]');
    if (chapter) {
      const index = Number(chapter.dataset.editorChapter);
      $$('.chapter-entry', root).forEach(item => item.classList.toggle('active', item === chapter));
      $('#editorChapterTitle', root).textContent = `${editorChapters[index][0]} · ${editorChapters[index][1]}`;
      $('#timelineShell', root).hidden = index !== 0;
      $('#chapterPending', root).hidden = index === 0;
      toast(index === 0 ? '已回到第一章完整作品' : `${editorChapters[index][0]}画本已确认，音频待生成`);
      return;
    }

    const clip = event.target.closest('[data-editor-clip]');
    if (clip) {
      $$('.story-clip', root).forEach(item => item.classList.toggle('selected', item === clip));
      openClipInspector(root, clip.dataset.editorClip);
      const data = clipData[clip.dataset.editorClip];
      const reference = $('#chatReference', root);
      reference.hidden = false;
      reference.innerHTML = `<span>已引用</span><b>${data.title}</b><button>×</button>`;
      return;
    }

    if (event.target.closest('[data-close-inspector]')) {
      $('#clipInspector', root).hidden = true;
      $$('.story-clip', root).forEach(item => item.classList.remove('selected'));
      return;
    }

    const trackAction = event.target.closest('[data-track-action]');
    if (trackAction) {
      trackAction.classList.toggle('active');
      toast(`${trackAction.dataset.trackAction === 'mute' ? '静音' : '独奏'}已${trackAction.classList.contains('active') ? '开启' : '关闭'}`);
      return;
    }

    const layerToggle = event.target.closest('[data-layer-toggle]');
    if (layerToggle) {
      layerToggle.classList.toggle('active');
      const editor = $('.agent-editor', root);
      const promptVisible = $('[data-layer-toggle="prompt"]', root).classList.contains('active');
      const waveformVisible = $('[data-layer-toggle="waveform"]', root).classList.contains('active');
      editor.classList.toggle('hide-prompts', !promptVisible);
      editor.classList.toggle('hide-waveforms', !waveformVisible);
      const layerName = layerToggle.dataset.layerToggle === 'prompt' ? '文本' : '波形';
      toast(`${layerName}已${layerToggle.classList.contains('active') ? '显示' : '隐藏'}`);
      return;
    }

    if (event.target.closest('[data-snap-toggle]')) {
      const button = event.target.closest('[data-snap-toggle]');
      button.classList.toggle('active');
      toast(button.classList.contains('active') ? '已开启吸附' : '已关闭吸附');
      return;
    }

    const play = event.target.closest('[data-editor-play]');
    if (play) {
      const editor = $('.agent-editor', root);
      const playing = !editor.classList.contains('playing');
      editor.classList.toggle('playing', playing);
      $$('[data-editor-play]', root).forEach(button => {
        if (button.classList.contains('transport-play')) button.textContent = playing ? 'Ⅱ' : '▶';
      });
      clearInterval(playTimer);
      if (playing) {
        playTimer = setInterval(() => {
          playbackSeconds = (playbackSeconds + .5) % 72;
          const minutes = Math.floor(playbackSeconds / 60);
          const seconds = (playbackSeconds % 60).toFixed(1).padStart(4, '0');
          $('#editorTime', root).textContent = `0${minutes}:${seconds} / 01:12.0`;
        }, 500);
      }
      toast(playing ? '正在播放第一章' : '已暂停');
      return;
    }

    const action = event.target.closest('[data-editor-action]');
    if (action) {
      if (action.dataset.editorAction === '导出作品') {
        window.dispatchEvent(new CustomEvent('murmia:open-commerce', {detail:{type:'export'}}));
        return;
      }
      if (action.dataset.editorAction === '生成本章' || action.dataset.editorAction === '重新生成片段') {
        window.dispatchEvent(new CustomEvent('murmia:open-commerce', {
          detail: action.dataset.editorAction === '生成本章'
            ? {type:'estimate', context:'chapter', amount:'8,400'}
            : {type:'estimate'}
        }));
        return;
      }
      toast(`${action.dataset.editorAction} · 模拟操作已完成`);
      return;
    }

    const openTtsTool = event.target.closest('[data-open-tts-tool]');
    if (openTtsTool) {
      window.dispatchEvent(new CustomEvent('murmia:open-tts', {
        detail: {text: openTtsTool.dataset.ttsText || ''}
      }));
      return;
    }

    if (event.target.closest('#editorDemoOrb')) {
      currentDemoFlow = 'redcliff';
      Object.keys(decisionAnswers).forEach(key => delete decisionAnswers[key]);
      $$('[data-demo-flow]', root).forEach(button => button.classList.toggle('active', button.dataset.demoFlow === 'redcliff'));
      updateDemo(0);
      $('#editorDemoPanel', root).hidden = true;
      return;
    }
    if (event.target.closest('[data-demo-close]')) {
      $('#editorDemoPanel', root).hidden = true;
      return;
    }
    if (event.target.closest('#editorDemoStart')) {
      clearTimeout(autoTimer);
      updateDemo(0);
      $('#editorDemoPanel', root).hidden = false;
      return;
    }
    const demoFlow = event.target.closest('[data-demo-flow]');
    if (demoFlow) {
      currentDemoFlow = demoFlow.dataset.demoFlow;
      Object.keys(decisionAnswers).forEach(key => delete decisionAnswers[key]);
      $$('[data-demo-flow]', root).forEach(button => button.classList.toggle('active', button === demoFlow));
      $('#editorDemoTitle', root).textContent = currentDemoFlow === 'tts' ? '从一句文字进入文本转语音' : '从十章小说到第一章成品';
      $('#editorDemoStepList', root).innerHTML = currentDemoFlow === 'tts'
        ? '<span>发送文字</span><span>确认意图</span><span>打开工具</span>'
        : '<span>粘贴原文</span><span>确认方向</span><span>编辑章节</span><span>角色音色</span><span>生成范围</span><span>确认画本</span><span>试听音效</span><span>试听配乐</span><span>生成素材</span><span>完成混音</span>';
      updateDemo(0);
      $('#editorDemoPanel', root).hidden = true;
      return;
    }
    if (event.target.closest('#editorDemoNext')) {
      nextDemo();
      return;
    }

    if (event.target.closest('[data-markdown-artifact]')) {
      $('#markdownPreview', root).hidden = false;
      return;
    }
    if (event.target.closest('[data-close-markdown]')) {
      $('#markdownPreview', root).hidden = true;
      return;
    }

    const decisionOption = event.target.closest('.decision-option');
    if (decisionOption) {
      const panel = decisionOption.closest('.decision-composer');
      const isMultiple = $('.decision-options', panel).dataset.choiceMode === 'multiple';
      if (isMultiple) {
        decisionOption.classList.toggle('selected');
      } else {
        $$('.decision-option', panel).forEach(button => button.classList.toggle('selected', button === decisionOption));
        $('.decision-custom-option input', panel).value = '';
      }
      return;
    }

    if (event.target.closest('[data-decision-prev]')) {
      const panel = $('#editorDecisionComposer', root);
      const decision = activeDemoDecisions()[demoStep];
      saveCurrentDecision();
      const previousIndex = Math.max(0, Number(panel.dataset.questionIndex || 0) - 1);
      panel.dataset.questionIndex = String(previousIndex);
      panel.innerHTML = renderDecisionComposer(decision, previousIndex, decisionAnswers[demoStep]);
      return;
    }

    if (event.target.closest('[data-decision-ignore]')) {
      const panel = $('#editorDecisionComposer', root);
      const decision = activeDemoDecisions()[demoStep];
      const questionIndex = Number(panel.dataset.questionIndex || 0);
      decisionAnswers[demoStep][questionIndex] = ['跳过'];
      if (decision.mode === 'batch' && questionIndex < decision.questions.length - 1) {
        const nextIndex = questionIndex + 1;
        panel.dataset.questionIndex = String(nextIndex);
        panel.innerHTML = renderDecisionComposer(decision, nextIndex, decisionAnswers[demoStep]);
      } else {
        appendDecisionMessage(decision);
        closeDecisionComposer();
      }
      return;
    }

    const confirmChoice = event.target.closest('[data-decision-confirm]');
    if (confirmChoice) {
      const result = advanceDecision();
      if (result.complete && ((currentDemoFlow === 'tts' && demoStep === 1) || (currentDemoFlow === 'redcliff' && demoStep === 5))) nextDemo();
      return;
    }

    const chatAudioButton = event.target.closest('[data-chat-audio-play]');
    if (chatAudioButton) {
      const tool = chatAudioButton.closest('.chat-audio-tool');
      const audio = bindChatAudio(tool);
      const shouldPlay = audio.paused;
      $$('audio', chat).forEach(otherAudio => {
        if (otherAudio === audio) return;
        otherAudio.pause();
        const otherTool = otherAudio.closest('.chat-audio-tool');
        if (otherTool) {
          otherTool.classList.remove('playing');
          $('[data-chat-audio-play]', otherTool).textContent = '▶';
        }
      });
      if (shouldPlay) {
        audio.play();
        chatAudioButton.textContent = 'Ⅱ';
        tool.classList.add('playing');
      } else {
        audio.pause();
        chatAudioButton.textContent = '▶';
        tool.classList.remove('playing');
      }
      return;
    }

    const sample = event.target.closest('.audio-options button');
    if (sample) {
      sample.classList.toggle('playing');
      toast(sample.classList.contains('playing') ? '正在试听小样' : '已暂停小样');
    }

    if (event.target.closest('.chat-reference button')) {
      $('#chatReference', root).hidden = true;
    }
  });

  root.addEventListener('input', event => {
    if (event.target.matches('[data-chat-audio-seek]')) {
      const tool = event.target.closest('.chat-audio-tool');
      const audio = bindChatAudio(tool);
      if (Number.isFinite(audio.duration)) {
        audio.currentTime = Number(event.target.value) / 1000 * audio.duration;
      }
      return;
    }
    if (event.target.closest('.decision-custom-option')) {
      const tool = event.target.closest('.decision-composer');
      const isMultiple = $('.decision-options', tool).dataset.choiceMode === 'multiple';
      if (event.target.value.trim() && !isMultiple) {
        $$('.decision-option', tool).forEach(button => button.classList.remove('selected'));
      }
      return;
    }
    if (event.target.id === 'inspectorPrompt') {
      const selected = $('.story-clip.selected', root);
      if (!selected) return;
      clipData[selected.dataset.editorClip].prompt = event.target.value;
      $('.clip-copy small', selected).textContent = event.target.value;
      return;
    }
    if (event.target.closest('.timeline-tools') && event.target.type === 'range') {
      $('.track-stack', root).style.width = `${910 * Number(event.target.value) / 100}px`;
    }
  });

  root.addEventListener('change', event => {
    if (event.target.closest('[data-chapter-tool-row]')) {
      syncChapterDirectory();
    }
  });

  $('#editorChatSend', root).addEventListener('click', () => {
    const input = $('#editorChatInput', root);
    const value = input.value.trim();
    if (!value) return;
    chat.insertAdjacentHTML('beforeend', `<div class="user-message"><span class="message-author">你</span><p>${value.replaceAll('<', '&lt;')}</p></div>`);
    input.value = '';
    scrollChat();
    setTimeout(() => {
      chat.insertAdjacentHTML('beforeend', `<div class="agent-message"><span class="message-author">MURMIA AGENT</span><p>收到。我会先保留当前时间位置和其他轨道，只调整你提到的内容，并在改动后给你试听对比</p></div>`);
      scrollChat();
    }, 500);
  });

  $('#editorChatInput', root).addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      $('#editorChatSend', root).click();
    }
  });

  // The demo panel floats above several editor layouts. Bind its primary
  // control directly so a click cannot be swallowed by another delegated
  // editor interaction as the workspace changes between planning and
  // production states.
  $('#editorDemoNext', root).addEventListener('click', event => {
    event.stopPropagation();
    nextDemo();
  });

  window.addEventListener('murmia:editor-demo-navigate', event => {
    if (!root.isConnected) return;
    if (event.detail?.direction === 'previous') {
      replayDemoTo(demoStep - 1);
      return;
    }
    nextDemo();
  });

  setEditorStage(root, totalDemoSteps());
}

window.MurmiaEditor = {
  render: editorTemplate,
  init: initEditor
};
