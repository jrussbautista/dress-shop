const SkeletonProduct = () => {
  return (
    <>
      <div className="skeleton-container">
        <div className="left">
          <div className="main-cover">
            <div className="box"></div>
          </div>
        </div>
        <div className="right">
          <div className="line"></div>
          <div className="half-line line"></div>
          <div className="big-line line"></div>
          <div className="line-wrapper">
            <div className="medium-line line"></div>
            <div className="line-with-radius line "></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .skeleton-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          grid-gap: 2rem;
        }

        .main-cover {
          position: relative;
          padding-bottom: 100%;
          background-color: #eee;
        }

        .left {
          padding: 0 2rem;
        }

        .box {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: contain;
        }

        .right {
          padding: 0 2rem;
        }

        .line {
          height: 3rem;
          background-color: #eee;
          width: 100%;
        }

        .half-line {
          margin-top: 2rem;
          width: 50%;
        }

        .big-line {
          margin-top: 3rem;
          height: 7rem;
          width: 100%;
        }

        .line-wrapper {
          margin-top: 3rem;
          display: flex;
        }

        .medium-line {
          height: 5rem;
          width: 40%;
          margin-right: 2rem;
        }

        .line-with-radius {
          height: 5rem;
          border-radius: 50px;
          width: 40%;
        }
      `}</style>
    </>
  );
};

export default SkeletonProduct;
