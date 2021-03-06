import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  createProduct,
} from "../../../Redux/ActionCreater/ProductAction";
import { ADD_PRODUCT_RESET } from "../../../Redux/ActionTypes/productActionType";

function CreateProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, error, success } = useSelector((state) => state.addProduct);
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      console.log(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/artist/products");
      dispatch({ type: ADD_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      <h3>Create Product!</h3>
      <p>Fill up the form to create</p>
      <form encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          required
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
          <option value="">Choose Category</option>
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
            onChange={createProductImagesChange}
            multiple
          />
        </div>
        <div className="createProductFormImage">
          {imagesPreview.map((image, index) => (
            <img key={index} src={image} alt="Product Preview" />
          ))}
        </div>
        <input
          type="submit"
          value="Create"
          className="login-btn"
          disabled={loading ? true : false}
        />
        <button className="cancel-btn" disabled={loading ? true : false} onClick={()=>navigate("/artist/products")}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateProduct;
