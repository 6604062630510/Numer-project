
export function lagrangeCal(x, y, n, val){
    let yy = 0, L;
    for(let i = 0; i < n; i++ ){
        L = 1.0;
        for (let j = 0; j < n ; j++) {

            if(i != j){
                L *= (x[j] - val)/(x[j] - x[i]);
            }
            
        }
        yy += L * y[i];

    }
    return yy;
}