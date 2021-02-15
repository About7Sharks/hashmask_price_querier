import {getHashMask, getFloorPrice} from './query.ts'

console.log(await getHashMask(2000),`\n Mask Token ${await getFloorPrice()}`)
