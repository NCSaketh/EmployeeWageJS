const IS_ABSENT = 0;

let random = Math.floor(Math.random() * 10) % 2;

if(random == IS_ABSENT){
    console.log("Employee is absent");
}else{
    console.log("Employee is Present");
}



const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PER_HOUR = 20;

function getWorkingHours(empCheck) {
    switch(empCheck){
        case IS_PART_TIME:
            return PART_TIME_HOURS;
        case IS_FULL_TIME:
            return FULL_TIME_HOURS;
        default:
            return 0;
    }
}

const NUM_OF_WORKING_DAYS = 20;
const MAX_HRS_IN_MONTH = 160;

function calcDailyWage(empHrs){
    return empHrs*WAGE_PER_HOUR;
}

let totalEmpHrs = 0;
let totalWorkingDays = 0;
let empDailyWageArray = new Array();
let empDailyWageMap = new Map();
let empDailyHrsMap = new Map();

//UC7 an UC10 refactored

let empObjArray = new Array();
console.log("UC 10");

while((totalEmpHrs<=MAX_HRS_IN_MONTH) && 
        (totalWorkingDays<NUM_OF_WORKING_DAYS)){
    totalWorkingDays++;
    let empCheck = Math.floor(Math.random()*10)%3;
    let empHrs=getWorkingHours(empCheck);
    totalEmpHrs = totalWorkingDays + empHrs;
    empDailyWageArray.push(calcDailyWage(empHrs));
    empDailyWageMap.set(totalWorkingDays,calcDailyWage(empHrs));
    empDailyHrsMap.set(totalWorkingDays,empHrs);

    empObjArray.push(
        {
        dayNum:totalWorkingDays,
        dailyHours:empHrs,
        dailyWage:calcDailyWage(empHrs),
        toString() {
            return "Day=" + this.dayNum + " : Working Hours="+this.dailyHours
                +" : Wage earned=" +this.dailyWage+"\n"
        },
    });
}

console.log("Printing All Objects:");
console.log(empObjArray);
console.log("---------------------------------------------------");


let empWage = calcDailyWage(totalEmpHrs);

console.log("Daily Wage Array: "+empDailyWageArray);
console.log("Emp hours: "+totalEmpHrs);
console.log("Emp wage: "+empWage)
console.log("Total working days: "+totalWorkingDays);
console.log("---------------------------------------------------");

//Array Helper Function
//UC 7A
console.log("UC 7A");
let totEmpWage = 0;
function sum(dailyWage){
    totEmpWage = totEmpWage + dailyWage;
}

empDailyWageArray.forEach(sum);
console.log("Total Days: "+totalWorkingDays);
console.log("Total hrs: "+totalEmpHrs);
console.log("Total Emp Wage: "+totEmpWage);

function totalWages(totalWage,dailyWage){
    return totalWage + dailyWage;
}

console.log("\nEmp Wage with reduce: "+ Array.from(empDailyWageMap.values()).reduce(totalWages,0));
console.log("---------------------------------------------------");


//UC 9
console.log("UC 9");

const findTotal=(TotalVal, dailyVal) => {return TotalVal+dailyVal};
let count=0;
let totalHours=Array.from(empDailyHrsMap.values()).reduce(findTotal,0);
let totalSalary = empDailyWageArray.filter(dailyWage => dailyWage>0)
    .reduce(findTotal,0);
console.log("Total hrs : " + totalHours );
console.log("Total Wage Comp Using Arrow Func: "+totalSalary);

let nonWorkingDays = new Array();
let partWorkingDays = new Array();
let fullWorkingDays = new Array();
empDailyHrsMap.forEach((value,key,map)=>{
    if(value==8) fullWorkingDays.push(key);
    else if(value==4) partWorkingDays.push(key);
    else nonWorkingDays.push(key);
});
console.log("Full working days: "+fullWorkingDays);
console.log("Part working days: "+partWorkingDays);
console.log("Non working days: "+nonWorkingDays);


//UC 11
console.log("UC 11");

let totalEmpWages = empObjArray
                            .filter(obj => obj.dailyWage >0)
                            .reduce((totalWage,obj)=>
                                totalWage=totalWage+obj.dailyWage,0);


let totalEmpHours = empObjArray
                            .filter(obj => obj.dailyHours >0)
                            .reduce((totalHours,obj)=>
                                totalHours=totalHours+obj.dailyHours,0);
console.log("Total hours: "+totalEmpHours);
console.log("Total wage: "+totalEmpWages);

process.stdout.write("Logging Full Work Days:\n");
empObjArray
        .filter(obj=>obj.dailyHours == 8)
        .forEach(obj=>process.stdout.write(obj.toString()));

let partWorkingDayStrArr = empObjArray
                                    .filter(obj=>obj.dailyHours==4)
                                    .map(obj=>obj.toString());
process.stdout.write("Logging Part Working Days:\n");
console.log(partWorkingDayStrArr);

let nonWorkingDayStrArr = empObjArray
                                    .filter(obj=>obj.dailyHours==0)
                                    .map(obj=>obj.dayNum);
process.stdout.write("Logging Non Working Days:\n");
console.log(nonWorkingDayStrArr);




