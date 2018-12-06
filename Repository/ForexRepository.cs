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
            var experiments = await _context.Experiments.Find(_ => true).ToListAsync();
            foreach(ForexExperiment experiment in experiments)
            {
                var sessions = await GetForexSessions(experiment.name);
                var sessionsCount = sessions.Count;
                var sessionsCompleteCount = sessions.FindAll((x)=>double.Parse(x.PercentComplete) >= 100).Count;
                var totalCount = experiment.GetStrategies().Count;
                double percentcomplete = ((double) sessionsCompleteCount / (double) totalCount)*100;
                experiment.percentcomplete = percentcomplete.ToString();
                if(percentcomplete>=100.0)
                    experiment.complete =true;
                else
                    experiment.complete=false;
                

            }

            return experiments;
        }

        public async Task AddExperiment(ForexExperiment item)
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