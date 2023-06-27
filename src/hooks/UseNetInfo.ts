import {
  getAccount,
  getWalletClient,
  Connector,
  WalletClient,
  getNetwork,
  getPublicClient,
} from '@wagmi/core'
import { optimism } from '@wagmi/core/chains'

interface AccountInfo {
  address?: string
  connector?: Connector
  isConnecting: boolean
  isReconnecting: boolean
  isConnected: boolean
  isDisconnected: boolean
  status: 'connecting' | 'reconnecting' | 'connected' | 'disconnected'
}

import Web3 from 'web3'

//登录的信息
export const useAccount = (): AccountInfo => {
  const accountInfo = getAccount()
  return accountInfo
}

export const UseNetwork = (): any[] => {
  const { chain, chains } = getNetwork()
  // 第一个是当前连接的Chain信息，第二个是你配置的链
  return [chain, chains]
}

export const useSigner = async (chainId: {
  chainId: number
}): Promise<WalletClient | null> => {
  const signer = await getWalletClient({
    chainId: optimism.id,
  })
  if (signer) {
    return signer
  } else {
    return null
  }
}

export const useWeb3 = () => {
  const provider: any = getPublicClient({
    chainId: 280,
  })

  const RPCUrl = provider?.chain?.rpcUrls?.public?.http[0]
  const web3 = new Web3(RPCUrl)
  console.log(web3)
}
