<script setup lang="ts">
import type { DestinyResponse } from '../types'

defineProps<{
  data: DestinyResponse
}>()
</script>

<template>
  <div class="destiny-result animate-fade-in">
    <div class="text-center mb-8">
      <p class="text-amber-500 text-xs tracking-widest uppercase mb-2">
        ★ ULTIMATE DESTINY SCROLL ★
      </p>
      <p class="text-amber-700 text-sm">
        终极命盘 · Your Fate Has Been Revealed
      </p>
    </div>

    <div class="border border-amber-600/50 rounded-lg p-6 bg-gradient-to-b from-amber-950/20 to-black">
      <div class="space-y-6">
        <div class="border-b border-amber-600/30 pb-5">
          <p class="text-amber-600 text-xs tracking-widest mb-3 flex items-center gap-2">
            <span>☯</span> DESTINY OVERVIEW / 命盘定调
          </p>
          <p class="text-amber-300 font-serif text-lg leading-relaxed italic">
            "{{ data.overview }}"
          </p>
        </div>

        <div class="border-b border-amber-600/30 pb-5">
          <p class="text-amber-600 text-xs tracking-widest mb-3 flex items-center gap-2">
            <span>💰</span> WEALTH SECTOR / 财富解析
          </p>
          <p class="text-amber-200/80 font-mono text-sm leading-relaxed">
            {{ data.wealth }}
          </p>
        </div>

        <div class="border-b border-amber-600/30 pb-5">
          <p class="text-amber-600 text-xs tracking-widest mb-3 flex items-center gap-2">
            <span>💕</span> LOVE SECTOR / 姻缘解析
          </p>
          <p class="text-amber-200/80 font-mono text-sm leading-relaxed">
            {{ data.love }}
          </p>
        </div>

        <div>
          <p class="text-amber-600 text-xs tracking-widest mb-3 flex items-center gap-2">
            <span>🔧</span> KARMIC CURE / 化解之法
          </p>
          <div class="bg-amber-900/20 border border-amber-600/30 rounded p-4">
            <p class="text-amber-300 font-serif text-center leading-relaxed">
              "{{ data.cure }}"
            </p>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-4 border-t border-amber-600/30 text-center">
        <p class="text-amber-800 text-xs">
          ════════════════════════════
        </p>
        <p class="text-amber-600/60 text-xs mt-2 tracking-widest">
          CYBER ORACLE · 赛博算命
        </p>
        <p class="text-amber-900/50 text-xs mt-1">
          May the Dao guide your path
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>