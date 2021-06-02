


let calculate =()=>{
    lessonsWeek=[];
    let maxLectionAmount=0;
    apprentices.forEach(el => {
        if (el.lessonsNumber>maxLectionAmount){
            maxLectionAmount=el.lessonsNumber;
        }
    });
    for(let i=0;i<maxLectionAmount;i++){
        week.forEach(day=>{
            apprentices.forEach(apprentice=>{
                if(apprentice.lessonsNumber<=maxLectionAmount){
                    apprentice.apprenticeWeek.forEach(apprenticeDay=>{
                        if(apprenticeDay.nameOfDay==day.nameOfDay){
                            let x=day.workUnitsArr;
                            let y=apprenticeDay.workUnitsArr;
                            let z=apprentice.lessonsTime/5;
                            
                           let result={
                               name:apprentice.apprenticeName,
                               day:day.nameOfDay,
                               startLesson:0,
                               endLesson:0
                           }

                           for(let i=0;i<x.length;i++){
                               for(let j=0;j<y.length;j++){
                                console.log(z);
                                   if(x[i]==y[j] && x[i+z]-x[i]==z*5 && x[i+z]<=y[y.length-1]){
                                       result.startLesson=x[i];
                                       result.endLesson=x[i+z];
                                       day.workUnitsArr.splice(x,z);
                                   }
                                  
                               }
                               if(result.startLesson>0){
                            }
                           }

                           lessonsWeek.push(result);
                        }
                    })
                }
            })
        })
    }
    return lessonsWeek;
}





