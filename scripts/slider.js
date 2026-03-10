// TODO: castomizing / IN PROCESS
// TODO: refactoring to class
// Спросить по поводу стандартизации скроллинга, перенести это в отдельную функцию с принимаемыми параметрами
// scrolling standart, naming function,

const $slider = document.getElementById("slider");
const $sliderContainer = document.getElementById("slider-container");
const $sliderList = document.getElementById("slider-list");
const $sliderItems = $sliderList.children;
const $prevButton = document.getElementById("prev");
const $nextButton = document.getElementById("next");
const $indicatorList = document.getElementById("indicators-list");

const slidesToShow = $slider.getAttribute(`data-slides-to-show`);
const slidesToScroll = $slider.getAttribute(`data-slides-to-scroll`);
const startSlide = $slider.getAttribute(`data-start-slide`);
const autoScrollDelay = $slider.getAttribute(`data-autoscroll-delay`);
const scrollAnimationType = $slider.getAttribute(`data-animation-scroll`);
let clickedIndicatorPoint = Number(null);

const handleMoveToPrev = (count = 1) => {
  $sliderList.scrollTo({
    left: (getSliderOffset() - getSliderItemWidth() * slidesToScroll) * count,
    behavior: scrollAnimationType,
  });
};

const handleMoveToNext = () => {
  $sliderList.scrollTo({
    left: getSliderOffset() + getSliderItemWidth() * slidesToScroll,
    behavior: scrollAnimationType,
  });
};

// const scroll = (index) => {
//   $sliderList.scrollTo();
// };
const getSliderContainerDimensions = () => {
  return $sliderContainer.getBoundingClientRect();
};
const getSliderItemWidth = () => {
  const { width } = getSliderContainerDimensions();

  return width / slidesToShow;
};

const getSliderOffset = () => {
  return $sliderList.scrollLeft;
};

const setStartSlide = () => {
  $sliderList.scrollTo({ left: (startSlide - 1) * getSliderItemWidth() });
};

const createIndicators = () => {
  const length =
    Math.ceil(($sliderItems.length - slidesToShow) / slidesToScroll) + 1;
  const items = Array(length).fill(null);
  items.forEach(appendIndicatorsList);
};

const appendIndicatorsList = (item, index) => {
  $indicatorList.insertAdjacentHTML(
    "beforeend",
    `<li class="slider__point ${index === 0 ? `slider__point_active` : ``}">
                  <svg class="slider__point_svg" width="14" height="14">
                    <use href="assets/sprite.svg#slider__point_svg"></use>
                  </svg>
                </li>`,
  );
};

const handleScroll = (event) => {
  const index = Math.round(
    event.currentTarget.scrollLeft / getSliderItemWidth(),
  );
  const indicatorIndex = Math.ceil(index / slidesToScroll);

  Array.from($indicatorList.children).forEach(
    ($indicatorPoint, indicatorPointIndex) => {
      $indicatorPoint.classList.toggle(
        `slider__point_active`,
        indicatorPointIndex === indicatorIndex,
      );
    },
  );

  $prevButton.classList.toggle("element-hidden", index === 0);
  $nextButton.classList.toggle(
    "element-hidden",
    index === $sliderItems.length - slidesToShow,
  );
};

const handleIndicatorScroll = () => {
  $sliderList.scrollTo({
    left: clickedIndicatorPoint * slidesToScroll * getSliderItemWidth(),
    behavior: scrollAnimationType,
  });
};

const autoScrolling = () => {
  setInterval(() => {
    getSliderOffset() >=
    Math.round(($sliderItems.length - slidesToShow) * getSliderItemWidth())
      ? $sliderList.scrollTo({
          left: 0,
          behavior: scrollAnimationType,
        })
      : $sliderList.scrollTo({
          left: $sliderList.scrollLeft + getSliderItemWidth() * slidesToScroll,
          behavior: scrollAnimationType,
        });
  }, autoScrollDelay * 1000);
};

const start = () => {
  createIndicators();
  setStartSlide();
  autoScrolling();
};

$indicatorList.addEventListener("click", (event) => {
  event.preventDefault();
  const targetPoint = event.target.closest(".slider__point");
  clickedIndicatorPoint = Array.from($indicatorList.children).findIndex(
    ($point) => {
      return $point === targetPoint;
    },
  );
  handleIndicatorScroll();
});

$sliderList.addEventListener("scroll", handleScroll);

$prevButton.addEventListener("click", handleMoveToPrev);
$nextButton.addEventListener("click", handleMoveToNext);

document.addEventListener("DOMContentLoaded", start);
