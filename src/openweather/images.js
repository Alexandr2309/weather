import cloudy from '../images/conditions/cloudy.jpg'
import thunder from '../images/conditions/thunderstorm.jpg'
import drizzle from '../images/conditions/drizzle.webp'
import lightRain from '../images/conditions/light-rain.webp'
import rain from '../images/conditions/rain.webp'
import heavyRain from '../images/conditions/heavy-rain.jpg'
import showers from '../images/conditions/showers.jpg'
import snow from '../images/conditions/snow.jpg'
import wetSnow from '../images/conditions/wet-snow.jpg'
import hail from '../images/conditions/hail.jpg'
import dust from '../images/conditions/tuman.jpg'
import sand from '../images/conditions/sand.jpg'
import huricane from '../images/conditions/uragan.jpg'
import clear from '../images/conditions/clear.jpg'
import partlyCloudy from '../images/conditions/partly-cloudy.webp'
import overcast from '../images/conditions/overcast.jpg'
import unknown from '../images/conditions/unknown.jpg'

const imgCode = (id) => {
  id = +id;
  if (id < 300) return thunder
  else if (id >= 300 && id <= 310) return drizzle
  else if (id < 502) return lightRain
  else if (id === 502) return rain
  else if (id < 521) return heavyRain
  else if (id < 600) return showers
  else if (id < 611) return snow
  else if (id < 620) return wetSnow
  else if (id < 700) return hail
  else if (id < 742 || id === 761) return dust
  else if (id === 751 || id === 771 || id === 762) return sand
  else if (id === 781) return huricane
  else if (id === 800) return clear
  else if (id === 801 || id === 802) return partlyCloudy
  else if (id === 803) return cloudy
  else if (id === 804) return overcast
  else {
    return unknown
  }
};
export default imgCode;