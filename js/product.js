const item = document.querySelector(".item");
let params = new URLSearchParams(document.location.search);

const siteUrl = "https://fakestoreapi.com/products"

const id = params.get("id");

const renderProductDetail =  async () => {
    try {
        const res = await fetch(`${siteUrl}/${id}`);
        const data = await res.json();
        item.innerHTML = `
        <div class="detail_sup_card" >
             <div class="detail_img_card" >
                <img class="detail_img" src="${data.image}" alt="" />
             </div>
             <div class="detail_text_sup" >
                <h1 class="detail_title" ><span>Name:   </span>   ${data.title}</h1>
                <p class="detail_text"><span>Description:   </span>   ${data.description}</p>
                <p class="detail_text_price"><span>Price:   </span>   $${data.price}</p>
                <p class="detail_text"><span>Count:   </span>   ${data.rating.count} pcs</p>
             </div>
        
        </div>
        `
    } catch (error) {
        
    }
};
renderProductDetail();