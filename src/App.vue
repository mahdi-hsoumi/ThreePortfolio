<template>
  <div>
    <div id="nav">
      <div v-for="link in links" :key="link.path" class="linksContainer">
        <router-link class="link" :to="link.path"
          >|{{ link.title }}|</router-link
        >
      </div>
    </div>
    <div style="position: relative; height: calc(100vh); width: 100vw">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const links = ref([
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
    ]);
    return {
      links,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 100px;
}

#nav .link {
  font-weight: bold;
  color: #2c3e50;
}

#nav .router-link-exact-active {
  color: #42b983;
}

.linksContainer {
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

* {
  margin: 0;
  padding: 0;
}

html,
body {
  overflow: hidden;
}

.fullscreen-canvas {
  position: absolute;
  bottom: 0;
  right: 0;
  outline: none;
}
.lil-gui.autoPlace {
  top: 160px;
  right: 0;
}
</style>
