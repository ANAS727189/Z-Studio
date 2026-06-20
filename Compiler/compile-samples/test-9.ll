declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@zero = global double 0.000000
@negative = global double 0.000000
@large = global double 0.000000
@division = global double 0.000000
@.str.0 = private unnamed_addr constant [21 x i8] c"Testing edge cases:\0A\00"
@.str.1 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.2 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.3 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.4 = private unnamed_addr constant [23 x i8] c"Zero comparison works\0A\00"
@.str.5 = private unnamed_addr constant [27 x i8] c"Negative comparison works\0A\00"
@.str.6 = private unnamed_addr constant [31 x i8] c"Large number comparison works\0A\00"
@.str.7 = private unnamed_addr constant [26 x i8] c"Division by zero result:\0A\00"
@.str.8 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"

define i32 @main() {
entry:
store double 0.000000, double* @zero
%negtmp.0 = fsub double 0.000000, 10.000000
store double %negtmp.0, double* @negative
store double 1000000.000000, double* @large
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([21 x i8], [21 x i8]* @.str.0, i32 0, i32 0))
%zero.1 = load double, double* @zero
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.1, i32 0, i32 0), double %zero.1)
%negative.2 = load double, double* @negative
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.2, i32 0, i32 0), double %negative.2)
%large.3 = load double, double* @large
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.3, i32 0, i32 0), double %large.3)
%zero.4 = load double, double* @zero
%cmptmp.5 = fcmp oeq double %zero.4, 0.000000
%booltmp.6 = uitofp i1 %cmptmp.5 to double
%boolcond.7 = fcmp one double %booltmp.6, 0.000000
br i1 %boolcond.7, label %if_then.0, label %if_cont.1
if_then.0:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([23 x i8], [23 x i8]* @.str.4, i32 0, i32 0))
br label %if_cont.1
if_cont.1:
%negative.8 = load double, double* @negative
%cmptmp.9 = fcmp olt double %negative.8, 0.000000
%booltmp.10 = uitofp i1 %cmptmp.9 to double
%boolcond.11 = fcmp one double %booltmp.10, 0.000000
br i1 %boolcond.11, label %if_then.2, label %if_cont.3
if_then.2:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([27 x i8], [27 x i8]* @.str.5, i32 0, i32 0))
br label %if_cont.3
if_cont.3:
%large.12 = load double, double* @large
%cmptmp.13 = fcmp ogt double %large.12, 999999.000000
%booltmp.14 = uitofp i1 %cmptmp.13 to double
%boolcond.15 = fcmp one double %booltmp.14, 0.000000
br i1 %boolcond.15, label %if_then.4, label %if_cont.5
if_then.4:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([31 x i8], [31 x i8]* @.str.6, i32 0, i32 0))
br label %if_cont.5
if_cont.5:
%large.16 = load double, double* @large
%zero.17 = load double, double* @zero
%divtmp.18 = fdiv double %large.16, %zero.17
store double %divtmp.18, double* @division
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([26 x i8], [26 x i8]* @.str.7, i32 0, i32 0))
%division.19 = load double, double* @division
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.8, i32 0, i32 0), double %division.19)
ret i32 0
}
