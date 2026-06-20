#include <stdio.h>
#include <stdbool.h>

// Global variable declarations
double base;
double exp;
double powerResult;

// Function definitions
double power(double base, double exp) {
    double result;
    double i;
    if ((exp == 0)) {
        return 1;
    }
    else {
        result = 1;
        i = 0;
        while ((i < exp)) {
            result = (result * base);
            i = (i + 1);
        }
        return result;
    }
}

double isEven(double num) {
    if ((((int)num % (int)2) == 0)) {
        return 1.0;
    }
    else {
        return 0.0;
    }
}
int main(void) {
    base = 2;
    exp = 8;
    powerResult = power(base, exp);
    printf("2^8 = \n");
    printf("%.2f\n", powerResult);
    if (isEven(powerResult)) {
        printf("Result is even\n");
    }
    else {
        printf("Result is odd\n");
    }
    return 0;
}