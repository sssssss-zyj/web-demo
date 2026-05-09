<script setup lang="ts">
import type { RoastResponse } from '../types'

defineProps<{
  data: RoastResponse
}>()
</script>

<template>
  <div class="roast-result animate-fade-in">
    <div class="text-center mb-8">
      <p class="text-gray-600 text-xs tracking-widest uppercase mb-1">
        THE ORACLE HAS SPOKEN
      </p>
      <p class="text-gray-700 text-xs">
        易经已裁决
      </p>
    </div>

    <div class="border border-red-900/50 rounded-lg p-6 bg-gradient-to-b from-red-950/30 to-black">
      <div class="text-center mb-6">
        <p class="text-gray-500 text-xs tracking-widest mb-2">KARMA SCORE</p>
        <div class="text-6xl md:text-7xl font-bold text-red-600 font-mono glitch">
          {{ data.score }}
        </div>
        <p class="text-red-800 text-xs mt-2">out of -100</p>
      </div>

      <div class="space-y-6">
        <div class="border-b border-red-900/30 pb-4">
          <p class="text-gray-500 text-xs tracking-widest mb-1">I CHING HEXAGRAM</p>
          <p class="text-red-400 font-serif text-lg">{{ data.hexagram }}</p>
        </div>

        <div class="border-b border-red-900/30 pb-4">
          <p class="text-gray-500 text-xs tracking-widest mb-1">WU XING IMBALANCE</p>
          <p class="text-red-400/80 font-mono text-sm">{{ data.element_imbalance }}</p>
        </div>

        <div class="border-b border-red-900/30 pb-4">
          <p class="text-gray-500 text-xs tracking-widest mb-1">THE ORACLE SAYS</p>
          <p class="text-red-300 font-mono text-sm leading-relaxed">{{ data.roast }}</p>
        </div>

        <div>
          <p class="text-gray-500 text-xs tracking-widest mb-1">NEXT LIFE REINCARNATION</p>
          <div class="bg-red-950/50 rounded p-3 mt-2">
            <p class="text-red-500 font-mono text-sm text-center">
              {{ data.next_life }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.glitch {
  text-shadow: 0 0 10px #dc2626, 0 0 20px #dc2626, 0 0 30px #991b1b;
}
</style>