"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkTune = void 0;
var LinkTune = /** @class */ (function () {
    function LinkTune(_a) {
        var data = _a.data, config = _a.config;
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
    Object.defineProperty(LinkTune, "isTune", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    LinkTune.prototype.wrap = function (blockContent) {
        var _a;
        blockContent.style.border = '';
        blockContent.style.paddingLeft = '';
        (_a = blockContent.querySelector('.styled-blocks-label')) === null || _a === void 0 ? void 0 : _a.remove();
        if (this.data) {
            blockContent.style.border = '1px solid red';
        }
        this.blockContent = blockContent;
        return blockContent;
    };
    LinkTune.prototype.save = function () {
        return this.data;
    };
    LinkTune.prototype.clearSearchList = function () {
        while (this.searchResultWrap.firstChild) {
            this.searchResultWrap.removeChild(this.searchResultWrap.firstChild);
        }
    };
    Object.defineProperty(LinkTune, "CSS", {
        /**
       * @private
       *
       * @returns {object<string, string>} — keys and class names
       */
        get: function () {
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
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Fill up a search list results by data
     *
     * @param {SearchItemData[]} items — items to be shown
     * @returns {void}
     */
    LinkTune.prototype.generateSearchList = function (items) {
        var _this = this;
        if (items === void 0) { items = []; }
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
        items.forEach(function (item) {
            var searchItem = _this.createElm('div', [LinkTune.CSS.searchItem]);
            /**
             * Create a name for a link
             */
            var searchItemName = _this.createElm('div', [LinkTune.CSS.searchItemName], {
                innerText: item.name || item.href,
            });
            searchItem.appendChild(searchItemName);
            /**
             * Create a description element
             */
            if (item.description) {
                var searchItemDescription = _this.createElm('div', [LinkTune.CSS.searchItemDescription], {
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
            searchItem.addEventListener('click', function (ev) {
                _this.linkField.value = searchItem.dataset.href + "";
                _this.data = _this.linkField.value;
                _this.wrap(_this.blockContent);
            });
            _this.searchResultWrap.appendChild(searchItem);
        });
    };
    LinkTune.prototype.createElm = function (type, classList, attributes) {
        var elm = window.document.createElement(type);
        classList.forEach(function (className) { return elm.classList.add(className); });
        for (var attr in attributes) {
            if (attr === 'innerText') {
                elm.innerText = attributes[attr];
                continue;
            }
            elm.setAttribute(attr, attributes[attr]);
        }
        return elm;
    };
    LinkTune.prototype.addLinkField = function () {
        var _this = this;
        var wrap = this.createElm('div', ['ce-popover__item']);
        var icon = this.createElm('div', ['ce-popover__item-icon']);
        icon.innerHTML = 'L';
        // Create label
        var label = this.createElm('div', ['ce-popover__item-label']);
        var linkField = this.linkField;
        this.linkField.setAttribute('value', this.data);
        this.linkField.addEventListener('keyup', function () {
            _this.searchRequest(linkField.value)
                .then(function (results) {
                _this.generateSearchList(results);
            });
        });
        label.appendChild(linkField);
        wrap.appendChild(label);
        wrap.appendChild(icon);
        icon.addEventListener('click', function () {
            _this.data = linkField.value;
            _this.wrap(_this.blockContent);
        });
        return wrap;
    };
    LinkTune.prototype.render = function () {
        var wrapper = window.document.createElement('div');
        var button = this.addLinkField();
        wrapper.appendChild(button);
        wrapper.appendChild(this.searchResultWrap);
        return wrapper;
    };
    /**
   * Send search request
   */
    LinkTune.prototype.searchRequest = function (searchString) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString, searchResponseRaw, searchResponse, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryString = new URLSearchParams((_a = {}, _a[this.searchQueryParam] = searchString, _a)).toString();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("".concat(this.searchEndpointUrl, "?").concat(queryString))];
                    case 2:
                        searchResponseRaw = _b.sent();
                        return [4 /*yield*/, searchResponseRaw.json()];
                    case 3:
                        searchResponse = _b.sent();
                        if (searchResponse && searchResponse.success) {
                            return [2 /*return*/, searchResponse.items];
                        }
                        else {
                            console.warn('Link Autocomplete: invalid response format: "success: true" expected, but got %o. Response: %o', searchResponse.success, searchResponse);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, []];
                }
            });
        });
    };
    return LinkTune;
}());
exports.LinkTune = LinkTune;
