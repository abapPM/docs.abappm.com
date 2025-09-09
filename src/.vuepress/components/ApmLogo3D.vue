<template>
  <div ref="threeContainer" class="apm-logo-container">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const threeContainer = ref<HTMLElement>()

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let logoGroup: THREE.Group
let time = 0
let isRotating = true
let isTumbling = false
let raycaster: THREE.Raycaster
let mouse: THREE.Vector2
let animationId: number

const initialPosition = { x: 1, y: 0, z: -1 }

const init = () => {
  if (!threeContainer.value) return

  // Scene setup
  scene = new THREE.Scene()
  scene.background = null

  // Camera setup - at (-4, 3, 4) for proper isometric view
  camera = new THREE.PerspectiveCamera(75, threeContainer.value.clientWidth / threeContainer.value.clientHeight, 0.1, 1000)
  camera.position.set(-4, 3, 4)

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setClearColor(0x000000, 0)
  renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
  renderer.shadowMap.enabled = false
  threeContainer.value.appendChild(renderer.domElement)

  // Controls - target set to origin (0,0,0) so it stays fixed
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.target.set(0, 0, 0) // Always orbit around origin

  // Raycaster for click detection
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  // Enhanced lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight1.position.set(5, 5, 5)
  scene.add(directionalLight1)

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
  directionalLight2.position.set(-5, 3, -3)
  scene.add(directionalLight2)

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.3)
  directionalLight3.position.set(0, -5, 0)
  scene.add(directionalLight3)

  // Create logo group - position at origin for rotation center
  logoGroup = new THREE.Group()
  logoGroup.position.set(0, 0, 0) // Group stays at origin
  scene.add(logoGroup)

  // Create materials - solid colors without letters
  const grayMaterial = new THREE.MeshPhongMaterial({
    color: 0x808080,
    shininess: 30
  })
  const blackMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    shininess: 30
  })
  const whiteMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 30
  })

  // Create cube with different face materials - clean solid colors
  const createIsometricCube = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const materials = [
      blackMaterial, // right face (+X) - black
      blackMaterial, // left face (-X) - black
      grayMaterial,  // top face (+Y) - gray
      grayMaterial,  // bottom face (-Y) - gray
      whiteMaterial, // front face (+Z) - white
      whiteMaterial  // back face (-Z) - white
    ]
    return new THREE.Mesh(geometry, materials)
  }

  // Create cubes with positions offset by the initial position
  // Top cube
  const cube1 = createIsometricCube()
  cube1.position.set(0 + initialPosition.x, 1 + initialPosition.y, 0 + initialPosition.z)
  logoGroup.add(cube1)

  // Bottom left cube
  const cube2 = createIsometricCube()
  cube2.position.set(-2 + initialPosition.x, -1 + initialPosition.y, 0 + initialPosition.z)
  logoGroup.add(cube2)

  // Bottom center-back cube
  const cube3 = createIsometricCube()
  cube3.position.set(0 + initialPosition.x, -1 + initialPosition.y, 2 + initialPosition.z)
  logoGroup.add(cube3)

  // Bottom center cube
  const cube4 = createIsometricCube()
  cube4.position.set(0 + initialPosition.x, -1 + initialPosition.y, 0 + initialPosition.z)
  logoGroup.add(cube4)

  // Position camera to look at origin
  camera.lookAt(0, 0, 0)
  controls.update()

  // Add click event listener
  renderer.domElement.addEventListener('click', onMouseClick, false)

  // Window resize handler
  window.addEventListener('resize', onWindowResize, false)
}

const onMouseClick = (event: MouseEvent) => {
  if (!threeContainer.value) return

  // Prevent orbit controls from interfering
  event.preventDefault()

  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / threeContainer.value.clientWidth) * 2 - 1
  mouse.y = -(event.clientY / threeContainer.value.clientHeight) * 2 + 1

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera)

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(logoGroup.children)

  if (intersects.length > 0) {
    // Clicked on the logo! Toggle mode
    if (isTumbling) {
      // Switch back to simple rotation
      isTumbling = false
      isRotating = true
    } else {
      // Switch to tumbling
      isRotating = false
      isTumbling = true
    }
  }
}

const onWindowResize = () => {
  if (!threeContainer.value) return

  camera.aspect = threeContainer.value.clientWidth / threeContainer.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  time += 0.01

  if (isTumbling) {
    // Fun tumbling with varying speeds and multiple axes
    const speedVariation1 = Math.sin(time * 0.3) * 0.5 + 1 // Speed varies between 0.5x and 1.5x
    const speedVariation2 = Math.cos(time * 0.7) * 0.3 + 1 // Different variation pattern
    const speedVariation3 = Math.sin(time * 0.5) * 0.4 + 1 // Third variation

    // Multiple axis rotations with varying speeds
    logoGroup.rotation.x = Math.sin(time * speedVariation1 * 0.8) * 0.5
    logoGroup.rotation.y = time * speedVariation2 * 0.6
    logoGroup.rotation.z = Math.cos(time * speedVariation3 * 0.4) * 0.3

    // Chaotic but controlled floating motion
    logoGroup.position.x = Math.sin(time * 0.9) * 0.15
    logoGroup.position.y = Math.sin(time * 1.1) * 0.2 + Math.cos(time * 0.6) * 0.1
    logoGroup.position.z = Math.cos(time * 0.8) * 0.15

  } else if (isRotating) {
    // Simple rotation
    logoGroup.rotation.x = 0
    logoGroup.rotation.y = time * 0.8
    logoGroup.rotation.z = 0

    // Subtle floating motion
    logoGroup.position.y = Math.sin(time * 2) * 0.1
    logoGroup.position.x = 0
    logoGroup.position.z = 0
  }

  controls.update()
  renderer.render(scene, camera)
}

onMounted(() => {
  init()
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
  window.removeEventListener('resize', onWindowResize)
})
</script>

<style scoped>
.apm-logo-container {
  width: 100%;
  height: 400px;
  position: relative;
  background: transparent;
  overflow: hidden;
  font-family: Arial, sans-serif;
  cursor: default;
}

:deep(canvas) {
  cursor: pointer;
}
</style>
