
    export function CalJordan2(A, B, size){
        let newA = A.map(row => [...row]);
        let newB = [...B]; 
    
        for (let i = 1; i < size; i++) {
            let h = new Array(size+1);
    
            for (let j = 0; j < i; j++){
    
                for (let k = 0; k < size+1 ; k++){
                    
                    if(k == size){
                        h[size] = newB[j] / newA[j][j] * newA[i][j];
                    }else{
                        h[k] = newA[j][k] / newA[j][j] * newA[i][j];
                    }
                }
    
                for (let g = 0; g < size+1 ; g++){
                    if(g == size){
                        newB[i] = newB[i] - h[g];
                    }else{
                        newA[i][g] = newA[i][g] - h[g];
                    }
                }
            }
            
        }

        for (let i = 0; i < size-1; i++) {
            let h = new Array(size+1);
    
            for (let j = i+1; j < size; j++){
    
                for (let k = 0; k < size+1 ; k++){
                    
                    if(k == size){
                        h[size] = newB[j] / newA[j][j] * newA[i][j];
                    }else{
                        h[k] = newA[j][k] / newA[j][j] * newA[i][j];
                    }
                }
    
                for (let g = 0; g < size+1 ; g++){
                    if(g == size){
                        newB[i] = newB[i] - h[g];
                    }else{
                        newA[i][g] = newA[i][g] - h[g];
                    }
                }
            }
            
        }
    
    
        let x = new Array(size);
        for (let i = 0; i < size; i++) {
            x[i] = newB[i];
        }
    
        return {
            newA:newA,
            newB:newB,
            x:x
        };
        
    
    }