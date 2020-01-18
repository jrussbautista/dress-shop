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
        `}
      </style>
    </>
  );
};

export default SkeletonBanner;
