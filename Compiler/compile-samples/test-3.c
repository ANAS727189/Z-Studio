#include <stdio.h>
#include <stdbool.h>

// Global variable declarations
double n;
double a;
double b;
double count;
double temp;int main(void) {
    n = 0;
    printf("How many Fibonacci numbers?\n");
    if (scanf("%lf", &n) != 1) {
        n = 0;
        scanf("%*s");
    }
    a = 0;
    b = 1;
    count = 0;
    while ((count < n)) {
        printf("%.2f\n", a);
        temp = (a + b);
        a = b;
        b = temp;
        count = (count + 1);
    }
    return 0;
}