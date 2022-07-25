import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ThreeDots width="100" radius="9" color="#4fa94d" />
    </div>
  );
};

export default Loader;
