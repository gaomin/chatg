<script setup lang="ts">
import { ref, onMounted, reactive, inject } from 'vue'
import Card from './components/card.vue'
interface IState {
  data: Array<{ type: 'request' | 'response'; msg: string | HTMLElement }>
}

const input = ref<HTMLInputElement>()
let ws: WebSocket
const state: IState = reactive({
  data: []
})

onMounted(() => {
  const socket: (() => WebSocket) | undefined = inject('socket')
  if (!socket) return
  ws = socket()
  ws.onopen = () => {
    // let msg = {
    //   type: 'screen',
    //   classId: 1
    // }
    // ws.send(JSON.stringify(msg))
    console.log('ws onOpen!')
  }
  ws.onmessage = ({ data }: any) => {
    console.log('response', data)
  }
})

function sendMessage() {
  const text = input.value?.value?.trim()
  if (text) {
    state.data.push({
      type: 'request',
      msg: text
    })
  }
  if (input.value) {
    input.value.value = ''
  }

  ws.send(
    JSON.stringify({
      msg: text
    })
  )
}
</script>

<template>
  <div class="flex flex-wrap justify-center items-end h-screen">
    <div class="h-5/6 w-4/5 p-2 border border-red-500 overflow-auto">
      <Card type="request" text="this is a question"></Card>
      <Card type="response" text="this is a response"></Card>
      <template v-for="item in state.data">
        <Card :type="item.type" :text="item.msg"></Card>
      </template>
    </div>
    <input
      ref="input"
      class="w-6/12 h-10 p-2 border border-purple-500 rounded-l focus:outline-none"
      @keyup.enter="sendMessage"
    />
    <button class="w-16 md:w-24 h-10 bg-purple-500 rounded-r text-white" @click="sendMessage">
      发 送
    </button>
  </div>
</template>
