import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Button,
} from "@chakra-ui/react"
import dompurify from 'dompurify'
import { IArticle } from "models/article"

interface ModalBlogDetail extends Omit<ModalProps, 'children'> {
  article: IArticle | null  
}

const ModalBlogDetail = ({
  onClose,
  article,  
  ...props
}: ModalBlogDetail): JSX.Element => {
  
  if (!article) {
    return null
  }

  return (
    <Modal onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{article.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow='hidden'>
          <div dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(article.content)
          }}></div>          
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalBlogDetail
