const {createApp, ref, watchEffect, computed} = Vue;

const app = {
	setup() {
		/**
		 **
		 ** DEFINE GAME VARIABLES
		 ** 
		 **/

		// the app name (might not even get changed)
		const appName = ref('Magic Square');
		// show diffent screen, main screen, game loop, results screen
		const isPlaying = ref(false);
		const gameOver = ref(false);
		// keep track of the number of green squares that appeared (will affect the total score)
		const noGreenSquares = ref(0);
		// keeps track of the players current score
		const currentScore = ref(0);
		// max amount of time for the game loop in seconds (game modes idea: how many green squares can you get💯)
		const gameTime = ref(30);
		// keep track of how much time user took to complete (game modes idea: fixed amount of green squares⌛️)
		const timeTaken = ref(0);
		// new Array(9).fill({})🤦‍♂️ / the current number of game squares is fixed (game modes idea: memory game🤔❓️)
		const squares = ref([{},{},{},{},{},{},{},{},{}]);
		// playing field new squares are generated for the game loop (the variable above helps with reseting the board)
		const gameBoard = ref([]);
		// rules about the game
		const rules = ref([
			'time to complete the game is 30 seconds',
			'green squares give you 1 point',
			'blue squares take away 1 point',
			'black squares don\'t do anything you can press them when you see a blue square'
		]);

		/**
		 ** 
		 ** DEFINE GAME FUNCTIONS
		 **
		 */

		// give a random index based from a given array
		const randomPick = arr => Math.floor(Math.random()*arr.length)

		// reset playing variables
		const newGame = () => {
			isPlaying.value = false
			gameOver.value = false
			noGreenSquares.value = 0
			currentScore.value = 0
			timeTaken.value = 0
		}

		// use this to store the interval on game start
		let startTimer = null

		// start the game loop
		const startGame = () => {
			isPlaying.value = true
			magicSquare()
			// start the game timer 
			startTimer = setInterval(() => {
				// time taken to complete the game in seconds
				timeTaken.value++
			}, 1000)
		}

		// stop the game timer
		const stopTimer = () => {
			clearInterval(startTimer)
		}

		// calculate the time remaining
		const timeRemaining = computed(() => {
			return gameTime.value - timeTaken.value
		})

		// generate green/blue square in random position
		const magicSquare = () => {
			// initial state all squares black
			const magic = squares.value.map((square, index) => {
				square.id = index+1
				square.color = 'black'
				return square
			})

			// find index of a random square to use
			const whichSquare = randomPick(magic)
			// more green colors than blue to reduce the odds of getting blue (more fun that way?)
			const colors = ["blue", "green", "green", "green", "green", "green", "green"]
			// get the chosen color by index
			const color = colors[randomPick(colors)]

			// if a green square is spotted increase the number of green squares generated (will be helpful later when doing modes)
			color === "green" && noGreenSquares.value++

			// change the color of the picked square from black to the color variable above
			magic[whichSquare].color = color
			// update the current state the player sees
			gameBoard.value = magic
		}

		// player chooses a square on screen 
		// green square increases by 1 point
		// blue square takes away 1 point
		// black squares do nothing (use it mainly when you see a blue square)
		const pickSquare = square => {
			if(square.color === "green"){
				currentScore.value++
			} else if(square.color === "blue") {
				currentScore.value--
			}
			magicSquare()
		}

		// after updating the function above this is no longer needed
		// initially used as double click to skip when you see a blue square
		const skipTurn = () => magicSquare()

		// end the game and show the player their results
		const endGame = () => {
			stopTimer()
			isPlaying.value = false
			gameOver.value = true
		}

		// calculate the winning results based on changing values
		const winningPercent = computed(() => {
			return (currentScore.value/noGreenSquares.value)*100
		})

		// watch the changes on some variables
		watchEffect(() => {
			// end the game when the number of green squares has reached 20
			if(noGreenSquares.value >= 20 || timeTaken.value === 30) endGame()
			// don't let the player score drop down more than 0
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
			gameTime,
			timeTaken,

			newGame,
			startGame,
			magicSquare,
			pickSquare,
			skipTurn,
			endGame,

			winningPercent,
			timeRemaining,
		}
	}
};

createApp(app).mount('#app');