/* ==========================================================================
   DAIYOSEI UI KIT - INTERACTIVE SCRIPT
   Provides dynamic dial control, theme switching, canvas/svg effects,
   and dynamic coordinate readouts for the J-Core UI Playground.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. 系统时钟与动态指标更新 (HUD Updates)
  // ==========================================
  const clockElement = document.getElementById('clock');
  const signalElement = document.getElementById('hud-signal');
  const fpsElement = document.getElementById('hud-fps');
  const coordsElement = document.getElementById('hud-coords');

  // 时钟更新
  function updateClock() {
    const now = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    clockElement.textContent = timeStr;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // 动态HUD波动参数 (琪露诺的研究手记)
  setInterval(() => {
    // 冰冻能量微弱变化
    const icePower = (99.8 + Math.random() * 0.2).toFixed(1);
    signalElement.textContent = `${icePower}% (最強! ❄️)`;

    // 冻结青蛙的数目微弱变化
    const frogs = Math.floor(9 + Math.random() * 10);
    fpsElement.textContent = `${frogs}只 🐸`;

    // 琪露诺的心情波动
    const moods = ["最强状态 ❄️", "开心 ✿", "吃刨冰中 🍨", "大获全胜 ✌️", "在抓青蛙 🐸", "大妖精贴贴 ♡", "笨蛋模式 ( 9 )"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    coordsElement.textContent = randomMood;
  }, 1200);


  // ==========================================
  // 2. 主题与模拟滤镜控制 (Themes & Effects)
  // ==========================================
  const themeButtons = document.querySelectorAll('.theme-btn');
  const toggleGrain = document.getElementById('toggle-grain');
  const toggleScanlines = document.getElementById('toggle-scanlines');
  const toggleGlitch = document.getElementById('toggle-glitch');

  // 主题切换
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.getAttribute('data-theme');
      if (theme === 'dark') {
        document.body.className = document.body.className.replace('theme-blue', 'theme-dark');
      } else {
        document.body.className = document.body.className.replace('theme-dark', 'theme-blue');
      }
    });
  });

  // 滤镜特效开关
  toggleGrain.addEventListener('change', (e) => {
    document.body.classList.toggle('grain-active', e.target.checked);
  });

  toggleScanlines.addEventListener('change', (e) => {
    document.body.classList.toggle('scanlines-active', e.target.checked);
  });

  toggleGlitch.addEventListener('change', (e) => {
    if (!e.target.checked) {
      document.querySelectorAll('.serif-title, .brand-title, .panel-lyrics').forEach(el => {
        el.style.animation = 'none';
      });
    } else {
      // 开启后添加小故障效果
      setupGlitchTriggers();
    }
  });

  // 周期性触发古典纸页曝光与印墨深浅起伏的微呼吸效果 (替代硬故障)
  function setupGlitchTriggers() {
    const title = document.querySelector('.serif-title');
    if (!title) return;

    setInterval(() => {
      if (!toggleGlitch.checked) return;
      
      // 模拟油墨纸张因光线投射产生的漫反射微起伏，温润柔和
      title.style.transition = 'opacity 1.5s ease-in-out, letter-spacing 1.5s ease-in-out';
      title.style.opacity = (0.8 + Math.random() * 0.2).toFixed(2);
      title.style.letterSpacing = `${(-0.01 + Math.random() * 0.03).toFixed(3)}em`;
    }, 3000);
  }
  setupGlitchTriggers();


  // ==========================================
  // 3. 剪影卡片交互 (Silhouette & Warning Arrow - 重构为手撕物理叠牌推开动效)
  // ==========================================
  const avatarCards = document.querySelectorAll('.avatar-card');
  const avatarRow = document.querySelector('.avatar-row');
  let avatarTimeoutId = null;

  function updateAvatarLayout(activeIndex) {
    // 每次点击时，先清除上一次未完成的收回延时，防止快速点击时发生跳变
    if (avatarTimeoutId) {
      clearTimeout(avatarTimeoutId);
    }

    // 1. 获取未选中卡片列表，维持原有的 DOM 顺序
    const remainingIndices = [];
    avatarCards.forEach((_, idx) => {
      if (idx !== activeIndex) {
        remainingIndices.push(idx);
      }
    });

    // 2. 确定每一个卡牌相对于激活中心卡牌的“目标视觉相对排位” (targetRel)
    // 激活卡片目标排位永远是 0 (正中心)
    // 未选中卡片中，前 2 个分在左侧 (排位 -2, -1)，后 2 个分在右侧 (排位 1, 2)
    // 这样无论选中哪个卡片，两侧的卡片数量永远是完美均分的 2 和 2！
    const targetRels = new Array(avatarCards.length);
    targetRels[activeIndex] = 0;
    targetRels[remainingIndices[0]] = -2;
    targetRels[remainingIndices[1]] = -1;
    targetRels[remainingIndices[2]] = 1;
    targetRels[remainingIndices[3]] = 2;

    avatarCards.forEach((c, idx) => {
      const targetRel = targetRels[idx];
      const relIdx = idx - activeIndex; // 原始 DOM 相对偏移
      const dist = Math.abs(targetRel); // 视觉相对中心距离

      // 【阶段 1】立即拨开卡片：在视觉目标间距 (targetRel * 60) 的基础上，额外推开一个短暂的物理安全缝隙
      let spreadOffset;
      if (targetRel < 0) {
        spreadOffset = (targetRel - relIdx) * 60 - 30; // 左侧卡片额外往左推开 30px
        c.style.zIndex = 10 - dist * 2; // 对称层级，越靠近中心越高，层叠堆盖极其自然
      } else if (targetRel > 0) {
        spreadOffset = (targetRel - relIdx) * 60 + 30; // 右侧卡片额外往右推开 30px
        c.style.zIndex = 10 - dist * 2;
      } else {
        spreadOffset = 0; // 选中卡片保持在正中
        c.style.zIndex = 10; // 最顶层置顶
      }

      c.style.setProperty('--spread-offset', `${spreadOffset}px`);
      // 彻底废除不自然的 Y 轴落差！其余卡片平整贴在基准线上 (0px)，仅激活卡片向上浮起飞升 -24px
      c.style.setProperty('--card-y', idx === activeIndex ? '-24px' : '0px');
    });

    // 【阶段 2】在动画中段 (220ms)，拨开的卡片平滑收回至紧密排列位置，并注入随机偏转角和光学层叠深度
    avatarTimeoutId = setTimeout(() => {
      avatarCards.forEach((c, idx) => {
        const targetRel = targetRels[idx];
        const relIdx = idx - activeIndex;
        const dist = Math.abs(targetRel);

        if (idx !== activeIndex) {
          // 精确收敛到 60px 中心距，视觉上完美均分左右两侧
          const spreadOffset = (targetRel - relIdx) * 60;
          c.style.setProperty('--spread-offset', `${spreadOffset}px`);
          c.style.setProperty('--card-y', '0px'); // 保持自然平整的高度
          
          // 每次叠牌收回随机旋转 [-4deg, 4deg]，呈现最真实的纸张松散手作叠放
          const randomRot = (Math.random() * 8 - 4).toFixed(1);
          c.style.setProperty('--card-rot', `${randomRot}deg`);
          
          // 大气光学体积淡化：距离激活中心越远，卡片亮度与对比度温和衰减，呈现出三维阴影遮蔽的层次感
          c.style.filter = `brightness(${1 - dist * 0.08}) contrast(${1 - dist * 0.04})`;
          c.style.opacity = `${1 - dist * 0.05}`;
        } else {
          // 激活项高飞在最上层中心
          c.style.setProperty('--spread-offset', '0px');
          c.style.setProperty('--card-y', '-24px');
          c.style.setProperty('--card-rot', '0.8deg');
          c.style.filter = 'none';
          c.style.opacity = '1';
        }
      });
    }, 220);

    // 计算中心对齐位移：卡牌宽度 130px 且两侧外边距为 -35px (重叠 70px)，因此中心间距精确为 60px (130 - 70)
    // 配合上面的 targetRel 物理偏移，使被选中卡牌在行进中完美居中对齐，且左右各 2 张对称分布
    const offset = (2 - activeIndex) * 60;
    avatarRow.style.transform = `translateX(${offset}px)`;
  }

  avatarCards.forEach(card => {
    card.addEventListener('click', () => {
      avatarCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const index = parseInt(card.getAttribute('data-index'));
      updateAvatarLayout(index);
    });
  });

  // 初始化调用一次，建立纸牌堆叠布局
  updateAvatarLayout(2);


  // ==========================================
  // 4. 机能旋钮事件处理 (Synthesizer Knobs)
  // ==========================================
  const dials = document.querySelectorAll('.dial-item');

  dials.forEach(dial => {
    const container = dial.querySelector('.dial-container');
    const svg = dial.querySelector('.dial-svg');
    const fillCircle = dial.querySelector('.dial-fill-circle');
    const pointerLine = dial.querySelector('.dial-pointer-line');
    const readout = dial.querySelector('.dial-readout');

    const min = parseFloat(dial.getAttribute('data-min'));
    const max = parseFloat(dial.getAttribute('data-max'));
    const initialVal = parseFloat(dial.getAttribute('data-value'));
    const unit = dial.getAttribute('data-unit');

    // 圆周率常量
    const r = 40;
    const circumference = 2 * Math.PI * r; // ~251.3
    // 我们设定旋钮的旋转物理有效角度为 -135deg 到 +135deg (共270度，底部留有90度缺口)
    const minAngle = -135;
    const maxAngle = 135;
    const angleRange = maxAngle - minAngle;

    let currentValue = initialVal;
    let isDragging = false;
    let prevRawAngle = null;

    // 根据数值渲染旋钮状态
    function renderDial(value) {
      // 限制边界
      value = Math.max(min, Math.min(max, value));
      currentValue = value;

      // 映射到百分比
      const percent = (value - min) / (max - min);
      
      // 映射到角度
      const angle = minAngle + percent * angleRange;
      
      // 旋转SVG内部的指针线
      pointerLine.style.transform = `rotate(${angle}deg)`;
      
      // 渲染圆弧填充度 (物理角度占比: 270度 = 3/4 圆周)
      const fillPercent = percent * 0.75;
      const strokeOffset = circumference * (1 - fillPercent);
      fillCircle.style.strokeDashoffset = strokeOffset;
      
      // 旋转弧线起点至物理最小角度处 (7:30方向)
      fillCircle.style.transform = `rotate(${minAngle - 90}deg)`;

      // 更新HUD读数
      readout.textContent = `${value.toFixed(value >= 100 ? 1 : 2)} ${unit}`;
    }

    // 初始化渲染
    fillCircle.style.strokeDasharray = circumference;
    renderDial(initialVal);

    // 拖拽角度计算核心逻辑
    function handleDrag(clientX, clientY) {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;

      let rawAngle = Math.atan2(dx, -dy) * (180 / Math.PI);

      // 解除 ±180° 的不连续性，避免鼠标越过底部时数值从最大值跳变到最小值
      if (prevRawAngle !== null) {
        let diff = rawAngle - prevRawAngle;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        rawAngle = prevRawAngle + diff;
      }
      prevRawAngle = rawAngle;

      // 将角度限制在旋钮物理范围内 [-135, 135]
      let angle = Math.max(minAngle, Math.min(maxAngle, rawAngle));

      const percent = (angle - minAngle) / angleRange;
      const value = min + percent * (max - min);

      renderDial(value);
    }

    // 鼠标事件绑定
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevRawAngle = null;
      document.body.style.cursor = 'grabbing';
      svg.style.cursor = 'grabbing';
      handleDrag(e.clientX, e.clientY);
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      handleDrag(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = 'default';
        svg.style.cursor = 'grab';
      }
    });

    // 移动端触摸事件支持
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      prevRawAngle = null;
      const touch = e.touches[0];
      handleDrag(touch.clientX, touch.clientY);
      e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      handleDrag(touch.clientX, touch.clientY);
    });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

  });

  // ==========================================
  // 4. 长条形滑块交互 (Linear Range Sliders - 蜡笔排线高亮进度填充)
  // ==========================================
  const inputVolume = document.getElementById('input-volume');
  const valVolume = document.getElementById('val-volume');
  const inputSpeed = document.getElementById('input-speed');
  const valSpeed = document.getElementById('val-speed');

  function updateSliderFill(input) {
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const val = parseFloat(input.value) || 0;
    const percent = ((val - min) / (max - min)) * 100;
    input.style.setProperty('--value-percent', `${percent}%`);
  }

  // 初始化所有滑块
  document.querySelectorAll('.sketchbook-slider').forEach(input => {
    updateSliderFill(input);
  });

  if (inputVolume && valVolume) {
    inputVolume.addEventListener('input', (e) => {
      valVolume.textContent = parseFloat(e.target.value).toFixed(1);
      updateSliderFill(e.target);
    });
  }

  if (inputSpeed && valSpeed) {
    inputSpeed.addEventListener('input', (e) => {
      const speedVal = parseFloat(e.target.value).toFixed(1);
      valSpeed.textContent = `x${speedVal}`;
      updateSliderFill(e.target);
    });
  }

});
