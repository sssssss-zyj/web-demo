<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  name?: string
}>()

const emit = defineEmits<{
  submit: [data: { name: string; birthDate: string; birthTime: string; gender: string }]
}>()

const formData = ref({
  name: props.name || '',
  birthDate: '',
  birthTime: '',
  gender: ''
})

const isSubmitting = ref(false)

const handleSubmit = () => {
  if (formData.value.name && formData.value.birthDate && formData.value.birthTime && formData.value.gender) {
    isSubmitting.value = true
    setTimeout(() => {
      emit('submit', { ...formData.value })
    }, 1500)
  }
}
</script>

<template>
  <div class="baziform-container animate-fade-in">
    <div class="text-center mb-8">
      <div class="text-amber-500 text-3xl mb-4">🔮</div>
      <p class="text-amber-500 text-xs tracking-widest uppercase mb-2">
        Premium BaZi Reading
      </p>
      <p class="text-amber-700 text-sm">
        生辰八字 · Four Pillars of Destiny
      </p>
      <p class="text-amber-900/60 text-xs mt-2">
        Payment successful - Enter your birth details
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="space-y-2">
        <label class="text-amber-500 text-xs tracking-widest uppercase">Name / 姓名</label>
        <input
          v-model="formData.name"
          type="text"
          placeholder="Enter your full name"
          class="w-full bg-transparent border border-amber-900/50 rounded px-4 py-3 text-amber-200 placeholder-amber-900/50 focus:outline-none focus:border-amber-600 font-mono text-sm"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="text-amber-500 text-xs tracking-widest uppercase">Date of Birth / 出生日期</label>
        <input
          v-model="formData.birthDate"
          type="date"
          class="w-full bg-transparent border border-amber-900/50 rounded px-4 py-3 text-amber-200 focus:outline-none focus:border-amber-600 font-mono text-sm"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="text-amber-500 text-xs tracking-widest uppercase">Time of Birth / 出生时间</label>
        <input
          v-model="formData.birthTime"
          type="time"
          class="w-full bg-transparent border border-amber-900/50 rounded px-4 py-3 text-amber-200 focus:outline-none focus:border-amber-600 font-mono text-sm"
          required
        />
      </div>

      <div class="space-y-2">
        <label class="text-amber-500 text-xs tracking-widest uppercase">Gender / 性别</label>
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="formData.gender = 'male'"
            class="py-3 border rounded text-sm font-mono transition-all"
            :class="formData.gender === 'male' ? 'border-amber-500 bg-amber-900/30 text-amber-400' : 'border-amber-900/50 text-amber-800 hover:border-amber-700'"
          >
            Male / 男
          </button>
          <button
            type="button"
            @click="formData.gender = 'female'"
            class="py-3 border rounded text-sm font-mono transition-all"
            :class="formData.gender === 'female' ? 'border-amber-500 bg-amber-900/30 text-amber-400' : 'border-amber-900/50 text-amber-800 hover:border-amber-700'"
          >
            Female / 女
          </button>
        </div>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting || !formData.name || !formData.birthDate || !formData.birthTime || !formData.gender"
        class="w-full py-4 bg-gradient-to-r from-amber-700 to-yellow-700 text-black font-bold font-serif text-lg tracking-wider rounded transition-all duration-300 hover:from-amber-600 hover:to-yellow-600 disabled:opacity-30 disabled:cursor-not-allowed mt-6"
      >
        {{ isSubmitting ? 'DECRYPTING DESTINY...' : '⚡ REVEAL MY DESTINY ⚡' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.7);
  cursor: pointer;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(0.7);
  cursor: pointer;
}

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
</style>