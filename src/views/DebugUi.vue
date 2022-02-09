<template>
  <canvas class="fullscreen-canvas" ref="webgl"></canvas>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";
export default {
  setup() {
    // Canvas
    const gui = new dat.GUI({
      // closed: true,
      width: 400,
    });
    const webgl = ref(null);

    onMounted(() => {
      /**
       * Base
       */
      const parameters = {
        color: 0xff0000,
        spin: () => {
          gsap.to(mesh.rotation, 1, { y: mesh.rotation.y + Math.PI * 2 });
        },
      };

      // Scene
      const scene = new THREE.Scene();

      /**
       * Object
       */
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

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
      camera.position.z = 3;
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, webgl.value);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: webgl.value,
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /**
       * Debug
       */

      // gui.hide()
      gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
      gui.add(mesh, "visible");
      gui.add(material, "wireframe");

      window.addEventListener("keydown", (event) => {
        if (event.key === "h") {
          if (gui._hidden) gui.show();
          else gui.hide();
        }
      });

      gui.addColor(parameters, "color").onChange(() => {
        material.color.set(parameters.color);
      });

      gui.add(parameters, "spin");

      /**
       * Animate
       */
      const clock = new THREE.Clock();

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };

      tick();
    });
    onUnmounted(() => {
      gui.hide();
    });
    return { webgl };
  },
};
</script>
