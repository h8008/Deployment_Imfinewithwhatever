import dev from './GetDevEnvironmnent';

console.log('development? ', dev());

const axiosBaseUrl = () =>
  dev()
    ? `http://localhost:8443/`
    : `https://deployment-imfinewithwhatever-server.vercel.app/`;

export default axiosBaseUrl;
