import llvm from 'llvm-bindings';

console.log('llvm.Type:', llvm.Type);
console.log('llvm.Type.getIntNTy:', llvm.Type.getIntNTy);
console.log('llvm.Type.getDoubleTy:', llvm.Type.getDoubleTy);
console.log('llvm.IntegerType:', llvm.IntegerType);
console.log('llvm.ArrayType:', llvm.ArrayType);
console.log('llvm.PointerType:', llvm.PointerType);
console.log('llvm.LinkageTypes:', llvm.LinkageTypes);
console.log('llvm.Function:', llvm.Function);
console.log('llvm.Function.create:', llvm.Function.create);
console.log('llvm.Function.Create:', llvm.Function.Create);
try {
  const context = new llvm.LLVMContext();
  const module = new llvm.Module('test', context);
  const int8Ty = llvm.Type.getIntNTy.call(llvm.Type, context, 8);
  console.log('Int8Ty:', int8Ty);
  const int8PtrTy = llvm.PointerType.get.call(llvm.PointerType, int8Ty, 0);
  console.log('Int8PtrTy:', int8PtrTy);
  console.log('Int32Ty:', llvm.Type.getIntNTy.call(llvm.Type, context, 32));
  console.log('DoubleTy:', llvm.Type.getDoubleTy.call(llvm.Type, context));
  const funcType = llvm.FunctionType.get(llvm.Type.getIntNTy.call(llvm.Type, context, 32), [], false);
  const linkage = llvm.LinkageTypes ? llvm.LinkageTypes.ExternalLinkage : 0;
  const mainFunc = (llvm.Function.Create || llvm.Function.create)(funcType, linkage, 'main', module);
  console.log('MainFunc:', mainFunc);
} catch (e) {
  console.error('Error:', e.message);
}