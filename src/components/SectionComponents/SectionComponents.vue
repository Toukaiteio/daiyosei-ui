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
        <Select
          v-model="drawerPlacement"
          label="DRAWER PLACEMENT"
          :options="drawerPlacementOptions"
        />
      </ComponentCard>

      <ComponentCard title="COMMON UI KIT / PLAYGROUND PREVIEW">
        <div :class="['handwritten-note', 'card-note', copy.hero.handwrittenClass]">
          reusable package components preview
        </div>

        <div class="kit-row">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="warning" icon="⚠" @click="showTypedToast('warning')">Warning</Button>
          <Button variant="alert" icon="⛔" @click="showTypedToast('error')">Alert</Button>
          <Button variant="success" icon="✅" @click="showTypedToast('success')">Success</Button>
          <Button variant="primary" icon="⭐" @click="demoModalOpen = true">Open Dialog</Button>
          <Button variant="secondary" icon-class="fa-solid fa-music">Icon Class</Button>
          <Button variant="secondary" icon-text="favorite">Icon Text</Button>
        </div>

        <Input v-model="demoInput" label="PROJECT TITLE" prefix="ID_A01" placeholder="Type title..." />

        <Select
          v-model="demoSelect"
          label="MODE SELECTOR"
          :options="[
            { label: 'Normal', value: 'normal' },
            { label: 'Focus', value: 'focus' },
            { label: 'Draft', value: 'draft' }
          ]"
        />

        <Textarea
          v-model="demoTextarea"
          label="NOTES"
          note-tone="pink"
          text-color="#2b1f2f"
          placeholder-color="rgba(43, 31, 47, 0.5)"
          :rows="3"
          placeholder="Write sketch notes..."
        />

        <div class="kit-row kit-row--split">
          <Switch v-model="demoSwitch" label="Enable Overlay" />
          <Badge :variant="demoSwitch ? 'success' : 'warning'">
            {{ demoSwitch ? 'overlay on' : 'overlay off' }}
          </Badge>
        </div>

        <Tabs v-model="demoTab" :items="tabItems">
          <div class="tab-preview font-tech">
            current tab: {{ demoTab }}
          </div>
        </Tabs>

        <div class="kit-row kit-row--split">
          <Button variant="secondary" @click="showTypedToast('info')">Info Toast</Button>
          <Toast v-model="demoToastOpen" :message="demoToastMessage" :variant="demoToastType" />
        </div>

        <Modal v-model="demoModalOpen" title="Sketchbook Dialog">
          <div class="dialog-content font-handwritten">
            This is the project dialog component, triggered by button click.
          </div>
        </Modal>
      </ComponentCard>

      <ComponentCard title="MENU / UPLOAD PRESETS">
        <div :class="['handwritten-note', 'card-note', copy.hero.handwrittenClass]">
          advanced interaction presets
        </div>

        <Menu>
          <SubMenu title="Project Files" :default-open="true">
            <div class="menu-item">chapter-01.md</div>
            <div class="menu-item">chapter-02.md</div>
            <SubMenu title="Archive" :default-open="true">
              <div class="menu-item">chapter-00.md</div>
              <div class="menu-item">draft-old.md</div>
            </SubMenu>
          </SubMenu>
          <SubMenu title="Assets">
            <div class="menu-item">character.png</div>
            <div class="menu-item">bg_grid.svg</div>
            <SubMenu title="Icons">
              <div class="menu-item">alert.svg</div>
              <div class="menu-item">bookmark.svg</div>
            </SubMenu>
          </SubMenu>
        </Menu>

        <FileUpload label="ASSET UPLOADER" multiple @change="onFilesChanged" />
      </ComponentCard>

      <ComponentCard title="MEDIA / LIST / FILTER PRESETS">
        <div :class="['handwritten-note', 'card-note', copy.hero.handwrittenClass]">
          lazy image cards, infinite list and filter controls
        </div>

        <div class="kit-row">
          <Tag>default</Tag>
          <Tag variant="success">success</Tag>
          <Tag variant="warning">warning</Tag>
          <Tag variant="alert">alert</Tag>
        </div>

        <Filter v-model="demoFilter" :options="filterOptions" />

        <div class="media-grid">
          <ImageCard
            v-for="item in filteredPhotos"
            :key="`img-${item.id}`"
            :title="item.title"
            :src="item.src"
            lazy
          />
        </div>

        <InfiniteScroll
          class="infinite-wrap"
          :items="visibleSketchCards"
          :has-more="hasMoreSketchCards"
          :loading="isLoadingSketchCards"
          @load-more="loadMoreSketchCards"
        >
          <template #default="{ items }">
            <SketchbookPhotoCard
              v-for="item in items"
              :key="`sk-${item.id}`"
              :image-url="item.imageUrl"
              :signature="item.signature"
              :caption="item.caption"
              lazy
            />
          </template>
        </InfiniteScroll>

        <Pagination v-model="photoPage" :total-pages="totalPhotoPages" />
      </ComponentCard>

      <ComponentCard title="NAVIGATION PRESETS">
        <div :class="['handwritten-note', 'card-note', copy.hero.handwrittenClass]">
          standalone header + side navigation components
        </div>

        <HeaderNav v-model="demoHeaderNav" />

        <div class="nav-preview-row">
          <SideNav v-model="demoSideNav" />
          <div class="nav-preview-panel font-tech">
            <div>header: {{ demoHeaderNav }}</div>
            <div>side: {{ demoSideNav }}</div>
          </div>
        </div>
      </ComponentCard>
    </div>

    <Drawer v-model="drawerOpen" :title="copy.drawer.drawerTitle" :placement="drawerPlacement">
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
import { computed, ref, watch } from 'vue'
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
import Button from '../Button/Button.vue'
import Input from '../Input/Input.vue'
import Select from '../Select/Select.vue'
import Textarea from '../Textarea/Textarea.vue'
import Switch from '../Switch/Switch.vue'
import Tabs from '../Tabs/Tabs.vue'
import Toast from '../Toast/Toast.vue'
import Badge from '../Badge/Badge.vue'
import Modal from '../Modal/Modal.vue'
import Menu from '../Menu/Menu.vue'
import SubMenu from '../SubMenu/SubMenu.vue'
import FileUpload from '../FileUpload/FileUpload.vue'
import SketchbookPhotoCard from '../SketchbookPhotoCard/SketchbookPhotoCard.vue'
import ImageCard from '../ImageCard/ImageCard.vue'
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll.vue'
import Tag from '../Tag/Tag.vue'
import Pagination from '../Pagination/Pagination.vue'
import Filter from '../Filter/Filter.vue'
import HeaderNav from '../HeaderNav/HeaderNav.vue'
import SideNav from '../SideNav/SideNav.vue'
import type { TableColumn } from '../../types'

const { copy } = useThemeCopy()

const spell = ref(copy.value.components.spell)
const drawerOpen = ref(false)
const selectedDate = ref('')
const selectedColor = ref('#c85a5a')
const demoInput = ref('Daiyosei UI Kit')
const demoSelect = ref('normal')
const demoTextarea = ref('Use hand-drawn borders and warm paper textures.')
const demoSwitch = ref(true)
const demoTab = ref('overview')
const demoToastOpen = ref(false)
const demoToastType = ref<'info' | 'success' | 'warning' | 'error'>('info')
const demoToastMessage = ref('Saved into sketchbook.')
const demoModalOpen = ref(false)
const drawerPlacement = ref<'left' | 'right' | 'top' | 'bottom'>('right')
const demoFilter = ref('all')
const photoPage = ref(1)
const isLoadingSketchCards = ref(false)
const demoHeaderNav = ref('overview')
const demoSideNav = ref('dashboard')

type DemoPhoto = {
  id: number
  title: string
  group: 'portrait' | 'night' | 'garden'
  src: string
}

type DemoSketch = {
  id: number
  imageUrl: string
  signature: string
  caption: string
}

const tabItems = [
  { label: 'Overview', value: 'overview' },
  { label: 'Tokens', value: 'tokens' },
  { label: 'Usage', value: 'usage' },
]

const drawerPlacementOptions = [
  { label: 'Right', value: 'right' },
  { label: 'Left', value: 'left' },
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
]

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Portrait', value: 'portrait' },
  { label: 'Night', value: 'night' },
  { label: 'Garden', value: 'garden' },
]

const allPhotos: DemoPhoto[] = [
  { id: 1, title: 'Moon Draft', group: 'night', src: '/images/daiyosei-cirno.jpeg' },
  { id: 2, title: 'Garden Light', group: 'garden', src: '/images/daiyosei-cirno.jpeg' },
  { id: 3, title: 'Soft Portrait', group: 'portrait', src: '/images/daiyosei-cirno.jpeg' },
  { id: 4, title: 'Starlight Memo', group: 'night', src: '/images/daiyosei-cirno.jpeg' },
  { id: 5, title: 'Petals Archive', group: 'garden', src: '/images/daiyosei-cirno.jpeg' },
  { id: 6, title: 'Side Profile', group: 'portrait', src: '/images/daiyosei-cirno.jpeg' },
  { id: 7, title: 'Dusk Draft', group: 'night', src: '/images/daiyosei-cirno.jpeg' },
  { id: 8, title: 'Garden Notes', group: 'garden', src: '/images/daiyosei-cirno.jpeg' },
]

const allSketchCards: DemoSketch[] = [
  { id: 1, imageUrl: '/images/daiyosei-cirno.jpeg', signature: 'Daiyosei // Night', caption: 'night sketch 01' },
  { id: 2, imageUrl: '/images/daiyosei-cirno.jpeg', signature: 'Daiyosei // Garden', caption: 'garden sketch 02' },
  { id: 3, imageUrl: '/images/daiyosei-cirno.jpeg', signature: 'Daiyosei // Portrait', caption: 'portrait sketch 03' },
  { id: 4, imageUrl: '/images/daiyosei-cirno.jpeg', signature: 'Daiyosei // Draft', caption: 'draft sketch 04' },
  { id: 5, imageUrl: '/images/daiyosei-cirno.jpeg', signature: 'Daiyosei // Archive', caption: 'archive sketch 05' },
  { id: 6, imageUrl: '/images/daiyosei-cirno.jpeg', signature: 'Daiyosei // Album', caption: 'album sketch 06' },
]

const PAGE_SIZE = 4
const SKETCH_BATCH_SIZE = 2
const visibleSketchCount = ref(SKETCH_BATCH_SIZE)

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

function onFilesChanged(files: File[]) {
  console.log('Uploaded files:', files.map((file) => file.name))
}

function showTypedToast(type: 'info' | 'success' | 'warning' | 'error') {
  demoToastType.value = type
  demoToastMessage.value = {
    info: 'General note saved.',
    success: 'Operation succeeded.',
    warning: 'Please review this action.',
    error: 'Alert: action failed.',
  }[type]
  demoToastOpen.value = true
}

const filteredPhotos = computed(() => {
  const scoped = demoFilter.value === 'all'
    ? allPhotos
    : allPhotos.filter((photo) => photo.group === demoFilter.value)
  const max = photoPage.value * PAGE_SIZE
  return scoped.slice(0, max)
})

const totalPhotoPages = computed(() => {
  const total = demoFilter.value === 'all'
    ? allPhotos.length
    : allPhotos.filter((photo) => photo.group === demoFilter.value).length
  return Math.max(1, Math.ceil(total / PAGE_SIZE))
})

const visibleSketchCards = computed(() => allSketchCards.slice(0, visibleSketchCount.value))
const hasMoreSketchCards = computed(() => visibleSketchCount.value < allSketchCards.length)

watch(demoFilter, () => {
  photoPage.value = 1
})

watch(totalPhotoPages, (maxPages) => {
  if (photoPage.value > maxPages) {
    photoPage.value = maxPages
  }
})

function loadMoreSketchCards() {
  if (!hasMoreSketchCards.value || isLoadingSketchCards.value) {
    return
  }
  isLoadingSketchCards.value = true
  window.setTimeout(() => {
    visibleSketchCount.value = Math.min(visibleSketchCount.value + SKETCH_BATCH_SIZE, allSketchCards.length)
    isLoadingSketchCards.value = false
  }, 250)
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
.dials-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  background-color: var(--border-alpha);
  border: 2px dashed var(--card-border);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 24px 18px;
  transform: rotate(-0.5deg) skewX(0.3deg);
}
.card-note {
  margin-top: -16px;
  margin-bottom: 2px;
  font-size: 16px;
  transform: rotate(-1.5deg);
  display: inline-block;
}
.control-row {
  display: flex;
  gap: 16px;
}
.kit-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.kit-row--split {
  justify-content: space-between;
  align-items: center;
}
.media-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.infinite-wrap {
  max-height: 360px;
  overflow: auto;
  padding-right: 4px;
}
.nav-preview-row {
  display: flex;
  gap: 14px;
  align-items: stretch;
}
.nav-preview-panel {
  flex: 1;
  border: 1px dashed var(--border-alpha);
  padding: 14px;
  font-size: 10px;
  color: var(--text-gray);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.tab-preview {
  font-size: 10px;
  color: var(--text-gray);
}
.menu-item {
  padding: 4px 0;
  color: var(--text-primary);
}
.dialog-content {
  font-size: 18px;
  color: var(--text-primary);
  line-height: 1.6;
  padding: 6px 2px;
}
.btn-drawer-open {
  width: 100%;
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--text-primary);
  padding: 14px 20px;
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 2px 3px 0px var(--border-alpha);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.btn-drawer-open:hover {
  background-color: var(--border-alpha);
  color: var(--text-primary);
  transform: scale(1.03) rotate(-1deg);
  border-style: solid;
}
.btn-drawer-open:active {
  background-color: var(--accent-orange);
  border-color: var(--accent-orange);
  color: var(--bg-primary);
  transform: scale(0.97) rotate(0deg);
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
