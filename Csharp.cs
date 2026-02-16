using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Text;

class Csharp
{
    public static void Main ()
    {
        Console.WriteLine("Hello, World!");
        var dict = new Dictionary<string, string>();
        dict.Add("key1", "value1");
        dict.Add("key2", "value2");
        foreach (var kvp in dict)
        {
            Console.WriteLine($"Key: {kvp.Key}, Value: {kvp.Value}");
        }

        try
        {
            int number = int.Parse("123");
            Console.WriteLine($"Parsed number: {number}");
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"Error parsing number: {ex.Message}");
        }
        Console.WriteLine("Press any key to exit...");
        Console.ReadKey();
        Console.WriteLine("Goodbye!");

    }
}
