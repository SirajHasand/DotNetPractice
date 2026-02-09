using System;
using System.Collections.Specialized;
using System.Text;

class Program
{
    static void Main()
    {
        Console.WriteLine("mian branch");
        Console.WriteLine("You can write your C# code here and run it using the .NET CLI.");
        int x = 10;
        int y = 20;
        int sum = x + y;
        Console.WriteLine($"The sum of {x} and {y} is: {sum}"); 

        double a = 5.5;
        double b = 2.3; 
        double product = a * b;
        Console.WriteLine($"The product of {a} and {b} is: {product }");
        int sum = x - y;
        Console.WriteLine($"The difference of {x} and {y} is: {sum}"); 
        string name = "Alice";
        Console.WriteLine($"Hello, {name}!");
        string greeting = "Welcome to C# programming!";
        Console.WriteLine(greeting); 
    }
}
