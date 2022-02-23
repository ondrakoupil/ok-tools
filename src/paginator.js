"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatorSequence = void 0;
var range_1 = require("./range");
function paginatorSequence(totalPages, currentPage, preferredNumberOfLinks, addSeparators) {
    if (addSeparators === void 0) { addSeparators = true; }
    if (preferredNumberOfLinks < 5) {
        throw new Error('preferredNumberOfLinks must be >= 5');
    }
    if (totalPages <= preferredNumberOfLinks) {
        return range_1.range(1, totalPages);
    }
    var output = new Set();
    var lastAdded = 0;
    var minPage = 1;
    output.add(currentPage);
    if (currentPage !== totalPages) {
        output.add(currentPage + 1);
    }
    if (currentPage > 1) {
        output.add(currentPage - 1);
    }
    output.add(totalPages);
    output.add(1);
    var i = 2;
    while (output.size < preferredNumberOfLinks) {
        if (currentPage + i < totalPages) {
            output.add(currentPage + i);
        }
        if (output.size >= preferredNumberOfLinks) {
            break;
        }
        if (currentPage - i > 1) {
            output.add(currentPage - i);
        }
        if (output.size >= preferredNumberOfLinks) {
            break;
        }
        if (i % 2 === 0) {
            var stepFromExtreme = Math.floor(i / 2);
            output.add(stepFromExtreme + 1);
            if (output.size >= preferredNumberOfLinks) {
                break;
            }
            output.add(totalPages - stepFromExtreme);
            if (output.size >= preferredNumberOfLinks) {
                break;
            }
        }
        i++;
    }
    var numbers = Array.from(output);
    numbers.sort(function (a, b) { return (a - b); });
    var outputNumbers = [];
    if (addSeparators) {
        var prev = 0;
        for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
            var num = numbers_1[_i];
            if (num - 1 !== prev) {
                outputNumbers.push(null);
            }
            outputNumbers.push(num);
            prev = num;
        }
    }
    else {
        outputNumbers = numbers;
    }
    return outputNumbers;
}
exports.paginatorSequence = paginatorSequence;
//# sourceMappingURL=paginator.js.map