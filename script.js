window.onload = function () {
  const clothesList = document.querySelector(".clothes-list");
  const typeBtns = document.querySelectorAll(".type-btn");
  const unDressBtn = document.querySelector(".undress");
  const itemImgs = clothesList.children;
  const dressUpBangs = document.querySelector(".dress-up-b-hair");
  const dressUpHair = document.querySelector(".dress-up-hair");
  const dressUpTop = document.querySelector(".dress-up-top");
  const dressUpBottom = document.querySelector(".dress-up-bottom");
  const dressUpShoes = document.querySelector(".dress-up-shoes");

  let selectedType = "showAll";

  // 마우스 클릭시 애니메이션
  const asdf = document.getElementById("asdf");
  document.addEventListener("click", function (event) {
    const nemo = document.createElement("div");
    let x = event.clientX;
    let y = event.clientY;
    nemo.classList.add("nemo");
    nemo.style.left = x + "px";
    nemo.style.top = y - 50 + "px";

    asdf.appendChild(nemo);

    setTimeout(function () {
      nemo.remove();
    }, 400);
  });

  // 옷 목록
  function clothesListItem(obj) {
    let html = "";
    obj.forEach(function (item) {
      if (selectedType === "showAll" || item.type === selectedType) {
        const tag = `
          <img id="${item.id}" src="${item.src}" alt="${item.name}" data-type="${item.type}">
        `;
        html += tag;
      }
    });
    clothesList.innerHTML = html;

    // 옷목록 itemImgs 에 클릭 이벤트 추가
    for (let i = 0; i < itemImgs.length; i++) {
      itemImgs[i].addEventListener("click", dressUpDrop);
    }
  }

  // // 옷입고 벗기

  function dressUpDrop(e) {
    const imgTag = document.createElement("img");
    imgTag.src = e.target.src;
    imgTag.alt = e.target.alt;
    imgTag.id = e.target.id;
    imgTag.setAttribute("data-type", e.target.dataset.type);

    let existingImg = null;
    switch (imgTag.dataset.type) {
      case "bangs":
        existingImg = dressUpBangs.querySelector("img");
        break;
      case "hair":
        existingImg = dressUpHair.querySelector("img");
        break;
      case "top":
        existingImg = dressUpTop.querySelector("img");
        break;
      case "bottom":
        existingImg = dressUpBottom.querySelector("img");
        break;
      case "shoes":
        existingImg = dressUpShoes.querySelector("img");
        break;
    }

    if (existingImg) {
      if (existingImg.id === imgTag.id) {
        existingImg.remove();
        return;
      }
      existingImg.remove();
    }

    switch (imgTag.dataset.type) {
      case "bangs":
        dressUpBangs.appendChild(imgTag);
        break;
      case "hair":
        dressUpHair.appendChild(imgTag);
        break;
      case "top":
        dressUpTop.appendChild(imgTag);
        break;
      case "bottom":
        dressUpBottom.appendChild(imgTag);
        break;
      case "shoes":
        dressUpShoes.appendChild(imgTag);
        break;
    }
  }

  // 이미지 지우기
  function removeExistingImg(element) {
    const existingImg = element.querySelector("img");
    if (existingImg !== null) {
      existingImg.remove();
    }
  }

  // 옷 전체 벗기
  unDressBtn.addEventListener("click", function () {
    removeExistingImg(dressUpBangs);
    removeExistingImg(dressUpHair);
    removeExistingImg(dressUpTop);
    removeExistingImg(dressUpBottom);
    removeExistingImg(dressUpShoes);
  });

  // 버튼 클릭 시 html의 data-type 읽기 /  클래스 추가
  typeBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const dataType = button.dataset.type;
      typeBtns.forEach((bt) => {
        bt.classList.remove("selected");
        button.classList.add("selected");
        selectedType = dataType;
        clothesListItem(obj);
      });
    });
  });

  //json 읽기
  let obj;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response;
      obj = JSON.parse(str);
      clothesListItem(obj);
    }
  };

  xhttp.open("GET", "dummyData.json");
  xhttp.send();
};
