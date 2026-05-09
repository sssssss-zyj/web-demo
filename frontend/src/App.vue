<script setup lang="ts">
import { ref, computed } from 'vue'
import type { AppStage, RoastRequest, RoastResponse, DestinyRequest, DestinyResponse } from './types'
import KarmaInput from './components/KarmaInput.vue'
import RoastResult from './components/RoastResult.vue'
import PaywallHook from './components/PaywallHook.vue'
import BaZiForm from './components/BaZiForm.vue'
import DestinyResult from './components/DestinyResult.vue'
import PaymentModal from './components/PaymentModal.vue'

const currentStage = ref<AppStage>('input')
const roastData = ref<RoastResponse | null>(null)
const destinyData = ref<DestinyResponse | null>(null)
const sin = ref('')
const showPaymentModal = ref(false)

const isLoading = computed(() => currentStage.value === 'loading' || currentStage.value === 'destiny-loading')

const handleSinSubmit = async (sinText: string) => {
  sin.value = sinText
  currentStage.value = 'loading'

  try {
    const response = await fetch('/api/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sin: sinText } as RoastRequest)
    })
    const data: RoastResponse = await response.json()
    roastData.value = data
    currentStage.value = 'roast'
  } catch (error) {
    console.error('Failed to get roast:', error)
    currentStage.value = 'input'
  }
}

const handlePaywallClick = () => {
  showPaymentModal.value = true
}

const handlePaymentSuccess = () => {
  showPaymentModal.value = false
  currentStage.value = 'baziform'
}

const handleDestinySubmit = async (data: { name: string; birthDate: string; birthTime: string; gender: string }) => {
  currentStage.value = 'destiny-loading'

  try {
    const response = await fetch('/api/destiny', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data as DestinyRequest)
    })
    const result: DestinyResponse = await response.json()
    destinyData.value = result
    currentStage.value = 'destiny'
  } catch (error) {
    console.error('Failed to get destiny:', error)
    currentStage.value = 'baziform'
  }
}

const handleRestart = () => {
  currentStage.value = 'input'
  roastData.value = null
  destinyData.value = null
  sin.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-black text-gray-200 scanlines overflow-hidden">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <header class="text-center mb-12">
        <h1 class="font-serif text-4xl md:text-5xl text-yellow-600 mb-4 tracking-wider">
          CYBER ORACLE
        </h1>
        <p class="text-amber-500 text-sm tracking-widest uppercase">
          赛博算命 · I Ching Divination
        </p>
      </header>

      <KarmaInput
        v-if="currentStage === 'input'"
        @submit="handleSinSubmit"
      />

      <div v-if="currentStage === 'loading'" class="text-center py-20">
        <div class="text-red-600 text-xl md:text-2xl font-mono animate-pulse">
          Consulting the I Ching...
        </div>
        <div class="mt-4 text-gray-600 text-sm">
          ════════════════════════════
        </div>
      </div>

      <RoastResult
        v-if="currentStage === 'roast' && roastData"
        :data="roastData"
      />

      <PaywallHook
        v-if="currentStage === 'roast' && roastData"
        @unlock="handlePaywallClick"
      />

      <BaZiForm
        v-if="currentStage === 'baziform'"
        :name="sin.split(' ')[0]"
        @submit="handleDestinySubmit"
      />

      <div v-if="currentStage === 'destiny-loading'" class="text-center py-20">
        <div class="text-amber-500 text-lg md:text-xl font-mono">
          <span class="animate-pulse">A</span><span class="animate-pulse delay-75">l</span><span class="animate-pulse delay-100">i</span><span class="animate-pulse delay-150">g</span><span class="animate-pulse delay-200">n</span><span class="animate-pulse delay-250">i</span><span class="animate-pulse delay-300">n</span><span class="animate-pulse delay-350">g</span>
        </div>
        <div class="text-yellow-600 text-xl md:text-2xl font-mono mt-4 animate-pulse">
          Aligning the Four Pillars of Destiny...
        </div>
        <div class="mt-4 text-amber-700 text-sm tracking-widest">
          ▓▓▓▓▓▓▓▓▓▓░░░░░░░░ 75%
        </div>
      </div>

      <DestinyResult
        v-if="currentStage === 'destiny' && destinyData"
        :data="destinyData"
      />

      <footer v-if="currentStage === 'destiny' || currentStage === 'roast'" class="mt-12 text-center">
        <button
          @click="handleRestart"
          class="text-gray-600 hover:text-gray-400 text-sm tracking-wider transition-colors"
        >
          [ CONSULT ANOTHER SIN ]
        </button>
      </footer>
    </div>

    <PaymentModal
      :is-open="showPaymentModal"
      @close="showPaymentModal = false"
      @success="handlePaymentSuccess"
    />
  </div>
</template>

<style scoped>
.delay-75 { animation-delay: 75ms; }
.delay-100 { animation-delay: 100ms; }
.delay-150 { animation-delay: 150ms; }
.delay-200 { animation-delay: 200ms; }
.delay-250 { animation-delay: 250ms; }
.delay-300 { animation-delay: 300ms; }
.delay-350 { animation-delay: 350ms; }
</style>