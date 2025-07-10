; ModuleID = 'compiler'
source_filename = "compiler"

@fmt_scanf.0 = internal constant [4 x i8] c"%lf\00"
@fmt_clear.1 = internal constant [4 x i8] c"%*s\00"
@str.2 = internal constant [9 x i8] c"Value: \0A\00"
@fmt.3 = internal constant [6 x i8] c"%.2f\0A\00"
@str.4 = internal constant [5 x i8] c"big\0A\00"
@str.5 = internal constant [7 x i8] c"small\0A\00"
@fmt.6 = internal constant [6 x i8] c"%.2f\0A\00"

declare i32 @printf(i8*, ...)

declare i32 @scanf(i8*, ...)

define double @inc(double %a) {
entry:
  %a1 = alloca double, align 8
  store double %a, double* %a1, align 8
  %a2 = load double, double* %a1, align 8
  %addtmp = fadd double %a2, 1.000000e+00
  ret double %addtmp
}

define i32 @main() {
entry:
  %x = alloca double, align 8
  store double 7.000000e+00, double* %x, align 8
  %a = alloca double, align 8
  store double 0.000000e+00, double* %a, align 8
  %0 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_scanf.0, i32 0, i32 0), double* %a)
  %cmptmp = icmp eq i32 %0, 0
  br i1 %cmptmp, label %input_fail, label %input_cont

input_fail:                                       ; preds = %entry
  store double 0.000000e+00, double* %a, align 8
  %1 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @fmt_clear.1, i32 0, i32 0))
  br label %input_cont

input_cont:                                       ; preds = %input_fail, %entry
  %oldval = load double, double* %x, align 8
  %inctmp = fadd double %oldval, 1.000000e+00
  store double %inctmp, double* %x, align 8
  %oldval1 = load double, double* %x, align 8
  %dectmp = fsub double %oldval1, 1.000000e+00
  store double %dectmp, double* %x, align 8
  %2 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([9 x i8], [9 x i8]* @str.2, i32 0, i32 0))
  %x2 = load double, double* %x, align 8
  %3 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @fmt.3, i32 0, i32 0), double %x2)
  %x3 = load double, double* %x, align 8
  %gttmp = fcmp ogt double %x3, 5.000000e+00
  %booltmp = uitofp i1 %gttmp to double
  %ifcond = fcmp one double %booltmp, 0.000000e+00
  br i1 %ifcond, label %then, label %else

then:                                             ; preds = %input_cont
  %4 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @str.4, i32 0, i32 0))
  br label %if_cont

else:                                             ; preds = %input_cont
  %5 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([7 x i8], [7 x i8]* @str.5, i32 0, i32 0))
  br label %if_cont

if_cont:                                          ; preds = %else, %then
  %x4 = load double, double* %x, align 8
  %calltmp = call double @inc(double %x4)
  %6 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @fmt.6, i32 0, i32 0), double %calltmp)
  ret i32 0
}
