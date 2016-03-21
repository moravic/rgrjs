import {
  post
} from "jquery";
import ServerActions from "./actions/ServerActions"

let API = {
  fetchLinks() {
    console.log('API');
    // Ajax request to read /data/links
    post("/graphql", {
        query: `{
          links {
            _id
            title
            url
          }
        }`
  }).done(resp => {
    //debugger;
    ServerActions.receiveLinks(resp.data.links);
    console.log(resp.data.links);
  });
}
};

export default API;
