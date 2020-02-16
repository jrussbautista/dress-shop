function Error({ statusCode }) {
  return (
    <>
      <div className="msg">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </div>
      <style jsx>{`
        .msg {
          text-align: center;
          padding: 5rem 0;
          font-size: 2.5rem;
        }

        .msg h1 {
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
