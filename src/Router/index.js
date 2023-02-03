import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import Product from "../Components/Product";
import TopNav from "../Components/TopNav";
import LeftNav from "../Components/LeftNav";
import AddProduct from "../Components/Product/AddProduct";

const Router = () => {
  return (
    <>
      <LeftNav />
      <TopNav />
      <div className="work-space">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/product/addproduct" element={<AddProduct />} />
        </Routes>
      </div>
    </>
  );
};

export default Router;
