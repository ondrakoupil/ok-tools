"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrlCreator = void 0;
function createUrlCreator(params) {
    if (!params.urlBase || !params.urlBase.length) {
        throw new Error('params.urlBase is required!');
    }
    var idKeyName = params.idKeyName || 'id';
    var slugKeyName = params.slugKeyName || 'url';
    var startUrlWith = params.urlBase;
    if (typeof params.addFirstSlash === 'undefined' || params.addFirstSlash) {
        if (startUrlWith.length < 1 || startUrlWith[0][0] !== '/') {
            startUrlWith[0] = '/' + startUrlWith[0];
        }
    }
    return function (idOrObjectWithId, slug) {
        if (slug === void 0) { slug = ''; }
        if (typeof idOrObjectWithId === 'object' && idOrObjectWithId[idKeyName]) {
            if (idOrObjectWithId[slugKeyName]) {
                return __spreadArray(__spreadArray([], startUrlWith), [idOrObjectWithId[idKeyName], idOrObjectWithId[slugKeyName]]);
            }
            else if (slug) {
                return __spreadArray(__spreadArray([], startUrlWith), [idOrObjectWithId[idKeyName], slug]);
            }
            else {
                return __spreadArray(__spreadArray([], startUrlWith), [idOrObjectWithId[idKeyName]]);
            }
        }
        if (typeof idOrObjectWithId === 'string') {
            if (slug) {
                return __spreadArray(__spreadArray([], startUrlWith), [idOrObjectWithId, slug]);
            }
            else {
                return __spreadArray(__spreadArray([], startUrlWith), [idOrObjectWithId]);
            }
        }
        throw new Error('Invalid parameters to create URL.');
    };
}
exports.createUrlCreator = createUrlCreator;
//# sourceMappingURL=url-creator.js.map