const SkeletonBanner = () => {
  return (
    <>
      <div className="container"></div>
      <style jsx>
        {`
          .container {
            height: 60rem;
            position: relative;
            background-color: #eee;
          }

          @media only screen and (max-width: 768px) {
            .container {
              height: 40rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default SkeletonBanner;
