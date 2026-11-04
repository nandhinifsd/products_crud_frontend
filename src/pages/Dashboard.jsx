import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../api/apiinstance";

function Dashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    pname: "",
    price: "",
    quantity: "",
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const decodedToken = token ? jwtDecode(token) : null;

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
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =========================
  // ADD / UPDATE
  // =========================
  

 
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      if (editId) {
      
         
           const response = await api.put(
             `/product/update/${editId}`,
             {
               pname: formData.pname,
               price: formData.price,
               quantity: formData.quantity,
               image:formData.image
             },
             axiosConfig,
           );

           alert("Product updated successfully");

           setProducts(
             products.map((product) =>
               product._id === editId ? response.data.updateproduct : product,
             ),
           );

           setEditId(null);


      }
      else {
        const response = await api.post(
          "/product/save",
          {
            pname: formData.pname,
            price: formData.price,
            quantity: formData.quantity,
            image:formData.image
          },
          axiosConfig,
        );

        alert("Product added successfully");

        setProducts([...products, response.data.addproduct]);
        console.log(products);
      }
    }
    catch (error)
    {
      console.log(error);

      alert(error.response?.data?.message || "Product operation failed");
    }
  };
  // =========================
  // EDIT
  // =========================
  const handleEdit = (product) => {
   setEditId(product._id);

   setFormData({
     pname: product.pname,//kurti
     price: product.price,//2000
     quantity: product.quantity,//2
     image:product.image//
   });

   window.scrollTo({
     top: 0,
     behavior: "smooth",
   });
 };
  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/product/delete/${id}`, axiosConfig);

      alert("Product deleted successfully");

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Product deletion failed");
    }
  };

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

      <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">ShopKart Admin</h1>

          <p className="text-sm text-gray-300">
            Welcome, {decodedToken?.username}
          </p>
        </div>

        <button className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        onClick={handleLogout} >
          Logout
        </button>
      </nav>

      {/* ================= MAIN ================= */}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= FORM ================= */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editId ? "Update Product" : "Add Product"}
            </h2>

            {editId && (
              <button className="text-gray-500 hover:text-gray-800">
                Cancel Edit
              </button>
            )}
          </div>
            
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* TITLE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product name
              </label>

              <input
                type="text"
                name="pname"
                value={formData.pname}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* PRICE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                quantity
              </label>

              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

             {/* images */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                productImage
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

             {/* BUTTONS */}

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700"
                
              >
                {editId ? "Update Product" : "Add Product"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ================= PRODUCT LIST ================= */}

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {products.length} Products
            </span>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No products available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product?._id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product?.pname}
                  </h3>

                  <p className="text-grey-600 text-sm mb-4 min-h-[60px]">
                    {product?.price}
                  </p>

                  <p className="text-xl font-bold text-green-600 mb-4">
                    {product?.quantity}
                  </p>
                   <img src={product?.image} className="text-xl font-bold text-green-600 mb-4" alt="notfound" height={200} width={200}>
                   
                  </img>
                   <div className="flex gap-3">
                    <button className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                    onClick={()=>handleEdit(product)}>
                      Edit
                    </button>

                    <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                     onClick={() => handleDelete(product?._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
