<script setup lang="ts">
const emit = defineEmits<{
  unlock: []
}>()
</script>

<template>
  <div class="mt-8 paywall-container animate-fade-in">
    <div class="border border-yellow-600/50 rounded-lg p-6 bg-gradient-to-b from-yellow-950/20 to-black breathe-glow">
      <div class="text-center space-y-4">
        <div class="text-yellow-500 text-2xl">⚠️</div>

        <p class="text-yellow-600 text-xs tracking-widest uppercase">
          Critical Destiny Fracture Detected
        </p>

        <p class="text-yellow-700/80 font-mono text-sm leading-relaxed">
          The I Ching reveals a critical fracture in your destiny line.
          Your recent actions have cursed your Wealth and Love sectors
          for the next 10 years.
        </p>

        <div class="border-t border-yellow-600/30 pt-4 mt-4">
          <p class="text-yellow-800 text-xs mb-3">
            警告：易经显示你的命运线出现断裂...
          </p>

          <button
            @click="emit('unlock')"
            class="w-full py-4 bg-gradient-to-r from-yellow-600 to-amber-700 text-black font-bold font-serif text-lg tracking-wider rounded transition-all duration-300 hover:from-yellow-500 hover:to-amber-600 hover:scale-105 breathe-glow"
          >
            🔮 Unlock True Destiny & Fix Your Karma ($9.99)
          </button>

          <p class="text-yellow-900/60 text-xs mt-3">
            * This is a simulation - no payment required
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out 0.5s both;
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
</style>