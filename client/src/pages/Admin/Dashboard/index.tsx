import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { FC } from 'react'
import StatsCard from '../../../components/StatsCard'
import { BsPerson } from 'react-icons/bs'
import { FiServer } from 'react-icons/fi'
import { GoLocation } from 'react-icons/go'

interface IDashboard {}

const Dashboard: FC<IDashboard> = () => {
   return (
      <Box textAlign='left' py={3}>
         <Heading>DASHBOARD</Heading>
         <Flex
            gridGap={{ base: 3, md: 5 }}
            mt={5}
            // flexDirection={{ base: 'column', md: 'row' }}
            flexDirection={['column', 'column', 'column', 'row']}
            justifyContent='center'
            alignItems='center'
         >
            <StatsCard
               title={`Today's sales`}
               stat={'IDR 235,000'}
               icon={<BsPerson size={'3em'} />}
            />
            <StatsCard
               title={'Desember sales'}
               stat={'IDR 12,341,000'}
               icon={<FiServer size={'3em'} />}
            />
            <StatsCard
               title={'2021 sales'}
               stat={'IDR 80,109,007'}
               icon={<GoLocation size={'3em'} />}
            />
         </Flex>
      </Box>
   )
}

export default Dashboard
