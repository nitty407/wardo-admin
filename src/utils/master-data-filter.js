import Bro from "brototype";
// import Api from "./api";
import API from "./api";

const MasterDataFilter = {
  async fetch(params, collection, filters) {
    const field = Bro(params).iCanHaz("colDef.field");
    const url = encodeURI(`/${collection}/column/master?column=${field}`);

    try {
      const resp = await API.post(url, { filterModel: filters || {} });
      const data = Bro(resp).iCanHaz("data");
      params.success(data);
    } catch (error) {
      console.log(error);
    }
  }
};

export default MasterDataFilter;
