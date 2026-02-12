using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Text;

class Program
{
    static void Main()
    {
        Console.WriteLine("C#- branch");
       
        //List
        var num = new List<int>(){11,22,33,44,55,66,77};
        num.Add(88);
        num.AddRange(new int[3]{32,32,99});

        foreach(var n in num)
        {
            Console.Write(n + " ");
        }
        //DateTime
        var now = DateTime.Now;
        Console.WriteLine();
        Console.WriteLine("the time is: "+ now);
        Console.WriteLine("hour : "+ now.Hour);
        Console.WriteLine("min : "+ now.Minute);
        Console.WriteLine("second : "+ now.Second);

        //String & StringBuilders 
        Console.WriteLine("------------------String & String Builder ------------------");

        var builder = new StringBuilder();
        builder.Append('-',10);
        
        Console.WriteLine(builder);

    }
}
