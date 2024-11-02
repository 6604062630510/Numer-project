
import { det } from "mathjs";


export const calculateCramer = (A, B) => {

    const detA = det(A);
    

    const newA1 = A.map((row, rowIndex) => {
        const newRow = row.slice();
        newRow[0] = B[rowIndex];
        return newRow;
    });

    const newA2 = A.map((row, rowIndex) => {
        const newRow = row.slice();
        newRow[1] = B[rowIndex];
        return newRow;
    });

    const newA3 = A.map((row, rowIndex) => {
        const newRow = row.slice();
        newRow[2] = B[rowIndex];
        return newRow;
    });

    const newA4 = A.map((row, rowIndex) => {
        const newRow = row.slice();
        newRow[3] = B[rowIndex];
        return newRow;
    });


    const detA1 = det(newA1);
    const detA2 = det(newA2);
    const detA3 = det(newA3);
    const detA4 = det(newA4);
    

    const x1 = detA1 / detA;
    const x2 = detA2 / detA;
    const x3 = detA3 / detA;
    const x4 = detA4 / detA;

    return {
        results: [x1, x2, x3, x4],
        A1: newA1,
        A2: newA2,
        A3: newA3,
        A4: newA4
    };
};
