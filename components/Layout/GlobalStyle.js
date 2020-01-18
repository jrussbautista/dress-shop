export default () => {
  return (
    <>
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

          *,
          *::before,
          *::after {
            box-sizing: inherit;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
            --color-primary: #f6463d;
            --color-gray: #f5f5f5;
            --color-dark: #222;
          }
          body {
            font-family: Poppins, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 1.5rem;
          }
          a {
            text-decoration: none;
          }

          ul {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          a {
            text-decoration: none;
          }

          // customize dots in banner
          .dots {
            bottom: 3rem;
          }

          .dots li button:before {
            font-size: 1rem;
          }

          .slick-slider {
            overflow: hidden;
          }
        `}
      </style>
    </>
  );
};
