using System;

namespace MyApp;

public class Car: Vehcle
{
    public Car(string registraionNumber)
    : base(registraionNumber)
    {
        Console.WriteLine("car is being initalized.{0}", registraionNumber);
    }
}
