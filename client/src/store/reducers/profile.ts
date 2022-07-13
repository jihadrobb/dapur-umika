import { AnyAction } from '@reduxjs/toolkit'

import mix from '../../assets/images/mix.png'

interface ProfileState {
  motto: string
  sections: Section[]
}

interface Section {
  background: 'light' | 'dark'
  text: 'light' | 'dark'
  textDescription: 'light' | 'dark'
  topline?: string
  headline: string
  description: string
  buttonText?: string
  buttonDestination?: string
  imageUrl?: string
  imagePosition?: 'left' | 'right'
  imageAlt?: string
}

const initialState: ProfileState = {
  motto: 'Dapurumika, dapurnyo uong kito galo',
  sections: [
    {
      background: 'dark',
      text: 'light',
      textDescription: 'light',
      topline: 'ASLI PALEMBANG',
      headline: 'FRESH AND BEST QUALITY PRODUCTS',
      imagePosition: 'left',
      imageUrl: mix,
      imageAlt: 'mix',
      description:
        'Kami adalah bagian dari penyedia ikan giling dan bahan baku pempek, siap melayani permintaan dalam kapasitas banyak ataupun sedikit'
    },
    {
      background: 'light',
      text: 'dark',
      textDescription: 'dark',
      imagePosition: 'right',
      // topline:'',
      headline: 'OUR PRODUCTS',
      description:
        'Kami menyediakan berbagai jenis ikan giling seperti tenggiri, gabus, dan kakap serta sarden. Adapun bahan baku pempek, seperti gula batok, udang rebon, asam jawa dsb. Kami juga menyediakan berbagai macam jenis pempek, seperti pempek ikan kakap, gabus maupun tenggiri'
    }
  ]
}

export default (state: ProfileState = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'RESET':
      return initialState
    default:
      return state
  }
}
