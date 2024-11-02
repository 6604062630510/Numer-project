


import { evaluate } from 'mathjs';
import nerdamer from 'nerdamer';
import 'nerdamer/Solve';
import 'nerdamer/Calculus';

export function CalTrape(equation, lowerBound, upperBound){

    let scope;
    scope = {
        x:lowerBound,
    }
    const Exactx0 = evaluate(nerdamer.integrate(equation, 'x').toString(), scope);
    const fx0 = evaluate(equation, scope);

    scope = {
        x:upperBound,
    }
    const Exactx1 = evaluate(nerdamer.integrate(equation, 'x').toString(), scope);
    const fx1 = evaluate(equation, scope);
    const ExactAns = Exactx1 - Exactx0; 

    const h = upperBound - lowerBound;

    const I = h/2 * (fx0+fx1);
    return {
        I:I,
        ExactAns:ExactAns
    }


};