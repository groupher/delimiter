/**
 * Build styles
 */
import css from './index.css';

import penIcon from './icon/divider-pen.svg'
import coffeeIcon from './icon/divider-coffee.svg'
import planetIcon from './icon/divider-planet.svg'
import keyboardIcon from './icon/divider-keyboard.svg'
import moonIcon from './icon/divider-moon.svg'

/**
 * Delimiter Block for the Editor.js.
 *
 * @author CodeX (team@ifmo.su)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 */

/**
 * @typedef {Object} DelimiterData
 * @description Tool's input and output data format
 */
export default class Delimiter {
  /**
   * Allow Tool to have no content
   * @return {boolean}
   */
  static get contentless() {
    return true;
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: DelimiterData, config: object, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */
  constructor({data, config, api}) {
    this.api = api;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: 'ce-delimiter',
      wing: 'delimiter-wing',
      centerIcon: 'center-icon',
      settingsWrapper: 'cdx-delimiter-settings',
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive,
    };

    this._data = {};
    this._element = this.drawView();

    this.settings = [
      {
        name: 'pen',
        title: 'pen',
        icon: penIcon,
        default: true
      },
      {
        name: 'coffee',
        title: 'coffee',
        icon: coffeeIcon,
        default: false
      },
      {
        name: 'keyboard',
        title: 'keyboard',
        icon: keyboardIcon,
        default: false
      },
      {
        name: 'planet',
        title: 'planet',
        icon: planetIcon,
        default: false
      },
      {
        name: 'moon',
        title: 'moon',
        icon: moonIcon,
        default: false
      }
    ]

    this.data = data;
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    const wrapper = this._make('DIV', [this._CSS.block, this._CSS.wrapper])

    const leftWing = this._make('DIV', this._CSS.wing)
    const centerIcon = this._make('div', this._CSS.centerIcon)
    const rightWing = this._make('DIV', this._CSS.wing)

    centerIcon.innerHTML = coffeeIcon

    wrapper.appendChild(leftWing);
    wrapper.appendChild(centerIcon);
    wrapper.appendChild(rightWing);

    return wrapper;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    return this._element;
  }

  /**
   * Settings
   * @public
   */
  renderSettings() {
    const wrapper = this._make('div', [ this._CSS.settingsWrapper ], {});

    this.settings.forEach( (item) => {
      const itemEl = this._make('div', [this._CSS.settingsButton], {
        innerHTML: item.icon
      });

      // itemEl.addEventListener('click', () => {
      //   this.toggleTune(item.name);

      //   const buttons = itemEl.parentNode.querySelectorAll('.' + this.CSS.settingsButton);

      //   Array.from(buttons).forEach( button => button.classList.remove(this.CSS.settingsButtonActive));

      //   itemEl.classList.toggle(this.CSS.settingsButtonActive);
      // });

      // if (this._data.style === item.name) {
      //   itemEl.classList.add(this.CSS.settingsButtonActive);
      // }

      wrapper.appendChild(itemEl);
    });

    return wrapper;
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {DelimiterData} - saved data
   * @public
   */
  save(toolsContent) {
    return {};
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: `<svg width="19" height="4" viewBox="0 0 19 4" xmlns="http://www.w3.org/2000/svg"><path d="M1.25 0H7a1.25 1.25 0 1 1 0 2.5H1.25a1.25 1.25 0 1 1 0-2.5zM11 0h5.75a1.25 1.25 0 0 1 0 2.5H11A1.25 1.25 0 0 1 11 0z"/></svg>`,
      title: '分割线 (Delimiter)'
    };
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {array|string} classNames  - list or name of CSS classname(s)
   * @param  {Object} attributes        - any attributes
   * @return {Element}
   */
  _make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}

