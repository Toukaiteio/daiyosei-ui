# daiyosei-ui

A stylized Vue 3 UI component library inspired by hand-drawn sketchbook aesthetics.

## Features

- 🎨 Hand-drawn, sketchbook-inspired design
- 📦 Fully typed with TypeScript
- 🎯 Tree-shakeable ES modules
- 🎭 Multiple theme support
- ♿ Accessible components
- 📱 Responsive design

## Demo

Visit the [live demo](https://daiyosei-ui.vercel.app/) to see all components in action.

## Installation

```bash
npm install daiyosei-ui
```

## Quick Start

### 1. Global Registration (Plugin)

Register all components globally in your main.ts:

```typescript
import { createApp } from 'vue'
import DaiyoseiUI from 'daiyosei-ui'
import 'daiyosei-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(DaiyoseiUI)
app.mount('#app')
```

Then use components directly in templates:

```vue
<template>
  <div>
    <DButton @click="handleClick">Click me</DButton>
    <DInput v-model="text" placeholder="Enter text" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

### 2. Tree-Shaking (Recommended)

Import only the components you need:

```typescript
import { Button, Input, Modal, Badge } from 'daiyosei-ui'
import 'daiyosei-ui/style.css'
```

Use in your component:

```vue
<template>
  <div>
    <Button variant="primary">Primary Button</Button>
    <Input type="text" placeholder="Enter your name" />
    <Badge color="blue">New</Badge>
  </div>
</template>

<script setup lang="ts">
import { Button, Input, Badge } from 'daiyosei-ui'
</script>
```

### 3. Using Composables

```typescript
import { useTheme, useEffects } from 'daiyosei-ui'

export default {
  setup() {
    const { theme, setTheme } = useTheme()
    const { enableEffects } = useEffects()

    return {
      theme,
      setTheme,
      enableEffects,
    }
  },
}
```

### 4. Component Examples

#### Button

```vue
<template>
  <div>
    <Button variant="primary" size="lg">Large Primary</Button>
    <Button variant="secondary" disabled>Disabled</Button>
    <Button @click="handleClick">Click me</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'daiyosei-ui'

const handleClick = () => {
  console.log('Clicked!')
}
</script>
```

#### Modal

```vue
<template>
  <div>
    <Button @click="isOpen = true">Open Modal</Button>
    <Modal v-model="isOpen" title="Welcome">
      <p>This is a modal dialog</p>
      <template #footer>
        <Button @click="isOpen = false">Close</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal, Button } from 'daiyosei-ui'

const isOpen = ref(false)
</script>
```

#### Form Inputs

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <Input v-model="form.name" placeholder="Name" />
    <Input v-model="form.email" type="email" placeholder="Email" />
    <Textarea v-model="form.message" placeholder="Message" />
    <Select v-model="form.category" :options="categories" />
    <Button type="submit">Submit</Button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input, Textarea, Select, Button } from 'daiyosei-ui'

const form = ref({
  name: '',
  email: '',
  message: '',
  category: '',
})

const categories = [
  { label: 'General', value: 'general' },
  { label: 'Support', value: 'support' },
  { label: 'Feedback', value: 'feedback' },
]

const handleSubmit = () => {
  console.log('Form submitted:', form.value)
}
</script>
```

## Components

- Button
- Input
- Textarea
- Select
- Badge
- Modal
- Drawer
- Toast
- Tabs
- Switch
- Menu / SubMenu
- Pagination
- Tag
- Filter
- Table
- DatePicker
- ColorPicker
- FileUpload
- ImageCard
- And more...

## Documentation

For detailed documentation and component API, visit the [GitHub repository](https://github.com/Toukaiteio/daiyosei-ui).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
