
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RallyComputer');


var schema = mongoose.Schema({
    
    Name: String,
    State: String,
    Org: String,
    NumofStages: Number,
    NumofServices: Number,
    Carnumber: Number,
    DateStart: Date,
    DateEnd: Date,
    RecceData:[{
    	Stage: String,
    	Video: String,
    	ATC_LON: Number,
    	ATC_LAT: Number,
    	FTC_LON: Number,
    	FTC_LAT: Number,
    	Flags:[{
	    		lat: Number,
				lon: Number,
				heading:Number,
				speed:Number,
				time:Date,
				}],
			GPSlogs:[{
	    		lat: Number,
				lon: Number,
				heading:Number,
				speed:Number,
				time:Date,
				}]
    	
	    
	    
    }],
    RecceOrder:[{
	    Number:Number,
		Name:String,
		Miles:Number,
		Order:Number,
		id :String,
		recid: Number,
		ATC_lon: String,
        ATC_lat: String,
        FTC_lat: String,
        FTC_lon: String,
    }],
    sortOrder: {
    AllItems:[],
    	Day1:{
        	Day1_1: [],
			Day1_2: [],
			Day1_3: [],
			Day1_4: [],
			Day1_5: [],
			Day1_6: [],
        },
        Day2:{
        	Day2_1: [],
			Day2_2: [],
			Day2_3: [],
			Day2_4: [],
			Day2_5: [],
			Day2_6: [],
        },
        Day3:{
        	Day3_1: [],
			Day3_2: [],
			Day3_3: [],
			Day3_4: [],
			Day3_5: [],
			Day3_6: [],
        }
    },
    Data: {
        Milage: {
            Stages: {
                Day1Total: Number,
                Day1: Number,
                Day1_2: Number,
                Day1_3: Number,
                Day1_4: Number,
                Day1_5: Number,
                Day1_6: Number,
                Day2Total: Number,
                Day2: Number,
                Day2_2: Number,
                Day2_3: Number,
                Day2_4: Number,
                Day2_5: Number,
                Day2_6: Number,
                Day3Total: Number,
                Day3: Number,
                Day3_2: Number,
                Day3_3: Number,
                Day3_4: Number,
                Day3_5: Number,
                Day3_6: Number,
                Total: Number,
            },
            Transits: {
                Day1Total: Number,
                Day1: Number,
                Day1_2: Number,
                Day1_3: Number,
                Day1_4: Number,
                Day1_5: Number,
                Day1_6: Number,
                Day2Total: Number,
                Day2: Number,
                Day2_2: Number,
                Day2_3: Number,
                Day2_4: Number,
                Day2_5: Number,
                Day2_6: Number,
                Day3: Number,
                Day3_2: Number,
                Day3_3: Number,
                Day3_4: Number,
                Day3_5: Number,
                Day3_6: Number,
                Total: Number,
            },
            TotalMiles: Number
        },
        Fuel: {
            Actual_mpg: {
                Transit: Number,
                Stage: Number,
                All: Number
            },
            Est_requiredTransit: {
                Day1Total: Number,
                Day1: Number,
                Day1_2: Number,
                Day1_3: Number,
                Day1_4: Number,
                Day1_5: Number,
                Day1_6: Number,
                Day2Total: Number,
                Day2: Number,
                Day2_2: Number,
                Day2_3: Number,
                Day2_4: Number,
                Day2_5: Number,
                Day2_6: Number,
                Day3: Number,
                Day3_2: Number,
                Day3_3: Number,
                Day3_4: Number,
                Day3_5: Number,
                Day3_6: Number,
                Total: Number,
            },
            Est_requiredStage: {
                Day1Total: Number,
                Day1: Number,
                Day1_2: Number,
                Day1_3: Number,
                Day1_4: Number,
                Day1_5: Number,
                Day1_6: Number,
                Day2Total: Number,
                Day2: Number,
                Day2_2: Number,
                Day2_3: Number,
                Day2_4: Number,
                Day2_5: Number,
                Day2_6: Number,
                Day3: Number,
                Day3_2: Number,
                Day3_3: Number,
                Day3_4: Number,
                Day3_5: Number,
                Day3_6: Number,
                Total: Number,
            },
            Est_TotalFuel: Number,
            Actual_Used: {
                Transit: Number,
                Stage: Number,
                All: Number
            },
        }
    },
    MTC: [{
        Name: String,
        Num: Number,
        TimeIn: Date,
        FirstCarOut: String,
        MTC_lon: String,
        MTC_lat: String,
        Completed: { type: Boolean, default: false }
    }],
    Services: [{
        Num: Number,
        Name: String,
        TimeIn: Date,
        TimeOut: Date,
        AllowedTime: Number,
        RegroupTime: Number,
        ATC_lon: String,
        ATC_lat: String,
        FTC_lat: String,
        FTC_lon: String,
        Completed: { type: Boolean, default: false },
        Times: {
            TargetATC: Date,
            ActualATC: Date,
            StageTime: Date,
            TargetStart: Date,
            ActualStart: Date
        },
    }],
    Transits: [{
        To: String,
        ToType: String,
        Length: Number,
        AllowedTime: Number,
        Completed: { type: Boolean, default: false }, 

    }],
    Stages: [{
        Num: Number,
        Name: String,
        Length: Number,
        Notes: String,
        ATC_lon: String,
        ATC_lat: String,
        FTC_lat: String,
        FTC_lon: String,
        AllowedTime: Number,
        FirstCarIn: String,
        BGYTime: Number,
        Completed: { type: Boolean, default: false },
        Times: {
            TargetATC: Date,
            ActualATC: Date,
            StageTime: Date,
            TargetStart: Date,
            ActualStart: Date
        },


    }],
    Logs:[],
})

schema.set('toJSON', {
    virtuals: true
});
var rallys = mongoose.model('Rallys', schema, 'rallys');

module.exports = rallys;