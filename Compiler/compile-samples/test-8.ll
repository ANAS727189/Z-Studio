declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@rows = global double 0.000000
@i = global double 0.000000
@j = global double 0.000000
@x = global double 0.000000
@y = global double 0.000000
@product = global double 0.000000
@.str.0 = private unnamed_addr constant [3 x i8] c"*\0A\00"
@.str.1 = private unnamed_addr constant [2 x i8] c"\0A\00"
@.str.2 = private unnamed_addr constant [23 x i8] c"Multiplication table:\0A\00"
@.str.3 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"

define i32 @main() {
entry:
store double 5.000000, double* @rows
store double 1.000000, double* @i
br label %while_cond.0
while_cond.0:
%i.0 = load double, double* @i
%rows.1 = load double, double* @rows
%cmptmp.2 = fcmp ole double %i.0, %rows.1
%booltmp.3 = uitofp i1 %cmptmp.2 to double
%boolcond.4 = fcmp one double %booltmp.3, 0.000000
br i1 %boolcond.4, label %while_body.1, label %while_cont.2
while_body.1:
store double 1.000000, double* @j
br label %while_cond.3
while_cond.3:
%j.5 = load double, double* @j
%i.6 = load double, double* @i
%cmptmp.7 = fcmp ole double %j.5, %i.6
%booltmp.8 = uitofp i1 %cmptmp.7 to double
%boolcond.9 = fcmp one double %booltmp.8, 0.000000
br i1 %boolcond.9, label %while_body.4, label %while_cont.5
while_body.4:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.str.0, i32 0, i32 0))
%j.10 = load double, double* @j
%addtmp.11 = fadd double %j.10, 1.000000
store double %addtmp.11, double* @j
br label %while_cond.3
while_cont.5:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([2 x i8], [2 x i8]* @.str.1, i32 0, i32 0))
%i.12 = load double, double* @i
%addtmp.13 = fadd double %i.12, 1.000000
store double %addtmp.13, double* @i
br label %while_cond.0
while_cont.2:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([23 x i8], [23 x i8]* @.str.2, i32 0, i32 0))
store double 1.000000, double* @x
br label %for_cond.6
for_cond.6:
%x.14 = load double, double* @x
%cmptmp.15 = fcmp ole double %x.14, 3.000000
%booltmp.16 = uitofp i1 %cmptmp.15 to double
%boolcond.17 = fcmp one double %booltmp.16, 0.000000
br i1 %boolcond.17, label %for_body.7, label %for_cont.9
for_body.7:
store double 1.000000, double* @y
br label %for_cond.10
for_cond.10:
%y.18 = load double, double* @y
%cmptmp.19 = fcmp ole double %y.18, 3.000000
%booltmp.20 = uitofp i1 %cmptmp.19 to double
%boolcond.21 = fcmp one double %booltmp.20, 0.000000
br i1 %boolcond.21, label %for_body.11, label %for_cont.13
for_body.11:
%x.22 = load double, double* @x
%y.23 = load double, double* @y
%multmp.24 = fmul double %x.22, %y.23
store double %multmp.24, double* @product
%product.25 = load double, double* @product
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.3, i32 0, i32 0), double %product.25)
br label %for_incr.12
for_incr.12:
%oldval.26 = load double, double* @y
%inctmp.27 = fadd double %oldval.26, 1.000000
store double %inctmp.27, double* @y
br label %for_cond.10
for_cont.13:
br label %for_incr.8
for_incr.8:
%oldval.28 = load double, double* @x
%inctmp.29 = fadd double %oldval.28, 1.000000
store double %inctmp.29, double* @x
br label %for_cond.6
for_cont.9:
ret i32 0
}
