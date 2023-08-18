import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Pagination, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagecount, setPageCount] = useState(0);
  const [pageData, setPageData] = useState([]);
  console.log(data);

  const getData = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    setData(res?.data?.products);
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const count = Math.ceil(data?.length / 5);
    setPageCount(count);

    if (page) {
      const limit = 5;
      const skip = limit * page;
      const dataskip = data.slice(page === 1 ? 0 : skip - limit, skip);
      setPageData(dataskip);
    }
  }, [data]);

  const hanldeNext = () => {
    if (page === pagecount) return page;
    setPage(page + 1);
  };

  const hanldePrev = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };
  return (
    <>
      <Container>
        <h2>User Data</h2>
        <div className="table_div mt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {pageData?.length > 0 ? (
                pageData?.map((dt, index) => {
                  return (
                    <>
                      <tr>
                        <td>{dt.id}</td>
                        <td>{dt.title}</td>
                        <td>{dt.brand}</td>
                        <td>{dt.price}</td>
                        <td>
                          <img
                            src={dt.thumbnail}
                            alt={dt.title}
                            style={{ width: "80px", height: "80px" }}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-end">
          <Pagination>
            <Pagination.Prev onClick={hanldePrev} disabled={page === 1} />
            {Array(pagecount)
              .fill(null)
              .map((ele, index) => {
                return (
                  <>
                    <Pagination.Item
                      active={page === index + 1 ? true : false}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  </>
                );
              })}

            <Pagination.Next
              onClick={hanldeNext}
              disabled={page === pagecount}
            />
          </Pagination>
        </div>
      </Container>
    </>
  );
};

export default Home;
