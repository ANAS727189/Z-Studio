declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

@sum = global double 0.000000
@i = global double 0.000000
@.str.0 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"
@.str.1 = private unnamed_addr constant [15 x i8] c"Sum up to 5: \0A\00"
@.str.2 = private unnamed_addr constant [6 x i8] c"%.2f\0A\00"

define i32 @main() {
entry:
store double 0.000000, double* @sum
store double 1.000000, double* @i
br label %for_cond.0
for_cond.0:
%i.0 = load double, double* @i
%cmptmp.1 = fcmp ole double %i.0, 10.000000
%booltmp.2 = uitofp i1 %cmptmp.1 to double
%boolcond.3 = fcmp one double %booltmp.2, 0.000000
br i1 %boolcond.3, label %for_body.1, label %for_cont.3
for_body.1:
%i.4 = load double, double* @i
%cmptmp.5 = fcmp oeq double %i.4, 6.000000
%booltmp.6 = uitofp i1 %cmptmp.5 to double
%boolcond.7 = fcmp one double %booltmp.6, 0.000000
br i1 %boolcond.7, label %if_then.4, label %if_cont.5
if_then.4:
br label %for_cont.3
if_cont.5:
%sum.8 = load double, double* @sum
%i.9 = load double, double* @i
%addtmp.10 = fadd double %sum.8, %i.9
store double %addtmp.10, double* @sum
%i.11 = load double, double* @i
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.0, i32 0, i32 0), double %i.11)
br label %for_incr.2
for_incr.2:
%oldval.12 = load double, double* @i
%inctmp.13 = fadd double %oldval.12, 1.000000
store double %inctmp.13, double* @i
br label %for_cond.0
for_cont.3:
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([15 x i8], [15 x i8]* @.str.1, i32 0, i32 0))
%sum.14 = load double, double* @sum
call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([6 x i8], [6 x i8]* @.str.2, i32 0, i32 0), double %sum.14)
ret i32 0
}
