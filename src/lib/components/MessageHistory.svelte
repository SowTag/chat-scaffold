<script type="text/javascript">
	export let history = []

	import { onMount } from 'svelte'

	let historyAvailable = false;

	function scrollDown(node) {
		const scroll = () => {
			node.scroll({
				top: node.scrollHeight,
				behavior: 'smooth'
			})

			console.log(node)
		};

		scroll()
		console.log("Ran!")

		return { update: scroll }
	}

	onMount(async() => {
		history = await history.sort((x, y) => {
			if(x.timestamp > y.timestamp) return 1;
			return 0;
		})

		historyAvailable = true;
	})

	function formatTime(time) {
		let date = new Date(time)

		let hours = date.getHours().toString()
		let minutes = date.getMinutes().toString()

		if(hours.length < 2) hours = '0' + hours;
		if(minutes.length < 2) minutes = '0' + minutes;

		return `${hours}:${minutes}`
	}
</script>

<div class="history" use:scrollDown={history}>
	{#if historyAvailable}
		{#each history as msg}
			<div class="message" style={`--pfp: ${msg.userColor}`}>
				<div class="pic">
					<span>{ msg.from[0].toUpperCase() }</span>
				</div>
				<div class="content">
					<span>{ msg.text }</span>
				</div>
				<div class="actions">
					<span class="time">
						{ formatTime(msg.timestamp) }
					</span>
				</div>
			</div>
		{/each}
	{:else}
		<span class="loading">Loading history...</span>
	{/if}
</div>

<style type="text/css">
	.history {
		display: flex;
		flex-direction: column;
	}

	.loading {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-style: italic;
		opacity: .4;
	}

	.message {
		display: flex;
		align-items: center;
		padding: .3em 2em
		
	}

	.pic {
		padding: .6em;
		margin-right: 1em;
	}

	.pic span {
		width: 2em;
		aspect-ratio: 1 / 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.content {
		width: 100%;
	}

	.actions {
		margin-left: 1em;
	}

	.actions .time {
		opacity: .4;
	}

	.message:nth-of-type(even) {
		background: rgba(255, 255, 255, .025);
	}

	.pic span {
		background: var(--pfp);
		border-radius: 50%;
		display: flex;


		height: 80%;
		aspect-ratio: 1 / 1;
		padding: 5px;
	}

	.history {
		height: calc(100vh - clamp(40px, 3em, 80px));
		overflow-y: scroll;
		overflow-x: hidden;
		width: 100vw;
	}

	.history::-webkit-scrollbar {
		display: none;
	}
</style>