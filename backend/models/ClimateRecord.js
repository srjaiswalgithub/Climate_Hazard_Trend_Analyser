
import mongoose from 'mongoose';

const ClimateRecordSchema = new mongoose.Schema({
  region: String,
  date: Date,
  maxTemp: Number,
  isHeatwave: Boolean,
});

const climateRecordModel = mongoose.model('ClimateRecord', ClimateRecordSchema);
export default climateRecordModel;
