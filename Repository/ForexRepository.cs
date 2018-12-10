using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
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

        public async Task<IEnumerable<ForexExperimentMongo>> GetAllExperiments()
        {
            var experiments = await _context.Experiments.Find(_ => true).ToListAsync();
        

            return experiments;
        }

        public async Task AddExperiment(ForexExperimentMongo item)
        {
        
            await _context.Experiments.InsertOneAsync(item);
            
        }

        public async Task PushTradingStrategySession(TradingSession item)
        {
        
            await _context.TradingSessionQueue.InsertOneAsync(item);
            
        }

        public async Task DeleteExperiment(string name)
        {
            await _context.Experiments.DeleteOneAsync(item=>item.name==name);
        }

        public async Task<List<ForexSession>> GetForexSessions(string experimentId)
        {
            var result = await _context.ForexSessions.Find((s)=>s.ExperimentId==experimentId).ToListAsync();
            return result;
        }

         public async Task<List<ForexSession>> GetForexSessions()
        {
            var result = await _context.ForexSessions.Find(_=>true).ToListAsync();
            return result;
        }

    }    
}