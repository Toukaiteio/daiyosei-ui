<template>
  <div class="datepicker font-tech">
    <div class="datepicker-header">
      <button class="datepicker-nav" @click="prevMonth">‹</button>
      <span class="datepicker-month">{{ year }}.{{ String(month).padStart(2, '0') }}</span>
      <button class="datepicker-nav" @click="nextMonth">›</button>
    </div>
    <div class="datepicker-weekdays">
      <span v-for="d in weekdays" :key="d" class="datepicker-weekday">{{ d }}</span>
    </div>
    <div class="datepicker-grid">
      <span
        v-for="(day, i) in days"
        :key="i"
        class="datepicker-day"
        :class="{
          'datepicker-day--empty': !day,
          'datepicker-day--today': day && isToday(year, month, day),
          'datepicker-day--selected': day && isSelected(year, month, day),
          'datepicker-day--outside': day && !isCurrentMonth(day, i)
        }"
        @click="day && selectDate(day)"
      >{{ day || '' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const now = new Date()
const year = ref(now.getFullYear())
const month = ref(now.getMonth() + 1)

function daysInMonth(y: number, m: number) {
  return new Date(y, m, 0).getDate()
}

function firstDayOfMonth(y: number, m: number) {
  return new Date(y, m - 1, 1).getDay()
}

const days = computed(() => {
  const total = daysInMonth(year.value, month.value)
  const startDay = firstDayOfMonth(year.value, month.value)
  const result: (number | null)[] = []
  for (let i = 0; i < startDay; i++) result.push(null)
  for (let d = 1; d <= total; d++) result.push(d)
  while (result.length % 7 !== 0) result.push(null)
  return result
})

function isCurrentMonth(day: number, idx: number) {
  const startDay = firstDayOfMonth(year.value, month.value)
  const total = daysInMonth(year.value, month.value)
  return idx >= startDay && idx < startDay + total
}

function isToday(y: number, m: number, d: number) {
  const t = new Date()
  return y === t.getFullYear() && m === t.getMonth() + 1 && d === t.getDate()
}

function isSelected(y: number, m: number, d: number) {
  if (!props.modelValue) return false
  const sel = new Date(props.modelValue)
  return y === sel.getFullYear() && m === sel.getMonth() + 1 && d === sel.getDate()
}

function selectDate(day: number) {
  const iso = `${year.value}-${String(month.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  emit('update:modelValue', iso)
}

function prevMonth() {
  if (month.value === 1) {
    month.value = 12
    year.value--
  } else {
    month.value--
  }
}

function nextMonth() {
  if (month.value === 12) {
    month.value = 1
    year.value++
  } else {
    month.value++
  }
}
</script>

<style scoped>
.datepicker {
  border: 2px dashed var(--card-border);
  border-radius: 12px 225px 10px 215px / 215px 10px 225px 12px;
  padding: 20px;
  background-color: var(--card-bg);
}
.datepicker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.datepicker-month {
  font-size: 13px;
  color: var(--text-primary);
  letter-spacing: 0.1em;
}
.datepicker-nav {
  background: none;
  border: 1.5px dashed var(--card-border);
  color: var(--text-primary);
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px 12px 6px 10px / 10px 6px 12px 8px;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.datepicker-nav:hover {
  border-color: var(--accent-orange);
  color: var(--accent-orange);
  transform: scale(1.08);
}
.datepicker-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 8px;
}
.datepicker-weekday {
  font-size: 7px;
  color: var(--text-gray);
  text-align: center;
  padding: 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.datepicker-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
}
.datepicker-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: var(--text-primary);
  cursor: pointer;
  border: 1.5px solid transparent;
  border-radius: 6px 10px 4px 8px / 8px 4px 10px 6px;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: transparent;
}
.datepicker-day:hover:not(.datepicker-day--empty) {
  border-color: var(--border-alpha);
  transform: scale(1.08);
}
.datepicker-day--empty {
  cursor: default;
}
.datepicker-day--today {
  border-color: var(--accent-orange);
  border-style: dashed;
}
.datepicker-day--selected {
  background-color: var(--accent-orange);
  color: var(--bg-primary);
  border-color: var(--accent-orange);
  transform: scale(1.08);
  font-weight: 700;
}
.datepicker-day--outside {
  opacity: 0.3;
  cursor: default;
}
</style>