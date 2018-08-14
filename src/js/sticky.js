import {clearStyles} from './utils'
/**
 * makes element fixed inside its container if window width is more than breakpoint
 */
class StickyFill {
  constructor(config={}) {
    const {element, container, breakpoint, top} = config   
    if (!element || !container) return

    this.$el = $(element);
    this.$container = $(container);
    this.$window = $(window);
    
    this.breakpoint = breakpoint;

    this.topLimit = top
    this.bottomLimit = 0
    this.finalPositionTop = 0
    this.elHeight = this.$el.outerHeight()
    this.initialElHeight = this.$el.outerHeight()

    this.calculateMetrics()

    this.init();
    this.watchWidth();
    this.$window.on('load', this.calculateMetrics)
    this.$window.on('resize', this.watchWidth)

  }

  calculateLimits = () => {
    const windowHeight = this.$window.height()
    const containerHeight = this.$container.height()
    this.elHeight = Math.min(this.initialElHeight, windowHeight)
    this.bottomLimit = containerHeight + this.topLimit - windowHeight + 27
    this.finalPositionTop = containerHeight - windowHeight
  }

  freezeHeight = () => {
    clearStyles(this.$el)
    this.$el.outerHeight(this.elHeight)
    
  }


  handleScroll = () => {
    const scrollTop = this.$window.scrollTop()
    const windowHeight = this.$window.height()
    const isHigher = scrollTop < this.topLimit
    const isLower = scrollTop > this.bottomLimit
    const isInBetween = !isHigher && !isLower
    
    if (isInBetween) {
      clearStyles(this.$el)
      //this.freezeHeight()
      this.$container.removeClass('is-sticky-bottom')
      this.$el.removeClass('is-sticky-bottom').addClass('is-sticky')

    }
    else if (isLower) {
      this.$container.addClass('is-sticky-bottom')

      this.$el
        .removeClass('is-sticky')
        .addClass('is-sticky-bottom')
        .css({top: this.finalPositionTop})
    }
    else {
      clearStyles(this.$el)
      //this.freezeHeight()
      this.$container.removeClass('is-sticky-bottom')
      this.$el.removeClass('is-sticky is-sticky-bottom')
    }
  }

  calculateMetrics = () => {
    if (!this.checkInited()) return
    this.calculateLimits()
    //this.freezeHeight()
  }

  watchWidth = () => {
    const width = this.$window.width()
    if (width <= this.breakpoint) this.destroy()
    else this.init()
  }


  checkInited = () => {
    return !!this.$el 
      && !!this.$container 
      && !!this.$container.length
  }


  update = () => {
    this.calculateMetrics()
    this.$window.trigger('resize')
  }

  init = () => {
    this.$window.on('scroll', this.handleScroll)  
    this.$window.on('resize', this.calculateMetrics)
    
  }
  destroy = () => {
    this.initialisation = false;
    clearStyles(this.$el)
    this.$container.removeClass('is-sticky-bottom')
    this.$el.removeClass('is-sticky is-sticky-bottom')

    this.$window.off('scroll', this.handleScroll)  
    this.$window.off('resize', this.calculateMetrics)
  }
}

export default StickyFill