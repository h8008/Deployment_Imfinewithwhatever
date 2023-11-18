import { createContext, useContext, Component, Fragment } from "react";
import API from "../API_Interface";
import { BackgroundDispatchContext } from "../providers/BackgroundDispatchProvider";

const BackgroundDispatcher = () => {
  const { backgroundDispatchState } = useContext(BackgroundDispatchContext);

  return (
    <Fragment>
      {backgroundDispatchState.shouldHydrate && (
        <BackgroundDispatcherComponent
          content={{ data: backgroundDispatchState.data, email: backgroundDispatchState.email }}
          apiInterface={backgroundDispatchState.apiInterface}
          fn={backgroundDispatchState.func}
        />
      )}
    </Fragment>
  );
};

class BackgroundDispatcherComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content == null ? null : props.content,
      apiInterface: props.apiInterface,
    };
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch = async () => {
    const res = await API[this.state.apiInterface].fn(this.state.content);
  };

  componentDidMount() {
    var self = this;
    async function dispatch(self) {
      if (Object.keys(self.state.content.data).length > 0) {
        await self.dispatch();
      }
    }
    dispatch(self);
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default BackgroundDispatcher;
