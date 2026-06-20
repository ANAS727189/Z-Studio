#include <stdio.h>
#include <stdbool.h>

// Global variable declarations
double a;
double b;
double sum;
double diff;
double prod;
double quot;int main(void) {
    a = 10;
    b = 20;
    sum = (a + b);
    diff = (a - b);
    prod = (a * b);
    quot = (a / b);
    printf("Sum: \n");
    printf("%.2f\n", sum);
    printf("Difference: \n");
    printf("%.2f\n", diff);
    printf("Product: \n");
    printf("%.2f\n", prod);
    printf("Quotient: \n");
    printf("%.2f\n", quot);
    return 0;
}