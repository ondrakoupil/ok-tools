"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripTags = void 0;
function stripTags(input) {
    return input.replace(/<[a-z\/][^><]*>/ig, '');
}
exports.stripTags = stripTags;
//# sourceMappingURL=strip-tags.js.map