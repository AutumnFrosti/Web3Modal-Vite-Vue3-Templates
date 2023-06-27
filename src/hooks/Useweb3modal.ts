// 相关依赖
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'

//选择网络
import {
  arbitrum,
  mainnet,
  polygon,
  zkSync,
  zkSyncTestnet,
} from '@wagmi/core/chains'

const projectId = import.meta.env.VITE_PROJECT_KEY // 输入你在 https://cloud.walletconnect.com/  申请的projectId

export const initModal = (): Web3Modal => {
  const chains = [arbitrum, mainnet, polygon, zkSyncTestnet]

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiClient = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  })
  const ethereumClient = new EthereumClient(wagmiClient, chains)
  const web3modal = new Web3Modal({ projectId }, ethereumClient)
  //设置默认链
  web3modal.setDefaultChain(zkSyncTestnet)
  return web3modal
}
