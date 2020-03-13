///tag ajax
const sneakApi = axios.create({})


const category = document.getElementById("pasta").getAttribute("id-cat")
const tagElems = document.querySelectorAll(".checkbox-tags")

function getTagsChecked() {

    var tagChecked = [];

    tagElems.forEach(el => {
        if (el.checked) {
            tagChecked.push(el.getAttribute("data-tag-id"))
        }
    })

    return tagChecked

}

tagElems.forEach(el => {
    el.onclick = () => {

        const tagChecked=getTagsChecked();


        sneakApi.post("/tag-selection",{tagChecked, category})
        .then(dbRes => {
            const sneakers = dbRes.data;

            const sneakerParent = document.getElementById("products_grid")
            sneakerParent.innerHTML="";

            sneakers.forEach(sneaker => {

                var sneakerElem=document.createElement("a");
                sneakerElem.classList.add("product-item-wrapper")
                sneakerElem.href= "/one-product/" + sneaker.id;
                sneakerElem.innerHTML = `<div class="product-img">
                <img src="/medias/${sneaker.image}" alt="${sneaker.name} : what a nice pair of kicks">
                </div>
                <p class="product-name">${sneaker.name}</p>
                <p class="product-cat">${sneaker.category}</p>
                <p class="product-price">${sneaker.price}</p>`

                sneakerParent.appendChild(sneakerElem)
            })
        })
        .catch(err => console.log(err))
        
    }
});
        
