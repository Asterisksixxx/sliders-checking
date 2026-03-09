const $slider = document.getElementById("slider");
const $sliderContainer = document.getElementById("slider-container");
const $sliderList = document.getElementById("slider-list");
const $sliderItems = $sliderList.children;
const $prevButton = document.getElementById("prev");
const $nextButton = document.getElementById("next");
const $indicatorList = document.getElementById("indicators-list");

const slidesCount = 2;
const slidesToScroll = 1;
let clickedIndicatorPoint = Number(null);

const handleMoveToPrev = () => {
  $sliderList.scrollTo({
    left: getSliderOffset() - getSliderItemWidth() * slidesToScroll,
    behavior: "smooth",
  });
};

const handleMoveToNext = () => {
  $sliderList.scrollTo({
    left: getSliderOffset() + getSliderItemWidth() * slidesToScroll,
    behavior: "smooth",
  });
};

const getSliderContainerDimensions = () => {
  return $sliderContainer.getBoundingClientRect();
};
const getSliderItemWidth = () => {
  const { width } = getSliderContainerDimensions();

  return width / slidesCount;
};

const getSliderOffset = () => {
  return $sliderList.scrollLeft;
};

const createIndicators = () => {
  const length = Math.ceil(
    $sliderItems.length / slidesToScroll - (slidesCount - slidesToScroll),
  );
  const items = Array(length).fill(null);
  items.forEach(appendIndicatorsList);
};

const appendIndicatorsList = () => {
  $indicatorList.insertAdjacentHTML(
    "beforeend",
    `<li class="slider__point">
                  <svg class="slider__point_svg" width="14" height="14">
                    <use href="assets/sprite.svg#slider__point_svg"></use>
                  </svg>
                </li>`,
  );
};

// смена названия
const handleScroll = (event) => {
  const index = Math.floor(
    event.currentTarget.scrollLeft / getSliderItemWidth(),
  );
  const indicatorIndex = index / slidesToScroll;
  Array.from($indicatorList.children).forEach(
    ($indicatorPoint, indicatorPointIndex) => {
      $indicatorPoint.classList.toggle(
        `slider__point_active`,
        indicatorPointIndex === indicatorIndex,
      );
    },
  );
};

const onIndicatorClickScrolling = () => {
  console.log(clickedIndicatorPoint * slidesToScroll * getSliderItemWidth());

  $sliderList.scrollTo({
    left: clickedIndicatorPoint * slidesToScroll * getSliderItemWidth(),
    behavior: "smooth",
  });
};

const start = () => {
  createIndicators();
};

$indicatorList.addEventListener("click", (event) => {
  event.preventDefault();
  const targetPoint = event.target.closest(".slider__point");
  clickedIndicatorPoint = Array.from($indicatorList.children).findIndex(
    ($point) => {
      return $point === targetPoint;
    },
  );
  onIndicatorClickScrolling();
});

$sliderList.addEventListener("scroll", handleScroll);

$prevButton.addEventListener("click", handleMoveToPrev);
$nextButton.addEventListener("click", handleMoveToNext);

document.addEventListener("DOMContentLoaded", start);
