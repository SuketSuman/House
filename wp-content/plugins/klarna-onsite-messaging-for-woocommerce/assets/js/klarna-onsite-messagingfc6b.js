jQuery(function($){var klarna_onsite_messaging={update_iframe:function(){window.kudt=window.kudt||[];window.kudt.push({eventName:'refresh-placements'});$('klarna-placement').show();},check_variable:function(){if($('.product-type-variable')[0]&&$('.variation_id').val()==='0'){return false;}
return true;},update_total_cart:function(){let price=Math.round($("#kosm_cart_total").val()*100);klarna_onsite_messaging.update_total_price(price)},update_total_variation:function(variation){let price=Math.round(variation.display_price*100);klarna_onsite_messaging.update_total_price(price);},update_total_price:function(price){if(!price){console.warn('OSM price error: ',price)}
$("klarna-placement").each(function(){$(this).attr("data-total_amount",price);$(this).attr("data-purchase-amount",price);});klarna_onsite_messaging.update_iframe();},debug_info:function()
{if(/[?&]osmDebug=1/.test(location.search))
{const d=klarna_onsite_messaging_params.debug_info;if(typeof d!=='undefined')
{console.log('%cDebug info: ','color: #ff0000');if(typeof d.product!=='undefined'&&d.product)
{console.log('Page has Product OSM.');}
if(typeof d.cart!=='undefined'&&d.cart)
{console.log('Page has Cart OSM.');}
if(typeof d.shortcode!=='undefined'&&d.shortcode)
{console.log('Page has Shortcode OSM.');}
if(typeof d.locale!=='undefined')
{console.log('Locale: '+d.locale);}
if(typeof d.currency!=='undefined')
{console.log('Currency: '+d.currency);}
if(typeof d.data_client!=='undefined')
{console.log((!d.data_client)?'Data client is missing.':'Data client exists.');}
if(typeof window.KlarnaOnsiteService!=='undefined'&&typeof window.KlarnaOnsiteService.loaded!=='undefined')
{console.log('Klarna loaded status: '+window.KlarnaOnsiteService.loaded);}
if(d.library){console.log('Library: ',d.library);}}}},init:function(){$(document).ready(function(){if(false===klarna_onsite_messaging.check_variable){$('klarna-placement').hide();}else{$('klarna-placement').show();}
klarna_onsite_messaging.debug_info();});$(document.body).on("updated_cart_totals",function(){klarna_onsite_messaging.update_total_cart();});$(document).on('found_variation',function(e,variation){klarna_onsite_messaging.update_total_variation(variation);});$('.total_price').on('wc-measurement-price-calculator-total-price-change',function(e,quantity,price){if(price){klarna_onsite_messaging.update_total_price(Math.round(quantity*price*100))}});$('form.cart').on('wc-measurement-price-calculator-quantity-changed',function(e,quantity){if(quantity){price=100*quantity*parseFloat(wc_price_calculator_params.product_price);klarna_onsite_messaging.update_total_price(price)}});$('.product_price').on('wc-measurement-price-calculator-product-price-change',function(e,measurement,price){quantity=parseInt($('form.cart .qty').val())
if(price&&quantity>0){klarna_onsite_messaging.update_total_price(Math.round(price*100*quantity))}});$('form.cart').on('change','input.qty',function(){if(typeof wc_price_calculator_params==='undefined'){return;}
quantity=this.value
unit_price=parseFloat($('.product_price span').text())
if(quantity>0){price=100*quantity*parseFloat(wc_price_calculator_params.product_price);if(!isNaN(unit_price)){price=100*unit_price*quantity;}
klarna_onsite_messaging.update_total_price(price)}})},}
klarna_onsite_messaging.init();});