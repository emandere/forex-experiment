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
        
        private readonly ForexExperimentMap _forexExperimentMap;
       
        public ValuesController(IForexRepository forexRepository,ForexExperimentMap forexExperimentMap)
        {
            
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
            await _forexExperimentMap.DeleteExperiment(name);
            return Ok(JsonConvert.SerializeObject($"{name} deleted"));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateExperiment([FromBody] ForexExperiment experiment)
        {
            var result = await _forexExperimentMap.CreateExperiment(experiment);
            return Ok(JsonConvert.SerializeObject(result));
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
