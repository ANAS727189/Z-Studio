declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@n = global double 0.000000
@a = global double 0.000000
@b = global double 0.000000
@count = global double 0.000000
@temp = global double 0.000000
@.str.0 = private unnamed_addr constant [29 x i8] c"How many Fibonacci numbers?\0A\00"
@.str.1 = private unnamed_addr constant [4 x i8] c"%lf\00"
@.str.2 = private unnamed_addr constant [4 x i8] c"%*s\00"
@.str.3 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"

define i32 @main() {
entry:
store double 0.000000, double* @n
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([29 x i8], [29 x i8]* @.str.0, i32 0, i32 0))
%tmp.0 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.1, i32 0, i32 0), double* @n)
%tmp.1 = icmp eq i32 %tmp.0, 0
br i1 %tmp.1, label %input_fail.0, label %input_cont.1
input_fail.0:
store double 0.000000, double* @n
call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.str.2, i32 0, i32 0))
br label %input_cont.1
input_cont.1:
store double 0.000000, double* @a
store double 1.000000, double* @b
store double 0.000000, double* @count
br label %while_cond.2
while_cond.2:
%count.2 = load double, double* @count
%n.3 = load double, double* @n
%cmptmp.4 = fcmp olt double %count.2, %n.3
%booltmp.5 = uitofp i1 %cmptmp.4 to double
%boolcond.6 = fcmp one double %booltmp.5, 0.000000
br i1 %boolcond.6, label %while_body.3, label %while_cont.4
while_body.3:
%a.7 = load double, double* @a
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.3, i32 0, i32 0), double %a.7)
%a.8 = load double, double* @a
%b.9 = load double, double* @b
%addtmp.10 = fadd double %a.8, %b.9
store double %addtmp.10, double* @temp
%b.11 = load double, double* @b
store double %b.11, double* @a
%temp.12 = load double, double* @temp
store double %temp.12, double* @b
%count.13 = load double, double* @count
%addtmp.14 = fadd double %count.13, 1.000000
store double %addtmp.14, double* @count
br label %while_cond.2
while_cont.4:
ret i32 0
}
