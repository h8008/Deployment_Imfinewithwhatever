import logo from "../Assets/Logo.png";
import Image from "../ui_components/Image";

const Logo = (props) => {
  return <Image imageUrl={logo} height={props.height} width={props.width} />;
};

export default Logo;
