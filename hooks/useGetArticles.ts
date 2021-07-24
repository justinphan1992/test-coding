import { useEffect, useState } from 'react';
import firebase from 'services/firebase';
import { IArticle } from 'models/article'

const db = firebase.firestore()

type TGetArticlesProps = {
  loading: boolean,
  articles: IArticle[]
}

const useGetArticles = (): TGetArticlesProps => {
  const [ articles, setArticles ] = useState<IArticle[]>([])
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    const unsubscribe = db.collection('/articles').onSnapshot((snapshot) => {
      const docs = []
      snapshot.docs.forEach((doc) => docs.push({...doc.data(), id: doc.id }))
      setArticles(docs)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return { articles, loading }
}

export default useGetArticles