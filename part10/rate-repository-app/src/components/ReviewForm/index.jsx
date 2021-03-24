import useCreateReview from '../../hooks/useCreateReview'
import React from 'react'
import ReviewFormContainer from './ReviewFormContainer'
import { useHistory } from 'react-router';




const ReviewForm = ()=>{
    const [createReview] = useCreateReview();
    const history = useHistory()
    const onSubmit = async (values) => {
        const { repositoryName, ownerName, rating , text } = values
        try {
            const { data } = await createReview({ repositoryName, ownerName, rating , text });
            history.push(`/repository/${data.createReview.repository.id}`)
            console.log(data)
          } catch (e) {
            console.log(e);
        } 
    }
    return (
        <ReviewFormContainer  onSubmit = {onSubmit}/>
    )
}

export default ReviewForm;