using System;

namespace MyApp;


public class Program
{
    static void Main(string[] args)
    {
        // var dbMigrator = new DbMigrator(new Logger());

        // var logger = new Logger();
        // var isntaller = new Installer(logger);

        // dbMigrator.Migrate();
        // isntaller.Install();

        // var car = new Car("ADF3432");

        var video = new Video(){Title = "Video 1"};
        var videoEncoder = new VideoEncoder();
        videoEncoder.Encode(video);
        
    }

}
