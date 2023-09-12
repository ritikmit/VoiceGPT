using Microsoft.CognitiveServices.Speech;
using System;
using System.Threading.Tasks;

namespace VoiceGPT_speechToText
{
    class Program
    {
        public static async Task RecognizeSpeechAsync()
        {
            var config = SpeechConfig.FromSubscription("<Key HERE>", "eastus");

            using (var recognizer = new SpeechRecognizer(config))
            {
                // Subscribes to events.
                recognizer.Recognizing += (s, e) => {
                    Console.WriteLine($"RECOGNIZING: Text={e.Result.Text}");
                };

                recognizer.Recognized += (s, e) => {
                    var result = e.Result;
                    Console.WriteLine($"Reason: {result.Reason.ToString()}");
                    if (result.Reason == ResultReason.RecognizedSpeech)
                    {
                        Console.WriteLine($"Final result: Text: {result.Text}.");
                    }
                };

                recognizer.Canceled += (s, e) => {
                    Console.WriteLine($"\n    Canceled. Reason: {e.Reason.ToString()}, CanceledReason: {e.Reason}");
                };

                recognizer.SessionStarted += (s, e) => {
                    Console.WriteLine("\n    Session started event.");
                };

                recognizer.SessionStopped += (s, e) => {
                    Console.WriteLine("\n    Session stopped event.");
                };

                // Starts continuous recognition. 
                // Uses StopContinuousRecognitionAsync() to stop recognition.
                await recognizer.StartContinuousRecognitionAsync().ConfigureAwait(false);

                do
                {
                    Console.WriteLine("Press Enter to stop");
                } while (Console.ReadKey().Key != ConsoleKey.Enter);

                // Stops recognition.
                await recognizer.StopContinuousRecognitionAsync().ConfigureAwait(false);
            }
        }

        static void Main(string[] args)
        {
            RecognizeSpeechAsync().Wait();
            Console.WriteLine("Please press a key to continue");
            Console.ReadLine();
        }
    }
}
