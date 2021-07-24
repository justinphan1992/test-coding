import { useEffect, useState } from 'react';
import firebase from 'services/firebase';
import { IArticle } from 'models/article'

const db = firebase.database()

type TGetArticlesProps = {
  loading: boolean,
  articles: IArticle[]
}

const useGetArticles = (): TGetArticlesProps => {
  const [ articles, setArticles ] = useState<IArticle[]>([])
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    const ref = db.ref('articles')

    ref.on('value', (snapshot) => {      
      setArticles(snapshot.val())
      setLoading(false)
      console.log(snapshot.val())
    })

    return () => ref.off()
  })

  return { articles, loading }
}

export default useGetArticles