"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORTS
// ================================================================================================
const utils_1 = require("../expressions/utils");
const utils_2 = require("../utils");
// CLASS DEFINITION
// ================================================================================================
class LocalVariable {
    // CONSTRUCTOR
    // --------------------------------------------------------------------------------------------
    constructor(dimensions, handle) {
        this.dimensions = dimensions;
        if (handle !== undefined) {
            this.handle = utils_2.validateHandle(handle);
        }
    }
    // ACCESSORS
    // --------------------------------------------------------------------------------------------
    get isBound() {
        return this.binding !== undefined;
    }
    getBinding(index) {
        if (!this.binding)
            throw new Error(`local variable ${index} has not yet been set`);
        return this.binding;
    }
    bind(value, index) {
        if (!utils_1.Dimensions.areSameDimensions(this.dimensions, value.expression.dimensions)) {
            const vd = value.expression.dimensions;
            throw new Error(`cannot store ${vd[0]}x${vd[1]} value in local variable ${index}`);
        }
        this.binding = value;
    }
    clearBinding() {
        this.binding = undefined;
    }
    // PUBLIC METHODS
    // --------------------------------------------------------------------------------------------
    toString() {
        const handle = this.handle ? ` ${this.handle} ` : ' ';
        if (utils_1.Dimensions.isScalar(this.dimensions))
            return `(local${handle}scalar)`;
        else if (utils_1.Dimensions.isVector(this.dimensions))
            return `(local${handle}vector ${this.dimensions[0]})`;
        else
            return `(local${handle}matrix ${this.dimensions[0]} ${this.dimensions[1]})`;
    }
}
exports.LocalVariable = LocalVariable;
//# sourceMappingURL=LocalVariable.js.map