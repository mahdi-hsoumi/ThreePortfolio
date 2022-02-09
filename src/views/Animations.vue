<template>
  <canvas ref="webgl"></canvas>
</template>

<script>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import gsap from "gsap";

export default {
  setup() {
    // Canvas
    const webgl = ref(null);
    onMounted(() => {
      // Scene
      const scene = new THREE.Scene();
      /**
       * Base
       */
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      /**
       * Sizes
       */
      const sizes = {
        width: 800,
        height: 600,
      };

      /**
       * Camera
       */
      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height
      );
      camera.position.z = 3;
      scene.add(camera);

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: webgl.value,
      });
      renderer.setSize(sizes.width, sizes.height);

      /**
       * Animate
       */
      gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

      const tick = () => {
        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };

      tick();
    });
    return { webgl };
  },
};
</script>
