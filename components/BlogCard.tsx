import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,  
  useColorModeValue,
} from '@chakra-ui/react';
import { IArticle } from 'models/article';
interface IBlogCardProps extends IArticle  {
  key: string,
  onClick: () => void
}

const BlogCard = ({
  title,
  description,
  image,
  author,
  publishDate,
  onClick,
  ...props
}: IBlogCardProps): JSX.Element => {
  return (
    <Center onClick={onClick} cursor='pointer' py={6} key={props?.key}>
      <Box
        maxW={'445px'}
        minH={'490px'}
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
            src={image}
            layout={'fill'}
          />
        </Box>
        <Stack>         
          <Heading
            minH={'84px'}
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {title}
          </Heading>
          <Text minH={'72px'} color={'gray.500'}>
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