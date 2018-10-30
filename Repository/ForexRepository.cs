using System.Collections.Generic;
using System.Threading.Tasks;
using forex_experiment.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace forex_experiment.Repository
{
    public class ForexRepository : IForexRepository
    {
        private readonly ForexContext _context = null;

        public ForexRepository(IOptions<Settings> settings)
        {
            _context = new ForexContext(settings);
        }

        public async Task<IEnumerable<ForexExperiment>> GetAllExperiments()
        {
            var documents = await _context.Experiments.Find(_ => true).ToListAsync();
            return documents;
        }

        public async Task AddExperiment(ForexExperiment item)
        {
        
            await _context.Experiments.InsertOneAsync(item);
            
        }

        public async Task PushTradingStrategySession(TradingSession item)
        {
        
            await _context.TradingSessionQueue.InsertOneAsync(item);
            
        }

    }    
}