
//sprawdza czy dany dzień jest już w tablicy
let apprenticeFinder = () => {
    let counter = 0;
    apprentices.forEach(el => {
        if (apprenticeNameInput.value == el.apprenticeName) {
            counter += 1;
        };
    })
    if (counter > 0) {
        apprenticeExist = true;
    } else {
        apprenticeExist = false;
    }
}

let DayExistFinder = (x) => {
    let counter = 0;
    x.forEach(el => {
        if (selector.value == el.nameOfDay) {
            counter += 1;
        };
    })
    if (counter > 0) {
        dayExist = true;
    } else {
        dayExist = false;
    }
}
// zmienia parametry istniejącego dnia
let dayChanger = (x) => {

    x.forEach(el => {
        if (selector.value === el.nameOfDay) {
            el.startWork = startWork;
            el.endWork = endWork;
            el.workTime = workTime;
            el.workUnits = workUnits;
            el.workUnitsArr = workUnitsArr;
        }
    })


};
//ustawia dane pobranie od użytkownika
let setStats = () => {
    apprenticeName = apprenticeNameInput.value;
    lessonsNumber = parseFloat(lessonsNumberInput.value);
    lessonsTime = parseFloat(lessonTimeInput.value);
    nameOfDay = selector.value;
    startWork = (parseFloat(fromH.value) * 60) + (parseFloat(fromM.value));
    endWork = (parseFloat(toH.value) * 60) + (parseFloat(toM.value));
    workTime = endWork - startWork;
    workUnits = workTime / 5;
    workUnitsArr = [];

    for (let i = startWork; i < endWork; i += 5) {
        workUnitsArr.push(i);
    };

}
//dodajae plan dnia
let addDay = function (x) {
    setStats();
    x.push({
        nameOfDay: nameOfDay,
        startWork: startWork,
        endWork: endWork,
        workTime: workTime,
        workUnits: workUnits,
        workUnitsArr: workUnitsArr

    })

};
//ustawia dane i podmienia parametry dnai
let changeDay = function (x) {
    setStats();
    dayChanger(x);
};


let statsReset = function () {
    nameOfDay = "";
    startWork = 0;
    endWork = 0;
    workTime = 0;
    workUnits = 0;
    workUnitsArr = [];
};


let timeSetter = function () {
    for (let i = 0; i < daysT.length; i++) {
        if (daysT[i].innerHTML == selector.value) {
            daysH[i].innerHTML = fromH.value + ":" + fromM.value + " - " + toH.value + ":" + toM.value;
        }
    };
}


let apprenticeCreate = () => {
    apprentices.push({
        apprenticeName: apprenticeName,
        lessonsNumber: lessonsNumber,
        lessonsTime: lessonsTime,
        apprenticeWeek: apprenticeWeek
    })
}

let apprenticeUpdate = () => {
    apprentices.forEach((el) => {
        if (el.apprenticeName == apprenticeNameInput.value) {
            DayExistFinder(el.apprenticeWeek);

            el.lessonsTime = lessonsTime;
            el.lessonsNumber = lessonsNumber;

            if (dayExist === false) {
                el.apprenticeWeek = el.apprenticeWeek.concat(apprenticeWeek);
            } else {
                changeDay(el.apprenticeWeek);
            }
        }
    })
};

let jsToHtmlHours = (stratHours, endHours) => Math.floor(stratHours / 60) + ":" + stratHours % 60 + " - " + Math.floor(endHours / 60) + ":" + endHours % 60;


let apprenticePlan = () => {
    const dayPlanList2 = document.querySelectorAll("#day_plan_list2");
    dayPlanList2.forEach(el => {
        el.parentElement.removeChild(el);
    });
    apprentices.forEach(el => {
        const apprenticeList = document.createElement("ul")
        const removeButton = document.createElement("button");
        removeButton.innerText = "usuń";


        apprenticeList.classList.add("day_plan_list");
        apprenticeList.setAttribute("id", "day_plan_list2")




        document.querySelector("body").appendChild(apprenticeList);

        for (let i = 0; i < 3; i++) {
            const apprenticeListItem = document.createElement("li")
            const apprenticeListTitle = document.createElement("em");
            const apprenticeListValue = document.createElement("p");

            apprenticeListItem.classList.add("day_plan_day");
            apprenticeListTitle.classList.add("day_plan_name");
            apprenticeListValue.classList.add("day_plan_hours");

            if (i == 0) {
                apprenticeListValue.innerText = el.apprenticeName;
                apprenticeListTitle.innerText = "imię ucznia";
            } else if (i == 1) {
                apprenticeListValue.innerText = el.lessonsNumber;
                apprenticeListTitle.innerText = "lekcje w tygodniu";
            } else {
                apprenticeListValue.innerText = el.lessonsTime;
                apprenticeListTitle.innerText = "czas trwania lekcji";
            }
            apprenticeList.appendChild(apprenticeListItem);
            apprenticeListItem.appendChild(apprenticeListTitle);
            apprenticeListItem.appendChild(apprenticeListValue);
        }


        el.apprenticeWeek.forEach(el => {
            const apprenticeListItem = document.createElement("li")
            const apprenticeListTitle = document.createElement("em");
            const apprenticeListValue = document.createElement("p");


            apprenticeListItem.classList.add("day_plan_day");
            apprenticeListTitle.classList.add("day_plan_name");
            apprenticeListValue.classList.add("day_plan_hours");

            apprenticeListValue.innerText = jsToHtmlHours(el.startWork, el.endWork);
            apprenticeListTitle.innerText = el.nameOfDay;

            apprenticeList.appendChild(apprenticeListItem);
            apprenticeListItem.appendChild(apprenticeListTitle);
            apprenticeListItem.appendChild(apprenticeListValue);



        })

        apprenticeList.appendChild(removeButton);
        removeButton.addEventListener("click", () => {
            let x=apprenticeList.querySelector("li").querySelector("p").innerText;
            apprentices.forEach((el,i)=>{
                if(el.apprenticeName==x){
                    apprentices.splice(i,1);
                }
            })

            console.log(apprentices);
            removeButton.parentElement.parentElement.removeChild(apprenticeList);
            
        });
    

    })

  


}

