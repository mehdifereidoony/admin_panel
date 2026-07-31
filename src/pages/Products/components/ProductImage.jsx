const ProductImage = (data) => {
  return (
    <img
      src={import.meta.env.VITE_BASE_URL + data.data.image}
      alt={data.data.alt_image}
      style={{ maxWidth: "100px" }}
    />
  );
};

export default ProductImage;
    