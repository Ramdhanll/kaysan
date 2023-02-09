import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import PropertyItem from './PropertyItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

type Props = {}

const Recomendations = (props: Props) => {
   var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
               infinite: true,
               dots: true,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               initialSlide: 2,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
            },
         },
      ],
   }

   return (
      <Box
         paddingX={[0, 0, 0, 20]}
         paddingY={6}
         overflow={'hidden'}
         w={'full'}
         position={'relative'}
         bg={'white'}
         mt={3}
      >
         <Text fontSize={['lg', '2xl']} mb={3} fontWeight={'medium'}>
            {' '}
            Rekomendasi{' '}
         </Text>
         <Slider {...settings}>
            <PropertyItem />
            <PropertyItem />
            <PropertyItem />
            <PropertyItem />
            <PropertyItem />
            <PropertyItem />
         </Slider>
      </Box>
   )
}

export default Recomendations
