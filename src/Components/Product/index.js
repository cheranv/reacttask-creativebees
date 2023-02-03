import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Collapse,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiFilter } from "react-icons/ci";
import { BsPencilSquare, BsCheckCircleFill } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineExclamationCircle } from "react-icons/ai";
import axios from "axios";
import ViewProduct from "./ViewProduct";
import { categoryConfigure, subCategoryConfigure } from "./AddProduct";

const Product = () => {
  const [productsList, setProductList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [addProduct, setAddProduct] = useState(false);
  const [del, setDelete] = useState(false);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [id, setId] = useState("");
  const [topCategory, setTopCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    top: "",
    category: "",
    subCategory: "",
  });
  const [allCategory, setAllCategory] = useState([]);
  const [editData, setEditData] = useState({});
  const [inputs, setInputs] = useState({
    product_name: "",
    quantity: "",

    status: "0",
  });
  const handleCategory = (row) => {
    if (row.subcategory_name !== "" && row.subcategory_name !== null) {
      return (
        <span>
          {row.category_name} &gt; {row.subcategory_name}
        </span>
      );
    } else {
      return <span>{row.category_name}</span>;
    }
  };

  const handleStatus = (row) => {
    return (
      <span
        style={
          row.status === "1"
            ? {
                backgroundColor: "green",
                padding: "5px",
                borderRadius: "4px",
                color: "white",
              }
            : {
                backgroundColor: "red",
                padding: "5px",
                borderRadius: "4px",
                color: "white",
              }
        }
      >
        {row.status === "1" ? "Active" : "Inactive"}
      </span>
    );
  };

  const handlePages = (value) => {
    let a = pageNo;

    if (value === "+") {
      setPageNo(a + 1);
    } else {
      setPageNo(a - 1);
    }
  };

  const checkDelete = () => {
    setDelete(!del);
  };
  const HandleDeletion = (id) => {
    console.log(id);
    setId(id);
    checkDelete();
  };

  const handleDelete = () => {
    axios
      .post("http://demo.creativebees.in/test_api/product/deleteproduct", {
        product_id: id,
      })
      .then((res) => {
        checkDelete();

        setPageNo(1);
        Refresh();
      })
      .catch((e) => console.log(e));
  };

  const Refresh = () => {
    axios
      .get("http://demo.creativebees.in/test_api/product/getall_products/" + 0)
      .then((res) => {
        setProductList(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const handleComps = () => {
    window.location.href = "/product/addproduct";
  };

  const handleView = () => {
    setView(!view);
    setEdit(false);
  };

  const Managestatus = (row) => {
    setView(!view);
    setEdit(true);
    setEditData(row);
  };

  const handleEdit = (row) => {
    setAddProduct(false);
    setEditProduct(true);
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
    console.log("clicked");
  };

  const handleClear = () => {
    setCategoryList([]);
    setSubCategoryList([]);
    setSelectedCategory({
      top: "",
      category: "",
      subCategory: "",
    });

    setInputs({
      product_name: "",
      quantity: "",
      status: "0",
    });
  };

  const filterResources = (e) => {
    e.preventDefault();
    let article = {
      top_category_id: selectedCategory.top,
      category_id: selectedCategory.category,
      subcategory_id: selectedCategory.subCategory,
      product_name: inputs.product_name,
      quantity: inputs.quantity,
      status: inputs.status,
    };
    axios
      .post(
        "http://demo.creativebees.in/test_api/product/filter_product",
        article
      )
      .then((res) => {
        setProductList(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    Refresh();
  }, [pageNo]);

  useEffect(() => {
    axios
      .get("http://demo.creativebees.in/test_api/category/gettopcategories/1")
      .then((res) => {
        console.log(res.data);
        setAllCategory(res.data);
        const topCat = res.data.map((row) => ({
          id: row.top_category_id,
          name: row.top_category_name,
        }));
        setTopCategory(topCat);
      })
      .catch((e) => {
        console.log(e);
        setTopCategory([]);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory.top) {
      const mapped = categoryConfigure(allCategory, selectedCategory);
      setCategoryList(mapped);
    }
  }, [selectedCategory.top]);

  useEffect(() => {
    if (selectedCategory.category) {
      const mapped = subCategoryConfigure(allCategory, selectedCategory);
      setSubCategoryList(mapped);
    }
  }, [selectedCategory.category]);

  return (
    <div>
      <div className="flex" style={{ textAlign: "left", marginTop: "20px" }}>
        <div>
          <div className="title">Dashboard</div>
          <span style={{ color: "#FFDD33" }}>Dashboard</span> /
          <span style={{ color: "#FFDD33" }}> Product List</span>
          {editProduct && !addProduct && (
            <>
              /<span style={{ color: "#FFDD33" }}> Edit Product</span>
            </>
          )}
          {addProduct && !editProduct && (
            <>
              / <span style={{ color: "#FFDD33" }}> / Add Product</span>
            </>
          )}
        </div>

        <div>
          <Button
            variant="dark"
            className="spacing-button"
            onClick={handleComps}
          >
            <BsPencilSquare style={{ margin: "0px 10px" }} />
            Add Product
          </Button>
          <Button variant="warning" onClick={handleFilter}>
            <CiFilter style={{ margin: "0px 10px" }} /> Filter
          </Button>
        </div>
      </div>
      <>
        <Collapse in={showFilter}>
          <div style={{ backgroundColor: "white" }}>
            <Form style={{ padding: "20px" }} onSubmit={filterResources}>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Top Category</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setSelectedCategory({
                        top: e.target.value,
                        category: "",
                        subCategory: "",
                      })
                    }
                  >
                    <option
                      value=""
                      disabled
                      selected={selectedCategory.top === ""}
                      key="cat"
                    >
                      Select
                    </option>
                    {topCategory.map((row) => (
                      <option
                        value={row.id}
                        key={row.id + row.name}
                        selected={selectedCategory.top === row.id}
                      >
                        {row.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        category: e.target.value,
                        subCategory: "",
                      })
                    }
                  >
                    <option
                      value=""
                      disabled
                      selected={selectedCategory.category === ""}
                    >
                      Select
                    </option>
                    {categoryList.map((row) => (
                      <option
                        value={row.id}
                        key={row.id + row.name}
                        selected={selectedCategory.category === row.name}
                      >
                        {row.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Sub Category</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Select Sub Category"
                    onChange={(e) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        subCategory: e.target.value,
                      })
                    }
                  >
                    <option
                      value=""
                      disabled
                      selected={selectedCategory.subCategory === ""}
                    >
                      Select
                    </option>
                    {subCategoryList.map((row) => (
                      <option
                        value={row.id}
                        key={row.id + row.name}
                        selected={selectedCategory.subCategory === row.name}
                      >
                        {row.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    as="input"
                    placeholder="product_name"
                    value={inputs.product_name}
                    onChange={(e) =>
                      setInputs({ ...inputs, product_name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    as="input"
                    placeholder="Quantity"
                    value={inputs.quantity}
                    onChange={(e) =>
                      setInputs({ ...inputs, quantity: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Status"
                    value={inputs.status}
                    onChange={(e) =>
                      setInputs({ ...inputs, status: e.target.value })
                    }
                  >
                    <option value="0" disabled selected>
                      Select
                    </option>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                  </Form.Control>
                </Form.Group>
                <div
                  style={{ width: "100%", textAlign: "left", padding: "20px" }}
                >
                  <Button
                    variant="dark"
                    type="button"
                    style={{ marginRight: "20px" }}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                  <Button variant="warning" type="submit">
                    Submit
                  </Button>
                </div>
              </Row>
            </Form>
          </div>
        </Collapse>

        <div style={{ backgroundColor: "white" }}>
          <Table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Top Category</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>file</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <>
                {productsList.map((row, index) => (
                  <tr key={row.product_id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="product_image"
                        src={`http://demo.creativebees.in/${row.image_path}`}
                        alt={row.product_name}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src =
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS270ngnPD80cE4g0J2lCRxsZolJD4y3MfGA_lKNadJHQ&s";
                        }}
                      />
                    </td>
                    <td>{row.product_name}</td>
                    <td>{row.top_category_name}</td>
                    <td>{handleCategory(row)}</td>
                    <td>{row.quantity}</td>
                    <td>{row.price}</td>
                    <td style={{ color: "#FFDD33" }}>{row.description}</td>
                    <td>{row.date_added}</td>
                    <td>{handleStatus(row)}</td>
                    <td>
                      <Button
                        variant="dark"
                        className="space-btn"
                        onClick={() => Managestatus(row)}
                      >
                        <BsCheckCircleFill />
                      </Button>
                      <Button
                        variant="dark"
                        className="space-btn"
                        onClick={handleView}
                      >
                        <FaRegEye />
                      </Button>
                      <Button
                        variant="dark"
                        className="space-btn"
                        onClick={() => handleEdit(row)}
                      >
                        <BsPencilSquare />
                      </Button>
                      <Button
                        variant="dark"
                        className="space-btn"
                        onClick={() => HandleDeletion(row.product_id)}
                      >
                        <AiOutlineDelete />
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
          <div style={{ width: "100%", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="light"
                onClick={() => handlePages("-")}
                style={
                  pageNo === 1 ? { display: "none" } : { display: "block" }
                }
              >
                &lt;
              </Button>
              <Button variant="warning">{pageNo}</Button>

              <Button variant="light" onClick={() => handlePages("+")}>
                &gt;
              </Button>
            </div>
          </div>
        </div>

        <Modal show={del} centered>
          <Modal.Body>
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  fontSize: "80px",
                  textAlign: "center",
                  width: "100%",
                  color: "bisque",
                }}
              >
                <AiOutlineExclamationCircle />
              </div>
              <div
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <div>Are you sure </div>
                <Button
                  variant="success"
                  style={{ margin: "10px" }}
                  onClick={handleDelete}
                >
                  Confirm
                </Button>
                <Button variant="danger" onClick={checkDelete}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {view && (
          <Modal show={view} onHide={handleView} className="custommodal">
            <Modal.Header
              closeButton
              style={{ fontSize: "20px", fontWeight: "normal" }}
            >
              {edit ? "  Manage Status" : "View Product"}
            </Modal.Header>
            <Modal.Body>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                }}
              >
                <ViewProduct type={edit} row={editData} close={handleView} />
              </div>
            </Modal.Body>
          </Modal>
        )}
      </>
    </div>
  );
};

export default Product;
