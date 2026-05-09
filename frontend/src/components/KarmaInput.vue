<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  submit: [sin: string]
}>()

const sinText = ref('')
const isFocused = ref(false)

const handleSubmit = () => {
  if (sinText.value.trim()) {
    emit('submit', sinText.value.trim())
  }
}
</script>

<template>
  <div class="roast-input-container">
    <div class="text-center mb-8">
      <p class="text-gray-500 text-sm tracking-widest uppercase mb-2">
        Confess Your Sin
      </p>
      <p class="text-gray-600 text-xs">
        忏悔你的罪孽，让易经审视你的灵魂
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div
        class="relative border border-gray-800 rounded-lg transition-all duration-300"
        :class="isFocused ? 'border-red-900 shadow-lg shadow-red-900/20' : 'border-gray-800'"
      >
        <textarea
          v-model="sinText"
          @focus="isFocused = true"
          @blur="isFocused = false"
          placeholder="Enter your sin... (e.g., I cheated on my partner)"
          class="w-full bg-transparent text-gray-300 placeholder-gray-700 p-4 min-h-[120px] resize-none focus:outline-none font-mono text-sm"
          maxlength="500"
        />
        <div class="absolute bottom-2 right-2 text-gray-700 text-xs">
          {{ sinText.length }}/500
        </div>
      </div>

      <button
        type="submit"
        :disabled="!sinText.trim()"
        class="w-full py-4 bg-gradient-to-r from-red-900 to-red-800 text-red-200 font-serif text-lg tracking-wider rounded-lg transition-all duration-300 hover:from-red-800 hover:to-red-700 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-900/30"
      >
        ⚔️ INVOKE THE ORACLE ⚔️
      </button>
    </form>

    <div class="mt-8 text-center">
      <p class="text-gray-700 text-xs">
        Free fortune telling powered by I Ching
      </p>
    </div>
  </div>
</template>

<style scoped>
textarea::placeholder {
  color: #374151;
}
</style>