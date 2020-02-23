const SkeletonBanner = () => {
  return (
    <>
      <div className="container"></div>
      <style jsx>
        {`
          .container {
            height: 55rem;
            position: relative;
            background-color: #eee;
          }

          @media only screen and (max-width: 768px) {
            .container {
              height: 35rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default SkeletonBanner;
