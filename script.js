const filterButtons = document.querySelectorAll('.filter');
const productCards = [...document.querySelectorAll('.product-card')];
const searchInput = document.getElementById('productSearch');
const toast = document.getElementById('toast');
let activeFilter = 'all';
let toastTimer;
function updateProducts(){
  const query = searchInput.value.trim().toLowerCase();
  let shown = 0;
  productCards.forEach(card => {
    const categories = card.dataset.category.split(' ');
    const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
    const matchesSearch = card.dataset.name.includes(query) || card.textContent.toLowerCase().includes(query);
    card.hidden = !(matchesFilter && matchesSearch);
    if (!card.hidden) shown++;
  });
  const old = document.querySelector('.empty-state');
  if(old) old.remove();
  if(!shown){const empty=document.createElement('p');empty.className='empty-state';empty.textContent='No vases found. Try another search or choose “All vases”.';document.getElementById('productGrid').appendChild(empty);}
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active'); activeFilter = button.dataset.filter; updateProducts();
}));
searchInput.addEventListener('input', updateProducts);
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
document.querySelectorAll('.quick-order').forEach(button=>button.addEventListener('click',()=>{
  const product=button.dataset.product;
  const message=`Hi BLOO MORA! I'm interested in the ${product}. Could you please confirm availability, size, and price?`;
  window.open(`https://wa.me/94740324570?text=${encodeURIComponent(message)}`,'_blank','noopener');
  showToast(`Opening WhatsApp to ask about ${product}…`);
}));
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{const isOpen=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));menuToggle.textContent=isOpen?'✕':'☰'});
navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));
document.getElementById('year').textContent=new Date().getFullYear();
