using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using forex_experiment.Models;
using forex_experiment.Repository;

namespace forex_experiment.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IForexRepository _forexRepository;
        public ValuesController(IForexRepository forexRepository)
        {
            _forexRepository=forexRepository;
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody] string value)
        {
            return Ok(JsonConvert.SerializeObject(value + "added"));
        }

        // POST api/values
        [HttpPost]
        [ActionName("createexperiment")]
        public async Task<ActionResult> CreateExperiment([FromBody] ForexExperiment experiment)
        {
            await _forexRepository.AddExperiment(experiment);
            return Ok(JsonConvert.SerializeObject($"{experiment.Name} added"));
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
