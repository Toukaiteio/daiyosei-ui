# Touhou School Sketchbook & Hand-drawn Graffiti Style
## 东方手绘涂鸦草稿本 / 活页随笔画册风格 - Web UI 级设计系统与实现规范

> **设计风格概述**  
> 本风格是一种颠覆了冰冷硬核数码屏幕，全面转向**“手绘涂鸦草稿本（Hand-drawn Sketchbook）”**与**“校园活页手记随笔画册”**的纯手作感性视觉流派。它以极具生活痕迹与艺术温度的手绘质感为核心，融合了**粗笔虚线铅笔排线**、**歪斜的 Washi-Tape 纸胶带贴纸**、**歪扭颤抖的手绘框线（CSS sketchy borders）**以及**全面铺开的 Architects & Cursive 随笔英文手写字体**。它将 Web 人机界面转化为一页真正从学生活页本中撕下来的草稿纸，每一处网格、每一条红辅助线、每一个歪扭按钮，都散发着充满手作温度与绘画情怀的素描册质感。

---

## 目录
1. [视觉设计语言与核心语法](#1-视觉设计语言与核心语法)
2. [配色系统规范](#2-配色系统规范)
3. [字体排印艺术 (Typography)](#3-字体排印艺术-typography)
4. [核心 UI 组件设计与 CSS 技巧](#4-核心-ui-组件设计与-css-技巧)
5. [动画与交互模型 (Motion & Interaction)](#5-动画与交互模型-motion--interaction)

---

## 1. 视觉设计语言与核心语法

这一风格之所以极具“艺术温度”和“日记私密感”，在于其彻底打破了几何秩序对界面的束缚，将界面拟物重构为一本写实的手绘画册。

### 核心设计元素 (The Sketchbook Grammar)
*   **活页纸横格/网格（Lined Notebook Paper）**：摒弃了硬冷的科学背景网格，替换为 `40px` 的活页本格子底纹，并在此基础上，于左侧拉出一条手绘虚线质感的**红色活页安全边界红线**，完美拟合一页被撕下来的活页纸页。
*   **和纸胶带手贴标（Washi-Tape Sticky Labels）**：导航与切换按钮（如侧边栏主题切替器）不再是冰冷的方块，而是重构为了被裁剪出锯齿边缘、微微倾斜粘贴、带有人工剪刀裁剪质感的**和纸胶带纸条（Washi-Tape）**，富有拼贴艺术感。
*   **歪扭颤抖的手绘线框（CSS Sketchy Borders）**：页面中所有的卡片面板、输入框、按钮等容器，全部废除了现代数学计算式的完美圆角与直线，通过特殊的 irregular 属性 `border-radius: 255px 15px 225px 15px/15px 225px 15px 255px` 构建了极具手绘温度的**歪扭草稿轮廓线**。
*   **铅笔阴影阴排线（Pencil Shaded Hashes）**：原先扁平实色块的均衡器音量柱，被重构为手绘铅笔素描排线（`border-left: 2.5px dashed var(--accent-orange)`）并微斜 `4deg`，完美重现了在铅笔画册上的打底阴影排线效果。
*   **全景手写字体（Architectural & Scribbled Fonts）**：所有的英文数值、标签、秒表、按钮文字全部统一使用手绘字体，让版面没有任何“数码印刷”的突兀感，彻底变为一本私密的个人速写手记。

---

## 2. 配色系统规范

本系统抛弃了沉闷粗糙的通用配色，转向**高度契合角色立绘的多态机能调色盘**。

### 1) 亮色模式：冰晶粉蓝主题 (Cirno Light - チルノ)
契合 `character_light.png`（冰之妖精・琪露诺）的莹亮质感：
*   █ `#E6F1FC` (Ice Blue) — 主背景色，浅淡通透的冰晶粉蓝，具有雪地的冰冷质感。
*   █ `#3F88D7` (Crystal Sky Blue) — 核心主题色，明亮的天蓝色，用于主要按钮与交互。
*   █ `#DB5757` (Coral Red) — 核心警示色，取自琪露诺立绘的红色领结，在冷色调中形成夺目的警示点缀。
*   █ `#1B2D42` (Steel Dark Blue) — 文本前景色，高对比度的极深钢蓝色，确立坚实的文字骨架。

### 2) 暗色模式：幽林翠夜主题 (Daiyosei Dark - 大妖精)
契合 `character.png`（森之大妖精）的深邃自然感：
*   █ `#07121B` (Teal Forest Night) — 主背景色，极深的幽绿夜色，比纯黑更具自然幽静感。
*   █ `#76C39E` (Mint Emerald) — 核心主题色，薄荷绿与翡翠绿，用于交互高亮和荧光网格。
*   █ `#DBC393` (Sandy Ribbon Gold) — 核心点缀色，取自大妖精柔和的金色蝴蝶结丝带，带来温润的暖意。
*   █ `#80EBF2` (Aquamarine Wing Glow) — 用于指示灯与微型刻度的荧光青蓝色。

### CSS 配色变量声明
```css
:root {
  /* CIRNO LIGHT 琪露诺冰晶粉蓝 (默认主题) */
  --bg-primary: #e6f1fc;
  --bg-secondary: #ffffff;
  --border-alpha: rgba(63, 136, 215, 0.25);
  --grid-color: rgba(63, 136, 215, 0.08);
  --card-bg: rgba(255, 255, 255, 0.72);
  --card-border: rgba(63, 136, 215, 0.2);
  --glow-color: rgba(63, 136, 215, 0.4);
  --text-primary: #1b2d42;
  --text-gray: #6b849e;
  
  --accent-orange: #db5757; /* 琪露诺珊瑚红 */
  --accent-yellow: #5285c5; /* 冰晶深钢蓝 */
  --bg-cobalt-blue: #3f88d7; /* 琪露诺天蓝色 */
  
  --collage-img: url('character_light.png');
}

.theme-dark {
  /* DAIYOSEI DARK 大妖精幽林翠夜 (暗色主题) */
  --bg-primary: #07121b;
  --bg-secondary: #0c1b26;
  --border-alpha: rgba(118, 195, 158, 0.25);
  --grid-color: rgba(118, 195, 158, 0.06);
  --card-bg: rgba(7, 18, 27, 0.85);
  --card-border: rgba(118, 195, 158, 0.15);
  --glow-color: rgba(128, 235, 242, 0.4);
  --text-primary: #f5f7f6;
  --text-gray: #7d909b;

  --accent-orange: #dbc393; /* 大妖精丝带柔金 */
  --accent-yellow: #80ebf2; /* 荧光青蓝 */
  --bg-cobalt-blue: #76c39e; /* 大妖精薄荷绿 */

  --collage-img: url('character.png');
}
```

---

## 3. 字体排印艺术 (Typography)

本风格的灵魂在于**双语字体的极端对比与三种字型的冲突碰撞**：

### 1) 主文本：古典 serif（宋体/明朝体）
*   **适用场景**：大标题、抒情文字、核心品牌词。
*   **视觉效果**：高反差、优雅、带有些许凄美感。
*   **推荐字体**：`Noto Serif SC`, `Playfair Display`, `Georgia`。

### 2) 技术文本：几何 Sans-serif / 等宽 Mono
*   **适用场景**：度量值、副标题、坐标、小提示、按钮标示。
*   **视觉效果**：严谨、科技感、机械工业风。
*   **推荐字体**：`JetBrains Mono`, `Outfit`, monospace。

### 3) 镂空背景饰字与手写边缘随笔 (Outlines & Handwritten Annotations)
*   **镂空超大字体 (Hollow Display Typography)**：作为非遮挡性的海报背景。字号介于 `12vw` - `15vw` 之间，采用透明填充色配合与主题自适应的超细 `1.5px` 半透明边框 (`-webkit-text-stroke: 1.5px var(--border-alpha)`)，营造强烈的空间层深。
*   **手写体草记 (Handwritten Notes)**：在版面的标题、卡片边缘、表盘一角，随意散落手写的钢笔随记。使用 `Caveat` 字体，赋予界面仿佛设计师日记本般的灵动与私密情感。

```css
/* CSS 字体类定义 */
.font-serif {
  font-family: "Playfair Display", "Noto Serif SC", "Georgia", serif;
  font-weight: 700;
}

.font-tech {
  font-family: "JetBrains Mono", "Space Grotesk", "Fira Code", monospace;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 11px;
}

.font-handwritten {
  font-family: 'Caveat', 'Architects Daughter', cursive;
  font-weight: 700;
}
```

---

## 4. 核心 UI 组件设计与 CSS 技巧

### 1) 胶片噪点背景 (Analog Film Grain)
利用 SVG 湍流滤镜（Turbulence Filter）与 CSS 混合模式，不需要加载任何外部大图，即可生成丝滑且动态流动的底层噪点。

#### HTML
```html
<svg class="noise-svg" style="display:none;">
  <filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
  </filter>
</svg>
<div class="grain-overlay"></div>
```

#### CSS
```css
.grain-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  opacity: 0.055;
  pointer-events: none;
  z-index: 9999;
  filter: url(#noiseFilter);
}
```

### 2) 图像非对称平行切片拼贴 (Sliced Collage Grid)
将单一图像转化为切片并在 Hover 时产生相反方向的微移，具有强烈的视觉张力。

#### HTML
```html
<div class="collage-container">
  <div class="slice" style="--i: 0;"></div>
  <div class="slice" style="--i: 1;"></div>
  <div class="slice" style="--i: 2;"></div>
</div>
```

#### CSS
```css
.collage-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 400px;
  height: 250px;
  cursor: pointer;
}

.slice {
  flex: 1;
  background-image: url('illustration.png');
  background-size: 400px 250px;
  background-repeat: no-repeat;
  /* 计算每一层切片对应的背景偏移量 */
  background-position: 0 calc(var(--i) * -80px);
  border: 1px solid #000;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s;
}

/* 悬停时：奇偶切片向相反方向微移，制造机械拉扯感 */
.collage-container:hover .slice:nth-child(odd) {
  transform: translateX(12px) skewX(-2deg);
  filter: hue-rotate(15deg) contrast(1.1);
}

.collage-container:hover .slice:nth-child(even) {
  transform: translateX(-12px) skewX(2deg);
  filter: hue-rotate(-15deg) contrast(1.1);
}
```

### 3) 机能旋钮 (Technical Synthesizer Dial)
用极简 of SVG 画出仪表盘圆环与指针，配合 JS 鼠标拖拽事件，打造完全交互式的“合成器”控制组件。

#### HTML
```html
<div class="dial-wrapper" id="cutoff-dial">
  <div class="dial-label font-tech">CUTOFF</div>
  <svg class="dial-svg" viewBox="0 0 100 100">
    <circle class="dial-track" cx="50" cy="50" r="40" />
    <circle class="dial-value" cx="50" cy="50" r="40" style="stroke-dasharray: 251; stroke-dashoffset: 80;" />
    <line class="dial-pointer" x1="50" y1="50" x2="50" y2="15" />
  </svg>
  <div class="dial-value-text font-tech">142.8 Hz</div>
</div>
```

#### CSS
```css
.dial-wrapper {
  text-align: center;
  width: 90px;
}
.dial-svg {
  width: 64px;
  height: 64px;
  cursor: grab;
}
.dial-track {
  fill: none;
  stroke: rgba(245, 245, 247, 0.1);
  stroke-width: 4;
}
.dial-value {
  fill: none;
  stroke: var(--primary-blue);
  stroke-width: 4;
  transform: rotate(-90deg);
  transform-origin: 50px 50px;
}
.dial-pointer {
  stroke: var(--accent-orange);
  stroke-width: 3;
  stroke-linecap: round;
  transform-origin: 50px 50px;
  transform: rotate(45deg);
}
```

---

## 5. 动画与交互模型 (Motion & Interaction)

本风格在完成艺术重构后，抛弃了廉价、僵硬的电子机能警报，转向**“沉静、纸面阻尼感、模拟漫反射呼吸”**的古典印物动态模型：

1.  **物理纸张阻尼感 (Tactile Page Damping)**:
    交互动效抛弃了高频机械瞬变，转向温润的慢速物理滑动。使用 **`cubic-bezier(0.25, 0.8, 0.25, 1)`**（平滑弹性减速曲线），在 `400ms` - `600ms` 内完成位移。当头像行滑动或按钮悬浮时，动画呈现极佳的阻尼物理滑移感。
2.  **印泥浸透反色 (Ink Inversion)**:
    按钮被 Hover 时，采用平滑的油墨吸附式反色：背景与文字前景色以 `300ms` 的时长温和过渡吸附（Invert），完美模拟铜版纸张吸收油墨时的浸透过程，绝无突兀感。
3.  **古典纸页呼吸与曝光微澜 (Analog Drift & Exposure Breath)**:
    彻底摒弃电子数码抖动与 RGB 霓虹色差。在 GLITCH 特效开启时，核心标题展现出**极其缓慢且柔和的印墨呼吸起伏**：通过温和调制 `opacity`（模拟纸页反射光线强弱）与 `letter-spacing`（模拟古典活字印刷排版的微小物理公差），带给观者一种富有情绪张力、安静而深沉的静默之美。
