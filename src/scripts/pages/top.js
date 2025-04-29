// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function init() {
  console.log("📃 TOP PAGE LOADED")

  // init Swiper
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
  });

}

document.addEventListener('DOMContentLoaded', init)