


import { evaluate } from 'mathjs';
import nerdamer from 'nerdamer';
import 'nerdamer/Solve';
import 'nerdamer/Calculus';

export function CalSimp(equation, lowerBound, upperBound){
    const h = (upperBound - lowerBound)/2;
    const x1 = lowerBound + h;
    let scope;
    scope = {
        x:lowerBound,
    }
    const Exactx0 = evaluate(nerdamer.integrate(equation, 'x').toString(), scope);
    const fx0 = evaluate(equation, scope);
    scope = {
        x:x1,
    }
    const fx1 = evaluate(equation, scope);

    scope = {
        x:upperBound,
    }
    const Exactx2 = evaluate(nerdamer.integrate(equation, 'x').toString(), scope);
    const fx2 = evaluate(equation, scope);
    const ExactAns = Exactx2 - Exactx0; 

    

    const I = h/3 * (fx0 + 4*fx1 +fx2);
    return {
        I:I,
        ExactAns:ExactAns
    }


};