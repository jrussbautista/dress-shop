export default () => {
  return (
    <>
      <div className="banner">
        <img
          src="https://colorlib.com/preview/theme/cozastore/images/slide-01.jpg"
          alt=""
        />
      </div>
      <style jsx>
        {`
          .banner {
            height: 50rem;
            position: relative;
          }

          .banner img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}
      </style>
    </>
  );
};
