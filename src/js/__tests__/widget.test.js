import { CardNumberFormWidget } from '../widget';

test('widget', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardNumberFormWidget(container);

  widget.bindToDOM();

  expect(container.innerHTML).toEqual(CardNumberFormWidget.markup);
});

test('widget invalid card number', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardNumberFormWidget(container);

  widget.bindToDOM();

  widget.input.value = '7711771177';
  widget.submit.click();

  expect(widget.input.classList.contains('invalid')).toEqual(true);
});

test('widget valid card number', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardNumberFormWidget(container);
  widget.bindToDOM();

  widget.input.value = '371449635398431';
  widget.submit.click();

  expect(widget.input.classList.contains('valid')).toEqual(true);
});

test('widget master card number', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardNumberFormWidget(container);

  widget.bindToDOM();

  const cardMaster = document.querySelector('.master');
  const cardVisa = document.querySelector('.visa');
  const cardMir = document.querySelector('.mir');

  widget.input.value = '5555555555554444';
  widget.submit.click();
  expect(cardMaster.classList.contains('cdisabled')).toEqual(false);
  expect(cardVisa.classList.contains('cdisabled')).toEqual(true);
  expect(cardMir.classList.contains('cdisabled')).toEqual(true);
});

test('widget visa card number', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardNumberFormWidget(container);

  widget.bindToDOM();

  const cardMaster = document.querySelector('.master');
  const cardVisa = document.querySelector('.visa');
  const cardMir = document.querySelector('.mir');

  widget.input.value = '4111111111111111';
  widget.submit.click();
  expect(cardMaster.classList.contains('cdisabled')).toEqual(true);
  expect(cardVisa.classList.contains('cdisabled')).toEqual(false);
  expect(cardMir.classList.contains('cdisabled')).toEqual(true);
});

test('widget mir card number', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardNumberFormWidget(container);

  widget.bindToDOM();

  const cardMaster = document.querySelector('.master');
  const cardVisa = document.querySelector('.visa');
  const cardMir = document.querySelector('.mir');

  widget.input.value = '2201382000000013';
  widget.submit.click();
  expect(cardMaster.classList.contains('cdisabled')).toEqual(true);
  expect(cardVisa.classList.contains('cdisabled')).toEqual(true);
  expect(cardMir.classList.contains('cdisabled')).toEqual(false);
});

test('widget other card number', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new CardNumberFormWidget(container);

  widget.bindToDOM();

  const cardMaster = document.querySelector('.master');
  const cardVisa = document.querySelector('.visa');
  const cardMir = document.querySelector('.mir');

  widget.input.value = '371449635398431';
  widget.submit.click();
  expect(cardMaster.classList.contains('cdisabled')).toEqual(true);
  expect(cardVisa.classList.contains('cdisabled')).toEqual(true);
  expect(cardMir.classList.contains('cdisabled')).toEqual(true);
});
