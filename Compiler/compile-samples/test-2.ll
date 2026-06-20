declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@a = global double 0.000000
@b = global double 0.000000
@sum = global double 0.000000
@diff = global double 0.000000
@prod = global double 0.000000
@quot = global double 0.000000
@.str.0 = private unnamed_addr constant [7 x i8] c"Sum: \0A\00"
@.str.1 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.2 = private unnamed_addr constant [14 x i8] c"Difference: \0A\00"
@.str.3 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.4 = private unnamed_addr constant [11 x i8] c"Product: \0A\00"
@.str.5 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.6 = private unnamed_addr constant [12 x i8] c"Quotient: \0A\00"
@.str.7 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"

define i32 @main() {
entry:
store double 10.000000, double* @a
store double 20.000000, double* @b
%a.0 = load double, double* @a
%b.1 = load double, double* @b
%addtmp.2 = fadd double %a.0, %b.1
store double %addtmp.2, double* @sum
%a.3 = load double, double* @a
%b.4 = load double, double* @b
%subtmp.5 = fsub double %a.3, %b.4
store double %subtmp.5, double* @diff
%a.6 = load double, double* @a
%b.7 = load double, double* @b
%multmp.8 = fmul double %a.6, %b.7
store double %multmp.8, double* @prod
%a.9 = load double, double* @a
%b.10 = load double, double* @b
%divtmp.11 = fdiv double %a.9, %b.10
store double %divtmp.11, double* @quot
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([7 x i8], [7 x i8]* @.str.0, i32 0, i32 0))
%sum.12 = load double, double* @sum
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.1, i32 0, i32 0), double %sum.12)
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([14 x i8], [14 x i8]* @.str.2, i32 0, i32 0))
%diff.13 = load double, double* @diff
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.3, i32 0, i32 0), double %diff.13)
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([11 x i8], [11 x i8]* @.str.4, i32 0, i32 0))
%prod.14 = load double, double* @prod
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.5, i32 0, i32 0), double %prod.14)
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([12 x i8], [12 x i8]* @.str.6, i32 0, i32 0))
%quot.15 = load double, double* @quot
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.7, i32 0, i32 0), double %quot.15)
ret i32 0
}
