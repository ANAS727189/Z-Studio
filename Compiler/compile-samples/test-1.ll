declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@x = global double 0.000000
@a = global double 0.000000
@.str.0 = private unnamed_addr constant [4 x i8] c"%lf\00"
@.str.1 = private unnamed_addr constant [4 x i8] c"%*s\00"
@.str.2 = private unnamed_addr constant [9 x i8] c"Value: \0A\00"
@.str.3 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.4 = private unnamed_addr constant [5 x i8] c"big\0A\00"
@.str.5 = private unnamed_addr constant [7 x i8] c"small\0A\00"
@.str.6 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"

define double @inc(double %arg.a) {
entry:
%a.addr = alloca double
store double %arg.a, double* %a.addr
%a.0 = load double, double* %a.addr
%addtmp.1 = fadd double %a.0, 1.000000
ret double %addtmp.1
}

define i32 @main() {
entry:
%multmp.2 = fmul double 2.000000, 3.000000
%addtmp.3 = fadd double 1.000000, %multmp.2
store double %addtmp.3, double* @x
store double 0.000000, double* @a
%tmp.4 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.0, i32 0, i32 0), double* @a)
%tmp.5 = icmp eq i32 %tmp.4, 0
br i1 %tmp.5, label %input_fail.0, label %input_cont.1
input_fail.0:
store double 0.000000, double* @a
call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.1, i32 0, i32 0))
br label %input_cont.1
input_cont.1:
%oldval.6 = load double, double* @x
%inctmp.7 = fadd double %oldval.6, 1.000000
store double %inctmp.7, double* @x
%oldval.8 = load double, double* @x
%dectmp.9 = fsub double %oldval.8, 1.000000
store double %dectmp.9, double* @x
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([9 x i8], [9 x i8]* @.str.2, i32 0, i32 0))
%x.10 = load double, double* @x
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.3, i32 0, i32 0), double %x.10)
%x.11 = load double, double* @x
%cmptmp.12 = fcmp ogt double %x.11, 5.000000
%booltmp.13 = uitofp i1 %cmptmp.12 to double
%boolcond.14 = fcmp one double %booltmp.13, 0.000000
br i1 %boolcond.14, label %if_then.2, label %if_else.3
if_then.2:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([5 x i8], [5 x i8]* @.str.4, i32 0, i32 0))
br label %if_cont.4
if_else.3:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([7 x i8], [7 x i8]* @.str.5, i32 0, i32 0))
br label %if_cont.4
if_cont.4:
%x.15 = load double, double* @x
%calltmp.16 = call double @inc(double %x.15)
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.6, i32 0, i32 0), double %calltmp.16)
ret i32 0
}
