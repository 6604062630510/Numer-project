#include <stdio.h>

#define MAX 10

double dividedDifference(double x[], double y[], int i, int j)
{

    if (i == j)
    {

        return y[i];
    }

    return (dividedDifference(x, y, i + 1, j) - dividedDifference(x, y, i, j - 1)) / (x[j] - x[i]);
}

void computeCoefficients(double x[], double y[], double c[], int n)
{

    for (int j = 0; j < n; j++)
    {

        c[j] = dividedDifference(x, y, 0, j);
    }
}

double newtonPolynomial(double x[], double c[], int n, double value)
{

    double result = c[0];

    for (int i = 1; i < n; i++)
    {

        double term = c[i];

        for (int j = 0; j < i; j++)
        {

            term *= (value - x[j]);
        }

        result += term;
    }

    return result;
}

int main()
{

    int n;

    scanf("%d", &n);

    double x[n];

    for (int i = 0; i < n; i++)
    {

        scanf("%lf", &x[i]);
    }

    double y[n];

    for (int i = 0; i < n; i++)
    {

        scanf("%lf", &y[i]);
    }

    double c[n], value;

    scanf("%lf", &value);

    computeCoefficients(x, y, c, n);

    double result = newtonPolynomial(x, c, n, value);

    printf("Interpolated value at %lf is %.6f\n", value, result);

    /*printf("Coefficients (C values):\n");

    for (int i = 0; i < n; i++)
    {

        printf("C[%d] = %.15f\n", i, c[i]);
    }*/

    return 0;
}