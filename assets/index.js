const {createApp, ref, watchEffect, computed} = Vue;

const app = {
	setup() {
		const appName = ref('Magic Square');
		const isPlaying = ref(false);
		const gameOver = ref(false);
		const noGreenSquares = ref(0);
		const currentScore = ref(0);
		const squares = ref([{},{},{},{},{},{},{},{},{}]);
		const gameBoard = ref([]);
		const rules = ref([
			'green squares give you 1 point',
			'blue squares take away 1 point',
			'black squares don\'t do anything you can press them when you see a blue square'
		]);

		const randomPick = arr => Math.floor(Math.random()*arr.length)

		const newGame = () => {
			isPlaying.value = false
			gameOver.value = false
			noGreenSquares.value = 0;
			currentScore.value = 0;
		}

		const startGame = () => {
			isPlaying.value = true
			magicSquare()
		}

		const magicSquare = () => {
			const magic = squares.value.map((square, index) => {
				square.id = index+1
				square.color = 'black'
				return square
			})

			const whichSquare = randomPick(magic)
			const colors = ["blue", "green", "green", "green", "green", "green", "green"]
			const color = colors[randomPick(colors)]

			color === "green" && noGreenSquares.value++

			magic[whichSquare].color = color
			gameBoard.value = magic
		}

		const pickSquare = square => {
			if(square.color === "green"){
				currentScore.value++
			} else if(square.color === "blue") {
				currentScore.value--
			}
			magicSquare()
		}

		const skipTurn = () => magicSquare()

		const endGame = () => {
			isPlaying.value = false
			gameOver.value = true
		}

		const winningPercent = computed(() => {
			return (currentScore.value/noGreenSquares.value)*100
		})

		watchEffect(() => {
			if(noGreenSquares.value >= 20) endGame()
			if(currentScore.value < 0) currentScore.value = 0
		})

		return {
			appName,
			isPlaying,
			noGreenSquares,
			currentScore,
			gameBoard,
			gameOver,
			rules,

			newGame,
			startGame,
			magicSquare,
			pickSquare,
			skipTurn,
			endGame,

			winningPercent
		}
	}
};

createApp(app).mount('#app');