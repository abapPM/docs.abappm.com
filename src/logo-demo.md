---
title: APM 3D Logo Demo
icon: cube
index: false
---

# APM 3D Logo Demo

This page demonstrates the interactive 3D logo component built with Three.js.

<ApmLogo3D />

## Features

- **Interactive 3D Logo**: Click on the logo to switch between rotation and tumbling modes
- **Orbit Controls**: Use your mouse to orbit around the logo and scroll to zoom
- **Responsive Design**: The component adapts to different screen sizes
- **TypeScript Support**: Fully typed Vue 3 component with proper Three.js integration

## Usage

To use this component in your VuePress pages, simply add:

```vue
<ApmLogo3D />
```

The component is automatically registered and available in all pages.

## Technical Details

- Built with Vue 3 Composition API and TypeScript
- Uses Three.js for 3D rendering and animations
- Implements proper cleanup on component unmount
- Responsive and touch-friendly controls
