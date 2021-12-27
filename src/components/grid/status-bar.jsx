import React from "react";
import { useGridPaginationState } from "../../context/GridPaginationContext";

// class StatusBar extends Component {
//   componentDidMount() {
//     PubSub.subscribe(
//       AppConstants.TOPIC.PAGINATION_CHANGED,
//       this.paginationChanged
//     );
//   }

//   componentWillUnmount() {
//     PubSub.unsubscribe(AppConstants.TOPIC.PAGINATION_CHANGED);
//   }

//   paginationChanged = (_evt, params) => {
//     this.setState({ totalElements: Bro(params).iCanHaz("totalElements") });
//   };

//   render() {
//     const { totalElements = "Loading ..." } = this.state;
//     return (
//       <div className="ag-name-value">
//         <span>{`${t("total.data")}: ${totalElements}`}</span>
//       </div>
//     );
//   }
// }

const StatusBar = () => {
  const gridPaginationState = useGridPaginationState;

  return (
    <div className="ag-name-value">
      <span>Total Data :{gridPaginationState.totalElements}</span>
    </div>
  );
};

export default StatusBar;
