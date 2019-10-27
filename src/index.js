/**
 * Build styles
 */
import css from './index.css';

import penIcon from './icon/divider-pen.svg'
import coffeeIcon from './icon/divider-coffee.svg'
import planetIcon from './icon/divider-planet.svg'
import keyboardIcon from './icon/divider-keyboard.svg'
import moonIcon from './icon/divider-moon.svg'
// import barsaIcon from './icon/barcelona.svg'
import footIcon from './icon/foot.svg'

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

    this._data = {
      iconName: 'pen',
      icon: penIcon
    };

    this.defaultIconName = 'pen'
    this.settings = [
      {
        name: 'pen',
        title: 'pen',
        icon: penIcon,
      },
      {
        name: 'coffee',
        title: 'coffee',
        icon: coffeeIcon,
      },
      {
        name: 'keyboard',
        title: 'keyboard',
        icon: keyboardIcon,
      },
      {
        name: 'planet',
        title: 'planet',
        icon: planetIcon,
      },
      {
        name: 'moon',
        title: 'moon',
        icon: moonIcon,
      },
      // {
      //   name: 'barsa',
      //   title: 'barsa',
      //   icon: barsaIcon,
      //   default: false
      // },
      {
        name: 'foot',
        title: 'foot',
        icon: footIcon,
      },
    ]

    this._element = this.drawView();
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
    const rightWing = this._make('DIV', this._CSS.wing)

    const centerIcon = this._make('div', this._CSS.centerIcon)
    centerIcon.innerHTML = this.settings.find(tune => tune.name === this.defaultIconName).icon,

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

      if (this._data.iconName === item.name) this.highlightSettingIcon(itemEl)

      itemEl.addEventListener('click', () => {
        this.setCenterIcon(item.name);
        this.highlightSettingIcon(itemEl)
      });

      wrapper.appendChild(itemEl);
    });

    return wrapper;
  }

  /**
   * highlight the setting icon in setting panel
   * @returns {HTMLElement}
   * @private
   */
  highlightSettingIcon(el) {
    if (el.parentNode) {
      const buttons = el.parentNode.querySelectorAll('.' + this._CSS.settingsButton);
      Array.from(buttons).forEach( button => button.classList.remove(this._CSS.settingsButtonActive));
    }

    el.classList.add(this._CSS.settingsButtonActive);
  }

  /**
   * Toggles List style
   * @param {string} style - 'ordered'|'unordered'
   */
  setCenterIcon(name) {
    const centerIconEl = this._element.querySelector(`.${this._CSS.centerIcon}`)
    const icon =  this.settings.find( tune => tune.name === name ).icon

    centerIconEl.innerHTML = icon

    this._data = {
      iconName: name,
      icon
    }
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {DelimiterData} - saved data
   * @public
   */
  save(toolsContent) {
    return this._data;
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

