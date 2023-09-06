import Text from "../ui_components/Text";

const Developers = (props) => {
  const { style, color } = props;
  const developers = ["Trent Jones", "Cody Grimes", "Huiran Lin"].join(", ");
  const text = `Made by ${developers}`;
  return <Text text={text} color={color} style={style} />;
};

export default Developers;
