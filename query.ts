import {median} from './util.ts'
export const getHashMask=async(offset:number)=>{
let data =await(await fetch(`https://api.opensea.io/api/v1/assets?asset_contract_address=0xc2c747e0f7004f9e8817db2ca4997657a7746928&limit=50&on_sale=true&offset=${offset}`)).json()
let HashMasks =data.assets.filter((mask:any)=> {if (mask.sell_orders[0]!==undefined) return mask})
let onSale=HashMasks.map((mask:any)=> {
  return {
    posted:mask.sell_orders[0].listing_time,
    price:mask.sell_orders[0].current_price/1000000000000000000 //convert wei to eth
  }
  })
let allMasksPrice = onSale.reduce((result:number,item:any)=>{
  return item.price+result
},0)
let avgPrice = allMasksPrice/onSale.length
let prices=onSale.map((mask:any)=>{ return mask.price})
return {
  Average: (avgPrice.toFixed(5) as any*1),
  Max: Math.max(...prices),
  Min:Math.min(...prices),
  Median: median(prices),
}
}
export const getFloorPrice=async()=>{
  return (await(await fetch('https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x0fe629d1E84E171f8fF0C1Ded2Cc2221Caa48a3f&vs_currencies=Eth')).json())['0x0fe629d1e84e171f8ff0c1ded2cc2221caa48a3f'].eth
}
