<template>
  <canvas class="fullscreen-canvas" ref="webgl"></canvas>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

export default {
  setup() {
    // Debug
    const gui = new dat.GUI();

    // Canvas
    const webgl = ref(null);

    onMounted(() => {
      // Scene
      const scene = new THREE.Scene();

      /**
       * Textures
       */
      const textureLoader = new THREE.TextureLoader();
      const particleTexture = textureLoader.load("/textures/particles/10.png");

      /**
       * Particles
       */

      // Geometrey
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 5000;

      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let index = 0; index < count * 3; index++) {
        positions[index] = (Math.random() - 0.5) * 10;
        colors[index] = Math.random();
      }
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );

      // Material
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        // color: 0xff88cc,
        // map: particleTexture,
        transparent: true,
        alphaMap: particleTexture,
        // alphaTest: 0.001,
        // depthTest: false,
        depthWrite: false,
        // blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      // Points
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

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
       * Animate
       */
      const clock = new THREE.Clock();

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update particles
        // particles.rotation.y = elapsedTime * 0.2;
        for (let index = 0; index < count; index++) {
          const index3 = index * 3;
          const x = particlesGeometry.attributes.position.array[index3];
          particlesGeometry.attributes.position.array[index3 + 1] = Math.sin(
            elapsedTime + x
          );
          // particlesGeometry.attributes.position.array[index3 + 2] =
        }
        particlesGeometry.attributes.position.needsUpdate = true;

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
