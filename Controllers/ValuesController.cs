using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using forex_experiment.Models;
using forex_experiment.Repository;
using forex_experiment.Mapper;
using forex_experiment.Domain;

namespace forex_experiment.Controllers
{
    //[Route("api/[controller]/[action]")]
    //[ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly IForexRepository _forexRepository;
        private readonly ForexExperimentMap _forexExperimentMap;
       
        public ValuesController(IForexRepository forexRepository,ForexExperimentMap forexExperimentMap)
        {
            _forexRepository=forexRepository;
            _forexExperimentMap = forexExperimentMap;
        }
        // GET api/values
        [HttpGet("[action]")]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ForexExperiment>>> GetExperiments()
        {
            return Ok(await _forexExperimentMap.GetExperiments());
        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody] string value)
        {
            return Ok(JsonConvert.SerializeObject(value + "added"));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> DeleteExperiment([FromBody] string name)
        {
            await _forexRepository.DeleteExperiment(name);
            return Ok(JsonConvert.SerializeObject($"{name} deleted"));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateExperiment([FromBody] ForexExperimentMongo experiment)
        {
            await _forexRepository.AddExperiment(experiment);
            List<Strategy> _strategies = experiment.GetStrategies();
            int counter = 0;
            foreach(Strategy _strategy in _strategies)
            {
                TradingSession session = new TradingSession();
                session.Name = $"{experiment.name}_{counter}";
                session.StartDate = experiment.startdate;
                session.EndDate = experiment.enddate;
                session.TradingStrategy = _strategy;
                session.Read = false;
                session.ExperimentId = experiment.name;
                session.StartAmount = 2000.0;
                await _forexRepository.PushTradingStrategySession(session);
                counter++;
            }

            return Ok(JsonConvert.SerializeObject($"{experiment.name} added"));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
