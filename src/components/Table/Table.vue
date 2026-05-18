<template>
  <div class="sketch-table-wrapper">
    <table class="sketch-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key" class="font-tech">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, ri) in data" :key="ri" :style="{ '--row-skew': rowSkews[ri % rowSkews.length] }">
          <td v-for="col in columns" :key="col.key" class="font-tech">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '../../types'

const props = defineProps<{
  columns: TableColumn[]
  data: Record<string, any>[]
}>()

const rowSkews = ['-0.3deg', '0.5deg', '-0.5deg', '0.3deg', '-0.2deg', '0.4deg']
</script>

<style scoped>
.sketch-table-wrapper {
  border: 2px dashed var(--card-border);
  border-radius: 225px 12px 215px 10px / 10px 215px 12px 225px;
  padding: 4px;
  background-color: var(--card-bg);
  overflow-x: auto;
}
.sketch-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
.sketch-table th {
  font-size: 8px;
  color: var(--text-gray);
  text-align: left;
  padding: 10px 14px;
  border-bottom: 1.5px dashed var(--border-alpha);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.sketch-table td {
  font-size: 9px;
  color: var(--text-primary);
  padding: 8px 14px;
  border-bottom: 1px dashed var(--border-alpha);
}
.sketch-table tr {
  display: table-row;
  transition: background-color 0.2s;
}
.sketch-table tbody tr {
  transform: rotate(var(--row-skew, 0deg));
}
.sketch-table tbody tr:hover {
  background-color: var(--border-alpha);
}
.sketch-table tbody tr:last-child td {
  border-bottom: none;
}
</style>