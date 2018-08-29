t graph = {};
const costs = {};
const parents = {};

/** Таблица графов (узлы и их соседи) **/
graph.start = {
	  a: 6,
	  b: 2
}

graph.a = {
	  fin: 1
}

graph.b = {
	  a: 3,
	  fin: 5
}

/** У конечного узла нет соседей **/
graph.fin = {};

/** Таблица для хранения стоимости узлов **/
costs.a = 6;
costs.b = 2;
costs.fin = Infinity;

/** Таблица для родителей **/
parents.a = 'start';
parents.b = 'start';
parents.fin = null; //Мы еще не знаем родителя у конечного узла;

/** Массив для уже обработаных узлов **/
let processed = [];

function findLowestCostNode(costs = [], processed = []) {
	  /** Создаем переменную которая хранит наименьшую цену узла **/
	  let lowestCost = Infinity;

	  /** Создаем переменную которая хранит узел **/
	  let lowestCostNode = null;

	  for (let node in costs) {
		      let cost = costs[node];

		      /** Если цена узла меньше уже присвоенной и его нет в обработанных;
		       *      * сохраняем новую цену и присваиваем имя узла **/
		      if (lowestCost > cost && !processed.includes(node)) {
			            lowestCost = cost;
			            lowestCostNode = node;
			          }
		    }

	  return lowestCostNode;
}

/** Находим самый дешевый узел **/;
let node = findLowestCostNode(costs, processed);

/** Пока есть необработанные узлы запускаем цикл **/
while (node) {

	  /** Берем цену и соседей узла **/
	  const cost = costs[node];
	  const neighbors = graph[node];

	  /** Перебераем соседей **/
	  Object.keys(neighbors).forEach(n => {

		      /** Считаем новую цену **/
		      let newCost = cost + neighbors[n];

		      /** Если новая цена ниже текущей **/
		      if (costs[n] > newCost) {

			            /** Назначаем новую цену и родителя узлу **/
			            costs[n] = newCost;
			            parents[n] = node;
			          }
		    })

	  /** Помещаем узел в обработанный **/
	  processed = [...processed, node];

	  /** Находим следующий узел **/
	  node = findLowestCostNode(costs, processed);
}
