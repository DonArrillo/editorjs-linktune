type SearchItemData = {
  href: string
  name: string
  description: string
}

export default class LinkTune {
  data: string
  blockContent: any
  searchEndpointUrl: string
  searchQueryParam: string
  searchResults: HTMLElement[];
  searchResultWrap: HTMLElement;
  linkField: HTMLInputElement;

  constructor({ data, config }: any) {
    if (!data) {
      data = '';
    }
    this.data = data;
    this.searchEndpointUrl = config.endpoint;
    this.searchQueryParam = config.queryParam;
    this.searchResults = [];
    this.searchResultWrap = this.createElm('div', ['ce-link-autocomplete__items']);
    this.linkField = window.document.createElement('input');
    this.linkField.classList.add('ce-link-autocomplete__field-input');
    this.linkField.setAttribute('type', 'text');
    this.linkField.setAttribute('placeholder', 'Link');
  }

  static get isTune() {
    return true;
  }

  wrap(blockContent: HTMLElement) {
    blockContent.style.border = '';
    blockContent.style.paddingLeft = '';
    blockContent.querySelector('.styled-blocks-label')?.remove();
    if (this.data) {
      blockContent.style.border = '1px solid blue';
    }
    this.blockContent = blockContent;
    return blockContent;
  }

  save() {
    return this.data;
  }

  clearSearchList() {
    while (this.searchResultWrap.firstChild) {
      this.searchResultWrap.removeChild(this.searchResultWrap.firstChild);
    }
  }

  /**
 * @private
 *
 * @returns {object<string, string>} — keys and class names
 */
  static get CSS() {
    return {
      iconWrapper: 'ce-link-autocomplete__icon-wrapper',

      hidden: 'ce-link-autocomplete__hidden',

      actionsWrapper: 'ce-link-autocomplete__actions-wrapper',

      field: 'ce-link-autocomplete__field',
      fieldLoading: 'ce-link-autocomplete__field--loading',
      fieldInput: 'ce-link-autocomplete__field-input',

      foundItems: 'ce-link-autocomplete__items',

      searchItem: 'ce-link-autocomplete__search-item',
      searchItemSelected: 'ce-link-autocomplete__search-item--selected',
      searchItemName: 'ce-link-autocomplete__search-item-name',
      searchItemDescription: 'ce-link-autocomplete__search-item-description',

      linkDataWrapper: 'ce-link-autocomplete__link-data-wrapper',
      linkDataTitleWrapper: 'ce-link-autocomplete__link-data-title-wrapper',
      linkDataName: 'ce-link-autocomplete__link-data-name',
      linkDataDescription: 'ce-link-autocomplete__link-data-description',
      linkDataURL: 'ce-link-autocomplete__link-data-url',
    };
  }

  /**
   * Fill up a search list results by data
   *
   * @param {SearchItemData[]} items — items to be shown
   * @returns {void}
   */
  generateSearchList(items: SearchItemData[] = []) {
    /**
     * Clear list first
     */
    this.clearSearchList();

    /**
     * If no items returned
     */
    if (items.length === 0) {
      return;
    }

    /**
     * Fill up search list by new elements
     */
    items.forEach(item => {
      const searchItem = this.createElm('div', [LinkTune.CSS.searchItem]);

      /**
       * Create a name for a link
       */
      const searchItemName = this.createElm('div', [LinkTune.CSS.searchItemName], {
        innerText: item.name || item.href,
      });

      searchItem.appendChild(searchItemName);

      /**
       * Create a description element
       */
      if (item.description) {
        const searchItemDescription = this.createElm('div', [LinkTune.CSS.searchItemDescription], {
          innerText: item.description,
        });
        searchItem.appendChild(searchItemDescription);
      }
      /**
       * Save all keys to item's dataset
       */
      searchItem.dataset.name = item.name;
      searchItem.dataset.href = item.href;
      searchItem.dataset.description = item.description;

      searchItem.addEventListener('click', (ev: MouseEvent) => {
        this.linkField.value = searchItem.dataset.href + "";
        this.addLinkData(this.linkField.value);
      });

      this.searchResultWrap.appendChild(searchItem);
    });
  }

  /**
   * Helper method to create an HTML element.
   */
  protected createElm(type: string, classList: string[], attributes?: Record<string, string>): HTMLElement {
    const elm = window.document.createElement(type);
    classList.forEach((className) => elm.classList.add(className));

    for (const attr in attributes) {
      if (attr === 'innerText') {
        elm.innerText = attributes[attr];
        continue;
      }
      elm.setAttribute(attr, attributes[attr]);
    }
    return elm;
  }

  /**
   * Create the textfield to input the link.
   */
  protected addLinkField(): HTMLElement {
    const wrap = this.createElm('div', ['ce-popover__item']);
    const icon = this.createElm('div', ['ce-popover__item-icon']);
    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>';

    // Create label
    const label = this.createElm('div', ['ce-popover__item-label']);
    const linkField = this.linkField
    this.linkField.setAttribute('value', this.data);

    // Throttle the link lookup.
    const timeoutDelay = 200;
    this.linkField.addEventListener('keyup', (evt) => {
      if (evt.key === "Enter") {
        this.addLinkData(linkField.value)
        return;
      }
      let throttle;
      clearTimeout(throttle);
      if (linkField.value.length < 2) {
        this.clearSearchList();
        return;
      }
      throttle = setTimeout(() => {
        this.searchRequest(linkField.value)
          .then((results) => {
            this.generateSearchList(results)
          });
      }, timeoutDelay);
    });

    label.appendChild(linkField);
    wrap.appendChild(label);
    wrap.appendChild(icon);
    icon.addEventListener('click', () => {
      this.addLinkData(linkField.value);
    });
    return wrap;
  }

  /**
   * Set tune data, clear list and add marking to the block.
   *
   * @param link
   */
  protected addLinkData(link: string) {
    this.clearSearchList();
    this.data = link;
    this.wrap(this.blockContent);
  }

  /**
   * The mandatory render method required by the API.
   *
   * The actual rendering is mainly placed in other methods.
   * @returns
   */
  public render(): HTMLElement {
    const wrapper = window.document.createElement('div');
    const button = this.addLinkField();
    wrapper.appendChild(button);
    wrapper.appendChild(this.searchResultWrap);

    return wrapper;
  }

  /**
   * Send search request
  */
  async searchRequest(searchString: string): Promise<SearchItemData[]> {
    /**
     * Compose query string
     *
     * @type {string}
     */
    const queryString = new URLSearchParams({ [this.searchQueryParam]: searchString }).toString();

    try {
      /**
       * Get raw search data
       */
      const searchResponseRaw = await fetch(`${this.searchEndpointUrl}?${queryString}`);

      /**
       * Get JSON decoded data
       */
      const searchResponse = await searchResponseRaw.json();

      if (searchResponse && searchResponse.success) {
        return searchResponse.items;
      } else {
        console.warn('Link Autocomplete: invalid response format: "success: true" expected, but got %o. Response: %o', searchResponse.success, searchResponse);
      }
    } catch (e: any) {
      console.error(e.message)
    }

    return [];
  }
}
