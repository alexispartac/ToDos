
// This is an industrial-grade general-purpose greeter function:
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
 
greet("alex", new Date());

// adnotare array de stringuri
function array(arr: Array<string>): string{
  let a : string = 'hello world';
  return ' ';
}

// o functie care trebuie sa primeasca ca parametru un array de tip string, care trebuie sa returneaze un string
function object(obj: {x: number; y?: string}): any{
  console.log()
  return obj.y ? obj.x+obj.y : obj.x;
}
const ob = object({x: 23})
console.log(ob);

function numberORstring(val:| number | string): string {
  return val + '';
}

type age = number;

type Persoana = {
  nume: string;
  age: number;
}

interface Curs {
  medie: number;
  denumire: string;
}


interface Student {
  grupa: string;
  nume: string;
  cursuri: Curs[];
}

interface Integralist extends Student {
  integralist : boolean;
}

const alexis : Integralist = {  
      grupa: '1205B',
      nume: 'Partac Alexis Matei',
      cursuri: [
        {
          medie: 9.45,
          denumire: 'ALGA'
        },
        {
          medie: 9,
          denumire: 'AM'
        }
      ],
      integralist: true
    }
console.log(alexis)

// FOARTE IMPORTANT  
// aici avem o functie cu 2 parametrii al doilea trebuie sa fie get sau post, ok apelam functia cu metodele constantei req
declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req = { url: "https://example.com", method: "GET" } as const;

handleRequest(req.url, req.method);

// aici caracterul ! este folosit pentru a specifica faptul ca daca nu este null atunci aplicam proprietatea toFixed pe variabila
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}

// cand declaram o variabila aceasta ia ca tipuri obligatorii variabile de atribuire ce tipuri am initializat
let x = 2;
let y = x > 20 ? "da" : 10;

