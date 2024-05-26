// pages/_error.js
import React from 'react';
import style from '@/styles/ErrorPage.module.css';

const ErrorPage = ({ statusCode }) => {
  return (
    <div className={style.root}>
      <h1>The Page your are looking for is not present</h1>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
