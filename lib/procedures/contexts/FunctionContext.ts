// IMPORTS
// ================================================================================================
import { FunctionContext as IFunctionContext } from '@guildofweavers/air-assembly';
import { AirSchema } from "../../AirSchema";
import { ExecutionContext } from "./ExecutionContext";
import { Parameter } from "../Parameter";
import { LocalVariable } from "../LocalVariable";
import { Dimensions } from '../../expressions';
import { validate } from "../../utils";

// CLASS DEFINITION
// ================================================================================================
export class FunctionContext extends ExecutionContext implements IFunctionContext {

    readonly result: Dimensions;

    // CONSTRUCTOR
    // --------------------------------------------------------------------------------------------
    constructor(schema: AirSchema, result: Dimensions) {
        super(schema.field, schema.constants, schema.functions);
        this.result = result;
    }

    // PUBLIC METHODS
    // --------------------------------------------------------------------------------------------
    add(value: Parameter | LocalVariable): void {
        // if parameter has a handle, set handle mapping
        if (value.handle) {
            validate(!this.declarationMap.has(value.handle), errors.duplicateHandle(value.handle));
            this.declarationMap.set(value.handle, value);
        }

        if (value instanceof Parameter) {
            // set index mapping and add parameter to the list
            this.declarationMap.set(`param::${this.params.length}`, value);
            this.params.push(value);
        }
        else if (value instanceof LocalVariable) {
            // set index mapping and add local variable to the list
            this.declarationMap.set(`local::${this.locals.length}`, value);
            this.locals.push(value);
        }
        else {
            throw new Error(`${value} is not valid in function context`);
        }
    }
}

// ERRORS
// ================================================================================================
const errors = {
    duplicateHandle     : (h: any) => `handle ${h} cannot be declared multiple times`
};