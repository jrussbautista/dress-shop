const SkeletonCart = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div className="container" key={i}>
          <div style={{ display: 'flex', width: '45%' }}>
            <div className="box"></div>
            <div>
              <div className="line"></div>
            </div>
          </div>
          <div className="right">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      ))}
      <div className="bottom">
        <div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          margin-bottom: 2rem;
        }
        .box {
          width: 15rem;
          height: 15rem;
          background-color: #eee;
          margin-right: 2rem;
        }

        .line {
          background-color: #eee;
          height: 3rem;
          width: 20rem;
          margin-right: 1rem;
        }

        .right {
          flex: 1;
          display: flex;
        }

        .right .line {
          margin-top: 3rem;
        }

        .bottom {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 2rem;
        }
      `}</style>
    </>
  );
};

export default SkeletonCart;
