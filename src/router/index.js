import { createRouter, createWebHistory } from "vue-router";
import BasicScene from "../views/BasicScene.vue";
import TransformObjects from "../views/TransformObjects.vue";
import Animations from "../views/Animations.vue";
import Cameras from "../views/Cameras.vue";
import FullscreenAndResizing from "../views/FullscreenAndResizing.vue";
import Geometries from "../views/Geometries.vue";
import DebugUi from "../views/DebugUi.vue";
import Textures from "../views/Textures.vue";
import Materials from "../views/Materials.vue";
import Text3d from "../views/Text3d.vue";

const routes = [
  {
    path: "/basic-scene",
    name: "BasicScene",
    component: BasicScene,
  },
  {
    path: "/transform-objects",
    name: "TransformObjects",
    component: TransformObjects,
  },
  {
    path: "/animations",
    name: "Animations",
    component: Animations,
  },
  {
    path: "/cameras",
    name: "Cameras",
    component: Cameras,
  },
  {
    path: "/fullscreen-and-resizing",
    name: "FullscreenAndResizing",
    component: FullscreenAndResizing,
  },
  {
    path: "/geometries",
    name: "Geometries",
    component: Geometries,
  },
  {
    path: "/debug-ui",
    name: "DebugUi",
    component: DebugUi,
  },
  {
    path: "/textures",
    name: "Textures",
    component: Textures,
  },
  {
    path: "/materials",
    name: "Materials",
    component: Materials,
  },
  {
    path: "/text-3d",
    name: "Text3d",
    component: Text3d,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
