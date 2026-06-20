declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@base = global double 0.000000
@exp = global double 0.000000
@powerResult = global double 0.000000
@.str.0 = private unnamed_addr constant [8 x i8] c"2^8 = \0A\00"
@.str.1 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.2 = private unnamed_addr constant [16 x i8] c"Result is even\0A\00"
@.str.3 = private unnamed_addr constant [15 x i8] c"Result is odd\0A\00"

define double @power(double %arg.base, double %arg.exp) {
entry:
%result.addr = alloca double
%i.addr = alloca double
%base.addr = alloca double
%exp.addr = alloca double
store double %arg.base, double* %base.addr
store double %arg.exp, double* %exp.addr
%exp.0 = load double, double* %exp.addr
%cmptmp.1 = fcmp oeq double %exp.0, 0.000000
%booltmp.2 = uitofp i1 %cmptmp.1 to double
%boolcond.3 = fcmp one double %booltmp.2, 0.000000
br i1 %boolcond.3, label %if_then.0, label %if_else.1
if_then.0:
ret double 1.000000
if_else.1:
store double 1.000000, double* %result.addr
store double 0.000000, double* %i.addr
br label %while_cond.3
while_cond.3:
%i.4 = load double, double* %i.addr
%exp.5 = load double, double* %exp.addr
%cmptmp.6 = fcmp olt double %i.4, %exp.5
%booltmp.7 = uitofp i1 %cmptmp.6 to double
%boolcond.8 = fcmp one double %booltmp.7, 0.000000
br i1 %boolcond.8, label %while_body.4, label %while_cont.5
while_body.4:
%result.9 = load double, double* %result.addr
%base.10 = load double, double* %base.addr
%multmp.11 = fmul double %result.9, %base.10
store double %multmp.11, double* %result.addr
%i.12 = load double, double* %i.addr
%addtmp.13 = fadd double %i.12, 1.000000
store double %addtmp.13, double* %i.addr
br label %while_cond.3
while_cont.5:
%result.14 = load double, double* %result.addr
ret double %result.14
if_cont.2:
ret double 0.000000
}

define double @isEven(double %arg.num) {
entry:
%num.addr = alloca double
store double %arg.num, double* %num.addr
%num.15 = load double, double* %num.addr
%modtmp.16 = frem double %num.15, 2.000000
%cmptmp.17 = fcmp oeq double %modtmp.16, 0.000000
%booltmp.18 = uitofp i1 %cmptmp.17 to double
%boolcond.19 = fcmp one double %booltmp.18, 0.000000
br i1 %boolcond.19, label %if_then.6, label %if_else.7
if_then.6:
ret double 1.000000
if_else.7:
ret double 0.000000
if_cont.8:
ret double 0.000000
}

define i32 @main() {
entry:
store double 2.000000, double* @base
store double 8.000000, double* @exp
%base.20 = load double, double* @base
%exp.21 = load double, double* @exp
%calltmp.22 = call double @power(double %base.20, double %exp.21)
store double %calltmp.22, double* @powerResult
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([8 x i8], [8 x i8]* @.str.0, i32 0, i32 0))
%powerResult.23 = load double, double* @powerResult
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.1, i32 0, i32 0), double %powerResult.23)
%powerResult.24 = load double, double* @powerResult
%calltmp.25 = call double @isEven(double %powerResult.24)
%boolcond.26 = fcmp one double %calltmp.25, 0.000000
br i1 %boolcond.26, label %if_then.9, label %if_else.10
if_then.9:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([16 x i8], [16 x i8]* @.str.2, i32 0, i32 0))
br label %if_cont.11
if_else.10:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([15 x i8], [15 x i8]* @.str.3, i32 0, i32 0))
br label %if_cont.11
if_cont.11:
ret i32 0
}
