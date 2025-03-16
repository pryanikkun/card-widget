import { isValidCardNumber } from './validators';

export class CardNumberFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
        <ul class="cards list-unstyled">
          <li>
              <div class="card master"></div>
          </li>
          <li>
              <div class="card visa"></div>
          </li>
          <li>
              <div class="card mir"></div>
          </li>
        </ul>
        <form class="card-number-form-widget">
            <div class="control">
                <label for="number-input">Введите номер карты</label>
                <input type="text" id="number-input" class="input">
            </div>
            <button class="submit">Далее</button>
        </form>
        `;
  }

  static get submitSelector() {
    return '.submit';
  }

  static get inputSelector() {
    return '.input';
  }

  static get cardSelector() {
    return '.card';
  }

  static get selector() {
    return '.card-number-form-widget';
  }

  isMirCard(value) {
    return value.startsWith('2');
  }

  isMasterCard(value) {
    return value.startsWith('5');
  }

  isVisaCard(value) {
    return value.startsWith('4');
  }

  toggleDisabled(nameCard) {
    this.cards.forEach((element) => {
      if (element.classList.contains(nameCard)) {
        element.classList.remove('cdisabled');
      } else {
        element.classList.add('cdisabled');
      }
    });
  }

  bindToDOM() {
    this.parentEl.innerHTML = CardNumberFormWidget.markup;

    this.element = this.parentEl.querySelector(CardNumberFormWidget.selector);
    this.submit = this.element.querySelector(CardNumberFormWidget.submitSelector);
    this.input = this.element.querySelector(CardNumberFormWidget.inputSelector);
    this.cards = this.parentEl.querySelectorAll(CardNumberFormWidget.cardSelector);
    this.element.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    const { value } = this.input;
    const cleaned = value.replace(/[^0-9]/g, '');
    if (isValidCardNumber(cleaned)) {
      this.input.classList.add('valid');
      this.input.classList.remove('invalid');
      if (this.isVisaCard(cleaned)) {
        this.toggleDisabled('visa');
      } else if (this.isMasterCard(cleaned)) {
        this.toggleDisabled('master');
      } else if (this.isMirCard(cleaned)) {
        this.toggleDisabled('mir');
      } else {
        this.cards.forEach((element) => element.classList.add('cdisabled'));
      }
    } else {
      this.input.classList.add('invalid');
      this.input.classList.remove('valid');
    }
  }
}
