import { make, highlightSettingIcon } from '@groupher/editor-utils'

/**
 * Build styles
 */
import css from './index.css';

import penIcon from './icon/pen.svg'
import coffeeIcon from './icon/coffee.svg'
import planetIcon from './icon/planet.svg'
import keyboardIcon from './icon/keyboard.svg'
import moonIcon from './icon/moon.svg'
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
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: DelimiterData, config: object, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */
  constructor({ data, config, api }) {
    this.api = api;

    this.data = data.type || { type: 'pen' };

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
  }

  /**
   * Tool`s styles
   *
   * @returns {{baseClass: string, wrapper: string, quote: string, input: string, settingsButton: string, settingsButtonActive: string}}
   */
  get CSS() {
    return {
      block: this.api.styles.block,
      wrapper: 'ce-delimiter',
      wing: 'delimiter-wing',
      centerIcon: 'center-icon',
      settingsWrapper: 'cdx-delimiter-settings',
      settingsButton: this.api.styles.settingsButton,
    };
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    const wrapper = make('DIV', [this.CSS.block, this.CSS.wrapper])

    const leftWing = make('DIV', this.CSS.wing)
    const rightWing = make('DIV', this.CSS.wing)

    const centerIcon = make('div', this.CSS.centerIcon)
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
    const Wrapper = make('div', [ this.CSS.settingsWrapper ]);

    this.settings.forEach( (item) => {
      const itemEl = make('div', [this.CSS.settingsButton], {
        innerHTML: item.icon
      });

      if (this.data.type === item.name) {
        highlightSettingIcon(itemEl, this.api)
      }

      itemEl.addEventListener('click', () => {
        this.setCenterIcon(item.name);
        highlightSettingIcon(itemEl, this.api)
      });

      Wrapper.appendChild(itemEl);
    });

    return Wrapper;
  }

  /**
   * Toggles List style
   * @param {string} style - 'ordered'|'unordered'
   */
  setCenterIcon(name) {
    const centerIconEl = this._element.querySelector(`.${this.CSS.centerIcon}`)
    const icon =  this.settings.find( tune => tune.name === name ).icon

    centerIconEl.innerHTML = icon

    this.data.type = name
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {DelimiterData} - saved data
   * @public
   */
  save(toolsContent) {
    return this.data;
  }
}
