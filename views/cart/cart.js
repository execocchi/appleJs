class Product{
    constructor(img,title,price){
        this.img=img
        this.title=title
        this.price=price
        
    }

}

class UI{
    
    //Show product in cart
    showCart(product){

        let cartproduct=document.createElement("div");
    
        cartproduct.innerHTML=
        `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${product.img}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-price">${product.price}</p>
            <button type="button" class="btn btn-danger ">Remove</button>
            </div>
        </div>`
    
        let cartContainer=document.querySelector(".cart-items");
        
        cartContainer.appendChild(cartproduct);
    
    }


    //remove product
    removeProduct(target){
        if(target.classList.contains("btn-danger")){
            target.parentElement.parentElement.remove();
        }  

    }
    
}


class LocalStorage{
    static getProducts(){
        let products;
        if(localStorage.getItem("products")===null){
            products=[];
        }else{
            products=JSON.parse(localStorage.getItem("products"));
        }
        return products;

    }
    static displayProducts(){
        const products=LocalStorage.getProducts();

        products.forEach(function(product){
            const ui= new UI;
            //add product to UI
            ui.showCart(product);
        })

    }
    static addProduct(product){
        const products=LocalStorage.getProducts();
        products.push(product);
        localStorage.setItem("products",JSON.stringify(products));

    }
    static removeProduct(price){
        const products=LocalStorage.getProducts();
        products.forEach(function(product,index){
            if(product.price === price){
                products.splice(index,1);
            }
            localStorage.setItem("products",JSON.stringify(products));
        });
        
    }

}

//variables
const buyBtn = document.querySelectorAll(".buy");


//eventListeners
document.addEventListener("DOMContentLoaded",LocalStorage.displayProducts)

buyBtn.forEach(function(btn){
   
    btn.addEventListener("click",function(e)
        {
        e.preventDefault();
        let btn=e.target;
        let card= btn.parentNode.parentNode;
        
        let img=card.querySelector("img").src;
        let title=card.querySelector("h5").textContent;
        let price=card.querySelector(".card-price").textContent;
        
        //Instantiate a product
        const product =new Product(img,title,price)
        
        //instantiate UI
        const ui=new UI();

        
       
        //Show product
        ui.showCart(product);
        

        //add product to LS
        LocalStorage.addProduct(product);
        
        })


});

document.querySelector(".cart-items").addEventListener("click",function(e){
    //Instantiate ui
    const ui=new UI()

    //Remove product
    ui.removeProduct(e.target);

    //remove form LS
    LocalStorage.removeProduct(e.target.previousElementSibling.textContent)

    e.preventDefault();
});

$("#cart").click(function(e){
    $(".cart-items").toggle("1000");
    
})

$(".buy").click(function(){
    $(".shopping-cart").fadeOut("slow",function(){
        $(".shopping-cart").fadeIn("slow");
    })
})