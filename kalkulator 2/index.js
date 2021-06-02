//selektory zakładek 

const teacherButton = document.getElementById("teacher_page_button");
const apprenticeButton = document.getElementById("apprentice_page_button");
const endButton = document.getElementById("end_calculation_button");
const teacherTimeTitle = document.getElementById("teacher_time_title");
const apprenticeTimeTitle = document.getElementById("apprentice_time_title");
const apprenticeAdderDiv = document.getElementById("apprentice_adder_div");
const dayPlanList = document.getElementById("day_plan_list");



//selektory 

const selector = document.getElementById("selector");
const fromH = document.getElementById("fromH");
const fromM = document.getElementById("fromM");
const toH = document.getElementById("toH");
const toM = document.getElementById("toM");
const submit = document.getElementById("submit");
const form = document.getElementById("form");
const hours = [fromH, fromM, toH, toM];
const daysH = document.getElementsByClassName("day_plan_hours");
const daysT = document.getElementsByClassName("day_plan_name");
const apprenticeNameInput = document.getElementById("apprentice_name");
const lessonsNumberInput = document.getElementById("apprentice_lessons_number");
const lessonTimeInput = document.getElementById("apprentice_lesson_time");

//zasoby
let apprentices = [];
let apprenticeName;
let lessonsNumber;
let lessonsTime;
let apprenticeWeek = [];
let week = [];
let nameOfDay;
let startWork;
let endWork;
let workTime;
let workUnits;
let workUnitsArr = [];
let dayExist = false;
let apprenticeExist = false;
let whichSite = 0;




//wydarzenia strony



apprenticeButton.addEventListener("click", () => {
    const dayPlanList2 = document.getElementById("day_plan_list2");

    apprenticeTimeTitle.classList.remove("display_none");
    teacherTimeTitle.classList.add("display_none");
    apprenticeAdderDiv.classList.remove("display_none");
    dayPlanList.classList.add("display_none")
    if (dayPlanList2) { dayPlanList2.classList.remove("display_none") }

    whichSite = 1;
    statsReset();
});

endButton.addEventListener("click", () => {
    calculate();
});


teacherButton.addEventListener("click", () => {
    const dayPlanList2 = document.getElementById("day_plan_list2");

    apprenticeTimeTitle.classList.add("display_none");
    teacherTimeTitle.classList.remove("display_none");
    apprenticeAdderDiv.classList.add("display_none");
    dayPlanList.classList.remove("display_none")
    if (dayPlanList2) { dayPlanList2.classList.add("display_none") }
    whichSite = 0;
});

hours.forEach((el) => { el.addEventListener("click", () => { el.value = ""; }) })

submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (whichSite == 0) {
        timeSetter();
        DayExistFinder(week);
        if (dayExist === false) {
            addDay(week);
        } else {
            changeDay(week);
        }
        console.log(week);
    } else if (whichSite == 1) {

        setStats();
        addDay(apprenticeWeek);
        apprenticeFinder();
        if (apprenticeExist == false && apprenticeName.length > 0) {
            apprenticeCreate();
        } else {
            apprenticeUpdate();

        }
        apprenticePlan();

        apprenticeWeek = [];
        console.log(apprentices);
    }

});
