<!--  -->
<script setup lang="ts">
import { reactive, ref, onBeforeMount, onMounted } from 'vue'
import { initModal } from './hooks/Useweb3modal'
import { useAccount, UseNetwork, useWeb3 } from './hooks/UseNetInfo'
import { Chain, watchAccount, watchNetwork } from '@wagmi/core'

let ShowAccount = ref()
let showChain = ref<Chain>()
const modal = initModal()

const onModal = () => {
  modal.openModal()
}

watchAccount((account) => {
  ShowAccount.value = account.address
})

watchNetwork((network) => {
  showChain.value = network.chain
})

onMounted(() => {
  const Accountinfo = useAccount()
  if (Accountinfo.address) {
    ShowAccount.value = Accountinfo.address
  }

  const [LinkNetwork, chains] = UseNetwork()
  if (LinkNetwork) {
    showChain.value = LinkNetwork
  }
  console.log(LinkNetwork)

  useWeb3()
})
</script>

<template>
  <div>使用官方文档示例的连接wbe3modal的方式</div>
  <div style="display: flex; align-items: center; justify-content: center">
    <w3m-balance /><w3m-core-button />
  </div>
  <p>调用自己的方法打开web3modal的方式</p>
  <div>
    <button @click="onModal">onpenweb3Modal</button>
    <p>account:{{ ShowAccount }}</p>
    <p>chain: {{ showChain?.name }}& ID:{{ showChain?.id }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
