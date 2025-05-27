<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  to?: RouteLocationRaw;
  href?: string;
}>();

</script>

<template>
  <component :is="to ? 'RouterLink' : 'a'" :to :href class="link" tabindex="0">
    <slot />
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
