declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@num1 = global double 0.000000
@num2 = global double 0.000000
@operation = global double 0.000000
@result = global double 0.000000
@.str.0 = private unnamed_addr constant [22 x i8] c"Enter first number: \0A\00"
@.str.1 = private unnamed_addr constant [4 x i8] c"%lf\00"
@.str.2 = private unnamed_addr constant [4 x i8] c"%*s\00"
@.str.3 = private unnamed_addr constant [23 x i8] c"Enter second number: \0A\00"
@.str.4 = private unnamed_addr constant [4 x i8] c"%lf\00"
@.str.5 = private unnamed_addr constant [4 x i8] c"%*s\00"
@.str.6 = private unnamed_addr constant [41 x i8] c"Choose operation (1=+, 2=-, 3=*, 4=/): \0A\00"
@.str.7 = private unnamed_addr constant [4 x i8] c"%lf\00"
@.str.8 = private unnamed_addr constant [4 x i8] c"%*s\00"
@.str.9 = private unnamed_addr constant [10 x i8] c"Result: \0A\00"
@.str.10 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"

define double @calculate(double %arg.a, double %arg.b, double %arg.op) {
entry:
%a.addr = alloca double
%b.addr = alloca double
%op.addr = alloca double
store double %arg.a, double* %a.addr
store double %arg.b, double* %b.addr
store double %arg.op, double* %op.addr
%op.0 = load double, double* %op.addr
%cmptmp.1 = fcmp oeq double %op.0, 1.000000
%booltmp.2 = uitofp i1 %cmptmp.1 to double
%boolcond.3 = fcmp one double %booltmp.2, 0.000000
br i1 %boolcond.3, label %if_then.0, label %if_else.1
if_then.0:
%a.4 = load double, double* %a.addr
%b.5 = load double, double* %b.addr
%addtmp.6 = fadd double %a.4, %b.5
ret double %addtmp.6
if_else.1:
%op.7 = load double, double* %op.addr
%cmptmp.8 = fcmp oeq double %op.7, 2.000000
%booltmp.9 = uitofp i1 %cmptmp.8 to double
%boolcond.10 = fcmp one double %booltmp.9, 0.000000
br i1 %boolcond.10, label %if_then.3, label %if_else.4
if_then.3:
%a.11 = load double, double* %a.addr
%b.12 = load double, double* %b.addr
%subtmp.13 = fsub double %a.11, %b.12
ret double %subtmp.13
if_else.4:
%op.14 = load double, double* %op.addr
%cmptmp.15 = fcmp oeq double %op.14, 3.000000
%booltmp.16 = uitofp i1 %cmptmp.15 to double
%boolcond.17 = fcmp one double %booltmp.16, 0.000000
br i1 %boolcond.17, label %if_then.6, label %if_else.7
if_then.6:
%a.18 = load double, double* %a.addr
%b.19 = load double, double* %b.addr
%multmp.20 = fmul double %a.18, %b.19
ret double %multmp.20
if_else.7:
%op.21 = load double, double* %op.addr
%cmptmp.22 = fcmp oeq double %op.21, 4.000000
%booltmp.23 = uitofp i1 %cmptmp.22 to double
%boolcond.24 = fcmp one double %booltmp.23, 0.000000
br i1 %boolcond.24, label %if_then.9, label %if_else.10
if_then.9:
%a.25 = load double, double* %a.addr
%b.26 = load double, double* %b.addr
%divtmp.27 = fdiv double %a.25, %b.26
ret double %divtmp.27
if_else.10:
ret double 0.000000
if_cont.11:
br label %if_cont.8
if_cont.8:
br label %if_cont.5
if_cont.5:
br label %if_cont.2
if_cont.2:
ret double 0.000000
}

define i32 @main() {
entry:
store double 0.000000, double* @num1
store double 0.000000, double* @num2
store double 0.000000, double* @operation
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([22 x i8], [22 x i8]* @.str.0, i32 0, i32 0))
%tmp.28 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.1, i32 0, i32 0), double* @num1)
%tmp.29 = icmp eq i32 %tmp.28, 0
br i1 %tmp.29, label %input_fail.12, label %input_cont.13
input_fail.12:
store double 0.000000, double* @num1
call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.2, i32 0, i32 0))
br label %input_cont.13
input_cont.13:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([23 x i8], [23 x i8]* @.str.3, i32 0, i32 0))
%tmp.30 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.4, i32 0, i32 0), double* @num2)
%tmp.31 = icmp eq i32 %tmp.30, 0
br i1 %tmp.31, label %input_fail.14, label %input_cont.15
input_fail.14:
store double 0.000000, double* @num2
call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.5, i32 0, i32 0))
br label %input_cont.15
input_cont.15:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([41 x i8], [41 x i8]* @.str.6, i32 0, i32 0))
%tmp.32 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.7, i32 0, i32 0), double* @operation)
%tmp.33 = icmp eq i32 %tmp.32, 0
br i1 %tmp.33, label %input_fail.16, label %input_cont.17
input_fail.16:
store double 0.000000, double* @operation
call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.8, i32 0, i32 0))
br label %input_cont.17
input_cont.17:
%num1.34 = load double, double* @num1
%num2.35 = load double, double* @num2
%operation.36 = load double, double* @operation
%calltmp.37 = call double @calculate(double %num1.34, double %num2.35, double %operation.36)
store double %calltmp.37, double* @result
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([10 x i8], [10 x i8]* @.str.9, i32 0, i32 0))
%result.38 = load double, double* @result
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.10, i32 0, i32 0), double %result.38)
ret i32 0
}
