const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define routes
app.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { n, page, sort } = req.query;

  try {
    const products = await fetchProducts(categoryname, n, page, sort);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
  const { categoryname, productid } = req.params;

  try {
    const productDetails = await fetchProductDetails(categoryname, productid);
    res.json(productDetails);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Product not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


async function fetchProducts(categoryname, n, page, sort) {
  const token = {
    token_type: "Bearer",
    access_token: "YOUR_ACCESS_TOKEN_HERE",
  };
  
  const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
}

async function fetchProductDetails(categoryname, productid) {
  const token = {
    token_type: "Bearer",
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTQ5MjA3LCJpYXQiOjE3MTIxNDg5MDcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjMwNWY0ZGIwLWE0NmYtNDA0MS05ODdjLTIwNDZiNDU1ZWViNCIsInN1YiI6ImhhMTc1NkBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU1JNSVNUIiwiY2xpZW50SUQiOiIzMDVmNGRiMC1hNDZmLTQwNDEtOTg3Yy0yMDQ2YjQ1NWVlYjQiLCJjbGllbnRTZWNyZXQiOiJ0QkdsVllzU0JSUHplVlB5Iiwib3duZXJOYW1lIjoiSGFycmlzaCIsIm93bmVyRW1haWwiOiJoYTE3NTZAc3JtaXN0LmVkdS5pbiIsInJvbGxObyI6IlJBMjExMTAwMzAyMDM3MiJ9.IPTcclCldokjUM3bsYguOe7vhn8Jc_vkJtcgCih5s3I",
  };

  const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products/${productid}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product details');
  }
}
