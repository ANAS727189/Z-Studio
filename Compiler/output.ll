; ModuleID = 'compiler'
source_filename = "compiler"

@num1 = global double 0.000000e+00
@num2 = global double 0.000000e+00
@operation = global double 0.000000e+00
@result = global double 0.000000e+00
@str.18 = internal constant [22 x i8] c"Enter first number: \0A\00"
@fmt_scanf.19 = internal constant [4 x i8] c"%lf\00"
@fmt_clear.22 = internal constant [4 x i8] c"%*s\00"
@str.23 = internal constant [23 x i8] c"Enter second number: \0A\00"
@fmt_scanf.24 = internal constant [4 x i8] c"%lf\00"
@fmt_clear.27 = internal constant [4 x i8] c"%*s\00"
@str.28 = internal constant [41 x i8] c"Choose operation (1=+, 2=-, 3=*, 4=/): \0A\00"
@fmt_scanf.29 = internal constant [4 x i8] c"%lf\00"
@fmt_clear.32 = internal constant [4 x i8] c"%*s\00"
@str.33 = internal constant [10 x i8] c"Result: \0A\00"
@fmt.34 = internal constant [6 x i8] c"%.2f\0A\00"

declare i32 @printf(i8*, ...)

declare i32 @scanf(i8*, ...)

define double @calculate(double %a, double %b, double %op) {
entry0:
  %a1 = alloca double, align 8
  store double %a, double* %a1, align 8
  %b2 = alloca double, align 8
  store double %b, double* %b2, align 8
  %op3 = alloca double, align 8
  store double %op, double* %op3, align 8
  %op4 = load double, double* %op3, align 8
  %eqtmp = fcmp oeq double %op4, 1.000000e+00
  %booltmp = uitofp i1 %eqtmp to double
  %cmp4 = fcmp one double %booltmp, 0.000000e+00
  br i1 %cmp4, label %then1, label %else2

then1:                                            ; preds = %entry0
  %a5 = load double, double* %a1, align 8
  %b6 = load double, double* %b2, align 8
  %addtmp = fadd double %a5, %b6
  ret double %addtmp

else2:                                            ; preds = %entry0
  %op7 = load double, double* %op3, align 8
  %eqtmp8 = fcmp oeq double %op7, 2.000000e+00
  %booltmp9 = uitofp i1 %eqtmp8 to double
  %cmp8 = fcmp one double %booltmp9, 0.000000e+00
  br i1 %cmp8, label %then5, label %else6

ifcont3:                                          ; preds = %ifcont7

then5:                                            ; preds = %else2
  %a10 = load double, double* %a1, align 8
  %b11 = load double, double* %b2, align 8
  %subtmp = fsub double %a10, %b11
  ret double %subtmp

else6:                                            ; preds = %else2
  %op12 = load double, double* %op3, align 8
  %eqtmp13 = fcmp oeq double %op12, 3.000000e+00
  %booltmp14 = uitofp i1 %eqtmp13 to double
  %cmp12 = fcmp one double %booltmp14, 0.000000e+00
  br i1 %cmp12, label %then9, label %else10

ifcont7:                                          ; preds = %ifcont11
  br label %ifcont3

then9:                                            ; preds = %else6
  %a15 = load double, double* %a1, align 8
  %b16 = load double, double* %b2, align 8
  %multmp = fmul double %a15, %b16
  ret double %multmp

else10:                                           ; preds = %else6
  %op17 = load double, double* %op3, align 8
  %eqtmp18 = fcmp oeq double %op17, 4.000000e+00
  %booltmp19 = uitofp i1 %eqtmp18 to double
  %cmp16 = fcmp one double %booltmp19, 0.000000e+00
  br i1 %cmp16, label %then13, label %else14

ifcont11:                                         ; No predecessors!
  br label %ifcont7

then13:                                           ; preds = %else10
  %a20 = load double, double* %a1, align 8
  %b21 = load double, double* %b2, align 8
  %divtmp = fdiv double %a20, %b21
  ret double %divtmp

else14:                                           ; preds = %else10
  ret double 0.000000e+00
}

define i32 @main() {
entry17:
  %num1 = alloca double, align 8
  store double 0.000000e+00, double* %num1, align 8
  %num2 = alloca double, align 8
  store double 0.000000e+00, double* %num2, align 8
  %operation = alloca double, align 8
  store double 0.000000e+00, double* %operation, align 8
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([22 x i8], [22 x i8]* @str.18, i32 0, i32 0))
  %1 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_scanf.19, i32 0, i32 0), double* %num1)
  %cmptmp = icmp eq i32 %1, 0
  br i1 %cmptmp, label %input_fail20, label %input_cont21

input_fail20:                                     ; preds = %entry17
  store double 0.000000e+00, double* %num1, align 8
  %2 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_clear.22, i32 0, i32 0))
  br label %input_cont21

input_cont21:                                     ; preds = %input_fail20, %entry17
  %3 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([23 x i8], [23 x i8]* @str.23, i32 0, i32 0))
  %4 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_scanf.24, i32 0, i32 0), double* %num2)
  %cmptmp1 = icmp eq i32 %4, 0
  br i1 %cmptmp1, label %input_fail25, label %input_cont26

input_fail25:                                     ; preds = %input_cont21
  store double 0.000000e+00, double* %num2, align 8
  %5 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_clear.27, i32 0, i32 0))
  br label %input_cont26

input_cont26:                                     ; preds = %input_fail25, %input_cont21
  %6 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([41 x i8], [41 x i8]* @str.28, i32 0, i32 0))
  %7 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_scanf.29, i32 0, i32 0), double* %operation)
  %cmptmp2 = icmp eq i32 %7, 0
  br i1 %cmptmp2, label %input_fail30, label %input_cont31

input_fail30:                                     ; preds = %input_cont26
  store double 0.000000e+00, double* %operation, align 8
  %8 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_clear.32, i32 0, i32 0))
  br label %input_cont31

input_cont31:                                     ; preds = %input_fail30, %input_cont26
  %num13 = load double, double* %num1, align 8
  %num24 = load double, double* %num2, align 8
  %operation5 = load double, double* %operation, align 8
  %calltmp = call double @calculate(double %num13, double %num24, double %operation5)
  %result = alloca double, align 8
  store double %calltmp, double* %result, align 8
  %9 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([10 x i8], [10 x i8]* @str.33, i32 0, i32 0))
  %result6 = load double, double* %result, align 8
  %10 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @fmt.34, i32 0, i32 0), double %result6)
  ret i32 0
}
