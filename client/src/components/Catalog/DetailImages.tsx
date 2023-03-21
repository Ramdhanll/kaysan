import { Box, Button, Flex, Image } from '@chakra-ui/react'
import React, { useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
// import 'swiper/css'
// import 'swiper/css/free-mode'
// import 'swiper/css/navigation'
// import 'swiper/css/thumbs'

import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/swiper-bundle.min.css'
// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper'

type Props = {
   images: string[]
}

const DetailImages = ({ images }: Props) => {
   console.log('images', images)
   const [thumbsSwiper, setThumbsSwiper] = useState(null)

   return (
      <Box
         flex='0.5'
         h='100%'
         // display={'flex'}
         flexDir='column'
         alignItems={'start'}
         justifyContent='start'
         // bg='red.200'
      >
         <Swiper
            style={{
               // @ts-ignore
               '--swiper-navigation-color': '#fff',
               '--swiper-pagination-color': '#fff',
               width: '500px',
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className='mySwiper2'
         >
            {images.map((image: any) => (
               <SwiperSlide>
                  <Image src={image?.url_image} borderRadius={'md'} />
               </SwiperSlide>
            ))}
         </Swiper>
         {/* <Box my={3}></Box>
         <Swiper
            style={{
               width: '500px',
            }}
            // @ts-ignore
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className='mySwiper'
         >
            {images.map((image: any) => (
               <SwiperSlide>
                  <Image
                     cursor={'pointer'}
                     src={image?.url_image}
                     borderRadius={'md'}
                  />
               </SwiperSlide>
            ))}
         </Swiper> */}
      </Box>
   )
}

export default DetailImages
