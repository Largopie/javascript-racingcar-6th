import Validation from '../utils/Validation.js';
import InputView from '../view/InputView.js';
import Car from '../model/Car.js';
import OutputView from '../view/OutputView.js';

export default class Controller {
  constructor() {
    this.carList = [];
  }

  createCar(carNameList) {
    carNameList.forEach((carName) => {
      this.carList.push(new Car(carName));
    });
  }

  singleTry() {
    this.carList.forEach((car) => {
      car.tryToMove();
    });
    OutputView.printSingleTryResult(this.carList);
  }

  moveCars(tryCount) {
    OutputView.printTryResult();
    for (let i = 0; i < tryCount; i += 1) {
      this.singleTry();
    }
  }

  async run() {
    const carNames = await InputView.carName();
    const carNameList = carNames.split(',');

    Validation.carNameInput(carNameList);
    this.createCar(carNameList);

    const tryCount = await InputView.tryCount();
    Validation.tryCountInput(tryCount);
    OutputView.printNewLine();
    this.moveCars(tryCount);
  }
}

const c = new Controller();
console.log(await c.run());
