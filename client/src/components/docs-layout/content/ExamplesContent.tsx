export const ExamplesContent = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-4xl font-bold text-white mb-6">Code Examples</h1>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Average Calculation</h3>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`start
  let a = 10
  let b = 20
  let avg = 0.0
  avg = (a + b) / 2
  print("Average is: ")
  print(avg)
end`}
        </pre>
      </div>
    </div>
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Fibonacci Generator</h3>
      <div className="bg-black p-4 rounded-lg">
        <pre className="text-gray-300">
{`start
  let n
  print("How many Fibonacci numbers do you want?")
  input(n)
  let a = 0 
  let b = 1
  while n > 0 {
    print(a)
    let c = a + b
    a = b
    b = c
    n = n - 1
  }
end`}
        </pre>
      </div>
    </div>
  </div>
);