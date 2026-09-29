const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

if (menuToggle && navigation) {
	menuToggle.addEventListener('click', () => {
		const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', String(!isOpen));
		menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
		navigation.classList.toggle('is-open', !isOpen);
	});

	navigation.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			menuToggle.setAttribute('aria-expanded', 'false');
			menuToggle.setAttribute('aria-label', 'Open navigation menu');
			navigation.classList.remove('is-open');
		});
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			menuToggle.setAttribute('aria-expanded', 'false');
			menuToggle.setAttribute('aria-label', 'Open navigation menu');
			navigation.classList.remove('is-open');
		}
	});
}

const toast = document.querySelector('#cart-toast');
const toastMessage = document.querySelector('#cart-message');
const toastClose = document.querySelector('.toast-close');
let toastTimer;

function showToast(message) {
	if (!toast || !toastMessage) return;
	toastMessage.textContent = message;
	toast.classList.add('is-visible');
	window.clearTimeout(toastTimer);
	toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

document.querySelectorAll('.quick-add').forEach((button) => {
	button.addEventListener('click', () => {
		const product = button.dataset.product;
		showToast(`${product} added to your order`);
	});
});

toastClose?.addEventListener('click', () => {
	toast.classList.remove('is-visible');
	window.clearTimeout(toastTimer);
});

const orderForm = document.querySelector('#order-form');
const formFeedback = document.querySelector('#form-feedback');
const orderWhatsapp = document.querySelector('#order-whatsapp');

orderForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!orderForm.reportValidity()) {
		formFeedback.textContent = '';
		return;
	}

	const formData = new FormData(orderForm);
	const orderMessage = [
		'Hello Sweet Bloom Bakery! I would like to place an order.',
		`Name: ${formData.get('name')}`,
		`Phone: ${formData.get('phone')}`,
		`Product: ${formData.get('product')}`,
		`Quantity: ${formData.get('quantity')}`,
		formData.get('message') ? `Notes: ${formData.get('message')}` : ''
	].filter(Boolean).join('\n');
	formFeedback.textContent = 'Your order details are ready. Send them to our bakery team:';
	orderWhatsapp.href = `https://wa.me/15550142873?text=${encodeURIComponent(orderMessage)}`;
	orderWhatsapp.hidden = false;
	orderForm.reset();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add('is-visible'));
}

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
