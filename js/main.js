const mini_list_sup = document.querySelector(".mini_list_sup");
const content_tab = document.querySelector(".content_tab");
const product_content = document.querySelector(".product_content");
const search_content_input = document.querySelector(".search_content_input");
const searched_content = document.querySelector(".searched_content");
const getData = async () => {
    try {
        const res = await fetch("https://fakestoreapi.com/products?limit=3");
        const data = await res.json();

        return data;
    } catch (error) {

    }
};
const miniRender = async () => {
    const data = await getData();
    mini_list_sup.innerHTML = data?.map((item) => `
    <div class="mini_card" >
    <div class="title_sup" >
    <h1 class="mini_card__title" >${item.title}</h1>
    </div>
    <div class="img_sup" >
        <img class="card_img" src="${item.image}" alt="" />
    </div>
    <div class="text_sup">
        <p class="mini_card__text" >$${item.price}</p>
        <strong class="mini_card__sup" >24% Off</strong>
    </div>
        <p class="mini_card__price" >$${item.price}</p>
    </div>

    `).join("");
}
miniRender();

const getCategory = async () => {
    try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();

        return data;
    } catch (error) {

    }
};

(async () => {
    const data = await getCategory();
    content_tab.innerHTML = data?.map(
        (item) => `
        <button class="content_tab__btn">${item}</button>
        `
    ).join("");
})();

const getProducts = async () => {
    try {
        const res = await fetch("https://fakestoreapi.com/products?limit=20");
        const data = await res.json();

        return data;
    } catch (error) {

    }
};
const renderProducts = async () => {
    const data = await getProducts();
    product_content.innerHTML = data?.map((item) => `
    <div class="product_card" >
        <div class="card_img_sup" >
            <img class="product_card_img" src="${item.image}" alt="" />
        </div>
            <h1 class="card_title">${item.title.split("").length > 30 ? item.title.slice(0, 30) + "..." : item.title}</h1>
            <button class="card_button" ></button>
        <div class="card_mini_sup">
            <p class="card__price" >$${item.price}</p>
            <p class="card__text" >$${item.price}</p>
            <strong class="card__sup" >24% Off</strong>
        </div> 
        <div class="card_mini_sup_new">
            <a class="korzinka_btn" href="http://127.0.0.1:5500/korzinka.html?id=${item.id}" >
                <img class="korzinka_icon" src="/img/korzinka.png" alt="" />
            </a>
            <a class="detail_btn" href="http://127.0.0.1:5500/detail.html?id=${item.id}" >
                <img class="detail_icon" src="/img/detail.png" alt="" />
            </a>
        </div>
    </div>
    `).join("");
}
renderProducts();
///////////////////////////////////////

const apiUrl = "https://fakestoreapi.com/products";

const searchProductByName = async () =>{
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;

    } catch (error) {
        
    }
}


search_content_input.addEventListener("keydown", async (e) => {
        let data = await searchProductByName();
        if(searched_content.innerHTML = e.target.value){
            searched_content.innerHTML = data?.filter((item=> item.title.toLowerCase().includes(e.target.value.toLowerCase())))?.map((item)=> `
            <div class="searched_content2" >
            <div>
                <img  width="100" src="${item.image}" alt=""/>
            </div>
            <p class="searched_content_title" >${item.title}</p>
            </div>
            `).join("");
             searched_content.style.height="400px"

        }else{
            searched_content.textContent = "";
            if (!e.target.value) {
                searched_content.style.height="0px"
            }
        }
})








