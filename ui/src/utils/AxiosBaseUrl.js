import dev from './GetDevEnvironmnent';

const axiosBaseUrl = () =>
  dev()
    ? `https://localhost:8443/`
    : `https://deployment-imfinewithwhatever-server.vercel.app/`;

export default axiosBaseUrl;
