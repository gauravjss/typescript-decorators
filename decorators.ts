//Class Decorator (Argument is a Constructor Function)
function logged(constructorFn: Function){
    console.log(constructorFn);
}
@logged
class Person{
    constructor(){
        console.log('Hi !');
    }
}

// Decorator Factory (Returns a function which can be used as a Decorator)
function logging(value: boolean){
    return value ? logged :(constructorFn: Function)=>{};
}

@logging(true)
class Car{

}

//Advanced Decorator
function printable(constructorsFn: Function){
    constructorsFn.prototype.print = function () {
        console.log(this);
    }
}
@logging(true)
@printable
class Plant{
    name = 'Green Plant';
}

const plant = new Plant();
(<any>plant).print();

// Method Decorator
function editable(value:boolean){
    return function (target:any, propName:string, descriptor:PropertyDescriptor) {
        descriptor.writable = value;
    }
}
// Property Decorator , even stops Constructor from Overriding
/*function overwritable(value:boolean){
    return function (target:any, propName:string):any {
        const newDescriptor:PropertyDescriptor = {
            writable:value
        };
        return newDescriptor;
    }
}*/

class Project{
    //@overwritable(false)
    projectName:string;

    constructor(name:string){
        this.projectName = name;
    }
    @editable(false)
    calcBudget(){
        console.log(1000);
    }
}

const project = new Project('super project');
project.calcBudget();
// This does not change, as decorator prevents editable
/*project.calcBudget = function () {
    console.log(2000);
};*/
project.calcBudget();

// Parameter Decorators
function printInfo(target:any,methodName: string,paramIndex:number){
    console.log('target:',target);
    console.log('methodName:',methodName);
    console.log('paramIndex:',paramIndex);
}

class Course{
    name:string;

    constructor(name:string){
        this.name = name;
    }

    printStudentNumbers(mode:string, @printInfo printAll:boolean){
        if(printAll){
            console.log(10000);
        }else{
            console.log(2000);
        }
    }
}

const course = new Course('Super');
course.printStudentNumbers('anything',false);
course.printStudentNumbers('anything',true );