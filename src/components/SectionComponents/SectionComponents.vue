<template>
  <section class="section-components">
    <SectionHeader
      :title="copy.components.title"
      :bracket="copy.components.bracket"
      :note="copy.components.note"
    />
    <div class="components-grid">
      <!-- Card A: Synthesizer Dials -->
      <ComponentCard :title="copy.components.cardATitle">
        <div :class="['handwritten-note', 'card-note', copy.hero.handwrittenClass]">{{ copy.components.cardANote }}</div>
        <div class="dials-row">
          <DialKnob dial-id="dial-freq" :label="copy.components.freqLabel" :min="20" :max="2000" :initial="440" unit="Hz" />
          <DialKnob dial-id="dial-resonance" :label="copy.components.resoLabel" :min="0" :max="100" :initial="65" unit="%" />
          <DialKnob dial-id="dial-gain" :label="copy.components.gainLabel" :min="0" :max="12" :initial="4.5" unit="dB" />
        </div>
        <EqVisualizer />
        <ToySliders />
      </ComponentCard>

      <!-- Card B: Interactive Doodles -->
      <ComponentCard :title="copy.components.cardBTitle">
        <div :class="['handwritten-note', 'card-note', copy.hero.handwrittenClass]">{{ copy.components.cardBNote }}</div>
        <div class="control-row">
          <CrayonButton @click="onCrayonClick" />
          <StickerButton @click="onStickerClick" />
        </div>
        <TechInput
          :coord-tag="copy.components.coordTag"
          :placeholder="copy.components.placeholder"
          :model-value="spell"
          @update:model-value="spell = $event"
        />
        <AlertStrip
          :title="copy.components.alertTitle"
          :description="copy.components.alertDescription"
        />
        <div class="control-row">
          <button class="btn btn-drawer-open font-tech" @click="drawerOpen = true">
            {{ copy.drawer.openDrawer }}
          </button>
        </div>
      </ComponentCard>
    </div>

    <Drawer v-model="drawerOpen" :title="copy.drawer.drawerTitle">
      <div class="drawer-section">
        <div class="drawer-section-label font-tech">{{ copy.drawer.dateLabel }}</div>
        <DatePicker v-model="selectedDate" />
      </div>
      <div class="drawer-section">
        <div class="drawer-section-label font-tech">{{ copy.drawer.tableLabel }}</div>
        <Table :columns="tableColumns" :data="tableData" />
      </div>
      <div class="drawer-section">
        <div class="drawer-section-label font-tech">{{ copy.drawer.colorLabel }}</div>
        <ColorPicker v-model="selectedColor" />
      </div>
    </Drawer>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeCopy } from '../../composables'
import SectionHeader from '../SectionCards/SectionHeader.vue'
import ComponentCard from './ComponentCard.vue'
import DialKnob from './DialKnob.vue'
import EqVisualizer from './EqVisualizer.vue'
import ToySliders from './ToySliders.vue'
import CrayonButton from './CrayonButton.vue'
import StickerButton from './StickerButton.vue'
import TechInput from './TechInput.vue'
import AlertStrip from './AlertStrip.vue'
import Drawer from '../Drawer/Drawer.vue'
import DatePicker from '../DatePicker/DatePicker.vue'
import Table from '../Table/Table.vue'
import ColorPicker from '../ColorPicker/ColorPicker.vue'
import type { TableColumn } from '../../types'

const { copy } = useThemeCopy()

const spell = ref(copy.value.components.spell)
const drawerOpen = ref(false)
const selectedDate = ref('')
const selectedColor = ref('#c85a5a')

const tableColumns: TableColumn[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'NAME' },
  { key: 'type', label: 'TYPE' },
  { key: 'power', label: 'POWER' },
]

const tableData = [
  { id: 'A01', name: 'Cirno', type: 'Ice Fairy', power: '❄️❄️❄️❄️❄️' },
  { id: 'A02', name: 'Daiyosei', type: 'Fairies', power: '✿✿✿✿' },
  { id: 'A03', name: 'Sunny Milk', type: 'Light', power: '☀️☀️☀️' },
  { id: 'A04', name: 'Luna Child', type: 'Moon', power: '🌙🌙🌙' },
  { id: 'A05', name: 'Star Sapphire', type: 'Star', power: '⭐️⭐️⭐️' },
]

function onCrayonClick() {
  console.log('Crayon button clicked!')
}

function onStickerClick() {
  console.log('Sticker button clicked!')
}
</script>

<style scoped>
.section-components {
  position: relative;
}
.section-components::before {
  content: '03';
  position: absolute;
  top: -15px;
  right: 30px;
  font-size: 110px;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--border-alpha);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
  user-select: none;
}
.components-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}
.control-row {
  display: flex;
  gap: 16px;
}
.btn-drawer-open {
  width: 100%;
  background: none;
  border: 2.5px dashed var(--card-border);
  color: var(--text-primary);
  padding: 12px 20px;
  font-size: 10px;
  cursor: pointer;
  border-radius: 12px 225px 8px 215px / 215px 8px 225px 12px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.btn-drawer-open:hover {
  border-color: var(--accent-orange);
  border-style: solid;
  color: var(--accent-orange);
  transform: scale(1.03) rotate(-1deg);
  background-color: var(--border-alpha);
}
.drawer-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.drawer-section-label {
  font-size: 9px;
  color: var(--text-gray);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-bottom: 4px;
  border-bottom: 1px dashed var(--border-alpha);
}
</style>