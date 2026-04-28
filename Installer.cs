using System;

namespace MyApp;

public class Installer
{
    private readonly Logger _logger;

    public Installer()
    {
    }

    public Installer(Logger logger)
    {
        _logger = logger;
    }
    public void Install()
    {
        _logger.Log("we are installing the app:");
    }

}
