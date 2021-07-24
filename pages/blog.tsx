
import {
  Container,      
  Grid,
  Heading,
} from '@chakra-ui/react';
import BlogCard from 'components/BlogCard';
import useAuthValidation from 'hooks/useAuthValidation';

import useGetArticles from 'hooks/useGetArticles';

const Blog = (): JSX.Element => {
  useAuthValidation()
  const { articles, loading } = useGetArticles()

  console.log(articles, loading)
  
  return (
    <Container maxW='container.lg'>
      <Heading textAlign="center" mt={6} as="h1" mb={6}>
        Blogs
      </Heading>   
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {
          [...Array(10)].map((key, index) => (
            <BlogCard
              key={`blog-${index}`}
              title="Boost your conversion rate"
              imageUrl="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
              author="Achim Rolle"
              publishDate="Feb 08, 2021"
            />
          ))
        }
      </Grid>
    </Container>
  )
}

export default Blog