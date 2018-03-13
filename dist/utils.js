"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function coalesce(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    target = target || {};
    for (var _a = 0, sources_1 = sources; _a < sources_1.length; _a++) {
        var s = sources_1[_a];
        for (var p in s) {
            var targetVal = target[p];
            if (targetVal == undefined && targetVal == null) {
                target[p] = s[p];
            }
        }
    }
    return target;
}
exports.coalesce = coalesce;
