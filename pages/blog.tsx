
import { useState } from 'react';
import {
  Container,      
  Grid,
  Heading,  
} from '@chakra-ui/react';
import BlogCard from 'components/BlogCard';
import useAuthValidation from 'hooks/useAuthValidation';
import useGetArticles from 'hooks/useGetArticles';
import { IArticle } from 'models/article';
import ModalBlogDetail from 'components/ModalBlogDetail';

const Blog = (): JSX.Element => {
  useAuthValidation()
  const { articles } = useGetArticles()
  const [ selectedArticle, setSelectedArticle ] = useState<IArticle | null>(null)
  
  return (
    <Container maxW='container.lg'>
      <Heading textAlign="center" mt={6} as="h1" mb={6}>
        Blogs
      </Heading>   
      <Grid templateColumns="repeat(3, 1fr)" alignItems="start" gap={6}>
        {
          articles.map((article) => (
            <BlogCard onClick={() => setSelectedArticle(article)} key={article.id} {...article} />
          ))
        }       
      </Grid>
      <ModalBlogDetail 
        size="3xl"
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
      />
    </Container>
  )
}

export default Blog