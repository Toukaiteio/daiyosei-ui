import { computed } from 'vue'
import type { Theme } from '../types'
import { useTheme } from './useTheme'
import { useI18n, type Locale } from './useI18n'

export interface ThemeCopy {
  topNav: {
    left: string
  }
  sidebar: {
    brandTitle: string
    brandSub: string
    themeSelectorTitle: string
    effectsSelectorTitle: string
    effectsLabels: {
      grain: string
      scanlines: string
      glitch: string
    }
    hud: {
      signal: string
      frogs: string
      mood: string
      frogsUnit: string
      signalSuffix: string
      moodsList: string[]
    }
  }
  hero: {
    handwrittenClass: 'font-handwritten-jp' | 'font-handwritten-zh'
    note: string
    code: string
    title: string
    subtitle: string
    signature: string
    markers: string[]
    captionLeft: string
    captionRight: string
    progressLabel: string
    progressScale: string
  }
  cards: {
    title: string
    bracket: string
    note: string
    panelNote: string
    lyrics: string
  }
  components: {
    title: string
    bracket: string
    note: string
    cardATitle: string
    cardANote: string
    freqLabel: string
    resoLabel: string
    gainLabel: string
    cardBTitle: string
    cardBNote: string
    coordTag: string
    placeholder: string
    alertTitle: string
    alertDescription: string
    spell: string
  }
  drawer: {
    openDrawer: string
    drawerTitle: string
    dateLabel: string
    tableLabel: string
    colorLabel: string
  }
}

const themeCopy: Record<Theme, Record<Locale, ThemeCopy>> = {
  blue: {
    zh: {
      topNav: {
        left: "* cirno's ice notebook 📖",
      },
      sidebar: {
        brandTitle: '★ 琪露诺的冰绘本 ★',
        brandSub: '* snowflakes, stamps & mischief *',
        themeSelectorTitle: '风格色彩选择',
        effectsSelectorTitle: '纸张特效开关',
        effectsLabels: {
          grain: '纸质噪点 (PAPER GRAIN)',
          scanlines: '铅笔排线 (PENCIL GRID)',
          glitch: '涂鸦晃动 (GRAFFITI JIGGLE)',
        },
        hud: {
          signal: '❄️ 冰冻能量',
          frogs: '🐸 冻结存量',
          mood: '✏️ 琪露诺心情',
          frogsUnit: '只',
          signalSuffix: '最强状态 ❄️',
          moodsList: ['开心 ✿', '困了 zzz', '吃青蛙! 🐸', '生气! 💢', '得意 ❄️', '发呆...', '画画中 ✏️', '最强!!'],
        },
      },
      hero: {
        handwrittenClass: 'font-handwritten-zh',
        note: "* cirno's observation journal *",
        code: '( ❄️ *´◡` ) study_ref_01',
        title: '琪露诺的\n冰晶手帐',
        subtitle: '「今天的湖面也在闪闪发亮」',
        signature: 'Cirno // Lake',
        markers: ['* draft.09 *', '+ misty lake collection', 'no. 009 / ❄️'],
        captionLeft: '* photo.pasted_at = 2026.05.18 *',
        captionRight: '( ❄️ *´◡` ) sketch_ref',
        progressLabel: '冰霜能量条:',
        progressScale: '99.9% (最强!)',
      },
      cards: {
        title: 'SECTION 02: ICE STAMP ALBUM',
        bracket: '( ❄️ )',
        note: '能看出差别吗？',
        panelNote: '* pick the sharpest stamp',
        lyrics: '“ 今天也在结冰 ”',
      },
      components: {
        title: 'SECTION 03: ICE PLAYGROUND',
        bracket: '( ♫ )',
        note: 'frozen doodle calibration',
        cardATitle: 'MUSIC TOY DIALS',
        cardANote: '* spin the dials to make ice sparkles!',
        freqLabel: 'FREQ ❄️',
        resoLabel: 'RESO ✿',
        gainLabel: 'GAIN ♫',
        cardBTitle: 'INTERACTIVE DOODLES',
        cardBNote: '* click stamps to jingle!',
        coordTag: '( ❄️ *´◡` )',
        placeholder: 'write a winter spell...',
        alertTitle: 'ICE ENERGY',
        alertDescription: 'Cirno is polishing frozen marbles by Misty Lake right now! Do not disturb!',
        spell: '琪露诺是最强的小妖精 ❄️',
      },
      drawer: {
        openDrawer: '打开工具箱 ✿',
        drawerTitle: '* 琪露诺的工具箱 *',
        dateLabel: '❄️ 日期选择器',
        tableLabel: '❄️ 数据表格',
        colorLabel: '❄️ 颜色选择器',
      },
    },
    ja: {
      topNav: {
        left: "* チルノの氷のノート 📖",
      },
      sidebar: {
        brandTitle: '★ チルノの氷絵本 ★',
        brandSub: '* snowflakes, stamps & mischief *',
        themeSelectorTitle: 'スタイル配色選択',
        effectsSelectorTitle: '用紙エフェクトスイッチ',
        effectsLabels: {
          grain: '紙のノイズ (PAPER GRAIN)',
          scanlines: '鉛筆グリッド (PENCIL GRID)',
          glitch: '落書きの揺れ (GRAFFITI JIGGLE)',
        },
        hud: {
          signal: '❄️ 氷結エネルギー',
          frogs: '🐸 カエル氷漬け数',
          mood: '✏️ チルノのきげん',
          frogsUnit: '匹',
          signalSuffix: '最強状態 ❄️',
          moodsList: ['うれしい ✿', 'ねむい zzz', 'カエル食べる! 🐸', 'おこ! 💢', 'どや顔 ❄️', 'ぼーっと...', 'お絵描き中 ✏️', '最強!!'],
        },
      },
      hero: {
        handwrittenClass: 'font-handwritten-jp',
        note: "* チルノの観察日記 *",
        code: '( ❄️ *´◡` ) study_ref_01',
        title: 'チルノの\n氷晶手帳',
        subtitle: '「今日の湖面もキラキラ輝いてる」',
        signature: 'Cirno // Lake',
        markers: ['* draft.09 *', '+ misty lake collection', 'no. 009 / ❄️'],
        captionLeft: '* photo.pasted_at = 2026.05.18 *',
        captionRight: '( ❄️ *´◡` ) sketch_ref',
        progressLabel: '氷結ゲージ:',
        progressScale: '99.9% (あたい最強!)',
      },
      cards: {
        title: 'SECTION 02: ICE STAMP ALBUM',
        bracket: '( ❄️ )',
        note: '違いが分かるかしら？',
        panelNote: '* pick the sharpest stamp',
        lyrics: '“ 今日も凍りついている ”',
      },
      components: {
        title: 'SECTION 03: ICE PLAYGROUND',
        bracket: '( ♫ )',
        note: 'frozen doodle calibration',
        cardATitle: 'MUSIC TOY DIALS',
        cardANote: '* spin the dials to make ice sparkles!',
        freqLabel: 'FREQ ❄️',
        resoLabel: 'RESO ✿',
        gainLabel: 'GAIN ♫',
        cardBTitle: 'INTERACTIVE DOODLES',
        cardBNote: '* click stamps to jingle!',
        coordTag: '( ❄️ *´◡` )',
        placeholder: '冬の呪文を書いてね...',
        alertTitle: 'ICE ENERGY',
        alertDescription: 'Cirno is polishing frozen marbles by Misty Lake right now! Do not disturb!',
        spell: 'チルノはあたい最強の妖精 ❄️',
      },
      drawer: {
        openDrawer: '工具箱を開く ✿',
        drawerTitle: '* チルノの工具箱 *',
        dateLabel: '❄️ 日付選択',
        tableLabel: '❄️ データ表',
        colorLabel: '❄️ 色選択',
      },
    },
  },
  dark: {
    zh: {
      topNav: {
        left: "* daiyosei's garden notebook 📖",
      },
      sidebar: {
        brandTitle: '★ 大妖精的花园手帐 ★',
        brandSub: '* petals, tape & quiet light *',
        themeSelectorTitle: '风格色彩选择',
        effectsSelectorTitle: '纸张特效开关',
        effectsLabels: {
          grain: '纸质噪点 (PAPER GRAIN)',
          scanlines: '铅笔排线 (PENCIL GRID)',
          glitch: '涂鸦晃动 (GRAFFITI JIGGLE)',
        },
        hud: {
          signal: '🌿 守护能量',
          frogs: '✿ 花园存量',
          mood: '✏️ 大妖精心情',
          frogsUnit: '只',
          signalSuffix: '守护中 🌿',
          moodsList: ['开心 ✿', '困了 zzz', '散步中 🐾', '害羞! ✿', '静静 🌿', '发呆...', '浇花中 ✿', '温柔!!'],
        },
      },
      hero: {
        handwrittenClass: 'font-handwritten-zh',
        note: "* daiyosei's quiet scrapbook *",
        code: '( ✿ *´◡` ) study_ref_02',
        title: '大妖精的\n温柔手帐',
        subtitle: '「把今天的风，也一并收进来」',
        signature: 'Daiyosei // Garden',
        markers: ['* draft.18 *', '+ misty lake garden', 'no. 018 / ✿'],
        captionLeft: '* photo.pasted_at = 2026.05.18 *',
        captionRight: '( ✿ *´◡` ) sketch_ref',
        progressLabel: '守护能量条:',
        progressScale: '99.9% (守护中)',
      },
      cards: {
        title: 'SECTION 02: GARDEN STAMP ALBUM',
        bracket: '( ✿ )',
        note: '能看见差别吗？',
        panelNote: '* choose the softer subject',
        lyrics: '“ 今天也没问题 ”',
      },
      components: {
        title: 'SECTION 03: FAIRY WORKSHOP',
        bracket: '( ✿ )',
        note: 'gentle doodle calibration',
        cardATitle: 'MUSIC TOY DIALS',
        cardANote: '* turn the dials to grow tiny lights!',
        freqLabel: 'FREQ ✿',
        resoLabel: 'RESO ☁',
        gainLabel: 'GAIN ♫',
        cardBTitle: 'INTERACTIVE DOODLES',
        cardBNote: '* tap stamps to shuffle petals!',
        coordTag: '( ✿´◡` )',
        placeholder: 'write a gentle blessing...',
        alertTitle: 'GARDEN ENERGY',
        alertDescription: 'Daiyosei is tidying the lakeside lanterns right now! Please wait a moment.',
        spell: '大妖精正在把温柔收好 ✿',
      },
      drawer: {
        openDrawer: '打开工具箱 ✿',
        drawerTitle: '* 大妖精的工具箱 *',
        dateLabel: '✿ 日期选择器',
        tableLabel: '✿ 数据表格',
        colorLabel: '✿ 颜色选择器',
      },
    },
    ja: {
      topNav: {
        left: "* 大妖精のガーデニングノート 📖",
      },
      sidebar: {
        brandTitle: '★ 大妖精のガーデン手帳 ★',
        brandSub: '* petals, tape & quiet light *',
        themeSelectorTitle: 'スタイル配色選択',
        effectsSelectorTitle: '用紙エフェクトスイッチ',
        effectsLabels: {
          grain: '紙のノイズ (PAPER GRAIN)',
          scanlines: '鉛筆グリッド (PENCIL GRID)',
          glitch: '落書きの揺れ (GRAFFITI JIGGLE)',
        },
        hud: {
          signal: '🌿 加護エネルギー',
          frogs: '✿ ガーデン在庫',
          mood: '✏️ 大妖精のきげん',
          frogsUnit: '個',
          signalSuffix: '見守り中 🌿',
          moodsList: ['うれしい ✿', 'ねむい zzz', 'お散歩中 🐾', 'てれる! ✿', 'のんびり 🌿', 'ぼーっと...', '水やり中 ✿', 'おっとり!!'],
        },
      },
      hero: {
        handwrittenClass: 'font-handwritten-jp',
        note: "* 大妖精の静かなスクラップブック *",
        code: '( ✿ *´◡` ) study_ref_02',
        title: '大妖精の\n優しい手帳',
        subtitle: '「今日の風も、一緒に閉じ込めて」',
        signature: 'Daiyosei // Garden',
        markers: ['* draft.18 *', '+ misty lake garden', 'no. 018 / ✿'],
        captionLeft: '* photo.pasted_at = 2026.05.18 *',
        captionRight: '( ✿ *´◡` ) sketch_ref',
        progressLabel: '守護ゲージ:',
        progressScale: '99.9% (見守り中)',
      },
      cards: {
        title: 'SECTION 02: GARDEN STAMP ALBUM',
        bracket: '( ✿ )',
        note: '違いが見えるかしら？',
        panelNote: '* choose the softer subject',
        lyrics: '“ 今日も大丈夫 ”',
      },
      components: {
        title: 'SECTION 03: FAIRY WORKSHOP',
        bracket: '( ✿ )',
        note: 'gentle doodle calibration',
        cardATitle: 'MUSIC TOY DIALS',
        cardANote: '* turn the dials to grow tiny lights!',
        freqLabel: 'FREQ ✿',
        resoLabel: 'RESO ☁',
        gainLabel: 'GAIN ♫',
        cardBTitle: 'INTERACTIVE DOODLES',
        cardBNote: '* tap stamps to shuffle petals!',
        coordTag: '( ✿´◡` )',
        placeholder: '優しい祈りを書いてね...',
        alertTitle: 'GARDEN ENERGY',
        alertDescription: 'Daiyosei is tidying the lakeside lanterns right now! Please wait a moment.',
        spell: '大妖精は優しさをしまっている ✿',
      },
      drawer: {
        openDrawer: '工具箱を開く ✿',
        drawerTitle: '* 大妖精の工具箱 *',
        dateLabel: '✿ 日付選択',
        tableLabel: '✿ データ表',
        colorLabel: '✿ 色選択',
      },
    },
  },
}

export function useThemeCopy() {
  const { currentTheme } = useTheme()
  const { currentLocale } = useI18n()
  
  const copy = computed(() => themeCopy[currentTheme.value][currentLocale.value])

  return {
    currentTheme,
    currentLocale,
    copy,
  }
}
