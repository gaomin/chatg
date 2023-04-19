<template>
  <div class="flex" :class="{ 'justify-end': isQuestion }">
    <div
      class="p-2 m-2 rounded max-w-4/6"
      :class="{
        'bg-blue-100': isQuestion,
        'bg-green-100': !isQuestion
      }"
    >
      {{ props.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['type', 'text'])
const isQuestion = ref(props.type === 'request')
</script>
