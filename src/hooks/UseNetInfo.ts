import {
  getAccount,
  fetchSigner,
  Connector,
  Signer,
  getNetwork,
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
}): Promise<Signer | null> => {
  const signer = await fetchSigner({
    chainId: optimism.id,
  })
  if (signer) {
    return signer
  } else {
    return null
  }
}
