import './../styles/index.pcss';

type SearchItemData = {
  href: string
  name: string
  description: string
}

export class LinkTune {
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
      blockContent.style.border = '1px solid red';
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
        this.data = this.linkField.value;
        this.wrap(this.blockContent);
      });

      this.searchResultWrap.appendChild(searchItem);
    });
  }

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

  protected addLinkField(): HTMLElement {
    const wrap = this.createElm('div', ['ce-popover__item']);
    const icon = this.createElm('div', ['ce-popover__item-icon']);
    icon.innerHTML = 'L';

    // Create label
    const label = this.createElm('div', ['ce-popover__item-label']);
    const linkField = this.linkField
    this.linkField.setAttribute('value', this.data);

    this.linkField.addEventListener('keyup', () => {
      this.searchRequest(linkField.value)
        .then((results) => {
          this.generateSearchList(results)
        });
    });

    label.appendChild(linkField);

    wrap.appendChild(label);
    wrap.appendChild(icon);
    icon.addEventListener('click', () => {
      this.data = linkField.value;
      this.wrap(this.blockContent);
    });
    return wrap;
  }

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
    } catch (e) {
      //   notifier.show({
      //     message: `${DICTIONARY.searchRequestError} "${e.message}"`,
      //     style: 'error',
      //   });
    }

    return [];
  }
}
