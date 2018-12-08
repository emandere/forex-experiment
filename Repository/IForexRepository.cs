using System.Threading.Tasks;
using System.Collections.Generic;
using forex_experiment.Models;

namespace forex_experiment.Repository
{
    public interface IForexRepository
    {
        //Task<IEnumerable<ForexExperiment>> GetAllNotes();
        Task<IEnumerable<ForexExperimentMongo>> GetAllExperiments();
        Task AddExperiment(ForexExperimentMongo item);
        Task PushTradingStrategySession(TradingSession item);
        Task DeleteExperiment(string name);
        Task<List<ForexSession>> GetForexSessions();
        Task<List<ForexSession>> GetForexSessions(string experimentId);
    }
}
