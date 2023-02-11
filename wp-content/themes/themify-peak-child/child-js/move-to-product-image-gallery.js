const moveToProductImageGalleryElement=document.querySelector('.move-to-product-image-gallery')
if(moveToProductImageGalleryElement){moveToProductImageGalleryElement.style.opacity=0
const productImageGalleryWrapper=document.querySelector('.woocommerce-product-gallery')
if(productImageGalleryWrapper){setTimeout(()=>{productImageGalleryWrapper.appendChild(moveToProductImageGalleryElement)
moveToProductImageGalleryElement.style.opacity=1},1000)}}