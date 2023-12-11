import dev from "./GetDevEnvironmnent";

const axiosBaseUrl = () =>
  dev() ? `http://localhost:8443/` : `https://deployment-imfinewithwhatever-server.vercel.app/`;
// `http://localhost:8443/`;

export default axiosBaseUrl;
