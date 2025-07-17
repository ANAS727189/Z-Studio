#include <stdio.h>
#include <stdbool.h>

// Global variable declarations
double num1;
double num2;
double testNum;

// Function definitions
double gcd(double a, double b) {
    double temp;
    while ((b != 0)) {
        temp = b;
        b = ((int)a % (int)b);
        a = temp;
    }
    return a;
}

double lcm(double a, double b) {
    return ((a * b) / gcd(a, b));
}

double isPrime(double n) {
    double i;
    if ((n <= 1)) {
        return 0.0;
    }
    i = 2;
    while (((i * i) <= n)) {
        if ((((int)n % (int)i) == 0)) {
            return 0.0;
        }
        i = (i + 1);
    }
    return 1.0;
}
int main(void) {
    num1 = 12;
    num2 = 18;
    printf("GCD of 12 and 18:\n");
    printf("%.2f\n", gcd(num1, num2));
    printf("LCM of 12 and 18:\n");
    printf("%.2f\n", lcm(num1, num2));
    testNum = 17;
    if (isPrime(testNum)) {
        printf("17 is prime\n");
    }
    else {
        printf("17 is not prime\n");
    }
    return 0;
}