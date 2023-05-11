import { useEffect, useState } from 'react'
import { usePairContract } from './useContract'

type ApiResponse = {
  prices: {
    [key: string]: string
  }
  update_at: string
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.pancakeswap.com/api/v1/price'

const useGetPriceData = () => {

  const pairContract = usePairContract("0x5616bef3b80a00a0ddd35a33f169868f7b2f0c46")

  const [[sishiAmount, busdAmount, loaded], setReverses] = useState([0,1, false])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [_sishi, _busd] = await pairContract?.getReserves()
        
        setReverses([Number(_sishi),Number( _busd), true]);

      } catch (error) {
        setReverses([0, 1, false]);
      }
    }

    fetchData()
  },[setReverses, pairContract])

  return {
    prices: loaded ? {
      SISHI: busdAmount / sishiAmount
    } : {}
  }

}

export default useGetPriceData
