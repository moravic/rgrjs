import React from "react";
// import API from "../API.js"
// import LinkStore from "../stores/LinkStore"
import Relay from 'react-relay';
import Link from './Links';

// let _getAppState = () => {
//   return {
//     links: LinkStore.getAll()
//   };
// };

class Main extends React.Component {
  // static propTypes = {
  //   limit: React.PropTypes.number
  // }
  //
  // static defaultProps = {
  //   limit: 5
  // }

  // state = _getAppState();
  //
  // componentWillMount() {
  //   API.fetchLinks();
  //   LinkStore.on("change", this.onChange);
  // }
  // componentWillUnmount() {
  //   LinkStore.removeListener("change", this.onChange);
  // }
  // componentDidMount() {
  //   //debugger;
  // }
  // onChange = () => {
  //   console.log("In View");
  //   this.setState(_getAppState());
  // }

  render() {
    // slice(0, this.props.limit)
    let content = this.props.store.links.map(link => {
      return <Link
        key={link._id}
        link={link} />;
    });
    return ( < div >
      < h3 > This is cool < /h3> < ul > {content} < /ul > < /div >
    );
  }
}

// Declare the data requeriment for this component
Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL`
    fragment on Store {
        links {
          _id,
          ${Link.getFragment('link')}
        }
    }
    `
  }
});

export default Main;
