<template>
  <canvas ref="webgl"></canvas>
</template>

<script>
import { ref, onMounted } from "vue";
import * as THREE from "three";
export default {
  setup() {
    // Canvas
    const webgl = ref(null);
    onMounted(() => {
      // Scene
      const scene = new THREE.Scene();
      /**
       * Axes Helper
       */
      const axesHelper = new THREE.AxesHelper(2);
      scene.add(axesHelper);

      /**
       * Objects
       */
      const group = new THREE.Group();
      group.scale.y = 1;
      group.rotation.y = 0.2;
      group.position.y = 0.8;
      scene.add(group);

      const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
      );
      cube1.position.x = -1.5;
      group.add(cube1);

      const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      );
      cube2.position.x = 0;
      group.add(cube2);

      const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
      );
      cube3.position.x = 1.5;
      group.add(cube3);

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
      // camera.lookAt(new THREE.Vector3(0, - 1, 0))
      scene.add(camera);

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: webgl.value,
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.render(scene, camera);
    });
    return { webgl };
  },
};
</script>
