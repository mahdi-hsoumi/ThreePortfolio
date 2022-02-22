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
    const debugObject = {};

    // Canvas
    const webgl = ref(null);
    const stats = new Stats();

    onMounted(() => {
      // fps
      stats.showPanel(0);
      stats.dom.style.bottom = 0;
      stats.dom.style.top = "auto";
      document.body.appendChild(stats.dom);

      /**
       * Loaders
       */
      const gltfLoader = new GLTFLoader();
      const cubeTextureLoader = new THREE.CubeTextureLoader();

      // Scene
      const scene = new THREE.Scene();

      /**
       * Enviroment map
       */
      const environmentMap = cubeTextureLoader.load([
        "/textures/environmentMaps/0/px.jpg",
        "/textures/environmentMaps/0/nx.jpg",
        "/textures/environmentMaps/0/py.jpg",
        "/textures/environmentMaps/0/ny.jpg",
        "/textures/environmentMaps/0/pz.jpg",
        "/textures/environmentMaps/0/nz.jpg",
      ]);
      environmentMap.encoding = THREE.sRGBEncoding;
      scene.background = environmentMap;
      scene.environment = environmentMap;
      debugObject.envMapIntensity = 2.5;

      /**
       * Update all materials
       */
      const updateAllMaterials = () => {
        scene.traverse((child) => {
          if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
          ) {
            // child.material.envMap = environmentMap;
            child.material.envMapIntensity = debugObject.envMapIntensity;
            child.material.needsUpdate = true;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      };
      gui
        .add(debugObject, "envMapIntensity")
        .min(0)
        .max(10)
        .step(0.001)
        .onChange(updateAllMaterials);

      /**
       * Models
       */
      gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.position.set(0, -4, 0);
        gltf.scene.rotation.y = Math.PI * 0.5;
        scene.add(gltf.scene);

        gui
          .add(gltf.scene.rotation, "y")
          .min(-Math.PI)
          .max(Math.PI)
          .step(0.001)
          .name("rotation");

        updateAllMaterials();
      });

      /**
       * Lights
       */
      const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
      directionalLight.shadow.camera.far = 15;
      directionalLight.shadow.mapSize.set(1024, 1024);
      directionalLight.position.set(0.25, 3, -2.25);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      // const directionalLightCameraHelper = new THREE.CameraHelper(
      //   directionalLight.shadow.camera
      // );
      // scene.add(directionalLightCameraHelper);

      gui
        .add(directionalLight, "intensity")
        .min(0)
        .max(10)
        .step(0.001)
        .name("lightIntensity");
      gui
        .add(directionalLight.position, "x")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("lightX");
      gui
        .add(directionalLight.position, "y")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("lightY");
      gui
        .add(directionalLight.position, "z")
        .min(-5)
        .max(5)
        .step(0.001)
        .name("lightZ");

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
      camera.position.set(4, 1, -4);
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, webgl.value);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: webgl.value,
        antialias: true,
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.physicallyCorrectLights = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 3;
      gui.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001);
      gui.add(renderer, "toneMapping", {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping,
      });
      // .onFinishChange(() => {
      //   updateAllMaterials();
      // });
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      /**
       * Animate
       */
      const tick = () => {
        stats.begin();

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
        stats.end();
      };

      tick();

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
