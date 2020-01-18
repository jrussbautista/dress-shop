const SkeletonOrders = () => {
  return (
    <div>
      <div className="container">
        {[...Array(2)].map((_, i) => (
          <div key={i}>
            <div className="line" style={{ width: '30%' }}></div>
            {[...Array(3)].map((_, i) => (
              <div className="box-wrapper" key={i}>
                <div className="box"></div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flex: 1
                  }}
                >
                  <div>
                    <div className="line" style={{ width: '20rem' }}></div>
                    <div className="line" style={{ width: '10rem' }}></div>
                  </div>
                  <div className="line" style={{ width: '10rem' }}></div>
                </div>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '2rem'
              }}
            >
              <div
                className="line"
                style={{ width: '20rem', height: '5rem' }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
            .line {
                height: 3rem;
                background-color: #eee;
                width: 100%;
                margin-bottom: 2rem;
            }

            .box-wrapper {
                display: flex;
                margin-bottom: 1rem
            }

            .small-line{
                width: 30%;
            }

            .box {
                width: 15rem;
                height: 15rem;
                background-color: #eee;
                margin-right: 2rem;
            }
            
         `}
      </style>
    </div>
  );
};

export default SkeletonOrders;
