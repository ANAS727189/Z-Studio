# Z-- Language Specification

> The official reference for the Z-- (Z-Minus-Minus) programming language.

---

## Table of Contents

- [Program Structure](#program-structure)
- [Comments](#comments)
- [Variable Declaration & Data Types](#variable-declaration--data-types)
- [Numeric Literals](#numeric-literals)
- [Operators](#operators)
  - [Arithmetic](#arithmetic)
  - [Unary](#unary)
  - [Comparison](#comparison)
  - [Logical & Bitwise](#logical--bitwise)
- [Sample Programs](#sample-programs)
- [Syntax & Snippets](#syntax--snippets)
  - [Control Flow](#control-flow)
  - [Loop Control](#loop-control)
  - [Functions](#functions)
  - [Recursive Functions](#recursive-functions)
  - [Arrays](#arrays)
  - [Strings](#strings)

---

## Program Structure

Every Z-- program starts with `start` and ends with `end`.

```z--
start
  // statements...
end
```

---

## Comments

### Single-line comment

```z--
// This is a single-line comment
```

### Multi-line comment

```z--
/*
   Multi-line
   comment
*/
```

---

## Variable Declaration & Data Types

Use `let` to declare variables. Type is inferred based on the assigned value.

```z--
let number = 12       // integer
let name = Alice      // string
let score = 95.5      // float
let isActive = true   // boolean
```

Variables may also be declared **without** an initial value; they will be `null` until assigned:

```z--
let n
input(n)
```

---

## Numeric Literals

Z-- supports multiple number bases:

| Base    | Example   | Value       |
|---------|-----------|-------------|
| Decimal | `42`      | 42          |
| Hex     | `0x2A`    | 42          |
| Binary  | `0b101010`| 42          |
| Octal   | `0o52`    | 42          |

```z--
let decimal = 42       // base 10
let hex     = 0x2A     // hexadecimal
let binary  = 0b101010 // binary
let octal   = 0o52     // octal
```

---

## Operators

### Arithmetic

| Operator | Description   |
|----------|---------------|
| `+`      | Addition      |
| `-`      | Subtraction   |
| `*`      | Multiplication|
| `/`      | Division      |
| `%`      | Modulo (remainder) |

### Unary

| Operator | Description              |
|----------|--------------------------|
| `++x`    | Pre-increment            |
| `x--`    | Post-decrement           |
| `-x`     | Unary minus (negation)   |

### Comparison

| Operator | Description              |
|----------|--------------------------|
| `==`     | Equal to                 |
| `!=`     | Not equal to             |
| `<`      | Less than                |
| `<=`     | Less than or equal to    |
| `>`      | Greater than             |
| `>=`     | Greater than or equal to |

### Logical & Bitwise

| Operator | Description              |
|----------|--------------------------|
| `&&`     | Logical AND              |
| `\|\|`   | Logical OR               |
| `&`      | Bitwise AND              |
| `\|`     | Bitwise OR               |
| `^`      | Bitwise XOR              |
| `%`      | Modulo (remainder)       |

---

## Sample Programs

### 1. Average Calculation

```z--
start
  let a = 10
  let b = 20
  let avg = 0.0
  avg = (a + b) / 2
  print("Average is: ")
  print(avg)
end
```

### 2. Fibonacci Generator

```z--
start
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
end
```

### 3. Calculator with Nested if-else

```z--
start
  fun calculate {
    arg = (a, b, op)
    if op == 1 {
      return a + b
    } else {
      if op == 2 {
        return a - b
      } else {
        if op == 3 {
          return a * b
        } else {
          return 0
        }
      }
    }
  }

  let num1
  let num2
  let operation

  print("Enter first number: ")
  input(num1)
  print("Enter second number: ")
  input(num2)
  print("Choose operation (1=+, 2=-, 3=*, 4=/): ")
  input(operation)

  let result = calculate(num1, num2, operation)
  print("Result: ")
  print(result)
end
```

### 4. Grade Checker with else if

```z--
start
  let score = 82
  if score >= 90 {
    print("A")
  } else if score >= 75 {
    print("B")
  } else {
    print("C")
  }
end
```

### 5. Unary Operators

```z--
start
  let x = 3
  ++x
  x--
  let y = -x
  print("unary and update operators")
  print(y)
end
```

### 6. Numeric Literals (hex, binary, octal)

```z--
start
  let decimal = 42
  let hex = 0x10
  let binary = 0b1010
  let octal = 0o7
  let total = decimal + hex + binary + octal
  total = total - 5
  print("numeric literals and assignment")
  print(total)
end
```

### 7. Recursive Fibonacci

```z--
start
  fun fib {
    arg = (n)
    if n <= 1 {
      return n
    }
    return fib(n - 1) + fib(n - 2)
  }

  print("fib 6")
  print(fib(6))
end
```

### 8. Array Operations

```z--
start
  let nums = [2, 4, 6, 8]
  let sum = nums[0] + nums[1] + nums[2] + nums[3]
  print("array sum")
  print(sum)

  let values = [1, 1, 1]
  values[1] = 5
  values[2] = values[1] + 4
  print("array assignment")
  print(values[0] + values[1] + values[2])
end
```

### 9. String Variables and Concatenation

```z--
start
  let message = "Hello from a string variable"
  print(message)

  let greeting = "Hello, " + "Z--"
  print(greeting)
end
```

### 10. Input / Edge Cases

```z--
start
  let nameCode
  print("Enter a number:")
  input(nameCode)
  print("You entered:")
  print(nameCode)
end
```

---

## Syntax & Snippets

### Variable Declaration and Data Types

```z--
let number = 12       // integer
let name = Alice      // string
let score = 95.5      // float
let isActive = true   // boolean
```

Variables may also be declared without an initial value; they will be `null` until assigned:

```z--
let n
input(n)
```

Use `let` to declare variables. Type is inferred based on the assigned value.

---

### Comments

```z--
// Single-line comment

/*
   Multi-line
   comment
*/
```

---

### Numeric Literals

```z--
let decimal = 42       // base 10
let hex     = 0x2A     // hexadecimal
let binary  = 0b101010 // binary
let octal   = 0o52     // octal
```

---

## Control Flow

### if / else

```z--
if condition {
  // statements
} else {
  // statements
}
```

### else if

```z--
if condition {
  // statements
} else if condition {
  // statements
} else {
  // statements
}
```

### while Loop

```z--
while condition {
  // statements
}
```

### for Loop

```z--
for init, condition, increment {
  // statements
}
```

**Example:**

```z--
for a = 2, a < 10, a++ {
  print(a)
}
```

---

## Loop Control

### break Keyword

Used to exit loops prematurely.

**Example:**

```z--
start
  let n = 10
  while n > 0 {
    if n == 5 {
      break
    }
    print(n)
    n = n - 1
  }
end
```

---

## Functions

Defined using the `fun` keyword.

**Syntax:**

```z--
fun functionName {
  arg = (param1, param2, ...)
  // function body
  return expression
}
```

**Example:**

```z--
fun solve {
  arg = (a, b)
  return a + b
}

solve(5, 3);
```

---

## Recursive Functions

Functions may call themselves recursively:

```z--
fun fib {
  arg = (n)
  if n <= 1 {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}
print(fib(6));
```

---

## Arrays

Arrays are declared using square-bracket notation. They are accessed and mutated by integer index.

**Declaration:**

```z--
let nums = [2, 4, 6, 8]
```

**Read by index:**

```z--
let first = nums[0]
```

**Assignment by index:**

```z--
values[1] = 5
values[2] = values[1] + 4
```

> **Note:** Indexing is 0-based and the backing C type is an integer array.

---

## Strings

String literals are enclosed in double quotes.

```z--
let message = "Hello, Z--"
```

Strings may be concatenated with the `+` operator:

```z--
let greeting = "Hello, " + "Z--"
print(greeting)   // prints: Hello, Z--
```

A string stored in a variable can be printed directly:

```z--
let message = "Hello from a string variable"
print(message)
```

---

## Operators (Quick Reference)

### Arithmetic

```z--
+  -  *  /  %
```

### Unary

```z++
++  Increment
--  Decrement
-   Unary minus
```

### Comparison

```z--
==  !=  <  <=  >  >=
```

### Logical and Bitwise

```z--
&&  ||  &  |  ^  %
```

---

## Notes

- Strings are enclosed in double quotes `" "`.
- `input(var)` is used for user input.
- Semicolons are not required.
- Blocks are enclosed in `{ }`.
- The program begins with `start` and ends with `end`.
