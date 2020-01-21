import PropTypes from 'prop-types';

const Alert = ({ type, message }) => {
  return (
    <>
      <div className={`alert alert-${type}`}>{message}</div>
      <style jsx>
        {`
          .alert {
            padding: 1.2rem 1rem;
            border-radius: 6px;
            font-size: 1.6rem;
          }

          .alert-error {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
          }
        `}
      </style>
    </>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Alert;
