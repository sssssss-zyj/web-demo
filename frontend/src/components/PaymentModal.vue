<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const isProcessing = ref(false)
const isPaid = ref(false)

const handlePayPalSuccess = () => {
  isPaid.value = true
  isProcessing.value = false
  setTimeout(() => {
    emit('success')
  }, 1500)
}

const handleMockPayment = () => {
  isProcessing.value = true
  setTimeout(() => {
    handlePayPalSuccess()
  }, 2000)
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = `https://www.paypal.com/sdk/js?client-id=sb&currency=USD`
  script.async = true
  document.body.appendChild(script)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="emit('close')"></div>

      <div class="relative bg-gradient-to-b from-amber-950 to-black border border-amber-600/50 rounded-lg p-6 w-full max-w-md animate-fade-in">
        <button
          @click="emit('close')"
          class="absolute top-3 right-3 text-amber-700 hover:text-amber-500 transition-colors text-xl"
        >
          ✕
        </button>

        <div class="text-center">
          <div class="text-4xl mb-4">🔮</div>
          <h2 class="font-serif text-2xl text-amber-500 mb-2">Unlock True Destiny</h2>
          <p class="text-amber-700/80 text-sm mb-6">Premium BaZi Reading - $9.99</p>
        </div>

        <div v-if="!isPaid" class="space-y-6">
          <div class="border border-amber-600/30 rounded p-4 bg-amber-900/20">
            <p class="text-amber-400 text-sm mb-3 text-center">PayPal Payment</p>
            <div class="flex justify-center">
              <button
                @click="handleMockPayment"
                :disabled="isProcessing"
                class="w-full py-3 bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold rounded transition-colors disabled:opacity-50"
              >
                {{ isProcessing ? 'Processing...' : 'Pay with PayPal' }}
              </button>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-amber-800"></div>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-black px-2 text-amber-800">Or</span>
            </div>
          </div>

          <div class="border border-amber-600/30 rounded p-4 bg-amber-900/10">
            <p class="text-amber-500 text-xs mb-3 text-center tracking-widest">SCAN TO PAY</p>
            <div class="flex justify-center">
              <div class="bg-white p-4 rounded">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=paypal.me/test123"
                  alt="PayPal QR Code"
                  class="w-36 h-36"
                />
              </div>
            </div>
            <p class="text-amber-700 text-xs text-center mt-3">
              Send $9.99 to: <span class="text-amber-500">paypal.me/cyberoracle</span>
            </p>
          </div>

          <button
            @click="handleMockPayment"
            class="w-full py-2 border border-amber-700/50 text-amber-600 text-sm rounded hover:bg-amber-900/20 transition-colors"
          >
            I've Paid - Verify Payment
          </button>

          <p class="text-amber-900/60 text-xs text-center">
            * This is a demo. No real payment required.
          </p>
        </div>

        <div v-else class="text-center py-8">
          <div class="text-6xl mb-4">✅</div>
          <p class="text-amber-400 font-serif text-xl">Payment Verified!</p>
          <p class="text-amber-600 text-sm mt-2">Loading your destiny...</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.animate-fade-in {
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>