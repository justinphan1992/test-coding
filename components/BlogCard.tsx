import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,  
  useColorModeValue,
} from '@chakra-ui/react';

type TBlogCardProps = {
  title: string,
  description: string,
  imageUrl: string,
  author: string,
  publishDate: string
  key?: string,
}

const BlogCard = ({
  title,
  description,
  imageUrl,
  author,
  publishDate,
  ...props
}: TBlogCardProps): JSX.Element => {
  return (
    <Center cursor='pointer' py={6} key={props?.key}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            alt={title}
            src={imageUrl}
            layout={'fill'}
          />
        </Box>
        <Stack>         
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {title}
          </Heading>
          <Text color={'gray.500'}>
           {description}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>    
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{author}</Text>
            <Text color={'gray.500'}>{publishDate}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

export default BlogCard