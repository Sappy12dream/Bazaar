import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
} from "../../../Redux/ActionCreater/ProductAction";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../../Redux/ActionCreater/ProductAction";
function UpdateProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Ceramics crafts",
    "glass crafts",
    "textile crafts",
    "Flower crafts",
    "Leatherwork",
    "Houseware",
    "Fashion",
    "Needlework",
    "Paper crafts",
    "Mixed media crafts",
    "Wood Crafts",
    "Other",
  ];

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/artist/products");
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <div className=" Register Login">
      <h3>Update Product!</h3>
      <p>Fill up the form to Update Product</p>
      <form encType="multipart/form-data" onSubmit={updateProductSubmitHandler}>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          required
          value={price}
          min={0}
          onChange={(e) => setPrice(e.target.value)}
          step=".01"
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols="40"
          rows="4"
        ></textarea>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value={category}>Choose Category</option>
          {categories.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>
        <div className="pic">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={updateProductImagesChange}
            multiple
          />
        </div>
        <div className="createProductFormImage">
          {oldImages &&
            oldImages.map((image, index) => (
              <img key={index} src={image.url} alt="Old Product Preview" />
            ))}
        </div>

        <div className="createProductFormImage">
          {imagesPreview.map((image, index) => (
            <img key={index} src={image} alt="Product Preview" />
          ))}
        </div>

        <input
          type="submit"
          value="Update"
          className="login-btn"
          disabled={loading ? true : false}
        />
        <button
          className="cancel-btn"
          disabled={loading ? true : false}
          onClick={() => navigate("/artist/products")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
