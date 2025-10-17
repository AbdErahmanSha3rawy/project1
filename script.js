// استدعاء المدخلات
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads   = document.getElementById('ads');
let discound = document.getElementById('discound');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let mod='craeate';
let tmp;
//////////////////////////////////////////////////////////////////////////////


// دالة لحساب المجموع ( للسعر )
function getTotal(){
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value) - (+discound.value);
        total.innerHTML=result;
        total.style.background = 'green';
    }
    else
        //لو السعر فاضي 
    {
        total.innerHTML='';
        total.style.background = 'red';
    }
}
/////////////////////////////////////////////////////////////////////////////////////
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// create product انشاء منتج

//###################################

// لتخزين المنتجات array (1)
let datapro ;
if(localStorage.product != null){
    //array تحويلها ل 
    datapro  = JSON.parse(localStorage.product);
}
else
    // لو مدخلتش منتجات
{
    datapro = []; 
}

///////////////////////////////////////////////////////////////////////////////////////
//##########################################

// لما اضغط على زرار الانشاء 
create.onclick = function(){
    //  لانشاء منتج واحد فقط object 
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discound:discound.value,
        //input  لانه مش   inner  
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    

    }
    total.style.background = 'red';

    if(mod === 'create'){
        //array اضافة منتج لل 
        // لو اكثر من منتج
        if(newpro.count > 1){
            for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro); 
            }
        }
        //لو منتج واحد
        else{
        datapro.push(newpro); 
        }

    }
    //   update  لو    
    else{
    // العنصر اللي محدده    
    datapro[tmp]=newpro;
    //count ويظهر ال  create بعد التعديل يحول الزرار ل 
    mod='create';
    create.style.background = '#129';
    create.style.color = '#fff';

    // total.style.background = 'red';


    create.innerHTML='create';
    count.style.display='block';
    }
    // إستدعاء دالة تنظيف المدخلات
    clearData();
    
    // علشان لما نعمل إعادة تحميل للصفحة الداتا تكون موجودة local في  arrayعملنا ال  
    localStorage.setItem('product',JSON.stringify(datapro) );
    // إستدعاء دالة عرض الداتا
    showData();
    
}
 
/////////////////////////////////////////////////////////////////////////////////////////////

// دالة لتنظيف / تفريغ المدخلات
function clearData(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discound.value='';
        total.innerHTML='';
        count.value='';
        category.value='';
}

/////////////////////////////////////////////////////////////////////////////////////////

// Read عرض الداتا
   function showData(){

    //(tbody) هنساويها ببتاعت التخزين  للاستقبال  ثم ببتاعت العرض array 
    let table ='';

    //للاستقبال
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discound}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick = "updateData(${i}) " id="update">update</button></td>
            <td><button onclick = "deleteData(${i}) " id="delete">delete</button></td>
        </tr> 
        
        `      
    }
    // مساواة اللي استقبلناه باللي هنعرضه
    document.getElementById('tbody').innerHTML=table;

    let btndelete=document.getElementById('deleteall');
    if(datapro.length > 0){
        btndelete.innerHTML=`
        <button onclick="Deleteall()">DeleteAll (${datapro.length})</button>
        `
    }
    else{
        btndelete.innerHTML='';
    }
   }

   // علشان العرض يكون على طول
   showData();
/////////////////////////////////////////////////////////////////////////////////////////////

   //دالة حذف منتج واحد فقط
   function deleteData(i){
        alert('Do You want to delete this ?')

    //حذف منتج من مصفوفة التخزين
  datapro.splice(i,1);
  localStorage.product=JSON.stringify(datapro);
  //دالة العرض لعرض الداتا الجديدة
  showData();
   }
///////////////////////////////////////////////////////////////////////////////////////////////

// تعديل البيانات
   function updateData(i){
        title.value=datapro[i].title;
        price.value=datapro[i].price;
        taxes.value=datapro[i].taxes;
        ads.value=datapro[i].ads;
        discound.value=datapro[i].discound;
        
        count.style.display='none';
        category.value=datapro[i].category;
        mod='update';
        create.innerHTML='update';
        create.style.background = 'yellow';
        create.style.color = '#000'

        getTotal();
        tmp=i;
        scroll({
            top : 0 ,
            behavior : 'smooth',
        })

   }

   //////////////////////////////////////////////////////////////////////////////////////////
   // دالة لحذف كل الداتا
   function Deleteall(){
            alert('Do You want to delete all data ?')

    //localstoarge تنظيف ال  
    localStorage.clear();
    //الي النهاية index[0] حذف من اول 
    datapro.splice(0);
    showData();
   }
   
// search

let searchmood = 'title';

function getsearchmood(id){
let search=document.getElementById('search');

    if(id == 'searchTitle'){
        searchmood='title';
        
      }
else{
    searchmood='category';

}
        search.placeholder ='Search by '+searchmood  ;

search.focus();
search.value='';
showData();
}

function searchData(value){
    let table = '';
for (let i = 0; i < datapro.length; i++) {

if(searchmood == 'title'){

    
   if(datapro[i].title.includes(value.toLowerCase())){
     table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discound}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick = "updateData(${i}) " id="update">update</button></td>
            <td><button onclick = "deleteData(${i}) " id="delete">delete</button></td>
        </tr> 
        
        `  
   }
}



else{
    
   if(datapro[i].category.includes(value.toLowerCase())){
     table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discound}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick = "updateData(${i}) " id="update">update</button></td>
            <td><button onclick = "deleteData(${i}) " id="delete">delete</button></td>
        </tr> 
        
        `  
   }}
}

    document.getElementById('tbody').innerHTML=table;

}

let btnn=document.getElementById('btnn');

window.onscroll = function () {
  if(scrollY >= 200){
    btnn.style.display='block';
  }
  else{
        btnn.style.display='none';

  }
}

btnn.onclick = function () {
  scroll({
    left : 0 ,
    top : 0 ,
    behavior : "smooth"
  })
}