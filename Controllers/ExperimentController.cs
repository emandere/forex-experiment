using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using forex_experiment.Mapper;
using forex_experiment.Domain;

namespace forex_experiment.Controllers
{
    //[Route("api/[controller]/[action]")]
    //[ApiController]
    [Route("api/[controller]")]
    public class ExperimentController : ControllerBase
    {
        private readonly ForexExperimentMap _forexExperimentMap;
       
        public ExperimentController(ForexExperimentMap forexExperimentMap)
        {   
            _forexExperimentMap = forexExperimentMap;
        }
        
        [HttpGet("[action]")]
        public async Task<ActionResult> GetExperiments()
        {
            var experimentsVar = new 
            { 
                experiments=await _forexExperimentMap.GetExperiments()
            };
            return Ok(JsonConvert.SerializeObject(experimentsVar));
        }

        [HttpDelete("[action]")]
        public async Task<ActionResult> DeleteExperiment(string name)
        {
            await _forexExperimentMap.DeleteExperiment(name);
            return Ok(JsonConvert.SerializeObject($"{name} deleted"));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateExperiment([FromBody] ForexExperiment experiment)
        {
            var result = await _forexExperimentMap.CreateExperiment(experiment);
            return Ok(JsonConvert.SerializeObject(result));
        }

    }

}