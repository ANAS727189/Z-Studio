#include <stdio.h>
#include <stdbool.h>

// Global variable declarations
double result1;
double result2;
double result3;

// Function definitions
double add(double x, double y) {
    return (x + y);
}

double multiply(double a, double b) {
    return (a * b);
}

double factorial(double n) {
    if ((n <= 1)) {
        return 1;
    }
    else {
        return (n * factorial((n - 1)));
    }
}
int main(void) {
    result1 = add(5, 3);
    result2 = multiply(4, 6);
    result3 = factorial(5);
    printf("5 + 3 = \n");
    printf("%.2f\n", result1);
    printf("4 * 6 = \n");
    printf("%.2f\n", result2);
    printf("5! = \n");
    printf("%.2f\n", result3);
    return 0;
}