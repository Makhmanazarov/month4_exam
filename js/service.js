const main_korzinka_item = document.querySelector(".main_korzinka_item");
let params = new URLSearchParams(document.location.search);

const siteUrl = "https://fakestoreapi.com/products"

const id = params.get("id");

let product = null;
let products = JSON.parse(localStorage.getItem('products'));

let oldProducts = products ? products : [];

const render = (data) => {
    main_korzinka_item.innerHTML = `
    <div class="korzinka_sup_card" >
        <div class="sup1">
             <button class="delete_btn" id="deleteProduct" >x</button>
            <div class="korzinka_img_sup" >
                <img class="korzinka_img" src="${data.image}" alt="" />
            </div>
            <h1>${data.title.split("").length > 30 ? data.title.slice(0, 30) + "..." : data.title}</h1>
        </div>
        <div class="sup2">
            <p class="korzinka_price" id="totalPrice" >${data?.userPrice || "0"} $</p>
                <div class="sup2_mini">
                    <button class="sup2_btn" id="decrement">-</button>
                    <span id="count">${data?.userCount || "0"}</span>
                    <button class="sup2_btn" id="increment">+</button>
                </div>
            <p class="korzinka_price" >$${data.price}</p>
        </div>
    </div>
    `;
}

const renderKorzinka =  async () => {
    try {
        const res = await fetch(`${siteUrl}/${id}`);
        product = await res.json();
        render(product);
        
    } catch (error) {
        
    }
};
renderKorzinka();

main_korzinka_item.addEventListener("click", (e)=>{
    let id = e.target.id;
    let el = oldProducts.find((item) => item.id === product.id);
    if(id === 'increment'){
        if(!el){
            let newProduct = {
                ...product,
                userPrice: product.price,
                userCount: 1,
            };
            oldProducts.push(newProduct);
           render(newProduct);
        }else{
            el.userCount += 1;
            el.userPrice = el.userCount * el.price;
        };
    }
    if (id === "decrement"){
        if(el.userCount > 0){
            el.userCount -= 1;
            el.userPrice = el.userCount * el.price;
        }
    }
    if(id === 'deleteProduct'){
        oldProducts = oldProducts.filter(item => item.id !== product.id);
        main_korzinka_item.innerHTML = '';
    }
    if(el){
        render(el)
    }
})





