"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRandomIdentifier(length) {
    if (length === void 0) { length = 8; }
    if (length === 0) {
        return '';
    }
    if (length < 0 || typeof length !== 'number') {
        throw new Error('Length must be positive integer');
    }
    if (length <= 10) {
        return Math.random().toString(36).substr(2, length).toLowerCase();
    }
    return generateRandomIdentifier(10) + generateRandomIdentifier(length - 10);
}
exports.generateRandomIdentifier = generateRandomIdentifier;
//# sourceMappingURL=random-string.js.map