// Swiper sliders init

import {elementExists} from './utils'
import {swiperConfig} from './config'


/**
 * Initializes swiper instance with specific config depending on slider type
 * @param {String} type path of className of given slider element
 * @return {Swiper} instance of Swiper
 */
const initSwiperInstance = (type) => {
  const clsnm = `.js-${type}-slider`
  if (!elementExists(clsnm)) return false

  const element = `${clsnm} .swiper-container`
  const settings = swiperConfig[type]
  return new Swiper(element, settings)
}


/**
 * Destroys given swiper instance
 * removes inited class name from element
 * @param {Swiper} swiper 
 * @return {Null}
 */
const destroySwiperInstance = (swiper, selector) => {
  if (!swiper) return null
  swiper.destroy();

  $(`.js-${selector}-slider`)
    .removeAttr('style')
    .find('.swiper-slide')
    .removeAttr('style');  

  return null
}


/**
 * Creates instance of swiper 
 * and binds update event to window for updation
 * @param {Object} config
 *  @arg {String} swiperSelector is className of the slider
 *  @arg {String} filterCategory is container selector, when the btn with href="#filterCategory" is clicked, only containers with that data-category are shown
 * @return {Object}
 */
const SimpleSwiperFactory = function({swiperSelector, filterCategory}) {
  let swiper = initSwiperInstance(swiperSelector)

  $(window).on(`updateSwipers-${filterCategory}`, () => {
    destroySwiperInstance(swiper, swiperSelector)
    swiper = initSwiperInstance(swiperSelector)
    swiper.update()
  })

  return swiper
}



export const initThreatsSlider = function() {
  const type = 'threats'
  let swiper = null

  const _init = () => {
    swiper = $(window).width() < 1000
      ? swiper || initSwiperInstance(type)
      : destroySwiperInstance(swiper, type)
  }

  _init()
  $(window).resize(() => _init())
}

export const initCasesSlider = function() {
  const type = 'cases'
  let swiper = null

  const _init = () => {
    swiper = $(window).width() < 1000
      ? swiper || initSwiperInstance(type)
      : destroySwiperInstance(swiper, type)
  }

  _init()
  $(window).resize(() => _init())
}

export const initRestoresSlider = function() {
  const type = 'restore'
  let swiper = null

  const _init = () => {
    swiper = $(window).width() < 768
      ? swiper || initSwiperInstance(type)
      : destroySwiperInstance(swiper, type)
  }

  _init()
  $(window).resize(() => _init())
}