let x = 0;

let isShow = false;

let isShowModal = false;

const sliderList = Array.from(
    document.getElementsByClassName("slider__item")
  );

const sliderHandler = function () {
  sliderList.forEach((ele) => {
    ele.style.display = "none";
  });
  sliderList[x%3].style.display = "block";
  x++;
};

const mobileMenuToggler = function() {
  isShow = !isShow;
  const state = isShow ? 'block' : 'none';
  document.getElementById("mobileNav").style.display = state;
}

const modalToggler = function() {
  console.log(isShowModal)
  isShowModal = !isShowModal;
  const state = isShowModal ? 'block' : 'none';
  document.getElementById("modalTickets").style.display = state;
}

window.onload = () => {
  setInterval(sliderHandler, 3000);
};
