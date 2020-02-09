import PropTypes from 'prop-types';

const SkeletonGrid = ({ number }) => {
  return (
    <>
      <div className="grid">
        {[...Array(number)].map((_, i) => (
          <div key={i} className="grid-item">
            <div className="grid-box-wrapper">
              <div className="grid-box"></div>
            </div>
            <div className="info">
              <div className="line"></div>
              <div className="half-line"></div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 2rem;
            padding: 0 2rem;
          }

          @media only screen and (min-width: 768px) {
            .grid {
              grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
            }
          }

          .grid-box-wrapper {
            position: relative;
            padding-top: 100%;
          }

          .grid-box {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            background-color: #eee;
          }

          .info {
            padding: 1rem 0;
          }

          .line {
            height: 2rem;
            width: 100%;
            background-color: #eee;
          }

          .half-line {
            height: 2rem;
            margin-top: 1rem;
            background-color: #eee;
            width: 50%;
          }
        `}
      </style>
    </>
  );
};

SkeletonGrid.propTypes = {
  number: PropTypes.number.isRequired
};

export default SkeletonGrid;
