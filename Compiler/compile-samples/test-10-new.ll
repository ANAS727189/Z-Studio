declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@num1 = global double 0.000000
@num2 = global double 0.000000
@testNum = global double 0.000000
@.str.0 = private unnamed_addr constant [19 x i8] c"GCD of 12 and 18:\0A\00"
@.str.1 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.2 = private unnamed_addr constant [19 x i8] c"LCM of 12 and 18:\0A\00"
@.str.3 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.4 = private unnamed_addr constant [13 x i8] c"17 is prime\0A\00"
@.str.5 = private unnamed_addr constant [17 x i8] c"17 is not prime\0A\00"

define double @gcd(double %arg.a, double %arg.b) {
entry:
%temp.addr = alloca double
%b.addr = alloca double
%a.addr = alloca double
store double %arg.a, double* %a.addr
store double %arg.b, double* %b.addr
br label %while_cond.0
while_cond.0:
%b.0 = load double, double* %b.addr
%cmptmp.1 = fcmp one double %b.0, 0.000000
%booltmp.2 = uitofp i1 %cmptmp.1 to double
%boolcond.3 = fcmp one double %booltmp.2, 0.000000
br i1 %boolcond.3, label %while_body.1, label %while_cont.2
while_body.1:
%b.4 = load double, double* %b.addr
store double %b.4, double* %temp.addr
%a.5 = load double, double* %a.addr
%b.6 = load double, double* %b.addr
%modtmp.7 = frem double %a.5, %b.6
store double %modtmp.7, double* %b.addr
%temp.8 = load double, double* %temp.addr
store double %temp.8, double* %a.addr
br label %while_cond.0
while_cont.2:
%a.9 = load double, double* %a.addr
ret double %a.9
}

define double @lcm(double %arg.a, double %arg.b) {
entry:
%a.addr = alloca double
%b.addr = alloca double
store double %arg.a, double* %a.addr
store double %arg.b, double* %b.addr
%a.10 = load double, double* %a.addr
%b.11 = load double, double* %b.addr
%multmp.12 = fmul double %a.10, %b.11
%a.13 = load double, double* %a.addr
%b.14 = load double, double* %b.addr
%calltmp.15 = call double @gcd(double %a.13, double %b.14)
%divtmp.16 = fdiv double %multmp.12, %calltmp.15
ret double %divtmp.16
}

define double @isPrime(double %arg.n) {
entry:
%i.addr = alloca double
%n.addr = alloca double
store double %arg.n, double* %n.addr
%n.17 = load double, double* %n.addr
%cmptmp.18 = fcmp ole double %n.17, 1.000000
%booltmp.19 = uitofp i1 %cmptmp.18 to double
%boolcond.20 = fcmp one double %booltmp.19, 0.000000
br i1 %boolcond.20, label %if_then.3, label %if_cont.4
if_then.3:
ret double 0.000000
if_cont.4:
store double 2.000000, double* %i.addr
br label %while_cond.5
while_cond.5:
%i.21 = load double, double* %i.addr
%i.22 = load double, double* %i.addr
%multmp.23 = fmul double %i.21, %i.22
%n.24 = load double, double* %n.addr
%cmptmp.25 = fcmp ole double %multmp.23, %n.24
%booltmp.26 = uitofp i1 %cmptmp.25 to double
%boolcond.27 = fcmp one double %booltmp.26, 0.000000
br i1 %boolcond.27, label %while_body.6, label %while_cont.7
while_body.6:
%n.28 = load double, double* %n.addr
%i.29 = load double, double* %i.addr
%modtmp.30 = frem double %n.28, %i.29
%cmptmp.31 = fcmp oeq double %modtmp.30, 0.000000
%booltmp.32 = uitofp i1 %cmptmp.31 to double
%boolcond.33 = fcmp one double %booltmp.32, 0.000000
br i1 %boolcond.33, label %if_then.8, label %if_cont.9
if_then.8:
ret double 0.000000
if_cont.9:
%i.34 = load double, double* %i.addr
%addtmp.35 = fadd double %i.34, 1.000000
store double %addtmp.35, double* %i.addr
br label %while_cond.5
while_cont.7:
ret double 1.000000
}

define i32 @main() {
entry:
store double 12.000000, double* @num1
store double 18.000000, double* @num2
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([19 x i8], [19 x i8]* @.str.0, i32 0, i32 0))
%num1.36 = load double, double* @num1
%num2.37 = load double, double* @num2
%calltmp.38 = call double @gcd(double %num1.36, double %num2.37)
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.1, i32 0, i32 0), double %calltmp.38)
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([19 x i8], [19 x i8]* @.str.2, i32 0, i32 0))
%num1.39 = load double, double* @num1
%num2.40 = load double, double* @num2
%calltmp.41 = call double @lcm(double %num1.39, double %num2.40)
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.3, i32 0, i32 0), double %calltmp.41)
store double 17.000000, double* @testNum
%testNum.42 = load double, double* @testNum
%calltmp.43 = call double @isPrime(double %testNum.42)
%boolcond.44 = fcmp one double %calltmp.43, 0.000000
br i1 %boolcond.44, label %if_then.10, label %if_else.11
if_then.10:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([13 x i8], [13 x i8]* @.str.4, i32 0, i32 0))
br label %if_cont.12
if_else.11:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([17 x i8], [17 x i8]* @.str.5, i32 0, i32 0))
br label %if_cont.12
if_cont.12:
ret i32 0
}
