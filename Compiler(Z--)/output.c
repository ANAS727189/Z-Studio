#include <stdio.h>
#include <stdbool.h>
double x;
double a;
double inc(double a);double inc(double a) {
return (a + 1);
}
int main(void) {
x = (1 + (2 * 3));
a = 0;
if (scanf("%lf", &a) != 1) {
a = 0;
scanf("%*s");
}
printf("Value: \n");
printf("%.2f\n", x);
if ((x > 5)) {
printf("big\n");
}
else {
printf("small\n");
}
printf("%.2f\n", inc(x));
return 0;
}