const $slider = document.getElementById("slider");
const $sliderContainer = document.getElementById("slider-container");
const $sliderList = document.getElementById("slider-list");
const $sliderItems = $sliderList.children;
const $prevButton = document.getElementById("prev");
const $nextButton = document.getElementById("next");
const $indicatorList = document.getElementById("indicators-list");

const slidesCount = 3;
const slidesToScroll = 2;
const arrayOfIndexSlides = [];

const handleMoveToPrev = () => {
  $sliderList.scrollTo({
    left: getSliderOffset() - getSliderItemWidth() * slidesToScroll,
    behavior: "smooth",
  });
  // setTimeout(() => {
  //   getActiveIndicators();
  // }, 650);
};

const handleMoveToNext = () => {
  $sliderList.scrollTo({
    left: getSliderOffset() + getSliderItemWidth() * slidesToScroll,
    behavior: "smooth",
  });
  // setTimeout(() => {
  //   getActiveIndicators();
  // }, 650);
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

const handleScroll = (event) => {
  const index = Math.floor(
    event.currentTarget.scrollLeft / getSliderItemWidth(),
  );
  const indicatorIndex = index / slidesToScroll;
  // console.log(indicatorIndex, index);
  Array.from($indicatorList.children).forEach(
    ($indicatorPoint, indicatorPointIndex) => {
      $indicatorPoint.classList.toggle(
        `slider__point_active`,
        indicatorPointIndex === indicatorIndex,
      );
      console.log(indicatorPointIndex, index);
    },
  );
};
$sliderList.addEventListener("scroll", handleScroll);

// const getActiveIndicators = () => {
//   console.log("offset= " + getSliderOffset());

//   if (getSliderOffset() !== 0) {
//     console.log("not zero");
//     const lastSlide = Math.round(
//       getSliderOffset() / getSliderItemWidth() + slidesCount,
//     );
//     console.log("last slide= " + lastSlide);
//     const arr = [];
//     for (
//       let i = Math.round(getSliderOffset() / getSliderItemWidth());
//       i < lastSlide;
//       i++
//     ) {
//       arr.push(Math.round(i));
//     }
//     console.log("slides= " + arr);
//     return arr;
//   } else {
//     console.log("zero");
//     const arr = [];
//     for (let i = 0; i < slidesCount; i++) {
//       arr.push(Math.round(i));
//     }
//     console.log("slides= " + arr);
//     return arr;
//   }
// };

// const updateIndicatorsList = () => {
//   for (let i = 0; getActiveIndicators().length; i++) {
//     $indicatorList.children[getActiveIndicators[i]].className.
//   }
// };

// получение индекса слайда, что вошел в область родительского контейнера
// const interObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const index = Array.from($sliderList.children).indexOf(entry.target);
//         // console.log(index + 1);
//         arrayOfIndexSlides.push(index + 1);
//         // console.log(arrayOfIndexSlides);
//       }
//     });
//   },
//   { root: $sliderList, threshold: 0.1, rootMargin: "0px -350px 0px -350px" },
// );

// document.querySelectorAll(".slider__item").forEach((slide) => {
//   interObserver.observe(slide);
// });

$prevButton.addEventListener("click", handleMoveToPrev);
$nextButton.addEventListener("click", handleMoveToNext);

document.addEventListener("DOMContentLoaded", createIndicators);
// document.addEventListener("DOMContentLoaded", getActiveIndicators);
