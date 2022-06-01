const basketBtn = document.querySelector('.cartIconWrap');
const basketCounterEl = basketBtn.querySelector('span');
const basketTotalValueEl = document.querySelector('.basketTotalValue')
const basketTotalEl = document.querySelector('.basketTotal')
const basketEl = document.querySelector('.basket');

basketBtn.addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
})

const basketItem = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (!event.target.closest('.addToCart')) {
    return;
  }

  const featuredItemEl = event.target.closest('.featuredItem');
  const id = +featuredItemEl.dataset.id;
  const name = featuredItemEl.dataset.name;
  const price = +featuredItemEl.dataset.price;

  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in basketItem)) {
    basketItem[id] = {id: id, name: name, price: price, count: 0};
  }

  basketItem[id].count++;

  basketCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);

  renderProductInBasket(id);
}

function getTotalBasketCount() {
  return Object
    .values(basketItem)
    .reduce((total, product) => total + product.count, 0);
};

function getTotalBasketPrice() {
  return Object
    .values(basketItem)
    .reduce((total, product) => total + product.price * product.count, 0)
};

function renderProductInBasket(productId) {
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-id="${productId}"]`);

  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }

  const product = basketItem[productId];
  basketRowEl.querySelector('.productCount').textContent = product.count;
  basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
};

function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
        <div>
          ${basketItem[productId].name}
        </div>
        <div>
          <span class="productCount">${basketItem[productId].count}</span> шт.
        </div>
        <div>
          ${basketItem[productId].price}
        </div>
        <div>
          $<span class="productTotalRow">${(basketItem[productId].price * basketItem[productId].count).toFixed(2)}</span>
        </div>
    </div>
  `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
};