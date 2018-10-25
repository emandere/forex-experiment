using MongoDB.Bson.Serialization.Attributes;
namespace forex_experiment.Models
{
    public class Variable<T>
    {
        [BsonElement("staticOptions")]
        public T[] staticOptions;
        [BsonElement("min")]
        public T min;
        [BsonElement("max")]
        public T max;
        [BsonElement("increment")]
        public T increment;
    }
}