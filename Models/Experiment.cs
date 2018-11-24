using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Linq;
namespace forex_experiment.Models
{
   
    public class ForexExperiment
    {
        public ObjectId Id { get; set; }
        [BsonElement("name")]
        public string name { get; set; }
        [BsonElement("indicator")]
        public string indicator{get;set;}
        [BsonElement("startdate")]
        public string startdate{get;set;}
        [BsonElement("enddate")]
        public string enddate{get;set;}
        [BsonElement("position")]
        public string position{get;set;}
        [BsonElement("window")]
        public Variable<int> window{get;set;}
        [BsonElement("units")]
        public Variable<int> units{get;set;}
        [BsonElement("stoploss")]
        public Variable<double> stoploss{get;set;}
        [BsonElement("takeprofit")]
        public Variable<double> takeprofit{get;set;}

        public List<Strategy> GetStrategies()
        {
            List<Variable> variables = new List<Variable>();
            window.name="window";
            stoploss.name ="stoploss";
            takeprofit.name ="takeprofit";
            units.name ="units";
            
            Variable<string> position = new Variable<string>();
            position.name="position";
            position.staticOptions= new string[]{ this.position};

            Variable<string> rulename = new Variable<string>();
            rulename.name="rulename";
            rulename.staticOptions= new string[]{indicator};

            variables.Add(window);
            variables.Add(stoploss);
            variables.Add(takeprofit);
            variables.Add(units);
            variables.Add(position);
            variables.Add(rulename);
            

            return GetStrategyHelper(variables);
        }

        public List<Strategy> GetStrategyHelper(List<Variable> variables)
        {
            if(variables.Count==1)
            {
                return variables[0].CartesianProduct(new List<Strategy>());
            }
            else
            {
                return variables[0].CartesianProduct(GetStrategyHelper(variables.Skip(1).ToList()));
            }
        }

    }
}