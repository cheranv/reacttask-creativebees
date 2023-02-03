import axios from "axios";
import React, { useState } from "react";
import { Badge, Button, Col, Form, Row } from "react-bootstrap";

const ViewProduct = (props) => {
  const [status, setStatus] = useState("0");

  const handleSave = () => {
    axios
      .post(
        "http://demo.creativebees.in/test_api/product/update_productstatus",
        {
          status: status,
          product_id: props.row.product_id,
        }
      )
      .then((res) => {
        props.close();
      })
      .catch((e) => console.log(e));
  };
  const handleClose = () => {
    props.close();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "30px",
          boxShadow: "8px 1px 8px rgb(20 46 110 / 10%)",
        }}
      >
        <div style={{ width: "50%" }}>
          <p>
            Top Category -<span> {props.row.top_category_name}</span>
          </p>
          <p>
            Category -<span> {props.row.category_name}</span>
          </p>
          <p>
            Product Name -<span> {props.row.product_name}</span>
          </p>
          <p>
            Quantity -<span> {props.row.quantity}</span>
          </p>
          <p>
            Price -<span> {props.row.price}</span>
          </p>
          <p>
            Date Added -<span> {props.row.date_added}</span>
          </p>
        </div>
        <div style={{ width: "50%" }}>
          <img
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              borderRadius: "50%",
            }}
            src={`http://demo.creativebees.in/${props.row.image_path}`}
            alt={props.row.product_name}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS270ngnPD80cE4g0J2lCRxsZolJD4y3MfGA_lKNadJHQ&s";
            }}
          />
          <p>
            FileName -
            <span style={{ color: "yellow" }}>{props.row.description}</span>
          </p>
          {props.type === true && (
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Status"
                  value={props.row.status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="0" disabled selected>
                    Select
                  </option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </Form.Control>
              </Form.Group>
            </Row>
          )}
        </div>
      </div>
      {props.type === true && (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button
              variant="warning"
              className="space-btn"
              onClick={handleSave}
              style={{ padding: "4px 8px" }}
            >
              Update Status
            </Button>
            <Button
              variant="dark"
              className="space-btn"
              style={{ marginRight: "0px", padding: "4px 8px" }}
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ViewProduct;
