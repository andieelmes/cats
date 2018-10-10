const products = document.querySelectorAll('.js-product');

function handleClick(card, input) {
  if (input.checked) card.classList.add('mouseover')
}

function handleLeave(card) {
  card.classList.remove('mouseover')
}

products.forEach((el) => {
  const input = el.querySelector('.js-checkbox')
  const card = el.querySelector('.js-product-card')

  input.addEventListener('change', handleClick.bind(null, card, input))

  card.addEventListener('mouseleave', handleLeave.bind(null, card))
})
