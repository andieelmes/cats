const products = document.querySelectorAll('.js-product');

products.forEach((el) => {
  const input = el.querySelector('.js-checkbox')
  const card = el.querySelector('.js-product-card')

  input.addEventListener('change', function(){
    card.classList.add('mouseover')
  })

  card.addEventListener('mouseleave', function(){
    card.classList.remove('mouseover')
  })
})
