import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/apiinstance";
import { jwtDecode } from "jwt-decode";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  const decodedToken = token ? jwtDecode(token) : null;
  console.log(decodedToken)
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================
  // GET PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product/view", axiosConfig);

      setProducts(response.data.vproducts);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 200) {
        setProducts([]);
      } else {
        alert(error.response?.data?.message || "Failed to fetch products");
      }
    }


  }

    useEffect(() => {
      fetchProducts();
    }, []);


  

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

 return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= NAVBAR ================= */}

      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">ShopKart</h1>
        <p className="text-sm text-gray-300">
          Welcome, {decodedToken?.username}
        </p>
        <button
         
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* ================= HERO ================= */}

      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-3">Discover Our Products</h2>

          <p className="text-blue-100 text-lg">
            Find the best products at the best prices.
          </p>
        </div>
      </section>
      {/* ================= PRODUCTS ================= */}

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>

        {products.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow">
            No products available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Product Image Placeholder */}

                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  
                    <img className="object-contain items-center justify-center" src={product.image} alt={product.pname} width="100%" height="70%"></img>
                  
                </div>

                {/* Product Details */}

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.pname}
                  </h3>

                  <p className="text-gray-500 text-sm leading-6 mb-4">
                    {product.quantity}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600">
                      ₹{product.price}
                    </span>

                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );

}
export default Home;
