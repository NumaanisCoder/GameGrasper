import React from 'react'
import style from '@/components/comment/CommentStyle.module.css';

const SingleComment = ({data}) => {
    const {username, message} = data;
  return (
    <div className={style.root}>
      <p>{username} : <span>{message}</span> </p>
    </div>
  )
}

export default SingleComment
