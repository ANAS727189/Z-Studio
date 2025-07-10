; ModuleID = 'compiler'
source_filename = "compiler"

@num1 = global double 0.000000e+00
@num2 = global double 0.000000e+00
@operation = global double 0.000000e+00
@result = global double 0.000000e+00
@str.0 = internal constant [22 x i8] c"Enter first number: \0A\00"
@fmt_scanf.1 = internal constant [4 x i8] c"%lf\00"
@fmt_clear.2 = internal constant [4 x i8] c"%*s\00"
@str.3 = internal constant [23 x i8] c"Enter second number: \0A\00"
@fmt_scanf.4 = internal constant [4 x i8] c"%lf\00"
@fmt_clear.5 = internal constant [4 x i8] c"%*s\00"
@str.6 = internal constant [41 x i8] c"Choose operation (1=+, 2=-, 3=*, 4=/): \0A\00"
@fmt_scanf.7 = internal constant [4 x i8] c"%lf\00"
@fmt_clear.8 = internal constant [4 x i8] c"%*s\00"
@str.9 = internal constant [10 x i8] c"Result: \0A\00"
@fmt.10 = internal constant [6 x i8] c"%.2f\0A\00"

declare i32 @printf(i8*, ...)

declare i32 @scanf(i8*, ...)

define double @calculate(double %a, double %b, double %op) {
entry:
  %a1 = alloca double, align 8
  store double %a, double* %a1, align 8
  %b2 = alloca double, align 8
  store double %b, double* %b2, align 8
  %op3 = alloca double, align 8
  store double %op, double* %op3, align 8
  %op4 = load double, double* %op3, align 8
  %eqtmp = fcmp oeq double %op4, 1.000000e+00
  %booltmp = uitofp i1 %eqtmp to double
  %ifcond = fcmp one double %booltmp, 0.000000e+00
  br i1 %ifcond, label %then, label %else

then:                                             ; preds = %entry
  %a5 = load double, double* %a1, align 8
  %b6 = load double, double* %b2, align 8
  %addtmp = fadd double %a5, %b6
  ret double %addtmp
  br label %if_cont

else:                                             ; preds = %entry
  %op7 = load double, double* %op3, align 8
  %eqtmp8 = fcmp oeq double %op7, 2.000000e+00
  %booltmp9 = uitofp i1 %eqtmp8 to double
  %ifcond13 = fcmp one double %booltmp9, 0.000000e+00
  br i1 %ifcond13, label %then10, label %else11

if_cont:                                          ; preds = %if_cont12, %then

then10:                                           ; preds = %else
  %a14 = load double, double* %a1, align 8
  %b15 = load double, double* %b2, align 8
  %subtmp = fsub double %a14, %b15
  ret double %subtmp
  br label %if_cont12

else11:                                           ; preds = %else
  %op16 = load double, double* %op3, align 8
  %eqtmp17 = fcmp oeq double %op16, 3.000000e+00
  %booltmp18 = uitofp i1 %eqtmp17 to double
  %ifcond22 = fcmp one double %booltmp18, 0.000000e+00
  br i1 %ifcond22, label %then19, label %else20

if_cont12:                                        ; preds = %if_cont21, %then10
  br label %if_cont

then19:                                           ; preds = %else11
  %a23 = load double, double* %a1, align 8
  %b24 = load double, double* %b2, align 8
  %multmp = fmul double %a23, %b24
  ret double %multmp
  br label %if_cont21

else20:                                           ; preds = %else11
  %op25 = load double, double* %op3, align 8
  %eqtmp26 = fcmp oeq double %op25, 4.000000e+00
  %booltmp27 = uitofp i1 %eqtmp26 to double
  %ifcond31 = fcmp one double %booltmp27, 0.000000e+00
  br i1 %ifcond31, label %then28, label %else29

if_cont21:                                        ; preds = %if_cont30, %then19
  br label %if_cont12

then28:                                           ; preds = %else20
  %a32 = load double, double* %a1, align 8
  %b33 = load double, double* %b2, align 8
  %divtmp = fdiv double %a32, %b33
  ret double %divtmp
  br label %if_cont30

else29:                                           ; preds = %else20
  ret double 0.000000e+00
  br label %if_cont30

if_cont30:                                        ; preds = %else29, %then28
  br label %if_cont21
}

define i32 @main() {
entry:
  %num1 = alloca double, align 8
  store double 0.000000e+00, double* %num1, align 8
  %num2 = alloca double, align 8
  store double 0.000000e+00, double* %num2, align 8
  %operation = alloca double, align 8
  store double 0.000000e+00, double* %operation, align 8
  %0 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([22 x i8], [22 x i8]* @str.0, i32 0, i32 0))
  %1 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_scanf.1, i32 0, i32 0), double* %num1)
  %cmptmp = icmp eq i32 %1, 0
  br i1 %cmptmp, label %input_fail, label %input_cont

input_fail:                                       ; preds = %entry
  store double 0.000000e+00, double* %num1, align 8
  %2 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_clear.2, i32 0, i32 0))
  br label %input_cont

input_cont:                                       ; preds = %input_fail, %entry
  %3 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([23 x i8], [23 x i8]* @str.3, i32 0, i32 0))
  %4 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_scanf.4, i32 0, i32 0), double* %num2)
  %cmptmp1 = icmp eq i32 %4, 0
  br i1 %cmptmp1, label %input_fail2, label %input_cont3

input_fail2:                                      ; preds = %input_cont
  store double 0.000000e+00, double* %num2, align 8
  %5 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_clear.5, i32 0, i32 0))
  br label %input_cont3

input_cont3:                                      ; preds = %input_fail2, %input_cont
  %6 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([41 x i8], [41 x i8]* @str.6, i32 0, i32 0))
  %7 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_scanf.7, i32 0, i32 0), double* %operation)
  %cmptmp4 = icmp eq i32 %7, 0
  br i1 %cmptmp4, label %input_fail5, label %input_cont6

input_fail5:                                      ; preds = %input_cont3
  store double 0.000000e+00, double* %operation, align 8
  %8 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_clear.8, i32 0, i32 0))
  br label %input_cont6

input_cont6:                                      ; preds = %input_fail5, %input_cont3
  %num17 = load double, double* %num1, align 8
  %num28 = load double, double* %num2, align 8
  %operation9 = load double, double* %operation, align 8
  %calltmp = call double @calculate(double %num17, double %num28, double %operation9)
  %result = alloca double, align 8
  store double %calltmp, double* %result, align 8
  %9 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([10 x i8], [10 x i8]* @str.9, i32 0, i32 0))
  %result10 = load double, double* %result, align 8
  %10 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @fmt.10, i32 0, i32 0), double %result10)
  ret i32 0
}
