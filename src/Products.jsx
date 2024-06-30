// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// React Query:
import { useQuery } from "react-query";

const fetchProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products;
};

const Products = () => {
  const {
    data: products,
    loading,
    error,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  //   const [products, setProducts] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         setLoading(false);
  //         setError(null);
  //         const res = await fetch("https://dummyjson.com/products");
  //         const data = await res.json();
  //         setProducts(data.products);
  //         setLoading(false);
  //       } catch (error) {
  //         setError(error.message);
  //         setLoading(false);
  //       }
  //     };
  //     fetchProducts();
  //   }, []);

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center">Error: {error}</h1>;
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
