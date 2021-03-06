<template>
  <div>
    <canvas class="fullscreen-canvas" ref="webgl"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import Stats from "stats.js";

export default {
  setup() {
    // Debug
    const actionsDebug = {};
    const gui = new dat.GUI();

    // Canvas
    const webgl = ref(null);
    const stats = new Stats();

    onMounted(() => {
      // fps
      stats.showPanel(0);
      stats.dom.style.bottom = 0;
      stats.dom.style.top = "auto";
      document.body.appendChild(stats.dom);
      // Scene
      const scene = new THREE.Scene();

      /**
       * Models
       */
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");

      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);

      let mixer = null;

      gltfLoader.load("/models/KUMBARA/untitled.gltf", (gltf) => {
        console.log("gltf :>> ", gltf);
        scene.add(gltf.scene);
        mixer = new THREE.AnimationMixer(gltf.scene);
        const drop = mixer.clipAction(gltf.animations[0]);
        drop.play();
      });

      /**
       * Floor
       */
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshStandardMaterial({
          color: "#444444",
          metalness: 0,
          roughness: 0.5,
        })
      );
      floor.receiveShadow = true;
      floor.rotation.x = -Math.PI * 0.5;
      scene.add(floor);

      /**
       * Lights
       */
      const ambientLight = new THREE.AmbientLight(0xffffff, 2);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.set(1024, 1024);
      directionalLight.shadow.camera.far = 15;
      directionalLight.shadow.camera.left = -7;
      directionalLight.shadow.camera.top = 7;
      directionalLight.shadow.camera.right = 7;
      directionalLight.shadow.camera.bottom = -7;
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      /**
       * Sizes
       */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });

      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.set(-8, 4, 8);
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, webgl.value);
      controls.target.set(0, 1, 0);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: webgl.value,
      });
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.physicallyCorrectLights = true;

      /**
       * Animate
       */
      const clock = new THREE.Clock();
      let previousTime = 0;

      const tick = () => {
        stats.begin();

        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;

        if (mixer) {
          mixer.update(deltaTime);
        }

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
        stats.end();
      };

      tick();
    });

    onUnmounted(() => {
      gui.hide();
      document.body.removeChild(stats.dom);
    });
    return { webgl };
  },
};
</script>

<style scoped>
.section {
  display: flex;
  align-items: center;
  height: 100vh;
  position: relative;
  font-family: "Cabin", sans-serif;
  color: #ffeded;
  text-transform: uppercase;
  font-size: 7vmin;
  padding-left: 10%;
  padding-right: 10%;
}

section:nth-child(odd) {
  justify-content: flex-end;
}
</style>
