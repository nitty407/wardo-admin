import API from "./api";
import Bro from "brototype";

const ServerDataSource = {
  instance({ size, url, defaultFilter, deepFilter }) {
    return {
      getRows(params) {
        const page =
          (Bro(params).iCanHaz("request.endRow") || 0) / (size || 1) - 1;

        const filters =
          defaultFilter || Bro(params).iCanHaz("request.filterModel") || {};

        const obj = {
          deepFilter,
          page,
          size,
          filterModel: filters,
          sortModel: (Bro(params).iCanHaz("request.sortModel") || []).map(
            aSort => {
              return {
                sort: aSort.sort.toUpperCase(),
                colId: aSort.colId
              };
            }
          )
        };

        API.post(`${url}/search`, obj)
          .then(resp => {
            const data = Bro(resp).iCanHaz("data");
            const { content, ...pageProps } = data || {};

            params.successCallback(content, pageProps.totalElements);
          })
          .catch(err => {
            params.failCallback();
          });
      }
    };
  }
};

export default ServerDataSource;
