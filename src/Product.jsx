// React Router Dom:
import { useParams } from "react-router-dom";

// Axios:
import axios from "axios";

// React Query:
import { useQuery, useMutation } from "react-query";

const Product = () => {
  const { productId } = useParams();

  const mutation = useMutation((updated_Product) => {
    return axios.put(
      `https://dummyjson.com/products/${productId}`,
      updated_Product
    );
  });

  const fetchProduct = async () => {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await res.json();
    return data;
  };

  const {
    data: product,
    loading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct,
  });

  if (loading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center">Error: {error}</h1>;
  }
  if (mutation.isLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (mutation.isError) {
    return (
      <h1 className="text-center">
        Error While updating: {mutation.error.message}
      </h1>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {product?.title}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product?.thumbnail}
                alt={product?.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product?.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product?.category}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {product?.price}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          mutation.mutate({ id: productId, title: "Title updated" });
        }}>
        Update
      </button>
    </div>
  );
};

export default Product;
