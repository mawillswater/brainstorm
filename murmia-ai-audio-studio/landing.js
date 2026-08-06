(function () {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  const requestedLanding = params.get('landing');
  const landingPage = ['voice', 'audiobook', 'podcast'].includes(requestedLanding) ? requestedLanding : 'official';
  const landing = document.querySelector('#landingSite');
  const appShell = document.querySelector('#appShell');
  const demoOrb = document.querySelector('#globalDemoOrb');
  const showLanding = !view || view === 'landing';

  if (!landing || !appShell) return;
  landing.hidden = !showLanding;
  appShell.hidden = showLanding;
  if (demoOrb) demoOrb.hidden = showLanding;
  document.body.classList.toggle('landing-active', showLanding);
  if (!showLanding) return;
  document.body.classList.toggle('landing-voice-page', landingPage === 'voice');
  document.body.classList.toggle('landing-audiobook-page', landingPage === 'audiobook');
  document.body.classList.toggle('landing-podcast-page', landingPage === 'podcast');

  const landingPageLabel = document.querySelector('#landingPageLabel');
  document.querySelectorAll('[data-landing-page]').forEach(link => {
    const active = link.dataset.landingPage === landingPage;
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'page');
      if (landingPageLabel) landingPageLabel.textContent = link.textContent;
    }
  });

  const landingMain = landing.querySelector('main');
  const landingHero = document.querySelector('#landingHero');
  const landingVoices = document.querySelector('#landingVoices');
  const landingModels = document.querySelector('#landingModels');
  const landingTools = document.querySelector('#landingTools');
  if (landingPage === 'voice' && landingMain && landingHero && landingVoices && landingModels && landingTools) {
    landingMain.insertBefore(landingVoices, landingTools);
    landingMain.insertBefore(landingModels, landingTools);
  }

  if (landingPage === 'voice') {
    document.title = 'Murmia · AI 语音生成器';
    const voiceKicker = document.querySelector('#landingVoiceKicker');
    const heroTitle = document.querySelector('#landingHeroTitle');
    const heroSubtitle = document.querySelector('#landingHeroSubtitle');
    const finalTitle = document.querySelector('#landingFinalTitle');
    const finalSubtitle = document.querySelector('#landingFinalSubtitle');
    const finalAction = document.querySelector('#landingFinalAction');
    if (voiceKicker) voiceKicker.hidden = false;
    if (heroTitle) heroTitle.textContent = '即时生成自然、有情绪的声音';
    if (heroSubtitle) heroSubtitle.innerHTML = 'Murmia 是一站式 AI 音频编辑站，输入文字即可生成 <mark>自然语音</mark><mark>情绪配音</mark><mark>多语言旁白</mark>，也能继续完成完整音频作品';
    if (finalTitle) finalTitle.textContent = '现在就生成你的第一段语音';
    if (finalSubtitle) finalSubtitle.textContent = '选择音色和模型，输入文字，几秒得到自然、有情绪的声音';
    if (finalAction) finalAction.innerHTML = '开始生成语音 <i>→</i>';
  }

  if (landingPage === 'audiobook') {
    document.title = 'Murmia · AI 有声书生成器';
    const voiceKicker = document.querySelector('#landingVoiceKicker');
    const heroTitle = document.querySelector('#landingHeroTitle');
    const heroSubtitle = document.querySelector('#landingHeroSubtitle');
    const audiobookComposer = document.querySelector('#landingAudiobookComposer');
    const quickComposer = document.querySelector('#landingQuickComposer');
    const ttsExamples = document.querySelector('#landingTtsExamples');
    const speechResult = document.querySelector('#landingSpeechResult');
    if (voiceKicker) {
      voiceKicker.hidden = false;
      voiceKicker.textContent = 'AI 有声书生成器';
    }
    if (heroTitle) heroTitle.textContent = '几分钟，把书稿变成专业级有声书';
    if (heroSubtitle) heroSubtitle.innerHTML = 'Murmia 是一站式 AI 音频编辑站，上传书稿并补充创作要求，即可完成 <mark>章节旁白</mark><mark>角色声音</mark><mark>配乐音效</mark> 与完整混音';
    if (audiobookComposer) audiobookComposer.hidden = false;
    document.querySelectorAll('.audiobook-feature-section').forEach(section => { section.hidden = false; });
    if (quickComposer) quickComposer.hidden = true;
    if (ttsExamples) ttsExamples.hidden = true;
    if (speechResult) speechResult.hidden = true;
  }

  if (landingPage === 'podcast') {
    document.title = 'Murmia · AI 播客生成器';
    const voiceKicker = document.querySelector('#landingVoiceKicker');
    const heroTitle = document.querySelector('#landingHeroTitle');
    const heroSubtitle = document.querySelector('#landingHeroSubtitle');
    const podcastComposer = document.querySelector('#landingPodcastComposer');
    const podcastExamples = document.querySelector('#podcastExamples');
    const podcastSourceFeature = document.querySelector('#podcastSourceFeature');
    const podcastAgentFeature = document.querySelector('#podcastAgentFeature');
    const quickComposer = document.querySelector('#landingQuickComposer');
    const ttsExamples = document.querySelector('#landingTtsExamples');
    const speechResult = document.querySelector('#landingSpeechResult');
    const finalTitle = document.querySelector('#landingFinalTitle');
    const finalSubtitle = document.querySelector('#landingFinalSubtitle');
    const finalAction = document.querySelector('#landingFinalAction');
    if (voiceKicker) {
      voiceKicker.hidden = false;
      voiceKicker.textContent = 'AI 播客生成器';
    }
    if (heroTitle) heroTitle.textContent = '输入主题，生成一档完整播客';
    if (heroSubtitle) heroSubtitle.innerHTML = 'Murmia 是一站式 AI 音频编辑站，把文字、文件或链接变成 <mark>双人对谈</mark><mark>知识节目</mark><mark>访谈播客</mark>，自动完成脚本、声音与混音';
    if (podcastComposer) podcastComposer.hidden = false;
    if (podcastExamples) podcastExamples.hidden = false;
    if (podcastSourceFeature) podcastSourceFeature.hidden = false;
    if (podcastAgentFeature) podcastAgentFeature.hidden = false;
    if (quickComposer) quickComposer.hidden = true;
    if (ttsExamples) ttsExamples.hidden = true;
    if (speechResult) speechResult.hidden = true;
    if (finalTitle) finalTitle.textContent = '现在就生成你的第一档播客';
    if (finalSubtitle) finalSubtitle.textContent = '给出主题或资料，选择主播与风格，几分钟得到完整节目';
    if (finalAction) finalAction.innerHTML = '开始生成播客 <i>→</i>';
  }

  const audiobookFile = document.querySelector('#audiobookFile');
  const audiobookUploadTitle = document.querySelector('#audiobookUploadTitle');
  if (audiobookFile && audiobookUploadTitle) {
    audiobookFile.addEventListener('change', () => {
      const file = audiobookFile.files && audiobookFile.files[0];
      audiobookUploadTitle.textContent = file ? `已选择：${file.name}` : '上传书稿';
    });
  }

  document.querySelectorAll('.audiobook-formats button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.audiobook-formats button').forEach(item => item.classList.toggle('active', item === button));
    });
  });

  const podcastPrompt = document.querySelector('#podcastPrompt');
  const podcastCharCount = document.querySelector('#podcastCharCount');
  const podcastInputCopy = {
    text: '输入一个主题、观点或完整文稿，生成一档播客',
    file: '上传 PDF、DOCX、TXT 或音频文件，自动整理成播客',
    link: '粘贴文章或网页链接，提炼重点并生成播客'
  };
  document.querySelectorAll('[data-podcast-input]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-podcast-input]').forEach(item => item.classList.toggle('active', item === button));
      if (podcastPrompt) {
        podcastPrompt.value = '';
        podcastPrompt.placeholder = podcastInputCopy[button.dataset.podcastInput];
        podcastPrompt.focus();
      }
      if (podcastCharCount) podcastCharCount.textContent = '0';
    });
  });
  if (podcastPrompt && podcastCharCount) {
    podcastPrompt.addEventListener('input', () => {
      podcastCharCount.textContent = Array.from(podcastPrompt.value).length;
    });
  }
  document.querySelectorAll('[data-podcast-example]').forEach(button => {
    button.addEventListener('click', () => {
      if (!podcastPrompt) return;
      podcastPrompt.value = button.dataset.podcastExample;
      if (podcastCharCount) podcastCharCount.textContent = Array.from(podcastPrompt.value).length;
      podcastPrompt.focus();
    });
  });

  const prompt = document.querySelector('#landingPrompt');
  const modelChip = document.querySelector('#landingModelChip b');
  const voiceChip = document.querySelector('#landingVoiceChip b');
  const generateLink = document.querySelector('#landingGenerate');
  const charCount = document.querySelector('#landingCharCount b');
  const speechResult = document.querySelector('#landingSpeechResult');
  const ttsUnlock = document.querySelector('#landingTtsUnlock');
  const ttsExamples = document.querySelector('#landingTtsExamples');
  let currentMode = 'speech';
  const modeData = {
    work: {placeholder:'描述想创作的作品，或粘贴、上传已有脚本', model:'Murmia Agent', voice:'自动匹配角色音色', href:'./index.html?view=agent'},
    speech: {placeholder:'输入或粘贴需要转成语音的文本', model:'ElevenLabs v3', voice:'Arabella · 温暖叙事', href:'./index.html?view=workspace&page=文本转语音'},
    sfx: {placeholder:'描述声音来源、动作、材质、空间和时长', model:'ElevenLabs SFX', voice:'自动匹配空间', href:'./index.html?view=workspace&page=音效'},
    music: {placeholder:'描述音乐风格、情绪、乐器、结构和使用场景', model:'Lyria 3 Pro', voice:'纯音乐 · 无人声', href:'./index.html?view=workspace&page=音乐生成'},
    changer: {placeholder:'上传或录制声音，再描述想转换成的目标音色', model:'Seed Voice Changer', voice:'尚未选择目标音色', href:'./index.html?view=workspace&page=声音转换'}
  };

  const updateCharCount = () => {
    if (charCount) charCount.textContent = Array.from(prompt.value).length;
  };
  updateCharCount();
  prompt.addEventListener('input', updateCharCount);

  document.querySelectorAll('[data-landing-mode]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-landing-mode]').forEach(item => item.classList.toggle('active', item === button));
      currentMode = button.dataset.landingMode;
      const data = modeData[currentMode];
      prompt.placeholder = data.placeholder;
      prompt.value = currentMode === 'work'
        ? '把这篇故事做成沉浸式广播剧，加入角色表演、环境声、音效、配乐和完整混音'
        : '';
      modelChip.textContent = data.model;
      voiceChip.textContent = data.voice;
      generateLink.dataset.href = data.href;
      if (speechResult) speechResult.hidden = true;
      if (ttsUnlock) ttsUnlock.hidden = currentMode !== 'speech';
      if (ttsExamples) ttsExamples.hidden = currentMode !== 'speech';
      updateCharCount();
    });
  });

  generateLink.addEventListener('click', () => {
    if (currentMode !== 'speech') {
      window.location.href = modeData[currentMode].href;
      return;
    }
    if (!prompt.value.trim()) {
      prompt.focus();
      return;
    }
    const label = generateLink.querySelector('span');
    label.textContent = '生成中';
    generateLink.disabled = true;
    window.setTimeout(() => {
      label.textContent = '重新生成';
      generateLink.disabled = false;
      if (speechResult) {
        speechResult.hidden = false;
        speechResult.classList.remove('is-ready');
        window.requestAnimationFrame(() => speechResult.classList.add('is-ready'));
      }
      if (ttsExamples) ttsExamples.hidden = true;
    }, 620);
  });

  document.querySelectorAll('[data-landing-prompt]').forEach(button => {
    button.addEventListener('click', () => {
      prompt.value = button.dataset.landingPrompt;
      updateCharCount();
      prompt.focus();
    });
  });

  document.querySelectorAll('.voice-emotions button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.voice-emotions button').forEach(item => item.classList.toggle('active', item === button));
    });
  });

  const chapterTitle = document.querySelector('.generated-work-copy p');
  document.querySelectorAll('.agent-chapters button:not(.more)').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.agent-chapters button').forEach(item => item.classList.toggle('active', item === button));
      if (chapterTitle) chapterTitle.textContent = `${button.querySelector('small').textContent}：${button.querySelector('b').textContent}`;
    });
  });

  const demoAudio = new Audio('./assets/audio/demo_voice_sample.mp3');
  let activePlayButton = null;
  let sfxContext = null;
  let sfxResetTimer = null;
  let musicNodes = [];
  let musicResetTimer = null;
  const playMetalImpact = button => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    sfxContext = sfxContext || new AudioContextClass();
    const now = sfxContext.currentTime;
    const master = sfxContext.createGain();
    master.gain.setValueAtTime(.72, now);
    master.gain.exponentialRampToValueAtTime(.001, now + .85);
    master.connect(sfxContext.destination);

    [185, 610, 1420].forEach((frequency, index) => {
      const oscillator = sfxContext.createOscillator();
      const gain = sfxContext.createGain();
      oscillator.type = index === 0 ? 'triangle' : 'sine';
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * .72, now + .5);
      gain.gain.setValueAtTime(index === 0 ? .38 : .18, now);
      gain.gain.exponentialRampToValueAtTime(.001, now + (index === 0 ? .38 : .72));
      oscillator.connect(gain).connect(master);
      oscillator.start(now);
      oscillator.stop(now + .9);
    });

    const noiseBuffer = sfxContext.createBuffer(1, Math.ceil(sfxContext.sampleRate * .18), sfxContext.sampleRate);
    const noise = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noise.length; i += 1) noise[i] = (Math.random() * 2 - 1) * (1 - i / noise.length);
    const noiseSource = sfxContext.createBufferSource();
    const filter = sfxContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2600;
    filter.Q.value = 1.2;
    noiseSource.buffer = noiseBuffer;
    noiseSource.connect(filter).connect(master);
    noiseSource.start(now);

    if (activePlayButton && activePlayButton !== button) activePlayButton.textContent = '▶';
    if (!demoAudio.paused) demoAudio.pause();
    activePlayButton = button;
    button.textContent = 'Ⅱ';
    window.clearTimeout(sfxResetTimer);
    sfxResetTimer = window.setTimeout(() => {
      button.textContent = '▶';
      if (activePlayButton === button) activePlayButton = null;
    }, 900);
  };
  const stopMusicPreview = () => {
    musicNodes.forEach(node => { try { node.stop(); } catch (error) {} });
    musicNodes = [];
    window.clearTimeout(musicResetTimer);
  };
  const playMusicPreview = button => {
    if (activePlayButton === button && musicNodes.length) {
      stopMusicPreview();
      button.textContent = '▶';
      activePlayButton = null;
      return;
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    sfxContext = sfxContext || new AudioContextClass();
    if (sfxContext.state === 'suspended') sfxContext.resume();
    stopMusicPreview();
    if (!demoAudio.paused) demoAudio.pause();
    if (activePlayButton) activePlayButton.textContent = '▶';
    activePlayButton = button;
    button.textContent = 'Ⅱ';

    const now = sfxContext.currentTime;
    const master = sfxContext.createGain();
    const filter = sfxContext.createBiquadFilter();
    master.gain.setValueAtTime(.38, now);
    master.gain.setValueAtTime(.38, now + 5.1);
    master.gain.exponentialRampToValueAtTime(.001, now + 5.8);
    filter.type = 'lowpass';
    filter.frequency.value = 1800;
    master.connect(filter).connect(sfxContext.destination);
    const chords = [[220,261.63,329.63],[196,246.94,293.66],[174.61,220,261.63],[196,246.94,329.63]];
    chords.forEach((chord, chordIndex) => {
      const start = now + chordIndex * 1.35;
      chord.forEach((frequency, noteIndex) => {
        const oscillator = sfxContext.createOscillator();
        const gain = sfxContext.createGain();
        oscillator.type = noteIndex === 0 ? 'triangle' : 'sine';
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(.001, start);
        gain.gain.exponentialRampToValueAtTime(noteIndex === 0 ? .17 : .09, start + .18);
        gain.gain.setValueAtTime(noteIndex === 0 ? .17 : .09, start + 1.0);
        gain.gain.exponentialRampToValueAtTime(.001, start + 1.5);
        oscillator.connect(gain).connect(master);
        oscillator.start(start);
        oscillator.stop(start + 1.55);
        musicNodes.push(oscillator);
      });
    });
    musicResetTimer = window.setTimeout(() => {
      musicNodes = [];
      button.textContent = '▶';
      if (activePlayButton === button) activePlayButton = null;
    }, 5900);
  };
  document.querySelectorAll('.landing-play').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      if (button.dataset.sfxDemo === 'metal-impact') {
        stopMusicPreview();
        playMetalImpact(button);
        return;
      }
      if (button.dataset.musicDemo === 'ambient-score') {
        playMusicPreview(button);
        return;
      }
      stopMusicPreview();
      const isCurrent = activePlayButton === button;
      if (activePlayButton && !isCurrent) activePlayButton.textContent = '▶';
      if (isCurrent && !demoAudio.paused) {
        demoAudio.pause();
        return;
      }
      activePlayButton = button;
      demoAudio.currentTime = 0;
      demoAudio.play().catch(() => {});
    });
  });
  demoAudio.addEventListener('play', () => { if (activePlayButton) activePlayButton.textContent = 'Ⅱ'; });
  demoAudio.addEventListener('pause', () => { if (activePlayButton && !activePlayButton.dataset.sfxDemo && !activePlayButton.dataset.musicDemo) activePlayButton.textContent = '▶'; });
  demoAudio.addEventListener('ended', () => { if (activePlayButton && !activePlayButton.dataset.sfxDemo && !activePlayButton.dataset.musicDemo) activePlayButton.textContent = '▶'; });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
  }, {threshold: .12});
  document.querySelectorAll('.landing-site main > section:not(.landing-hero)').forEach(section => observer.observe(section));
})();
