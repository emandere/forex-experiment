using MongoDB.Driver;
using forex_experiment.Models;
using Microsoft.Extensions.Options;
namespace forex_experiment.Repository
{
    public class ForexContext
    {
        private readonly IMongoDatabase _database = null;

        public ForexContext(IOptions<Settings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<ForexExperiment> Experiments
        {
            get
            {
                return _database.GetCollection<ForexExperiment>("experiments");
            }
        }
    }
}