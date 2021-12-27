import MasterDataFilter from "./master-data-filter";

class FilterOptions {
  constructor({ collection }) {
    this.collection = collection;
  }

  setFilter = (filters, vals) => {
    return {
      filter: "agSetColumnFilter",
      filterParams: {
        values:
          vals ||
          (params => MasterDataFilter.fetch(params, this.collection, filters)),
        newRowsAction: "keep",
        clearButton: true,
        selectAllOnMiniFilter: true,
        syncValuesLikeExcel: true
      }
    };
  };

  dateFilter = () => {
    return {
      filter: "dateFilter"
    };
  };

  numberFilter = () => {
    return {
      filter: "agNumberColumnFilter",
      filterParams: {
        clearButton: true
      }
    };
  };

  booleanFilter = () => {
    return {
      filter: "booleanFilter"
    };
  };

  chooseAptFilter = (datatype, filters, suppress, actual) => {
    if (filters || suppress) {
      return {};
    }

    if ("NUMBER" === datatype) {
      return this.numberFilter();
    }
    if ("BOOLEAN" === datatype) {
      return this.booleanFilter();
    }
    if ("DATE" === datatype) {
      return this.dateFilter();
    }
    return this.setFilter(actual);
  };
}

export default FilterOptions;
