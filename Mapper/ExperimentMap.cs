using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using forex_experiment.Repository;
using forex_experiment.Domain;
using forex_experiment.Models;


namespace forex_experiment.Mapper
{
    public class ForexExperimentMap
    {
        private readonly IMapper _mapper;
    
        private readonly ForexContext _context = null;

       
        public ForexExperimentMap(IMapper mapper,IOptions<Settings> settings)
        {
            _mapper = mapper;
            _context = new ForexContext(settings);;
        }

        public async Task<List<ForexSession>> GetForexSessions(string experimentId)
        {
            var result = await _context.ForexSessions.Find((s)=>s.ExperimentId==experimentId).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<ForexExperiment>> GetExperiments()
        {
            var experimentsMongo = await _context.Experiments.Find(_ => true).ToListAsync();
            var experiments = experimentsMongo.Select((exp)=>_mapper.Map<ForexExperiment>(exp)).ToList();
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
                    
                
                foreach(ForexSession session in sessions)
                {
                    double firstBalance = session
                                            .SessionUser
                                            .Accounts
                                            .Primary
                                            .BalanceHistory
                                            .First().Amount;

                   double lastBalance = session
                                            .SessionUser
                                            .Accounts
                                            .Primary
                                            .BalanceHistory
                                            .Last().Amount;

                   experiment.sessions.Add(new Domain.SessionAnalysis
                                        {PL=lastBalance - firstBalance});


                }
            }
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

        public async Task<string> CreateExperiment(ForexExperiment experiment)
        {
            await AddExperiment(_mapper.Map<ForexExperimentMongo>(experiment));
            List<Strategy> _strategies = experiment.GetStrategies();
            int counter = 0;
            foreach(Strategy _strategy in _strategies)
            {
                TradingSession session = new TradingSession();
                session.Name = $"{experiment.name}_{counter}";
                session.StartDate = experiment.startdate;
                session.EndDate = experiment.enddate;
                session.TradingStrategy = _mapper.Map<StrategyMongo>(_strategy);
                session.Read = false;
                session.ExperimentId = experiment.name;
                session.StartAmount = 2000.0;
                await PushTradingStrategySession(session);
                counter++;
            }

            return $"{experiment.name} added";
        }

    }

     
}