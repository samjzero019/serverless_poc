import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [productID, setProductID] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const API_GATEWAY_ID = process.env.REACT_APP_API_GATEWAY_ID;

  const GET_CATEGORIES_API_ENDPOINT = `https://${API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/api/categories`;
  const GET_PRODUCT_DATA_API_ENDPOINT = `https://${API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/api/getProducts`;
  const GET_CATEGORY_PRODUCTS_API_ENDPOINT = `https://${API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/api/getProducts/${category}`;
  const GET_PRODUCT_DETAILS_API_ENDPOINT = `https://${API_GATEWAY_ID}.execute-api.us-east-2.amazonaws.com/dev/api/getProductDetails/${productID}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(GET_CATEGORIES_API_ENDPOINT)
      .then((res) => {
        // console.log("getCat log", res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log("Unable to fetch Categories ", err.message));

    setLoading(false);
  }, [GET_CATEGORIES_API_ENDPOINT]);

  useEffect(() => {
    setLoading(true);

    if (category && category.length > 0 && category !== undefined) {
      console.log(".. 1nd was called ..category in first: ", category);
      axios
        .get(GET_CATEGORY_PRODUCTS_API_ENDPOINT)
        .then((res) => {
          console.log("Get Prod Data: ", res.data);
          setProductList(res.data);
          setLoading(false);
        })
        .catch((err) => console.log("Unable to Get Products", err.message));
    } else {
      console.log(".. 2nd was called to get all products . ");
      axios.get(GET_PRODUCT_DATA_API_ENDPOINT).then((res) => {
        console.log("Get Prods: ", res.data);
        setProductList(res.data);
        setCategory("");
        setLoading(false);
      }).catch(err => console.log("Error in getting all products", err.message)) ;
    }
  }, [
    GET_CATEGORY_PRODUCTS_API_ENDPOINT,
    GET_PRODUCT_DATA_API_ENDPOINT,
    category,
  ]);

  useEffect(() => {
    setLoading(true);

    productID &&
      productID.length > 0 &&
      axios.get(GET_PRODUCT_DETAILS_API_ENDPOINT).then((res) => {
        console.log("Get Prod Details log: ", res.data);
        setProduct(res.data);
        setLoading(false);
      });
  }, [GET_PRODUCT_DETAILS_API_ENDPOINT, productID]);

  const values = {
    product,
    productList,
    productID,
    setProductID,
    categories,
    setCategory,
    loading,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
