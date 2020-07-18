export const HomeCategoriesSkeleton = () => {
  return (
    <>
      <div className="grid">
        {[...Array(2)].map((_, i) => (
          <div key={i}>
            <div className="grid-box-wrapper">
              <div className="grid-box"></div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
            grid-gap: 2rem;
            padding: 0 2rem;
          }

          .grid-box-wrapper {
            position: relative;
            padding-top: 56.25%;
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
        `}
      </style>
    </>
  );
};
