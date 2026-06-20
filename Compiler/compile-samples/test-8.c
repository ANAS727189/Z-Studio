#include <stdio.h>
#include <stdbool.h>

// Global variable declarations
double rows;
double i;
double j;
double x;
double y;
double product;int main(void) {
    rows = 5;
    i = 1;
    while ((i <= rows)) {
        j = 1;
        while ((j <= i)) {
            printf("*\n");
            j = (j + 1);
        }
        printf("\n");
        i = (i + 1);
    }
    printf("Multiplication table:\n");
    for (x = 1; (x <= 3); x++) {
        for (y = 1; (y <= 3); y++) {
            product = (x * y);
            printf("%.2f\n", product);
        }
    }
    return 0;
}