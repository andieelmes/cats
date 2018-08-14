/**
 * Clear all styles of given DOM node
 * @param {String} selector 
 * @return
 */
export const clearStyles = selector => $(selector).attr('style', '')

/**
 * clears location hash and prevents page scrolling
 * @return
 */
export const clearHash = () => {
  const $window = $(window);
  const sct = $window.scrollTop();
  location.hash = ''
  $window.scrollTop(sct)
}

/**
 * clears location hash and prevents page scrolling
 * @return
 */
export const changeHash = (el) => {
  const newHash = $(el).attr('data-prev-hash')
  
  const $window = $(window);
  const sct = $window.scrollTop();
  location.hash = newHash
  $window.scrollTop(sct)
}

/**
 * scrolls smoothly to the element in the container
 * @param {String} selector 
 * @param {String} container
 */
export const smoothScrollInsideParent = (selector, container, callback) => {
 
  const offset = $(selector).offset().top + $(container).scrollTop() - $(container).height()/2
  $(container).animate({
    scrollTop: offset,
 }, callback);
}

/**
 * Checks if element exists on page
 * @param {String} selector 
 * @return {Bool}
 */
export const elementExists = selector => !!$(selector).length