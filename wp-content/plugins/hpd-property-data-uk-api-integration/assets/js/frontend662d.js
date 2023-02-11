const handleSubmitPDUKForm=(e)=>{e.preventDefault()
const formElem=e.target.classList.contains('.pduk-api-form')?e.target:e.currentTarget
const formElements=formElem.elements
const apiParams={};for(let elementIndex=0;elementIndex<formElements.length;elementIndex++){const formElement=formElements[elementIndex];const inputValue=formElement.value
const inputName=formElement.name
if(inputName.indexOf('api_')!==-1){apiParams[inputName]=inputValue}}
handleSubmitPDUKFormAPIResults(apiParams,formElem);}
const handleSubmitPDUKFormAPIResults=(urlParams,hpd_pduk_form)=>{const baseRoot="https://houseplansdirect.co.uk"
const minimumInternalArea=60;const belowMinimumInternalArea=parseInt(urlParams['api_internal_area'])<minimumInternalArea;const newUrlParams=Object.assign({},urlParams)
if(newUrlParams['api_internal_area']!==''){const internalArea=belowMinimumInternalArea?minimumInternalArea:parseInt(urlParams['api_internal_area']);newUrlParams['api_internal_area']=convertSquareMetersToSquareFeet(internalArea);}
var hpdApiEndpoint=`${baseRoot}/wp-json/hpdpduk/v1/callapi?${encodeQueryData(newUrlParams)}`;const hpd_pduk_wrapper=hpd_pduk_form.closest('.hpd-pduk-wrapper')
const hpd_pduk_results=hpd_pduk_wrapper.querySelector('.results')
const hpd_pduk_results_text=hpd_pduk_results.querySelector('.results-text')
const hpd_pduk_results_meta=hpd_pduk_results.querySelector('.results-meta')
hpd_pduk_results.classList.add('loading')
fetch(hpdApiEndpoint).then((response)=>response.json()).then(function(apiData){hpd_pduk_results.classList.remove('hidden','loading')
const data_results=apiData.data
if(!apiData.success){hpd_pduk_results_text.innerText="We can't seem to find a price"
hpd_pduk_results_meta.innerText=`${data_results.message.replace('600sqft','60 m2')}`}else{const api_results_data=data_results.data
const costPerSqMeter=belowMinimumInternalArea?api_results_data.total_cost/minimumInternalArea:api_results_data.total_cost/urlParams['api_internal_area'];const actualCost=belowMinimumInternalArea?costPerSqMeter*urlParams['api_internal_area']:api_results_data.total_cost
hpd_pduk_results_text.innerText=`From ${formatDollarValue(actualCost)}`
hpd_pduk_results_meta.innerText=`Avg. Cost ${formatDollarValue(costPerSqMeter)}/m2`}}).catch(function(error){console.log('Error during api fetch: '+error.message);});}
const convertCostPerSquareFootToCostPerSquareMeters=(costPerSquareFoot)=>{const squareMetersPerSquareFoot=10.764
return costPerSquareFoot*squareMetersPerSquareFoot}
const convertSquareFeetToSquareMeters=(squareFeet)=>{squareFeet=parseInt(squareFeet)
const squareFeetPerSquaredMeter=10.764
const squareMeters=squareFeet/squareFeetPerSquaredMeter
return squareMeters}
const convertSquareMetersToSquareFeet=(squareMeters)=>{squareMeters=parseInt(squareMeters)
const squareMetersPerSquareFoot=10.764
return squareMeters*squareMetersPerSquareFoot}
const formatSquareMeters=(squareMeters)=>{squareMeters=parseInt(squareMeters)
try{const numberFormatOptions={style:"unit",unit:"square-meter"}
return new Intl.NumberFormat("en-UK",numberFormatOptions).format(squareMeters)}catch(error){return `${squareMeters} m2`}}
const formatDollarValue=(dollarValue)=>{dollarValue=parseFloat(dollarValue).toFixed(2)
try{const numberFormatOptions={style:'currency',currency:'GBP'}
return new Intl.NumberFormat('en-UK',numberFormatOptions).format(dollarValue)}catch(error){return `&pound;${numberWithCommas(dollarValue)}`}}
const encodeQueryData=(data)=>{const ret=[];for(let d in data)
ret.push(encodeURIComponent(d)+'='+encodeURIComponent(data[d]));return ret.join('&');}
const numberWithCommas=(x)=>{x=x.toString();var pattern=/(-?\d+)(\d{3})/;while(pattern.test(x))
x=x.replace(pattern,"$1,$2");return x;}
const initFrontendForms=(hpd_pduk_forms)=>{if(hpd_pduk_forms.length>0){hpd_pduk_forms.forEach(hpd_pduk_form=>{hpd_pduk_form.style.display="block"
setEventsForElements(hpd_pduk_form)})}else{console.warn('Shortcode [hpd_pduk] ran but no form element')}}
const handleFormSubmitButtonClick=()=>{return(e)=>{e.preventDefault()
e.currentTarget.closest('form').submit()}}
const hpd_pduk_forms=document.querySelectorAll('.pduk-api-form')
hpd_pduk_forms.forEach(hpd_pduk_form=>{hpd_pduk_form.style.display="none"})
if(document.readyState!=='loading'){initFrontendForms(hpd_pduk_forms)}else{document.addEventListener('DOMContentLoaded',()=>{initFrontendForms(hpd_pduk_forms)})}
function setEventsForElements(hpd_pduk_form){hpd_pduk_form.onSubmit=handleSubmitPDUKForm
hpd_pduk_form.addEventListener('submit',handleSubmitPDUKForm)
const submitButtonElem=hpd_pduk_form.querySelector('input[type="submit"]')
submitButtonElem.onClick=handleFormSubmitButtonClick
submitButtonElem.addEventListener('click',handleFormSubmitButtonClick)}