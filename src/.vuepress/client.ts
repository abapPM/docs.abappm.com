import { defineClientConfig } from 'vuepress/client'
import ApmLogo3D from './components/ApmLogo3D.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('ApmLogo3D', ApmLogo3D)
  },
})
