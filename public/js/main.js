let newsAccordian = document.getElementById("newAccordian");
//initialise the news api parameters

//create an ajax get request, api key got by signing up at newapi
const xhr = new XMLHttpRequest();
xhr.open(
    "GET",
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=084aae8cc9c34b969f340082685718f7",
    true
);

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articless = json.articles;
        let newsHtml = "";

        articless.forEach((element, index) => {
            newsHtml += `<div class="card">
    <div class="card-header" id="headingOne">
        <h2 class="mb-0">
            <button
                class="btn "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne${index}"
                aria-expanded="true"
                aria-controls="collapseOne"
            >
                ${element.title}            </button>
        </h2>
    </div>

    <div
        id="collapseOne${index}"
        class="collapse"
        aria-labelledby="headingOne"
        data-parent="#accordionExample"
    >
        <div class="card-body">
            ${element.description} <br> <a href="${element.url}" target="blank">Read More</a>
        </div>
    </div>
</div>`;
        });

        let h = document.getElementById("headingOne");
        h.innerHTML = newsHtml;

        console.log(json);
    } else {
        console.log("some error occured");
    }
};
xhr.send();




