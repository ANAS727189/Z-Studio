; ModuleID = 'compiler'
source_filename = "compiler"

@num1 = global double 0.000000e+00
@num2 = global double 0.000000e+00
@testNum = global double 0.000000e+00
@str.16 = internal constant [19 x i8] c"GCD of 12 and 18:\0A\00"
@fmt.17 = internal constant [6 x i8] c"%.2f\0A\00"
@str.18 = internal constant [19 x i8] c"LCM of 12 and 18:\0A\00"
@fmt.19 = internal constant [6 x i8] c"%.2f\0A\00"
@str.24 = internal constant [13 x i8] c"17 is prime\0A\00"
@str.25 = internal constant [17 x i8] c"17 is not prime\0A\00"

declare i32 @printf(i8*, ...)

declare i32 @scanf(i8*, ...)

define double @gcd(double %a, double %b) {
entry0:
  %a1 = alloca double, align 8
  store double %a, double* %a1, align 8
  %b2 = alloca double, align 8
  store double %b, double* %b2, align 8
  br label %while_cond1

while_cond1:                                      ; preds = %while_body2, %entry0
  %b3 = load double, double* %b2, align 8
  %netmp = fcmp one double %b3, 0.000000e+00
  %booltmp = uitofp i1 %netmp to double
  %whilecond = fcmp one double %booltmp, 0.000000e+00
  br i1 %whilecond, label %while_body2, label %while_cont3

while_body2:                                      ; preds = %while_cond1
  %b4 = load double, double* %b2, align 8
  %temp = alloca double, align 8
  store double %b4, double* %temp, align 8
  %a5 = load double, double* %a1, align 8
  %b6 = load double, double* %b2, align 8
  %modtmp = frem double %a5, %b6
  store double %modtmp, double* %b2, align 8
  %temp7 = load double, double* %temp, align 8
  store double %temp7, double* %a1, align 8
  br label %while_cond1

while_cont3:                                      ; preds = %while_cond1
  %a8 = load double, double* %a1, align 8
  ret double %a8
}

define double @lcm(double %a, double %b) {
entry4:
  %a1 = alloca double, align 8
  store double %a, double* %a1, align 8
  %b2 = alloca double, align 8
  store double %b, double* %b2, align 8
  %a3 = load double, double* %a1, align 8
  %b4 = load double, double* %b2, align 8
  %multmp = fmul double %a3, %b4
  %a5 = load double, double* %a1, align 8
  %b6 = load double, double* %b2, align 8
  %calltmp = call double @gcd(double %a5, double %b6)
  %divtmp = fdiv double %multmp, %calltmp
  ret double %divtmp
}

define double @isPrime(double %n) {
entry5:
  %n1 = alloca double, align 8
  store double %n, double* %n1, align 8
  %n2 = load double, double* %n1, align 8
  %letmp = fcmp ole double %n2, 1.000000e+00
  %booltmp = uitofp i1 %letmp to double
  %cmp8 = fcmp one double %booltmp, 0.000000e+00
  br i1 %cmp8, label %then6, label %ifcont7

then6:                                            ; preds = %entry5
  ret double 0.000000e+00

ifcont7:                                          ; preds = %entry5
  %i = alloca double, align 8
  store double 2.000000e+00, double* %i, align 8
  br label %while_cond9

while_cond9:                                      ; preds = %ifcont13, %ifcont7
  %i3 = load double, double* %i, align 8
  %i4 = load double, double* %i, align 8
  %multmp = fmul double %i3, %i4
  %n5 = load double, double* %n1, align 8
  %letmp6 = fcmp ole double %multmp, %n5
  %booltmp7 = uitofp i1 %letmp6 to double
  %whilecond = fcmp one double %booltmp7, 0.000000e+00
  br i1 %whilecond, label %while_body10, label %while_cont11

while_body10:                                     ; preds = %while_cond9
  %n8 = load double, double* %n1, align 8
  %i9 = load double, double* %i, align 8
  %modtmp = frem double %n8, %i9
  %eqtmp = fcmp oeq double %modtmp, 0.000000e+00
  %booltmp10 = uitofp i1 %eqtmp to double
  %cmp14 = fcmp one double %booltmp10, 0.000000e+00
  br i1 %cmp14, label %then12, label %ifcont13

while_cont11:                                     ; preds = %while_cond9
  ret double 1.000000e+00

then12:                                           ; preds = %while_body10
  ret double 0.000000e+00

ifcont13:                                         ; preds = %while_body10
  %i11 = load double, double* %i, align 8
  %addtmp = fadd double %i11, 1.000000e+00
  store double %addtmp, double* %i, align 8
  br label %while_cond9
}

define i32 @main() {
entry15:
  %num1 = alloca double, align 8
  store double 1.200000e+01, double* %num1, align 8
  %num2 = alloca double, align 8
  store double 1.800000e+01, double* %num2, align 8
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([19 x i8], [19 x i8]* @str.16, i32 0, i32 0))
  %num11 = load double, double* %num1, align 8
  %num22 = load double, double* %num2, align 8
  %calltmp = call double @gcd(double %num11, double %num22)
  %1 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @fmt.17, i32 0, i32 0), double %calltmp)
  %2 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([19 x i8], [19 x i8]* @str.18, i32 0, i32 0))
  %num13 = load double, double* %num1, align 8
  %num24 = load double, double* %num2, align 8
  %calltmp5 = call double @lcm(double %num13, double %num24)
  %3 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @fmt.19, i32 0, i32 0), double %calltmp5)
  %testNum = alloca double, align 8
  store double 1.700000e+01, double* %testNum, align 8
  %testNum6 = load double, double* %testNum, align 8
  %calltmp7 = call double @isPrime(double %testNum6)
  %cmp23 = fcmp one double %calltmp7, 0.000000e+00
  br i1 %cmp23, label %then20, label %else21

then20:                                           ; preds = %entry15
  %4 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([13 x i8], [13 x i8]* @str.24, i32 0, i32 0))
  br label %ifcont22

else21:                                           ; preds = %entry15
  %5 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([17 x i8], [17 x i8]* @str.25, i32 0, i32 0))
  br label %ifcont22

ifcont22:                                         ; preds = %else21, %then20
  ret i32 0
}
