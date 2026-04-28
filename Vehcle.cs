using System;

namespace MyApp;

public class Vehcle
{
    private readonly string _registrationNumber;

    // public Vehcle()
    // {
    //     Console.WriteLine("Vehicle is being initialized.");
    // }
    public Vehcle(string registrationNumber){

    _registrationNumber = registrationNumber;
    Console.WriteLine("vehicle is being initialized. {0}", registrationNumber);
    }
}
