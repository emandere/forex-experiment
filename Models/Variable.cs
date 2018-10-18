using MongoDB.Bson.Serialization.Attributes;
namespace forex_experiment.Models
{
    public class Variable
    {
        [BsonElement("staticOptions")]
        public string[] staticOptions;
        [BsonElement("min")]
        public string min;
        [BsonElement("max")]
        public string max;
        [BsonElement("increment")]
        public string increment;
    }
}