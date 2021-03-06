// IMPORTS
// ================================================================================================
import { Expression } from "./Expression";
import { Dimensions } from "./utils";

// CLASS DEFINITION
// ================================================================================================
export class GetVectorElement extends Expression {

    readonly index: number;

    // CONSTRUCTOR
    // --------------------------------------------------------------------------------------------
    constructor(source: Expression, index: number) {
        if (source.isScalar) throw new Error('cannot extract element from a scalar value');
        if (source.isMatrix) throw new Error('cannot extract element from a matrix value');
        
        const sourceLength = source.dimensions[0];
        if (index < 0 || index >= sourceLength) {
            throw new Error(`vector index ${index} is out of bounds; expected to be within [${0}, ${sourceLength})`);
        }
        
        super(Dimensions.scalar(), [source]);
        this.index = index;
    }

    // ACCESSORS
    // --------------------------------------------------------------------------------------------
    get source(): Expression { return this.children[0]; }
    
    get start(): number { return this.index; }
    get end(): number { return this.index; }

    // PUBLIC MEMBERS
    // --------------------------------------------------------------------------------------------
    toString(): string {
        return `(get ${this.source.toString()} ${this.index})`;
    }
}