import { useGetAllOrderQuery } from "../../Apis/orderApi";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Page/Common";
import withAdminAuth from "../../HOC/withAdminAuth";
import React, { useEffect, useState } from "react";
import { inputHelper } from "../../Helper";
import { SD_Status } from "../../Utility/SD";
// import { orderHeaderModel } from "../../Interfaces";

const filterOptions = [
  "All",
  SD_Status.CONFIRMED,
  SD_Status.BEING_COOKED,
  SD_Status.READY_FOR_PICKUP,
  SD_Status.CANCELLED,
];

function AllOrders() {
  const [filters, setFilters] = useState({ searchString: "", status: "" });
  const [orderData, setOrderData] = useState([]);
  // for pgination
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });

  // for filter
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);

  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });

  // get filter records
  const { data, isLoading } = useGetAllOrderQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  // Add input helper
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  // filter functionality called on button click
  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });
    // const tempData = data.result.filter((orderData: orderHeaderModel) => {
    //   if (
    //     (orderData.pickupName &&
    //       orderData.pickupName.includes(filters.searchString)) ||
    //     (orderData.pickupEmail &&
    //       orderData.pickupEmail.includes(filters.searchString)) ||
    //     (orderData.pickupPhoneNumber &&
    //       orderData.pickupPhoneNumber.includes(filters.searchString))
    //   ) {
    //     return orderData;
    //   }
    // });
    // const finalArray = tempData.filter((orderData: orderHeaderModel) =>
    //   filters.status !== "" ? orderData.status === filters.status : orderData
    // );
    //setOrderData(finalArray);
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.apiResponse.result);
      // set the records for paginiation
      const { TotalRecords } = JSON.parse(data.totalRecord);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  // for pagination
  const getPageDetails = () => {
    const dataStartNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartNumber}
      -
      ${
        dataEndNumber < totalRecords ? dataEndNumber : totalRecords
      } of ${totalRecords}`;
  };

  // pagination button click
  const handlePageOptionChange = (direction: string, pageSize?: number) => {
    if (direction === "Prev") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === "Next") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber + 1 });
    } else if (direction === "Change") {
      setPageOptions({ pageSize: pageSize ? pageSize : 5, pageNumber: 1 });
    }
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-item-center justify-content-between mx-5 mt-5">
            <h4 className="text-success">Orders List</h4>
            <div className="d-flex" style={{ width: "40%" }}>
              <input
                type="text"
                className="form-control mx-2"
                placeholder="search name or mobile"
                name="searchString"
                style={{ borderColor: "blue", borderRadius: "1px" }}
                onChange={handleChange}
              ></input>
              <select
                className="form-control w-50 mx-2"
                style={{ borderColor: "blue", borderRadius: "1px" }}
                onChange={handleChange}
                name="status"
              >
                {filterOptions.map((item, index) => (
                  <option key={index} value={item === "All" ? "" : item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-outline-primary"
                style={{ borderRadius: "1px" }}
                onClick={handleFilters}
              >
                Filter
              </button>
            </div>
          </div>
          <OrderList isLoading={isLoading} orderData={orderData} />
          <div className="d-flex mx-5 justify-content-end align-items-center">
            <div>Rows par page</div>
            <div>
              <select
                className="form-select mx-2"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handlePageOptionChange("change", Number(e.target.value));
                  setCurrentPageSize(Number(e.target.value));
                }}
                style={{ width: "80px" }}
                value={currentPageSize}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
              </select>
            </div>
            <div className="mx-2">{getPageDetails()}</div>
            <button
              onClick={() => handlePageOptionChange("Prev")}
              disabled={pageOptions.pageNumber === 1}
              className="btn btn-outline-primary px-3 mx-2"
              style={{ borderRadius: "1px" }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              onClick={() => handlePageOptionChange("Next")}
              disabled={
                pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
              }
              className="btn btn-outline-primary px-3 mx-2"
              style={{ borderRadius: "1px" }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
