<template>
  <h3>Hello, it's the Single page of Album id : {{ route.params.id }}</h3>

  <l-map style="height:500px"
    :center="[48.5698334,-4.5233195]"
    :zoom="4">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      >
    </l-tile-layer>
    <l-marker :lat-lng="[48.5698334,-4.5233195]">
      <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
    </l-marker>
  </l-map>
</template>

<script setup>
import "leaflet/dist/leaflet.css"
import {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
} from "@vue-leaflet/vue-leaflet";
import { useRoute } from 'vue-router';
import { computed, ref } from "@vue/reactivity";

const iconWidth = ref(25);
const iconHeight = ref(40);
const zoom = ref(2)

const route = useRoute();
const iconUrl = computed(() => `https://placekitten.com/${iconWidth.value}/${iconHeight.value}`)
const iconSize = computed(() => [iconWidth.value, iconHeight.value])

</script>
