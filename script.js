const spiderCardTemplate = document.querySelector("[data-spider-template]")
const spiderCardContainer = document.querySelector("[data-spider-cards-container]")
const searchInput = document.querySelector("[data-search]")
const searchButton = document.querySelector("[data-search-button]")
const searchButton2 = document.querySelector("[data-search-button-2]")

let spiders = []

searchButton.addEventListener("click", () => {
    document.querySelector('[display-menu]').setAttribute("class", "dropdown-menu dropdown-menu-right");
    displayError();
    fetchHandler();
});
searchButton2.addEventListener("click", fetchHandler);

const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 30000);
}

// hiding loading
function hideLoading() {
    loader.classList.remove("display");
}

function fetchHandler() {
    clearList();
    displayLoading()
    var input = searchInput.value;

    const area = document.querySelector("[area-select]").selectedOptions[0].text;
    const filterText = document.querySelector("[filter-select]").selectedOptions[0].text;
    let fetchUrl = "spider-search-production.up.railway.app/api/v1/spiders/search?search=" + input + "&area=" + area;


    if (filterText === "Name") {
        fetchUrl = fetchUrl + "&sortName=true";
    } else if (filterText === "Lowest Price") {
        fetchUrl = fetchUrl + "&price=asc";
    } else if (filterText === "Biggest Price") {
        fetchUrl = fetchUrl + "&price=desc";
    }

    fetch(fetchUrl)
        .then(res => res.json())
        .then(data => {
            hideLoading();
            spiders = data.map(spider => {
                const card = spiderCardTemplate.content.cloneNode(true).children[0];
                const header = card.querySelector("[data-header]");
                const body = card.querySelector("[data-body]");
                const image = card.querySelector(".image");
                const link = card.querySelector(".link");
                header.textContent = spider.name;
                body.textContent = spider.price;
                image.src = spider.image;
                link.href = spider.link;
                spiderCardContainer.append(card);
                return {name: spider.name, price: spider.price, image: spider.image, link: spider.link, element: card}
            })
        })
}

function clearList() {
    // looping through each child of the search results list and remove each child
    while (spiderCardContainer.firstChild) {
        spiderCardContainer.removeChild(spiderCardContainer.firstChild)
    }
}

function verifyPassLength()
{
    //check empty password field
    if(searchInput.value === "")
    {
        document.getElementById("message").innerHTML = "Please enter valid password...!";
        return false;
    }

    //Password minimum length
    if(password.length < 6)
    {
        document.getElementById("message").innerHTML = "Password should not be less than 6 characters...!";
        return false;
    }

    //Password maximum length
    if(password.length > 12)
    {
        document.getElementById("message").innerHTML = "Password should not be greater than 12 characters...!";
        return false;
    }
    else
    {
        alert("Success....! Password Verified.");
    }
}
