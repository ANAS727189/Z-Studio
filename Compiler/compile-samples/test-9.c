#include <stdio.h>
#include <stdbool.h>

// Global variable declarations
double zero;
double negative;
double large;
double division;int main(void) {
    zero = 0;
    negative = -10;
    large = 1000000;
    printf("Testing edge cases:\n");
    printf("%.2f\n", zero);
    printf("%.2f\n", negative);
    printf("%.2f\n", large);
    if ((zero == 0)) {
        printf("Zero comparison works\n");
    }
    if ((negative < 0)) {
        printf("Negative comparison works\n");
    }
    if ((large > 999999)) {
        printf("Large number comparison works\n");
    }
    division = (large / zero);
    printf("Division by zero result:\n");
    printf("%.2f\n", division);
    return 0;
}