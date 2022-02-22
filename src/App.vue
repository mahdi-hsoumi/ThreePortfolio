<template>
  <div>
    <Drawer :direction="'left'" :exist="true" ref="LeftDrawer">
      <div id="nav">
        <div v-for="link in links" :key="link.path" class="linksContainer">
          <router-link class="link" :to="link.path"
            >|{{ link.title }}|</router-link
          >
        </div>
      </div>
    </Drawer>

    <div
      @click="openMenu"
      class="hamburger"
      :class="hamburgerOpen ? 'hamburger--is-open' : ''"
    >
      <div class="hamburger__item hamburger__item--first"></div>
      <div class="hamburger__item hamburger__item--middle"></div>
      <div class="hamburger__item hamburger__item--last"></div>
    </div>

    <router-view />
  </div>
</template>

<script>
import Drawer from "./components/Drawer.vue";
export default {
  components: { Drawer },
  data() {
    return {
      isMounted: false,
      links: [
        {
          path: "/basic-scene",
          title: "Basic Scene",
        },
        {
          path: "/transform-objects",
          title: "Transform Objects",
        },
        {
          path: "/animations",
          title: "Animations",
        },
        {
          path: "/cameras",
          title: "Cameras",
        },
        {
          path: "/fullscreen-and-resizing",
          title: "Fullscreen And Resizing",
        },
        {
          path: "/geometries",
          title: "Geometries",
        },
        {
          path: "/debug-ui",
          title: "Debug Ui",
        },
        {
          path: "/textures",
          title: "Textures",
        },
        {
          path: "/materials",
          title: "Materials",
        },
        {
          path: "/text-3d",
          title: "3D Text",
        },
        {
          path: "/lights",
          title: "Lights",
        },
        {
          path: "/shadows",
          title: "Shadows",
        },
        {
          path: "/hunted-house",
          title: "HuntedHouse",
        },
        {
          path: "/particles",
          title: "Particles",
        },
        {
          path: "/galaxy-generator",
          title: "Galaxy Generator",
        },
        {
          path: "/raycaster",
          title: "Raycaster",
        },
        {
          path: "/scroll-based-animation",
          title: "Scroll Based Animation",
        },
        {
          path: "/physics",
          title: "Physics",
        },
        {
          path: "/imported-models",
          title: "Imported Models",
        },
        {
          path: "/custom-models-with-blender",
          title: "Custom Models With Blender",
        },
        {
          path: "/realistic-render",
          title: "RealisticRender",
        },
      ],
    };
  },
  methods: {
    openMenu() {
      if (this.$refs.LeftDrawer.active) {
        this.$refs.LeftDrawer.close();
      } else {
        this.$refs.LeftDrawer.open();
      }
    },
  },
  computed: {
    hamburgerOpen() {
      if (!this.isMounted) return false;
      if (this.$refs.LeftDrawer.active) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
}

#nav .link {
  font-weight: bold;
  color: #2c3e50;
}

#nav .router-link-exact-active {
  color: #42b983;
}

.linksContainer {
  margin-top: 7.5px;
  margin-bottom: 7.5px;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  background: #1e1a20;
  /* overflow: hidden; */
}

.fullscreen-canvas {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  width: 100%;
}

.hamburger {
  transition: all 0.4s ease-in-out;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 9999;
  height: 28px;
  width: 33px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }

  &__item {
    height: 4px;
    width: 100%;
    background: #42b983;
    transition: transform 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95),
      opacity 300ms linear;

    &--first {
      .hamburger--is-open & {
        transform: translate(0, 12px) rotate(45deg);
      }
    }

    &--middle {
      .hamburger--is-open & {
        opacity: 0;
      }
    }

    &--last {
      .hamburger--is-open & {
        transform: translate(0, -12px) rotate(-45deg);
      }
    }
  }
}
.hamburger--is-open {
  left: 250px;
  transition: all 0.4s ease-in-out;
}
</style>
