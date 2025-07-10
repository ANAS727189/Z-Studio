#include <stdio.h>
#include <stdbool.h>

// Global variable declarations
double num1;
double num2;
double operation;
double result;

// Function definitions
double calculate(double a, double b, double op) {
    if ((op == 1)) {
        return (a + b);
    }
    else {
        if ((op == 2)) {
            return (a - b);
        }
        else {
            if ((op == 3)) {
                return (a * b);
            }
            else {
                if ((op == 4)) {
                    return (a / b);
                }
                else {
                    return 0;
                }
            }
        }
    }
}
int main(void) {
    num1 = 0;
    num2 = 0;
    operation = 0;
    printf("Enter first number: \n");
    if (scanf("%lf", &num1) != 1) {
        num1 = 0;
        scanf("%*s");
    }
    printf("Enter second number: \n");
    if (scanf("%lf", &num2) != 1) {
        num2 = 0;
        scanf("%*s");
    }
    printf("Choose operation (1=+, 2=-, 3=*, 4=/): \n");
    if (scanf("%lf", &operation) != 1) {
        operation = 0;
        scanf("%*s");
    }
    result = calculate(num1, num2, operation);
    printf("Result: \n");
    printf("%.2f\n", result);
    return 0;
}