import styles from './app.module.css';
import data from './data.json';
import {useState} from 'react';


export const App = () => {

	const [steps, setSteps] = useState(data);         	// Можно задать 2 состояния — steps и activeIndex
	const [activeIndex,setActiveIndex] = useState(0);
	const [firstStep, setfirstStep] = useState(true); 								// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const [lastStep,setLastStep]  = useState(false)

	const backwardClick  = (index) => {
							// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
		if(1 < index) {
		setActiveIndex(index-1);
		setLastStep(false);
		} else {
			setActiveIndex(0)
			setLastStep(false);
			setfirstStep(true);
		}
	}

	const forwardClick = (index) => {
		if(steps.length - 1 > index) {
			setActiveIndex(index+1);
			setfirstStep(false);
			steps.length - 2 <= index ?  setLastStep(true) : setLastStep(false)
		}
	}

	const attheBeginning = (index) => {
		setActiveIndex(0)
		setfirstStep(true);
		setLastStep(false);
	}

	const activatedSteps = (index) => {
		if(0 === index) {
			setfirstStep(true)
			setLastStep(false)
		}
		else if (steps.length - 1 === index){
			setLastStep(true)
			setfirstStep(false)
		}
		setActiveIndex(index);
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{ steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{ steps.map((value, index) =>   <li key={index}
						className={
							index === activeIndex
							? styles['steps-item'] + ' ' + styles.done + ' ' + styles.active
							: ( index < activeIndex
								? styles['steps-item'] + ' ' + styles.done
								: styles['steps-item'] )
								}>
											{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
											<button className={styles['steps-item-button']} onClick={() => {activatedSteps(index)}} >{index+1}</button>
											{/* При клике на кнопку установка выбранного шага в качестве активного */}
											Шаг {index+1}
								</li>)}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button}
								onClick = { () => {backwardClick(activeIndex)}} disabled={ firstStep }
							>Назад</button>
						<button className={styles.button}
								onClick={ lastStep ? (() => {attheBeginning(activeIndex)}) : (() => {forwardClick(activeIndex)}) }   /*дописать условие*/
							>{ lastStep ? 'Начать сначала' : 'Далее' }

						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
