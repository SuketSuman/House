(function(){const yith_featured_videos=document.querySelectorAll('.yith_featured_thumbnail')
if(yith_featured_videos.length>0){const trigger=document.querySelector('.woocommerce-product-gallery__trigger')
trigger.addEventListener('click',(e)=>{setTimeout(()=>{const prev_trigger=document.querySelector('.pswp__button.pswp__button--arrow--left')
prev_trigger.click()},250)})}})()