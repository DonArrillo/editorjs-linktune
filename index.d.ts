import './../styles/index.pcss';
declare type SearchItemData = {
    href: string;
    name: string;
    description: string;
};
export declare class LinkTune {
    data: string;
    blockContent: any;
    searchEndpointUrl: string;
    searchQueryParam: string;
    searchResults: HTMLElement[];
    searchResultWrap: HTMLElement;
    linkField: HTMLInputElement;
    constructor({ data, config }: any);
    static get isTune(): boolean;
    wrap(blockContent: HTMLElement): HTMLElement;
    save(): string;
    clearSearchList(): void;
    /**
   * @private
   *
   * @returns {object<string, string>} — keys and class names
   */
    static get CSS(): {
        iconWrapper: string;
        hidden: string;
        actionsWrapper: string;
        field: string;
        fieldLoading: string;
        fieldInput: string;
        foundItems: string;
        searchItem: string;
        searchItemSelected: string;
        searchItemName: string;
        searchItemDescription: string;
        linkDataWrapper: string;
        linkDataTitleWrapper: string;
        linkDataName: string;
        linkDataDescription: string;
        linkDataURL: string;
    };
    /**
     * Fill up a search list results by data
     *
     * @param {SearchItemData[]} items — items to be shown
     * @returns {void}
     */
    generateSearchList(items?: SearchItemData[]): void;
    protected createElm(type: string, classList: string[], attributes?: Record<string, string>): HTMLElement;
    protected addLinkField(): HTMLElement;
    render(): HTMLElement;
    /**
   * Send search request
   */
    searchRequest(searchString: string): Promise<SearchItemData[]>;
}
export {};
