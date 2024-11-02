

export function creatMatrix(x, y, n){

    let sumx = 0, sumx2 = 0, sumx3 = 0 , sumx4 = 0;
    let sumy = 0, sumxy = 0, sumx2y = 0;
    for (let i = 0; i < n; i++) {
        sumx += x[i];
        sumx2 += x[i] * x[i];
        sumx3 += x[i] * x[i] * x[i];
        sumx4 += x[i] * x[i] * x[i] * x[i];
        sumy += y[i];
        sumxy += y[i] * x[i];
        sumx2y += y[i] * x[i] * x[i]
        
    }

    const arrA = [
        [n , sumx, sumx2],
        [sumx, sumx2, sumx3],
        [sumx2, sumx3, sumx4]
    ];

    const arrB = [
        sumy, sumxy, sumx2y
    ];

    return{
        A: arrA,
        B: arrB
    };

}

export function CalJordan(A, B, size){

    for (let i = 1; i < size; i++) {
        let h = new Array(size+1);

        for (let j = 0; j < i; j++){

            for (let k = 0; k < size+1 ; k++){
                
                if(k == 3){
                    h[3] = B[j] / A[j][j] * A[i][j];
                }else{
                    h[k] = A[j][k] / A[j][j] * A[i][j];
                }
            }

            for (let g = 0; g < size+1 ; g++){
                if(g == 3){
                    B[i] = B[i] - h[g];
                }else{
                    A[i][g] = A[i][g] - h[g];
                }
            }
        }
        
    }

    for (let i = 0; i < size - 1 ; i++) {
        let h = new Array(size+1);

        for (let j = i+1; j < size; j++){

            for (let k = 0; k < size+1 ; k++){
                
                if(k == 3){
                    h[3] = B[j] / A[j][j] * A[i][j];
                }else{
                    h[k] = A[j][k] / A[j][j] * A[i][j];
                }
            }

            for (let g = 0; g < size+1 ; g++){
                if(g == 3){
                    B[i] = B[i] - h[g];
                }else{
                    A[i][g] = A[i][g] - h[g];
                }
            }
        }
        
    }

    for (let i = 0; i < size; i++) {
        B[i] = B[i] / A[i][i];
        A[i][i] = A[i][i] / A[i][i];
        
    }
    
    const a0 = B[0];
    const a1 = B[1];
    const a2 = B[2];

    return{
        results: [a0, a1, a2]
    };

} 