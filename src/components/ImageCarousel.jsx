const ImageCarousel = ({ images }) => {
  return (
    <>
      {images.map((image, index) => (
        <div key={index}>{image}</div>
      ))}
    </>
  )
}

export default ImageCarousel
