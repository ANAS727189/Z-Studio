#include <stdio.h>
#include <stdbool.h>

// Global variable declarations
double sum;
double i;int main(void) {
    sum = 0;
    for (i = 1; (i <= 10); i++) {
        if ((i == 6)) {
            break;
        }
        sum = (sum + i);
        printf("%.2f\n", i);
    }
    printf("Sum up to 5: \n");
    printf("%.2f\n", sum);
    return 0;
}