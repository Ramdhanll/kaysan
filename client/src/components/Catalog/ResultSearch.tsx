import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import PropertyItem from '../Home/PropertyItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import PropertyItemSearch from './PropertyItemSearch'

type Props = {}

const ResultSearch = (props: Props) => {
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
         paddingX={[0, 0, 0, 10]}
         paddingY={6}
         overflow={'hidden'}
         w={'73vw'}
         position={'relative'}
         bg={'white'}
         mt={3}
         textAlign='left'
      >
         <Text fontSize={['lg', '2xl']} mb={3} fontWeight={'medium'}>
            1,032 Results
         </Text>
         <Slider {...settings}>
            <PropertyItemSearch />
            <PropertyItemSearch />
            <PropertyItemSearch />
            <PropertyItemSearch />
            <PropertyItemSearch />
            <PropertyItemSearch />
         </Slider>
      </Box>
   )
}

export default ResultSearch
