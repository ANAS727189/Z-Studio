declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@result1 = global double 0.000000
@result2 = global double 0.000000
@result3 = global double 0.000000
@.str.0 = private unnamed_addr constant [10 x i8] c"5 + 3 = \0A\00"
@.str.1 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.2 = private unnamed_addr constant [10 x i8] c"4 * 6 = \0A\00"
@.str.3 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.4 = private unnamed_addr constant [7 x i8] c"5! = \0A\00"
@.str.5 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"

define double @add(double %arg.x, double %arg.y) {
entry:
%x.addr = alloca double
%y.addr = alloca double
store double %arg.x, double* %x.addr
store double %arg.y, double* %y.addr
%x.0 = load double, double* %x.addr
%y.1 = load double, double* %y.addr
%addtmp.2 = fadd double %x.0, %y.1
ret double %addtmp.2
}

define double @multiply(double %arg.a, double %arg.b) {
entry:
%a.addr = alloca double
%b.addr = alloca double
store double %arg.a, double* %a.addr
store double %arg.b, double* %b.addr
%a.3 = load double, double* %a.addr
%b.4 = load double, double* %b.addr
%multmp.5 = fmul double %a.3, %b.4
ret double %multmp.5
}

define double @factorial(double %arg.n) {
entry:
%n.addr = alloca double
store double %arg.n, double* %n.addr
%n.6 = load double, double* %n.addr
%cmptmp.7 = fcmp ole double %n.6, 1.000000
%booltmp.8 = uitofp i1 %cmptmp.7 to double
%boolcond.9 = fcmp one double %booltmp.8, 0.000000
br i1 %boolcond.9, label %if_then.0, label %if_else.1
if_then.0:
ret double 1.000000
if_else.1:
%n.10 = load double, double* %n.addr
%n.11 = load double, double* %n.addr
%subtmp.12 = fsub double %n.11, 1.000000
%calltmp.13 = call double @factorial(double %subtmp.12)
%multmp.14 = fmul double %n.10, %calltmp.13
ret double %multmp.14
if_cont.2:
ret double 0.000000
}

define i32 @main() {
entry:
%calltmp.15 = call double @add(double 5.000000, double 3.000000)
store double %calltmp.15, double* @result1
%calltmp.16 = call double @multiply(double 4.000000, double 6.000000)
store double %calltmp.16, double* @result2
%calltmp.17 = call double @factorial(double 5.000000)
store double %calltmp.17, double* @result3
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([10 x i8], [10 x i8]* @.str.0, i32 0, i32 0))
%result1.18 = load double, double* @result1
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.1, i32 0, i32 0), double %result1.18)
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([10 x i8], [10 x i8]* @.str.2, i32 0, i32 0))
%result2.19 = load double, double* @result2
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.3, i32 0, i32 0), double %result2.19)
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([7 x i8], [7 x i8]* @.str.4, i32 0, i32 0))
%result3.20 = load double, double* @result3
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.5, i32 0, i32 0), double %result3.20)
ret i32 0
}
