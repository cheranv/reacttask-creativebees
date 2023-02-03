import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

const AddProduct = (props) => {
  const [topCategory, setTopCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [allCategory, setAllCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    top: "",
    category: "",
    subCategory: "",
  });

  const [inputs, setInputs] = useState({
    product_name: "",
    quantity: "",
    price: "",
    description: "",
    file: "",
    image: "",
    status: "0",
  });

  const handleImage = (e) => {
    var fileName = e.target.value.split("\\").pop();
    let file = e.target.files[0];
    let index = fileName.lastIndexOf(".");
    let format = fileName.slice(index + 1, fileName.length);
    const formats = ["png", "jpeg", "jpg", "bmp", "gif", "jfif"];
    if (formats.includes(format)) {
      setInputs({ ...inputs, image: file });
    } else {
      alert("please select valid image");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const data = new FormData();
    const data1 = new FormData();
    data.append(inputs.file, "file");
    data1.append(inputs.image, "product_image");
    let article = {
      top_category_id: selectedCategory.top,
      category_id: selectedCategory.category,
      subcategory_id: selectedCategory.subCategory,
      product_name: inputs.product_name,
      quantity: inputs.quantity,
      price: inputs.price,
      description: inputs.description,
      file: data,
      image: inputs.image,
      status: inputs.status,
    };
    axios
      .post("http://demo.creativebees.in/test_api/product/add_product", article)
      .then((res) => {
        window.location.href = "/product";
      })
      .catch((e) => console.log(e));
  };
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
    <>
      <div>
        <div className="flex" style={{ textAlign: "left", marginTop: "20px" }}>
          <div>
            <div className="title">Dashboard</div>
            <span
              style={{ color: "#FFDD33", cursor: "pointer" }}
              onClick={() => (window.location.href = "/product")}
            >
              Dashboard
            </span>{" "}
            /
            <span
              style={{ color: "#FFDD33", cursor: "pointer" }}
              onClick={() => (window.location.href = "/product")}
            >
              Product List
            </span>
            <>
              / <span style={{ color: "#FFDD33" }}> / Add Product</span>
            </>
          </div>
        </div>

        <Form
          style={{ padding: "20px", backgroundColor: "white" }}
          onSubmit={handleSave}
        >
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
                <option value="" disabled selected key="cat">
                  Select
                </option>
                {topCategory.map((row) => (
                  <option value={row.id} key={row.id + row.name}>
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
              <Form.Label>Price</Form.Label>
              <Form.Control
                as="input"
                placeholder="Price"
                value={inputs.price}
                onChange={(e) =>
                  setInputs({ ...inputs, price: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                value={inputs.description}
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>File</Form.Label>
              <Form.Control
                as="input"
                type="file"
                placeholder="File"
                onChange={(e) =>
                  setInputs({ ...inputs, file: e.target.files[0] })
                }
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                as="input"
                type="file"
                placeholder="product image"
                onChange={(e) => handleImage(e)}
              />
            </Form.Group>
          </Row>
          <Row>
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
          </Row>
          <div style={{ width: "100%", textAlign: "left", padding: "20px" }}>
            <Button variant="warning" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;

export const categoryConfigure = (allCategory, selectedCategory) => {
  const category = allCategory.reduce((acc, row) => {
    if (row.top_category_id === selectedCategory.top) {
      acc = row[row.top_category_id];
    }
    return acc;
  }, []);
  const mapped = category.map((row) => ({
    id: row.category_id,
    name: row.category_name,
  }));
  return mapped;
};

export const subCategoryConfigure = (allCategory, selectedCategory) => {
  const category = allCategory.reduce((acc, row) => {
    if (row.top_category_id === selectedCategory.top) {
      acc = row[row.top_category_id];
    }
    return acc;
  }, []);
  const category1 = category.reduce((acc, row) => {
    if (row.category_id === selectedCategory.category) {
      acc = row[row.category_id];
    }
    return acc;
  }, []);
  const mapped = category1.map((row) => ({
    id: row.category_id,
    name: row.category_name,
  }));
  return mapped;
};
